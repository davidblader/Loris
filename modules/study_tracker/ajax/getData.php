<?php
/**
 * This file is used by the Dashboard to get the data for
 * the study tracker
 *
 * PHP Version 7
 *
 * @category Main
 * @package  Loris
 * @author   Tara Campbell <tara.campbell@mail.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris-Trunk
 */

$DB = \Database::singleton();

// ================================ CCNA SPECIFIC ================================
const DATA_ENTRY_DAYS = 14;
const VISIT_REG_DAYS  = 90;
const VISIT_ORDER = array(
    'Initial_Assessment_Screening' => 0,
    'Clinical_Assessment' => 1,
    'Neuropsychology_Assessment' => 2,
    'Initial_MRI' => 3
);
// ================================ CCNA SPECIFIC  END ===========================

if (isset($_GET['data'])) {
    $data = $_GET['data'];

    if ($data == "cohorts") {
        header('Content-Type: application/json');
        echo json_encode(getCohorts());
    } else if ($data == "sites") {
        header('Content-Type: application/json');
        echo json_encode(getSites());
    } else if ($data == "tableData") {
        header('Content-Type: application/json');
        echo json_encode(getTableData());
    } else if ($data == "visitLabels") {
        header('Content-Type: application/json');
        echo json_encode(getVisitLabels());
    } else if ($data == "instruments") {
        if ($_GET['sessionID']) {
            header('Content-Type: application/json');
            echo json_encode(getInstruments($_GET['sessionID']));
        } else {
            header("HTTP/1.1 400 Bad Request");
        }
    } else if ($data == 'all') {
        header('Content-Type: application/json');
        $result = array(
            "cohorts"       => getCohorts(),
            "sites"         => getSites(),
            "tableData"     => getTableData(),
            "visitLabels"   => array_keys(getVisitLabels()),
            "feVisitLabels" => array_values(getVisitLabels())
        );
        error_log(print_r(Utility::getSubprojectList(), true));
        echo json_encode($result);
    } else {
        header("HTTP/1.1 404 Not Found");
    }
}

exit();

/**
 * GetCohorts
 *
 * @return array
 */
function getCohorts()
{
    $cohorts = Utility::getSubprojectList();
    return $cohorts;
}

/**
 * GetSites
 *
 * @return array
 */
function getSites()
{
    global $DB;

    $user = User::singleton();

    if ($user->hasPermission('access_all_profiles')) {
        $sites = $DB->pselect(
            "SELECT DISTINCT p.Name, p.CenterID
             FROM psc p
             INNER JOIN candidate c ON c.CenterID = p.CenterID
             WHERE c.Entity_type='human'",
            array()
        );
    } else {
        $siteIDs = $user->getCenterIDs();
        $sites = $DB->pselect(
            "SELECT DISTINCT p.Name, p.CenterID
             FROM psc p
             INNER JOIN candidate c ON c.CenterID = p.CenterID
             WHERE c.Entity_type='human' AND FIND_IN_SET(p.CenterID, :CID)",
            array('CID' => implode(',', $siteIDs))
        );
    }
    $result = [];
    foreach ($sites as $s) {
        $result[$s['CenterID']] = $s['Name'];
    }

    return $result;
}

/**
 * GetVisitLabels
 *
 * @return array
 */
function getVisitLabels()
{
    //$visits = Utility::getVisitList();
// ================================ CCNA SPECIFIC ================================
    $visits = array(
        'Initial_Assessment_Screening' => 'Initial Assessment - Screening',
        'Clinical_Assessment'          => 'Initial Assessment - Clinical',
        'Neuropsychology_Assessment'   => 'Initial Assessment - Neuropsychology',
        'Initial_MRI'                  => 'Initial MRI'
    );
// ================================ CCNA SPECIFIC END ============================

    return $visits;
}

/**
 * GetTableData
 *
 * @return array
 */
