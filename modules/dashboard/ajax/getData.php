<?php
$DB = Database::singleton();

const DATA_ENTRY_DAYS = 14;
const VISIT_REG_DAYS  = 90;

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
            "cohorts"     => getCohorts(),
            "sites"       => getSites(),
            "tableData"   => getTableData(),
            "visitLabels" => getVisitLabels()
        );
        echo json_encode($result);
    } else {
        header("HTTP/1.1 404 Not Found");
    }
}

exit();

function getCohorts() {
    $cohorts = Utility::getSubprojectList();

    return $cohorts;
}

function getSites() {
    global $DB;

    $user = User::singleton();

    if ($user->hasPermission('access_all_profiles')) {
        $sites = $DB->pselect(
            "SELECT DISTINCT p.Name, p.Alias
             FROM psc p
             INNER JOIN candidate c ON c.CenterID = p.CenterID
             WHERE c.Entity_type='human'",
            array()
        );
        return $sites;
    } else {
        $sites = $DB->pselect(
            "SELECT DISTINCT p.Name, p.Alias
             FROM psc p
             INNER JOIN candidate c ON c.CenterID = p.CenterID
             WHERE c.Entity_type='human' AND p.CenterID=:CID",
            array('CID' => $user->getCenterID())
        );
        return $sites;
    }
}

function getVisitLabels() {
    //$visits = Utility::getVisitList();

    $visits = array(
        'Initial_Assessment_Screening',
        'Clinical_Assessment',
        'Neuropsychology_Assessment',
        'Initial_MRI'
    );

    return $visits;
}

function getTableData() {
    global $DB;

    $visitLabels = getVisitLabels();
    $candidates  = getCandidates();

    $tableData = array();

    $sessIDPlaceHold = -1;

    foreach ($candidates as $candidate) {
        $pscid   = $candidate['PSCID'];
        $candID  = $candidate['CandID'];
        $psc     = $candidate['Alias'];
        $status  = $candidate['participant_status'];
        $dateReg = $candidate['Date_registered'];
        $visits = array();
        $screeningDone = screeningDone($candID);

        // Create feedback object
        $feedbackRaw = getFeedback($candID);
        $feedback = array();
        if ($feedbackRaw) {
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
        }
        foreach ($visitLabels as $visitLabel) {
            $session = $DB->pselectRow(
                "SELECT ID, SubprojectID, Date_visit, Current_stage
                 FROM session
                 WHERE CandID=:CID AND Visit_label=:VL",
                array('CID' => $candID, 'VL' => $visitLabel)
            );

            $sessionID           = null;
            $subproject          = null;
            $visitDate           = null;
            $visitRegStatus      = determineVisitRegStatus($visitLabel, $candID, $screeningDone);
            $dataEntryStatus     = null;
            $visitRegDueDate     = null;
            $dataEntryDueDate    = null;
            $ddeCompleted        = null;
            $sentToDCC           = null;
            $instrCompleted      = 0;
            $ddeInstCompleted    = 0;

            if (!empty($session) && $session['Current_stage'] != 'Not Started') {
                $sessionID        = $session['ID'];
                $subproject       = $session['SubprojectID'];
                $visitDate        = $session['Date_visit'];
                $visitRegStatus   = 'complete-visit';
                $sentToDCC        = sentToDCC($sessionID);
                $totalInstrs      = getTotalInstruments($visitLabel, $subproject);
                $totalDDEInstrs   = getTotalDDEInstruments($visitLabel, $subproject);

                if (!$sentToDCC) {
                    $ddeInstCompleted = getDDEInstrumentsCompleted($sessionID);
                    $instrCompleted = getTotalInstrumentsCompleted($sessionID);

                    if ($ddeInstCompleted !== $totalDDEInstrs || $instrCompleted !== $totalInstrs) {

                        if ($instrCompleted === $totalInstrs) {
                            $dataEntryStatus = "complete-data-entry";
                        } else {
                            $dataEntryStatus = determineDataEntryStatus($sessionID, $visitDate);
                            $dataEntryDueDate = determineDataEntryDueDate($visitDate);
                        }
                    } else {
                        $ddeCompleted = true;
                        $dataEntryStatus = 'complete-data-entry';
                    }
                } else {
                    $dataEntryStatus = "complete-data-entry-dcc";
                }
            } else {
                $sessionID = $sessIDPlaceHold--;
            }

            if ($status > 1) {
                $visitRegStatus   = 'cancelled-visit';
                $dataEntryStatus  = 'cancelled-data';
                $dataEntryDueDate = null;
            } else {
                $visitRegDueDate = determineVisitRegDueDate($visitLabel, $candID, $screeningDone);
            }

            $visit = array();
            $visit['sessionID']        = $sessionID;
            $visit['visitRegStatus']   = $visitRegStatus;
            $visit['dataEntryStatus']  = $dataEntryStatus;
            $visit['visitRegDueDate']  = $visitRegDueDate;
            $visit['dataEntryDueDate'] = $dataEntryDueDate;
            $visit['instrCompleted']   = $instrCompleted;
            $visit['totalInstrs']      = $totalInstrs;
            $visit['visitLabel']       = $visitLabel;
            $visit['cohort']           = getCohortName($subproject);
            $visit['ddeCompleted']     = $ddeCompleted;
            $visit['ddeInstCompleted'] = $ddeInstCompleted;
            $visit['totalDDEInstrs']   = $totalDDEInstrs;
            $visit['sentToDCC']        = $sentToDCC;
            array_push($visits, $visit);
        }

        array_push(
            $tableData,
            array(
                'pscid'    => $pscid,
                'psc'      => $psc,
                'candid'   => $candID,
                'visits'   => $visits,
                'dateReg'  => $dateReg,
                'feedback' => $feedback
            )
        );
    }

    return $tableData;
}

