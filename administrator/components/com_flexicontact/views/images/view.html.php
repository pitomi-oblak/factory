<?php
/********************************************************************
Product		: Flexicontact
Date		: 2 June 2017
Copyright	: Les Arbres Design 2010-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

class FlexicontactViewImages extends JViewLegacy
{
function display($tpl = null)
{
	Flexicontact_Utility::viewStart();
	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CAPTCHA_IMAGES'), 'flexicontact.png');
	JToolBarHelper::deleteList('','delete_image');
	JToolBarHelper::cancel();
	
// Make the themes filter

	$app = JFactory::getApplication();
	$filter_theme = $app->getUserStateFromRequest(LAFC_COMPONENT.'.filter_theme','filter_theme', THEME_ALL,'word');

    $theme_list = array();
	$theme_list[THEME_ALL] = ucfirst(JText::_('JALL'));
	$theme_list[THEME_STANDARD] = 'Standard';
	$theme_list[THEME_TOYS] = 'Toys';
	$theme_list[THEME_NEON] = 'Neon';
	$theme_list[THEME_WHITE] = 'White Tiles';
	$theme_list[THEME_BLACK] = 'Black Tiles';
	$theme_list_html = Flexicontact_Utility::make_list('filter_theme', $filter_theme, $theme_list, 0, 'onchange="this.form.task.value=\'images\';submitform();"');
	
// load the front end Flexicontact language file for the current language

	$lang = JFactory::getLanguage();
	$language = $lang->get('tag');
	if (file_exists(JPATH_SITE.'/language/'.$language.'/'.$language.'.com_flexicontact_captcha.ini'))
		$lang->load('com_flexicontact_captcha', JPATH_SITE);	// 3rd parameter could specify language
	else
		$lang->load('com_flexicontact', JPATH_SITE.'/components/com_flexicontact');

    $image_info = Flexicontact_Utility::get_captcha_image_path();

// get an array of filenames
	
    $imageFiles = array();					// create array
    $handle = opendir($image_info['path']);
	if (!$handle)
		{
		echo JText::_('COM_FLEXICONTACT_NO_IMAGES_DIRECTORY');
		Flexicontact_Utility::viewEnd();
		return;
		}
		
	while (($filename = readdir($handle)) != false)
		{
			if ($filename == '.' or $filename == '..')
				continue;
			$imageInfo = @getimagesize($image_info['path'].'/'.$filename);
			if ($imageInfo === false)
				continue;					// not an image
			if ($imageInfo[3] > 3)			// only support gif, jpg or png
				continue;
			if ($imageInfo[0] > 150)		// if X size > 150 pixels ..
				continue;					// .. it's too big so skip it
				
			// Do we display it?
			$prefix = substr($filename, 0, 2);
			
			switch ($filter_theme)
				{
				case THEME_ALL:
					$imageFiles[] = $filename;
					break;
				case THEME_STANDARD:
					if (substr($prefix, 0, 1) == '0')
						$imageFiles[] = $filename;
					break;
				case THEME_TOYS:
					if ($prefix == 'A_' or $prefix == 'B_')
						$imageFiles[] = $filename;
					break;
				case THEME_NEON:
					if ($prefix == 'C_')
						$imageFiles[] = $filename;
					break;
				case THEME_WHITE:
					if ($prefix == 'D_')
						$imageFiles[] = $filename;
					break;
				case THEME_BLACK:
					if ($prefix == 'E_')
						$imageFiles[] = $filename;
					break;
					
				}
   		}
    closedir($handle);
    if (empty($imageFiles) and $filter_theme == THEME_ALL)
		{
		echo JText::_('COM_FLEXICONTACT_NO_IMAGES');
		Flexicontact_Utility::viewEnd();
		return;
		}
    $image_count = count($imageFiles);
	sort($imageFiles);

// start the form

	echo '<form action="index.php" method="post" name="adminForm" id="adminForm" >';
	echo '<input type="hidden" name="option" value="com_flexicontact" />';
	echo '<input type="hidden" name="task" value="" />';
	echo '<input type="hidden" name="boxchecked" value="0" />';
	echo '<input type="hidden" name="hidemainmenu" value="0" />';
	
// filters

	echo "\n".'<div>'.$theme_list_html.' '.$image_count.' '.JText::_('COM_FLEXICONTACT_IMAGES');
	echo ' <input type="checkbox" name="toggle" value="" style="vertical-align:baseline;" onclick="Joomla.checkAll(this);" /></div>';
    echo '<div style="margin-top:10px;"></div>';

// draw the images
	
	$i = 0;
	foreach ($imageFiles as $filename)
		{
		$imageInfo = getimagesize($image_info['path'].'/'.$filename);
		if ($imageInfo !== false)
			{
			$imageX = $imageInfo[0];
			$imageY = $imageInfo[1];
			}
		
		$text_name = 'COM_FLEXICONTACT_IMAGE_'.strtoupper($filename);
		$description = JText::_($text_name);	// resolved by front end language file
		if ($text_name == $description)			// highlight if not resolved
			$description = '<span style="color: red">'.$description.'</span>';
		
		echo "\n".'<div style="display:inline-block;width:190px;border:1px solid gray;margin:1px;padding:5px;word-wrap:break-word;">';
		echo "\n".'<img src="'.$image_info['url'].$filename.'" alt="" style="float:left; border:none; margin:0 5px 0 0;"/>';
		echo "\n".'<b>'.utf8_encode($filename).'</b><br />';
		echo $description.'<br />';
		echo $imageX.'x'.$imageY.'<br />';
		echo "\n".JHTML::_('grid.id',   $i++, $filename);
		echo '</div>';
		}

	echo '</form>';
	Flexicontact_Utility::viewEnd();
}

}