function getTableData()
{
    global $DB;

    $visitLabels = getVisitLabels();
    $visitKeys = array_keys($visitLabels);
    $visitKeys = array_map(function($val) {
        return "'$val'";
    }, $visitKeys);
    $visitKeys = implode(',', $visitKeys);

    $tableData = array();

    $sessIDPlaceHold = -1;

    $allDDEInstruments  = $DB->pselect(
        "SELECT Value 
         FROM Config 
         WHERE ConfigID=
          (SELECT ID 
          FROM ConfigSettings 
          WHERE Name='DoubleDataEntryInstruments')",
        array()
    );

    $allDDEInstruments = array_column($allDDEInstruments, 'Value');
    $allDDEInstruments = array_map(function($val) {
        return "'$val'";
    }, $allDDEInstruments);
    $allDDEInstruments = implode(',', $allDDEInstruments);

    $user = User::singleton();
    $userSitesClause = '';
    if (!$user->hasPermission('access_all_profiles')) {
        $userSites = implode(',', $user->getCenterIDs());
        $userSitesClause = "AND c.CenterID IN ($userSites)";
    }
    // ================================ CCNA SPECIFIC ================================
    $dxReappraisalCandIDs = getDiagnosisReappraisalCandIDs();
    // ================================ CCNA SPECIFIC END ============================


    // ================================ (probably? maybe?) CCNA SPECIFIC =============
    // Need to supply special alias for SessionID because need to keep record
    // of candidates who do not have any timepoints in session table who get
    // lost due to GROUP BY statement
    $query = "SELECT 
                c.PSCID, 
                c.CandID, 
                c.Date_registered, 
                psc.CenterID, 
                ps.participant_status, 
                ps.participant_suboptions,
                IFNULL(s.ID, UUID()) as SessionIDAlias, 
                sp.SubprojectID, 
                s.Date_visit, 
                s.Current_stage, 
                s.Submitted, 
                s.Visit_label,
                COALESCE(pso.Description, 'Active') as Description,
                COUNT(DISTINCT CASE WHEN f.CommentID NOT LIKE 'DDE_%' THEN f.CommentID ELSE NULL END) AS TotalInst,
                COUNT(DISTINCT CASE WHEN f.Test_name IN ($allDDEInstruments) AND f.CommentID LIKE 'DDE_%' THEN f.Test_name ELSE NULL END) AS TotalDDEInst,
                COUNT(DISTINCT CASE WHEN f.CommentID NOT LIKE 'DDE_%' AND Data_entry='Complete' THEN f.CommentID ELSE NULL END) AS TotalInstComplete,
                COUNT(DISTINCT CASE WHEN f.CommentID LIKE 'DDE_%' AND Data_entry='Complete' THEN f.CommentID ELSE NULL END) AS TotalDDEInstComplete,
                COUNT(cu.CommentId1) AS numConflicts
            FROM candidate c
                LEFT JOIN session s on s.CandID=c.CandID
                LEFT JOIN psc ON psc.CenterID=c.CenterID
                LEFT JOIN participant_status ps on ps.CandID=c.CandID
                LEFT JOIN participant_status_options pso on pso.ID=ps.participant_status OR pso.ID=ps.participant_suboptions
                LEFT JOIN flag f ON f.SessionID=s.ID  
                LEFT JOIN subproject sp ON s.SubprojectID = sp.SubprojectID
                LEFT JOIN conflicts_unresolved cu ON f.CommentID=cu.CommentId1
            WHERE c.Active='Y' 
                AND c.Entity_type='Human' 
                AND c.CenterID <> 1
                AND (s.Visit_label IN ($visitKeys) OR s.Visit_label IS NULL)
                $userSitesClause
                GROUP BY SessionIDAlias
                ORDER BY Date_registered";
    // ================================ (probably? maybe?) CCNA SPECIFIC END ================================

    $data = $DB->pselect($query, array());
    foreach ($data as $d) {
        $visitData = array(
            'cohort'           => $d['SubprojectID'],
            'currentStage'     => $d['Current_stage'],
            'dataEntryDueDate' => null,
            'dataEntryStatus'  => null,
            'dateVisit'        => $d['Date_visit'],
            'ddeCompleted'     => $d['TotalDDEInst'] === $d['TotalDDEInstComplete'],
            'ddeInstCompleted' => $d['TotalDDEInstComplete'],
            'feVisitLabel'     => $visitLabels[$d['Visit_label']],
            'instrCompleted'   => $d['TotalInstComplete'],
            'numConflicts'     => $d['numConflicts'],
            'sentToDCC'        => $d['Submitted'] === 'Y',
            'sessionID'        => $d['SessionIDAlias'],
            'totalDDEInstrs'   => $d['TotalDDEInst'],
            'totalInstrs'      => $d['TotalInst'],
            'visitLabel'       => $d['Visit_label'],
            'visitRegDueDate'  => null,
            'visitRegStatus'   => null
        );
        $vIndex = VISIT_ORDER[$d['Visit_label']];

        if (array_key_exists($d['PSCID'], $tableData)) {
            $tableData[$d['PSCID']]['visits'][$vIndex] = $visitData;
        } else {
            $visits = array();
            $visits[$vIndex] = $visitData;

            $tableData[$d['PSCID']] = array(
                'candid'        => $d['CandID'],
                'pscid'         => $d['PSCID'],
                'dateReg'       => $d['Date_registered'],
                'psc'           => $d['CenterID'],
                'statusDesc'    => $d['Description'],
                'visits'        => $visits,
                'feedback'      => getFeedback($d['CandID']),
                // ================================ CCNA SPECIFIC ================================
                'dxReappraisal' => in_array($d['CandID'], $dxReappraisalCandIDs)
                // ================================ CCNA SPECIFIC END ============================
            );
        }
    }
    // Fill in missing data (visit reg. and data entry due dates / statuses)
    foreach ($tableData as $key => $row) {

        // ================================ CCNA SPECIFIC ================================
        $screeningDone = isset($row['visits'][0]) && $row['visits'][0]['currentStage'] !== 'Not Started';
        // ================================ CCNA SPECIFIC END ============================

        $candidateInactive = $row['statusDesc'] !== 'Active' && $row['statusDesc'] !== 'Complete';
        // Set default visit statuses & deadlines
        $defaultVRStatus = null;
        $defaultDEStatus = null;
        $defaultVRDeadline = null;

        // TODO get this off the backend (designated CSS classes)
        if ($candidateInactive) {
            $defaultVRStatus = 'cancelled-visit';
            $defaultDEStatus = 'cancelled-data';
        } elseif ($screeningDone) {
            $screeningDate = $row['visits'][0]['dateVisit'];
            $defaultVRStatus = determineVisitRegStatus($screeningDate);
            $defaultVRDeadline = determineVisitRegDueDate($screeningDate);
        } else {
            $defaultVRStatus = 'no-deadline-visit';
            $defaultVRDeadline = null;
        }

        for ($i = 0; $i < count($visitLabels); $i++) {
            // If empty, session does not exist
            if (empty($row['visits'][$i])) {
                $visitData = array(
                    'cohort' => null,
                    'currentStage' => null,
                    'dataEntryDueDate' => null,
                    'dataEntryStatus' => $defaultDEStatus,
                    'ddeCompleted' => null,
                    'ddeInstCompleted' => null,
                    'feVisitLabel' => $visitLabels[array_flip(VISIT_ORDER)[$i]],
                    'instrCompleted' => null,
                    'numConflicts' => null,
                    'sentToDCC' => null,
                    'sessionID' => '' . $sessIDPlaceHold--, // provide negative sessID for unique ID, needs to be string
                    'totalDDEInstrs' => null,
                    'totalInstrs' => null,
                    'visitLabel' => array_flip(VISIT_ORDER)[$i],
                    'visitRegDueDate' => $defaultVRDeadline,
                    'visitRegStatus' => $defaultVRStatus,
                );
                // else just set individual fields
            } else {
                // TODO get this off the backend (designated CSS classes)
                $visitData = $row['visits'][$i];
                if ($candidateInactive) {
                    $visitData['visitRegStatus'] = 'cancelled-visit';
                    $visitData['dataEntryStatus'] = 'cancelled-data';

                    // if current stage does not equal Not started then
                    // visit is started, determine data entry status
                } elseif ($visitData['currentStage'] !== 'Not Started'
                    && $visitData['currentStage'] !== 'Recycling Bin') {
                    $visitData['visitRegStatus'] = 'complete-visit';
                    $visitData['visitRegDueDate'] = null;

                    if ($visitData['sentToDCC']) {
                        $visitData['dataEntryStatus'] = 'complete-data-entry-dcc';
                    } else if($visitData['instrCompleted'] === $visitData['totalInstrs']) {
                        $visitData['dataEntryStatus'] = 'complete-data-entry';
                    } else {
                        $visitData['dataEntryStatus'] = determineDataEntryStatus($visitData['dateVisit']);
                        $visitData['dataEntryDueDate'] = determineDataEntryDueDate($visitData['dateVisit']);
                    }

                } else {
                    $visitData['visitRegDueDate'] = $defaultVRDeadline;
                    $visitData['visitRegStatus'] = $defaultVRStatus;
                }
            }
            $row['visits'][$i] = $visitData;
        }
        // Consequence of needing to use GROUP BY on sessionID
        // Need to keep records of candidates who have no timepoints
        // in session table.
        unset($row['visits'][null]);
        ksort($row['visits']);
        $tableData[$key] = $row;
    }
    $tableData = array_values($tableData);
    return $tableData;
}

