<?php
/********************************************************************
Product		: Flexicontact
Date		: 2 June 2017
Copyright	: Les Arbres Design 2009-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

class com_flexicontactInstallerScript
{
public function preflight($type, $parent) 
{
	$version = new JVersion();  			// get the Joomla version (JVERSION did not exist before Joomla 2.5)
	$joomla_version = $version->RELEASE.'.'.$version->DEV_LEVEL;
	$app = JFactory::getApplication();

	if (version_compare($joomla_version,"3.4.8","<"))
		{
        $app->enqueueMessage("Flexicontact requires at least Joomla 3.4.8", 'error');
		return false;
		}
		
	if (get_magic_quotes_gpc())
		{
        $app->enqueueMessage("Flexicontact cannot run with PHP Magic Quotes ON. Please switch it off and re-install.", 'error');
		return false;
		}

	$app = JFactory::getApplication();
	$dbtype = $app->get('dbtype');
	if (!strstr($dbtype,'mysql'))
		{
        $app->enqueueMessage("Flexicontact currently only supports MYSQL databases. It cannot run with $dbtype", 'error');
		return false;
		}

	return true;
}

public function uninstall($parent)
{ 
    $app = JFactory::getApplication();
    $app->enqueueMessage("Flexicontact has been uninstalled. The Flexicontact database table was NOT deleted", 'notice');
}

//-------------------------------------------------------------------------------
// The main install function
//
public function postflight($type, $parent)
{
    $app = JFactory::getApplication();

// check the PHP version

	if (version_compare(PHP_VERSION,"5.3.0","<"))
        $app->enqueueMessage("Flexicontact has not been tested on this old version of PHP (".PHP_VERSION.")", 'notice');
		
// we don't support the Hathor template

	$template = JFactory::getApplication()->getTemplate();
    if ($template == 'hathor')
        $app->enqueueMessage("Flexicontact does not support the Hathor administrative template. Please use a different template.", 'notice');

// check the Joomla version

	if (substr(JVERSION,0,1) > "3")				// if > 3
        $app->enqueueMessage("This version of Flexicontact has not been tested on this version of Joomla.", 'notice');
		
// get the component version from the component manifest xml file		

	$component_version = $parent->get('manifest')->version;

// delete redundant files from older versions

	@unlink(JPATH_SITE.'/administrator/components/com_flexicontact/admin.flexicontact.php');
	@unlink(JPATH_ROOT.'/administrator/components/com_flexicontact/toolbar.flexicontact.html.php'); 
	@unlink(JPATH_ROOT.'/administrator/components/com_flexicontact/toolbar.flexicontact.php'); 
	@unlink(JPATH_ROOT.'/administrator/components/com_flexicontact/admin.flexicontact.html.php');
	@unlink(JPATH_ROOT.'/components/com_flexicontact/flexicontact.html.php');
	@unlink(JPATH_ROOT.'/components/com_flexicontact/RL_flexicontact.html.php');
	@unlink(JPATH_SITE.'/administrator/components/com_flexicontact/joomla15.xml');
	@unlink(JPATH_SITE.'/administrator/components/com_flexicontact/joomla16.xml');
	@unlink(JPATH_SITE.'/administrator/components/com_flexicontact/install.flexicontact.php');
	@unlink(JPATH_SITE.'/components/com_flexicontact/views/responsive/view.html.php');  // leave the rest of the view so that old menu items still work
    @unlink(JPATH_SITE.'/components/com_flexicontact/error_log.txt');                   // clear this on install
	@unlink(JPATH_SITE.'/administrator/components/com_flexicontact/helpers/db_helper.php');
    
    self::deleteViews(array('help','log_list','log_detail','config_list','config_general','config_fields','config_text','config_template',
        'config_captcha','config_confirm','config_images','config_css'));

// we no longer install the responsive view, but if it is present, copy the default.xml from contact to responsive

    if (file_exists(JPATH_SITE.'/components/com_flexicontact/views/responsive/tmpl/default.xml'))
        copy(JPATH_SITE.'/components/com_flexicontact/views/contact/tmpl/default.xml', JPATH_SITE.'/components/com_flexicontact/views/responsive/tmpl/default.xml');

// we now install language files in the component directories, so must remove them from the system-wide directories, since those would take precedence

    $dirs = glob(JPATH_ADMINISTRATOR.'/language/*',GLOB_ONLYDIR);
    foreach ($dirs as $dir)
        {
        $sub_dir = basename($dir);
    	@unlink($dir.'/'.$sub_dir.'.com_flexicontact.ini');
    	@unlink($dir.'/'.$sub_dir.'.com_flexicontact.sys.ini');
        }

    $dirs = glob(JPATH_SITE.'/language/*',GLOB_ONLYDIR);
    foreach ($dirs as $dir)
        {
        $sub_dir = basename($dir);
    	@unlink($dir.'/'.$sub_dir.'.com_flexicontact.ini');
        }

// create the log table
// add new columns to the log table, in case the user is upgrading from an older version

	$this->_db = JFactory::getDBO();
	$this->create_log_table();
	$this->add_column('#__flexicontact_log', 'admin_email', "VARCHAR(60) NOT NULL DEFAULT '' AFTER `email`");
	$this->add_column('#__flexicontact_log', 'list_choice', "VARCHAR(60) DEFAULT NULL AFTER `browser_string`");
	$this->add_column('#__flexicontact_log', 'admin_from_email', "VARCHAR(60) DEFAULT NULL AFTER `admin_email`"); // 8.08
	$this->add_column('#__flexicontact_log', 'user_from_email', "VARCHAR(60) NOT NULL DEFAULT '' AFTER `admin_from_email`");		// 8.08
	$this->add_column('#__flexicontact_log', 'admin_reply_to_email', "VARCHAR(60) NOT NULL DEFAULT '' AFTER `user_from_email`");		// 8.08
	$this->add_column('#__flexicontact_log', 'config_show_copy', "TINYINT(4) NOT NULL DEFAULT '99' AFTER `message`");		// 8.08
	$this->add_column('#__flexicontact_log', 'show_copy', "TINYINT(4) NOT NULL DEFAULT '99' AFTER `config_show_copy`");		// 8.08

// if any of our image packs installed, delete the standard images that were just installed

    $filecount = 0;
    $files = glob(JPATH_ROOT.'/components/com_flexicontact/images/?_001.*',GLOB_NOSORT);
    if ($files)
        {
        foreach ($files as &$file)
            $file = basename($file);
        if ( (in_array('A_001.gif',$files)) or (in_array('C_001.png',$files)) or (in_array('D_001.png',$files)) or (in_array('E_001.png',$files)) )
            {
            for ($i = 1; $i <= 20; $i++)
                {
                $filename = '0'.sprintf("%02d",$i).'.gif';
                @unlink(JPATH_ROOT.'/components/com_flexicontact/images/'.$filename);
                }
            $app = JFactory::getApplication();
            $app->enqueueMessage("The default captcha images were not installed because one of the FlexiContact Themes is installed", 'message');
            }
        }
        
// we are done

    $app->enqueueMessage("Flexicontact version $component_version installed", 'message');
	return true;
}

//---------------------------------------------------------------
// Create the log table if it doesn't exist
//
function create_log_table()
{
	$query = "CREATE TABLE IF NOT EXISTS `#__flexicontact_log` (
				  `id` int(11) NOT NULL AUTO_INCREMENT,
				  `datetime` datetime NOT NULL,
				  `name` varchar(60) NOT NULL DEFAULT '',
				  `email` varchar(60) NOT NULL DEFAULT '',
				  `admin_email` varchar(60) NOT NULL DEFAULT '',
                  `admin_from_email` varchar(60) NOT NULL DEFAULT '',
                  `user_from_email` varchar(60) NOT NULL DEFAULT '',
                  `admin_reply_to_email` varchar(60) NOT NULL DEFAULT '',
				  `subject` varchar(100) NOT NULL DEFAULT '',
				  `message` text NOT NULL,
				  `config_show_copy` TINYINT(4) NOT NULL DEFAULT '99',
				  `show_copy` TINYINT(4) NOT NULL DEFAULT '99',
				  `status_main` varchar(255) NOT NULL DEFAULT '',
				  `status_copy` varchar(255) NOT NULL DEFAULT '',
				  `ip` varchar(40) NOT NULL DEFAULT '',
				  `browser_id` tinyint(4) NOT NULL DEFAULT '0',
				  `browser_string` varchar(20) NOT NULL DEFAULT '',
				  `list_choice` varchar(60) DEFAULT NULL,
				  `field1` varchar(100) DEFAULT NULL,
				  `field2` varchar(100) DEFAULT NULL,
				  `field3` varchar(100) DEFAULT NULL,
				  `field4` varchar(100) DEFAULT NULL,
				  `field5` varchar(100) DEFAULT NULL,
				  PRIMARY KEY (`id`),
				  KEY `DATETIME` (`datetime`)
				) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
				
	return $this->ladb_execute($query);
}

//-------------------------------------------------------------------------------
// Check whether a column exists in a table. Returns TRUE if exists, FALSE if it doesn't
//
function column_exists($table, $column)
{
	$fields = $this->_db->getTableColumns($table);
		
	if ($fields === null)
		return false;
		
	if (array_key_exists($column,$fields))
		return true;
	else
		return false;
}

//-------------------------------------------------------------------------------
// Add a column if it doesn't exist (the table must exist)
//
function add_column($table, $column, $details)
{
	if ($this->column_exists($table, $column))
		return;
	$query = 'ALTER TABLE `'.$table.'` ADD `'.$column.'` '.$details;;
	return $this->ladb_execute($query);
}

//-------------------------------------------------------------------------------
// Execute a SQL query and return true if it worked, false if it failed
//
function ladb_execute($query)
{
	try
		{
		$this->_db->setQuery($query);
		$this->_db->execute();
		}
	catch (RuntimeException $e)
		{
        $message = $e->getMessage();
    	$app = JFactory::getApplication();
        $app->enqueueMessage($message, 'error');
		return false;
		}
	return true;
}

//-------------------------------------------------------------------------------
// Delete one or more back end views
//
static function deleteViews($views)
{
    foreach ($views as $view)
        {
        @unlink(JPATH_SITE."/administrator/components/com_flexicontact/views/$view/index.html");
        @unlink(JPATH_SITE."/administrator/components/com_flexicontact/views/$view/view.html.php");
        @rmdir (JPATH_SITE."/administrator/components/com_flexicontact/views/$view");
        }
}

} // class