function getFeedback($candID) {
    global $DB;

    $query =
        "SELECT fbt.Feedback_level, fbt.SessionID, fbt.CommentID, fl.Test_name, tn.Full_name 
         FROM feedback_bvl_thread AS fbt
         LEFT JOIN flag AS fl ON (fbt.CommentID=fl.CommentID)
         LEFT JOIN test_names AS tn ON (fl.Test_name=tn.Test_name)
         WHERE Status <> 'closed' AND CandID=:cid";
    $queryArgs = array(
        "cid" => $candID
    );

    $feedback = $DB->pselect(
        $query,
        $queryArgs
    );

    return $feedback;
}

function sentToDCC($sessionID) {
    global $DB;

    $submitted = $DB->pselectOne(
        "SELECT Submitted 
         FROM session 
         WHERE ID=:SID",
        array("SID" => $sessionID)
    );

    if ($submitted === "Y") {
        return true;
    }

    return false;
}

function screeningDone($candID) {
    global $DB;

    $screening = $DB->pselectOne(
        "SELECT ID
         FROM session
         WHERE CandID=:CID 
         AND Visit_label='Initial_Assessment_Screening' 
         AND Current_stage <> 'Not Started'",
        array('CID' => $candID)
    );

    error_log($screening . '\n');

    if (is_numeric($screening)) {
        return true;
    } else {
        return false;
    }
}

function getCandidates() {
    global $DB;
    $user = User::singleton();

    if ($user->hasPermission('access_all_profiles')) {
        $candidates = $DB->pselect(
            "SELECT c.PSCID, c.CandID, psc.Name, psc.Alias, ps.participant_status, Date_registered
             FROM candidate c
             LEFT JOIN psc ON psc.CenterID=c.CenterID
             LEFT JOIN participant_status ps on ps.CandID=c.CandID
             WHERE c.Active='Y' AND c.Entity_type='human' AND c.CenterID <> 1
             ORDER BY Date_registered",
            array()
        );
        return $candidates;
    } else {
        $candidates = $DB->pselect(
            "SELECT c.PSCID, c.CandID, psc.Name, psc.Alias, ps.participant_status
             FROM candidate c
             LEFT JOIN psc ON psc.CenterID=c.CenterID
             LEFT JOIN participant_status ps on ps.CandID=c.CandID
             WHERE c.Active='Y' AND c.Entity_type='human' AND c.CenterID=:CID",
            array('CID' => $user->getCenterID())
        );
        return $candidates;
    }
}