// ================================ CCNA SPECIFIC ================================
function getDiagnosisReappraisalCandIDs() {
    global $DB;

    $candids = $DB->pselect(
        "SELECT CandID FROM candidate_diagnosis_reappraisal",
        array()
    );

    return array_column($candids, 'CandID');
}
// ================================ CCNA SPECIFIC END ============================

/**
 * GetFeedback
 *
 * @param int $candID the candidate id
 *
 * @return array
 */
function getFeedback($candID)
{
    global $DB;

    $feedbackRaw = $DB->pselect(
        "SELECT fbt.Feedback_level, fbt.SessionID, fbt.CommentID,
         fl.Test_name, tn.Full_name 
         FROM feedback_bvl_thread AS fbt
         LEFT JOIN flag AS fl ON (fbt.CommentID=fl.CommentID)
         LEFT JOIN test_names AS tn ON (fl.Test_name=tn.Test_name)
         WHERE Status <> 'closed' AND CandID=:cid",
        array(
            "cid" => $candID
        )
    );
    $feedback = array();
    foreach ($feedbackRaw as $fb) {
        // Check if candidate has feedback at profile level
        // only need to know whether or not it exists
        if ($fb['Feedback_level'] === "profile") {
            $feedback['profile'] = true;

            // If there is visit level feedback, create subobject
            // and map sessionID to true
        } else if ($fb['Feedback_level'] === "visit") {
            $feedback['visits'][$fb["SessionID"]] = true;

            // For instrument feedback, create instrument subobject
            // mapping sessionID to CommentID, test_name and full_name.
            // (Uses sessionID as key because instrument needs to be
            // associated with its appropriate visit as it will be displayed
            // beneath it in SideBarCandContent)
        } else if ($fb['Feedback_level'] === "instrument") {
            $feedback['instruments'][$fb['SessionID']] = array(
                "commentID" => $fb['CommentID'],
                "testName" => $fb['Test_name'],
                "fullName" => $fb['Full_name']
            );
        }
    }

    return $feedback;
}

