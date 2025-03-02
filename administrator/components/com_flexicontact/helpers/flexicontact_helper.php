<?php
/********************************************************************
Product		: Flexicontact
Date		: 28 January 2017
Copyright	: Les Arbres Design 2010-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

define("LAFC_COMPONENT",      "com_flexicontact");
define("LAFC_COMPONENT_NAME", "FlexiContact");
define("LAFC_COMPONENT_LINK", "index.php?option=".LAFC_COMPONENT);
define("LAFC_ADMIN_ASSETS_URL",  JURI::root(true).'/administrator/components/'.LAFC_COMPONENT.'/assets/');
define("LAFC_SITE_CSS_PATH",     JPATH_SITE.'/components/com_flexicontact/assets/com_flexicontact.css');
define("LAFC_SITE_CSS_URL",      JURI::root(true).'/components/com_flexicontact/assets/com_flexicontact.css');
define("LAFC_HELPER_PATH",       JPATH_ROOT.'/administrator/components/com_flexicontact/helpers');

// email merge variables

define("LAFC_T_FROM_NAME",     "%V_FROM_NAME%");
define("LAFC_T_FROM_EMAIL",    "%V_FROM_EMAIL%");
define("LAFC_T_SUBJECT",       "%V_SUBJECT%");
define("LAFC_T_MESSAGE_PROMPT","%V_MESSAGE_PROMPT%");
define("LAFC_T_MESSAGE_DATA",  "%V_MESSAGE_DATA%");
define("LAFC_T_LIST_PROMPT",   "%V_LIST_PROMPT%");
define("LAFC_T_LIST_DATA",     "%V_LIST_DATA%");
define("LAFC_T_FIELD1_PROMPT", "%V_FIELD1_PROMPT%");
define("LAFC_T_FIELD1_DATA",   "%V_FIELD1_DATA%");
define("LAFC_T_FIELD2_PROMPT", "%V_FIELD2_PROMPT%");
define("LAFC_T_FIELD2_DATA",   "%V_FIELD2_DATA%");
define("LAFC_T_FIELD3_PROMPT", "%V_FIELD3_PROMPT%");
define("LAFC_T_FIELD3_DATA",   "%V_FIELD3_DATA%");
define("LAFC_T_FIELD4_PROMPT", "%V_FIELD4_PROMPT%");
define("LAFC_T_FIELD4_DATA",   "%V_FIELD4_DATA%");
define("LAFC_T_FIELD5_PROMPT", "%V_FIELD5_PROMPT%");
define("LAFC_T_FIELD5_DATA",   "%V_FIELD5_DATA%");
define("LAFC_T_BROWSER",       "%V_BROWSER%");
define("LAFC_T_IP_ADDRESS",    "%V_IP_ADDRESS%");

// log date filters

define("LAFC_LOG_ALL", 0);					// report filters
define("LAFC_LOG_LAST_7_DAYS", 1);
define("LAFC_LOG_LAST_28_DAYS", 2);
define("LAFC_LOG_LAST_12_MONTHS", 3);

// copy me

define("LAFC_COPYME_NEVER", 0);				// never copy the user
define("LAFC_COPYME_CHECKBOX", 1);			// show the checkbox on the contact form
define("LAFC_COPYME_ALWAYS", 2);			// always copy the user

// Themes

define("THEME_ALL", 'all');
define("THEME_STANDARD", 'standard');
define("THEME_TOYS", 'toys');
define("THEME_NEON", 'neon');
define("THEME_WHITE", 'white');
define("THEME_BLACK", 'black');

class Flexicontact_Utility
{

// -------------------------------------------------------------------------------
// Draw the top menu and make the current item active
//
static function addSubMenu($submenu = '')
{
    JHtmlSidebar::addEntry(JText::_('COM_FLEXICONTACT_CONFIGURATION'), 'index.php?option='.LAFC_COMPONENT.'&task=config', $submenu == 'config');
    JHtmlSidebar::addEntry(JText::_('COM_FLEXICONTACT_CAPTCHA_IMAGES'), 'index.php?option='.LAFC_COMPONENT.'&task=images', $submenu == 'images');
    JHtmlSidebar::addEntry(JText::_('COM_FLEXICONTACT_LOG'), 'index.php?option='.LAFC_COMPONENT.'&task=log_list', $submenu == 'log');
    JHtmlSidebar::addEntry(JText::_('COM_FLEXICONTACT_ABOUT'), 'index.php?option='.LAFC_COMPONENT.'&task=about', $submenu == 'about');
}
  
// -------------------------------------------------------------------------------
// Draw the component menu for >= Joomla 3.x
// - this must be called at the start of every view
//
static function viewStart()
{
	$sidebar = JHtmlSidebar::render();
	if (empty($sidebar))
		echo '<div id="j-main-container">';
	else
		{
		echo '<div id="j-sidebar-container" class="span2">';
		echo "$sidebar";
		echo "</div>";
		echo '<div id="j-main-container" class="span10">';
		}
}

// -------------------------------------------------------------------------------
// This must be called at the end of every view that calls viewStart()
//
static function viewEnd()
{
	echo "</div>";
}

//-------------------------------------------------------------------------------
// Make a pair of boolean radio buttons
// $name          : Field name
// $current_value : Current value (boolean)
//
static function make_radio($name,$current_value)
{
	$html = '';
	if ($current_value == 1)
		{
		$yes_checked = 'checked="checked" ';
		$no_checked = '';
		}
	else
		{
		$yes_checked = '';
		$no_checked = 'checked="checked" ';
		}
	$html .= ' <input type="radio" name="'.$name.'" value="1" '.$yes_checked.' /> '.JText::_('COM_FLEXICONTACT_V_YES')."\n";
	$html .= ' <input type="radio" name="'.$name.'" value="0" '.$no_checked.' /> '.JText::_('COM_FLEXICONTACT_V_NO')."\n";
	return $html;
}

//-------------------------------------------------------------------------------
// Make a select list
// $name          : Field name
// $current_value : Current value
// $list          : Array of ID => value items
// $first         : ID of first item to be placed in the list
// $extra         : Javascript or styling to be added to <select> tag
//
static function make_list($name, $current_value, &$items, $first = 0, $extra='')
{
	$html = "\n".'<select name="'.$name.'" id="'.$name.'" class="input" size="1" '.$extra.'>';
	if ($items == null)
		return '';
	foreach ($items as $key => $value)
		{
		if (strncmp($key,"OPTGROUP_START",14) == 0)
			{
			$html .= "\n".'<optgroup label="'.$value.'">';
			continue;
			}
		if (strncmp($key,"OPTGROUP_END",12) == 0)
			{
			$html .= "\n".'</optgroup>';
			continue;
			}
		if ($key < $first)					// skip unwanted entries
			{
			continue;
			}
		$selected = '';

		if ($current_value == $key)
			$selected = ' selected="selected"';
		$html .= "\n".'<option value="'.$key.'"'.$selected.'>'.$value.'</option>';
		}
	$html .= '</select>'."\n";

	return $html;
}

//-------------------------------------------------------------------------------
// Make an info button
//
static function make_info($title, $link='')
{
	JHtml::_('bootstrap.tooltip');
	if ($link == '')
		{
		$icon_name = 'info-16.png';
		$html = '';
		}
	else
		{
		$icon_name = 'link-16.png';
		$html = '<a href="'.$link.'" target="_blank">';
		}

	$icon = '<img src="'.LAFC_ADMIN_ASSETS_URL.$icon_name.'" alt="" />';
	$html .= '<span class="hasTooltip" title="'.htmlspecialchars($title, ENT_COMPAT, 'UTF-8').'">'.$icon.'</span>';
		
	if ($link != '')
		$html .= '</a>';
		
	return $html;
}

//---------------------------------------------------------------------------------------------
// get the path and url location of the captcha images
//
static function get_captcha_image_path()
{
    $image_info = array();
    if (is_dir(JPATH_SITE.'/media/com_flexicontact/images'))
        {
        $image_info['path'] = JPATH_SITE.'/media/com_flexicontact/images';
        $image_info['url'] = JURI::root(true).'/media/com_flexicontact/images/';
        }
    else
        {
        $image_info['path'] = JPATH_SITE.'/components/com_flexicontact/images';
        $image_info['url'] = JURI::root(true).'/components/com_flexicontact/images/';
        }
    return $image_info;
}

static function log_error($data)
{
    @file_put_contents(JPATH_SITE.'/components/com_flexicontact/error_log.txt', date("d/m/y H:i").' '.$data."\n",FILE_APPEND);
}


}



