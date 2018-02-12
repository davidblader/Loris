<?php
/**
 * Server_processes_manager module automated integration tests
 *
 * PHP Version 7
 *
 * @category Test
 * @package  Loris
 * @author   Wang Shen <wangshen.mcin@gmail.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris
 */

require_once __DIR__ .
    "/../../../test/integrationtests/LorisIntegrationTest.class.inc";

/**
 * Server_processes_manager module automated integration tests
 *
 * PHP Version 7
 *
 * @category Test
 * @package  Loris
 * @author   Wang Shen <wangshen.mcin@gmail.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://github.com/aces/Loris
 */
class Server_Processes_ManagerTest extends LorisIntegrationTest
{
    /**
     * UI elements and locations
     * breadcrumb - ''
     * Table headers
     */
    private $_loadingUI
        =  array(
            'Server  Processes  Manager' => '#bc2 > a:nth-child(2) > div',
            //table headers
            'No.'                        => '#dynamictable > thead > tr',
            'Pid'                        => '#dynamictable > thead > tr',
            'Type'                       => '#dynamictable > thead > tr',
            'Stdout File'                => '#dynamictable > thead > tr',
            'Stderr File'                => '#dynamictable > thead > tr',
            'Exit Code File'             => '#dynamictable > thead > tr',
            'Exit Code'                  => '#dynamictable > thead > tr',
            'Userid'                     => '#dynamictable > thead > tr',
            'Start Time'                 => '#dynamictable > thead > tr',
            'End Time'                   => '#dynamictable > thead > tr',
           );
    /**
     * Tests that the page does not load if the user does not have correct
     * permissions
     *
     * @return void
     */
    function testLoadsWithoutPermissionRead()
    {
        $this->setupPermissions(array(""));
        $this->safeGet($this->url . "/server_processes_manager/");
        $bodyText = $this->webDriver->findElement(
            WebDriverBy::cssSelector("body")
        )->getText();
        $this->assertContains("You do not have access to this page.", $bodyText);
        $this->resetPermissions();
    }
    /**
     * Tests that the page does not load if the user does not have correct
     * permissions
     *
     * @return void
     */
    function testDoesNotLoadWithPermission()
    {
        $this->setupPermissions(array("server_processes_manager"));
        $this->safeGet($this->url . "/server_processes_manager/");
        $bodyText = $this->webDriver->findElement(
            WebDriverBy::cssSelector("body")
        )->getText();
        $this->assertNotContains("You do not have access to this page.", $bodyText);
        $this->resetPermissions();
    }
    /**
      * Testing UI elements when page loads
      *
      * @return void
      */
    function testPageUIs()
    {
        $this->safeGet($this->url . "/server_processes_manager/");
        sleep(1);
        foreach ($this->_loadingUI as $key => $value) {
            $text = $this->webDriver->executescript(
                "return document.querySelector('$value').textContent"
            );
            $this->assertContains($key, $text);
        }
    }
    /**
      * Testing React filter in this page.
      *
      * @return void
      */
    function testFilters()
    {
        $this->_testFilter("/server_processes_manager/", "pid", "317", "1 rows");
        $this->_testFilter("/server_processes_manager/", "type", "mri_upload", "51");
        $this->_testFilter(
            "/server_processes_manager/",
            "userid",
            "admin",
            "51"
        );
    }
    /**
      * This function could test filter function in each Tabs.
      *
      * @param string $url            this is for the url which needs to be tested.
      * @param string $filter         the filter which needs to be tested.
      * @param string $testData       the test data.
      * @param string $expectDataRows the expect rows in the table.
      *
      * @return void
      */
    function _testFilter($url,$filter,$testData,$expectDataRows)
    {
        $this->safeGet($this->url . $url);
        sleep(1);
        $this->safeFindElement(
            WebDriverBy::Name($filter)
        )->sendKeys($testData);
        //click show data button
        $this->webDriver->executescript(
            "document.querySelector('#filter').click()"
        );
        sleep(1);
        $this->webDriver->getPageSource();
        $text = $this->webDriver->executescript(
            "return document.querySelector('#datatable > div >".
            " div.table-header.panel-heading').textContent"
        );
        //click clear form
        $this->webDriver->executescript(
            "document.querySelector('#server_processes > div:nth-child(3)".
            " > div > div:nth-child(2) > input').click()"
        );

        $this->assertContains($expectDataRows, $text);
    }
}
?>