/**
 * DateAdd
 *
 * @param date $date the base date
 * @param int  $days the number of days to add to the date
 *
 * @return date
 */
function dateAdd($date, $days)
{
    if (empty($date)) {
        return null;
    }
    return date('Y-m-d', strtotime($date . ' + ' . $days . ' days'));
}

/**
 * DatePast
 *
 * @param date $date the date
 *
 * @return boolean
 */
function datePast($date)
{
    $date = new DateTime($date);
    $now  = new DateTime();

    if ($date < $now) {
        return true;
    }
    return false;
}

/**
 * DetermineVisitRegDueDate
 *
 * @param string $visitLabel the visit lable
 * @param int    $candID     the candidate id
 *
 * @return date
 */
function determineVisitRegDueDate($screeningDate)
{
    return dateAdd($screeningDate, VISIT_REG_DAYS);
}

/**
 * DetermineDataEntryDueDate
 *
 * @param date $visitDate the visit date
 *
 * @return date
 */
function determineDataEntryDueDate($visitDate)
{
    return dateAdd($visitDate, DATA_ENTRY_DAYS);
}

/**
 * DetermineVisitRegStatusDate
 *
 * @param string  $visitLabel    the visit lable
 * @param int     $candID        the candidate id
 * @param boolean $screeningDone was screening already done?
 *
 * @return string
 */
