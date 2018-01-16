<?php
/**
 * Publications module class
 *
 * PHP version 7
 *
 * @category Behavioural
 * @package  Main
 * @author   David Blader  <dblader.mcin@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/mohadesz/Loris-Trunk
 */
namespace LORIS\publications;

/**
 * Module for viewing research project proposals and their respective publications
 *
 * @category Behavioural
 * @package  Main
 * @author   David Blader  <dblader.mcin@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris
 */
class Publications extends \NDB_Menu_Filter_Form
{
    public $AjaxModule   = true;
    public $skipTemplate = true;
    /**
     * The _has_access returns true
     * if the user has the specific permission
     *
     * @return boolean
     */
    function _hasAccess()
    {
        // create user object
        /*$user = \User::singleton();
        return $user->hasPermission('publications');*/
        return true;
    }

    /**
     * Sets up the Filter Variables
     *
     * @return boolean
     */
    function _setupVariables()

    {
        $query = " FROM publications p ".
            "LEFT JOIN publications_keywords_rel pkr ON p.PublicationID=pkr.PublicationID ".
            "LEFT JOIN publication_keywords pk ON pkr.KeywordID=pk.KeywordID ".
            "LEFT JOIN publications_parameter_type_rel pptr ON p.PublicationID=pptr.PublicationID ".
            "LEFT JOIN parameter_type pt ON pt.ParameterTypeID=pptr.ParameterTypeID ";
        $query .= " WHERE 1=1 ";
        $query .= " GROUP BY p.PublicationID ";

        $this->columns = array(
            'p.Title',
            'p.Lead_investigator',
            'p.Date_proposed',
            'p.Approval_status',
            'p.Description',
            'GROUP_CONCAT(pk.Label)', // Keywords
            'pt.Name', // Variables of Interest
            'p.PublicationID',
        );

        $this->query = $query;
        $this->headers = array(
            'Title',
            'Lead Investigator',
            'Date Proposed',
            'Approval Status',
            'Description',
            'Keywords',
            'Variables Of Interest',
            'Publication ID'
        );


        $this->validFilters = array(
            'p.Title',
            'p.Approval_status',
            'pk.Label',
            'p.Lead_investigator',
            'pt.Name',
        );

        $this->formToFilter = array(
            'titleOrDescription'  => 'p.Title',
            'approvalStatus'      => 'p.Approval_status',
            'keywords'            => 'pk.Label',
            'variablesOfInterest' => 'pt.Name',
            'leadInvestigator'    => 'p.Lead_investigator',
        );
        return true;
    }

    /**
     * Sets up the smarty menu filter items for publications
     *
     * @param string $name       The test name being accessed
     * @param string $page       The subtest being accessed (may be null)
     * @param string $identifier The identifier for the data to load on this page
     * @param string $commentID  The CommentID to load the data for
     * @param string $formname   The name to give this form
     *
     * @return bool
     */
    function _setupPage($name, $page, $identifier, $commentID, $formname)
    {
        parent::_setupPage($name, $page, $identifier, $commentID, $formname);

        $statusOptions = array(
            'Approved' => 'Approved',
            'Pending' => 'Pending',
            'Rejected' => 'Rejected'
        );
        $this->addBasicText(
            'title',
            'Title'
        );
        $this->addSelect(
            'approvalStatus',
            'Approval Status',
            $statusOptions
        );

        $this->addBasicText(
            'leadInvestigator',
            'Lead Investigator'
        );

        $this->addBasicText(
            'keywords',
            'Keywords'
        );
        $this->addBasicText(
            'variablesOfInterest',
            'Variables of Interest'
        );


        return true;
    }


    /**
     * Include the column formatter required to display the feedback link colours
     * in the candidate_list menu
     *
     * @return array of javascript to be inserted
     */
    function getJSDependencies()
    {
        $factory = \NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getJSDependencies();
        return array_merge(
            $deps,
            array(
                $baseURL . '/publications/js/publicationIndex.js'
            )
        );
    }

    /**
     * Include additional CSS files:
     *  imaging_uploader.css
     *
     * @return array of css to be inserted
     */
    function getCSSDependencies()
    {
        $factory = \NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getCSSDependencies();
        return array_merge(
            $deps,
            []
        );
    }

    /**
     * Converts the results of this menu filter to a JSON format to be retrieved
     * with ?format=json
     *
     * @return a json encoded string of the headers and data from this table
     */
    function toJSON()
    {
        $result            = $this->toArray();
        $result['form']    = $this->form->form;

        return json_encode($result);
    }
}
?>