function dateAdd($date, $days) {
    return date('Y-m-d', strtotime($date . ' + ' . $days . ' days'));
}

function datePast($date) {
    $date = new DateTime($date);
    $now  = new DateTime();

    if ($date < $now) {
        return true;
    }
    return false;
}

function determineVisitRegDueDate($visitLabel, $candID) {
    global $DB;

    if ($visitLabel == 'Initial_Assessment_Screening') {
        return null;
    } else {
        $initialDate = $DB->pselectOne(
            "SELECT Date_visit
             FROM session
             WHERE CandID=:CID AND Visit_label='Initial_Assessment_Screening'",
            array('CID' => $candID)
        );
        return dateAdd($initialDate, VISIT_REG_DAYS);
    }
}

function determineDataEntryDueDate($visitDate) {

    return dateAdd($visitDate, DATA_ENTRY_DAYS);
}

function determineVisitRegStatus($visitLabel, $candID, $screeningDone) {
    if ($visitLabel == 'Initial_Assessment_Screening' | !$screeningDone) {
        return 'no-deadline-visit';
    }

    if (!datePast(determineVisitRegDueDate($visitLabel, $candID))) {
        return 'deadline-approaching-visit';
    } else {
        return 'deadline-past-visit';
    }
}

function getDDEInstrumentsCompleted($sessionID) {
    global $DB;

    $totalDDEComplete = $DB->pselectOne(
        "SELECT COUNT(ID)
         FROM flag
         WHERE SessionID=:SID 
         AND Data_entry='Complete' 
         AND CommentID LIKE 'DDE_%'",
        array('SID' => $sessionID)
    );

    return $totalDDEComplete;
}

function determineDataEntryStatus($sessionID, $visitDate) {
    global $DB;

    $session = $DB->pselect(
        "SELECT Submitted, Current_stage
         FROM session
         WHERE ID=:SID",
        array('SID' => $sessionID)
    );

    if ($session['Current_stage'] == 'Recycling Bin') {
        return 'cancelled-data';
    }

    if (!datePast(determineDataEntryDueDate($visitDate))) {
        return 'deadline-approaching-data-entry';
    } else {
        return 'deadline-past-data-entry';
    }
}

function getTotalInstruments($visitLabel, $subproject) {
    global $DB;

    $totalInstruments = $DB->pselectOne(
        "SELECT COUNT(*)
         FROM test_battery
         WHERE SubprojectID=:CID AND Visit_label=:V",
        array(
            'CID' => $subproject,
            'V'   => $visitLabel
        )
    );

    return $totalInstruments;
}

function getTotalDDEInstruments($visitLabel, $subproject) {
    global $DB;

    $totalDDEInstruments = $DB->pselectOne(
        "SELECT COUNT(*) 
         FROM test_battery AS tb 
         INNER JOIN Config AS c
         ON tb.Test_name=c.Value 
         WHERE tb.Visit_label=:vl 
         AND SubprojectID=:sp 
         AND c.ConfigID=(
             SELECT ID
             FROM ConfigSettings
             WHERE Name=:dde
         )",
        array(
            "vl" => $visitLabel,
            "sp" => $subproject,
            "dde" => "DoubleDataEntryInstruments",
        )
    );

    return $totalDDEInstruments;
}

function getTotalInstrumentsCompleted($sessionID) {
    global $DB;

    $totalInstruments = $DB->pselectOne(
        "SELECT COUNT(ID)
         FROM flag
         WHERE SessionID=:SID 
         AND Data_entry='Complete' 
         AND CommentID NOT LIKE 'DDE_%'",
        array('SID' => $sessionID)
    );

    return $totalInstruments;
}

function getCohortName($subproject) {
    global $DB;

    return $DB->pselectOne(
        "SELECT title 
         FROM subproject 
         WHERE SubprojectID=:sid",
        array("sid" => $subproject)
    );
}

// Returns an array of subgroups which then map to
// an array of instruments, each containing test name, full name,
// data entry status, and commentID
function getInstruments($sessionID) {
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