function determineVisitRegStatus($screeningDate)
{
    if (!datePast(determineVisitRegDueDate($screeningDate))) {
        return 'deadline-approaching-visit';
    } else {
        return 'deadline-past-visit';
    }
}

/**
 * DetermineDataEntryStatus
 *
 * @param int  $sessionID the session ID
 * @param date $visitDate the visit date
 *
 * @return string
 */
function determineDataEntryStatus($visitDate)
{
    if (!datePast(determineDataEntryDueDate($visitDate))) {
        return 'deadline-approaching-data-entry';
    } else {
        return 'deadline-past-data-entry';
    }
}


/**
 * GetInstruments
 *
 * Returns an array of subgroups which then map to
 * an array of instruments, each containing test name, full name,
 * data entry status, and commentID
 *
 * @param int $sessionID the session ID
 *
 * @return array
 */
function getInstruments($sessionID)
{
    global $DB;

    $result = array();

    $tests = $DB->pselect(
        "SELECT Test_name, Data_entry, CommentID
         FROM flag
         WHERE SessionID=:sid AND CommentID NOT LIKE 'DDE_%'",
        array("sid" => $sessionID)
    );


    foreach ($tests as $t) {
        $sg = $DB->pselectOne(
            "SELECT Subgroup_name
             FROM test_subgroups s 
             INNER JOIN test_names t 
             ON s.ID = t.sub_group
             WHERE test_name = :tn",
            array("tn" => $t['Test_name'])
        );

        if (!array_key_exists($sg, $result)) {
            $result[$sg] = array();
        }

        $fullName = $DB->pselectOne(
            "SELECT Full_name 
             FROM test_names
             WHERE Test_name=:t",
            array("t" => $t["Test_name"])
        );
        $ddeComplete = null;
        $conflicts = false;
        if ($t["Data_entry"] === "Complete") {
            $ddeComplete = $DB->pselectOne(
                "SELECT Data_entry 
                 FROM flag 
                 WHERE CommentID=:cid",
                array("cid" => "DDE_".$t["CommentID"])
            );
            if ($ddeComplete) {
                $conflictsExist = $DB->pselect(
                    "SELECT ConflictID 
                     FROM conflicts_unresolved 
                     WHERE CommentID1=:cmid",
                    array("cmid" => $t['CommentID'])
                );
                if ($conflictsExist) {
                    $conflicts = true;
                }
            }
        }

        $result[$sg][] = array(
            "fullName" => $fullName,
            "testName" => $t["Test_name"],
            "completion" => $t["Data_entry"],
            "ddeCompletion" => $ddeComplete,
            "commentID" => $t["CommentID"],
            "conflicts" => $conflicts
        );
    }
    return $result;
}

?>