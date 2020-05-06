<?php
/********************************************************************
Product		: Flexicontact
Date		: 28 January 2017
Copyright	: Les Arbres Design 2010-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

class Flexi_captcha
{

// -------------------------------------------------------------------------------
// Display the image captcha
// Builds a structure containing information about the test and stores it in the session
// Returns the description of the target image
//
static function show_image_captcha($config_data, $error)
{
	$html = '';
	
// get list of images in images directory

    $image_info = Flexicontact_Utility::get_captcha_image_path();
    
    $handle = opendir($image_info['path']);
	if (!$handle)
		{
		$html .= "Images directory not found";
		return;
		}
		
    $image_list = array();
	while (($filename = readdir($handle)) != false)
	    {
    	if ($filename == '.' or $filename == '..')
    		continue;
    	$imageInfo = @getimagesize($image_info['path'].'/'.$filename);
    	if ($imageInfo === false)
    		continue;				// not an image
    	if ($imageInfo[3] > 3)		// only support gif, jpg or png
    		continue;
    	if ($imageInfo[0] > 150)	// if X size > 150 pixels ..
    		continue;				// .. it's too big so skip it
    	$image = array();
    	$image['filename'] = $filename;
    	$image['width'] = $imageInfo[0];
    	$image['height'] = $imageInfo[1];
    	$image['type'] = $imageInfo[2];
    	$image_list[] = $image;
    	}
    closedir($handle);
    
    if (empty($image_list))
		{
		$html .= "No suitable images in images directory";
		return;
		}
		
	$imageCount = count($image_list);
	if ($imageCount < $config_data->num_images)
		{
		$html .= 'Not enough images in images directory. Requested: '.$config_data->num_images.' Found: '.$imageCount.'<br />';
		return;
		}

// load the Javascript

	$js= "function imageSelect(pictureID) {var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) if (images[i].className == 'fc_active') images[i].className = 'fc_inactive';
  document.getElementById(pictureID).className = 'fc_active'; document.getElementById('fc_picselected').value = pictureID; }\n";
	$doc = JFactory::getDocument();
	$doc->addScriptDeclaration($js);

// choose the images
	
	$i = 0;
	$randoms = array();
	while ($i < $config_data->num_images)
		{
		$imageNum = rand(0,$imageCount - 1);	// get a random number
		if (in_array($imageNum,$randoms))		// if already chosen
			continue;							// try again
		$randoms[] = $imageNum;					// add to random number array
		$i ++;									// got one more
		}

// build the captcha information structure

	$captcha_info = new stdClass();
	$captcha_info->num_images = $config_data->num_images;
	$captcha_info->images = array();

	for ($i = 0; $i < $config_data->num_images; $i++)
		{
		$j = $randoms[$i];						// index of the next chosen image
		$image = $image_list[$j];				// point to image info
		$captcha_info->images[$i] = $image;		// copy the image info array into the captcha_info structure
		}
		
// choose the target image and store it in the captcha_info structure
	
	$captcha_info->target = rand(0, $config_data->num_images - 1);
	$target_filename = $captcha_info->images[$captcha_info->target]['filename'];

// store the captcha_info structure in the session, and check it got stored correctly

	$app = JFactory::getApplication();
	$app->setUserState(LAFC_COMPONENT."_captcha_info", $captcha_info);
    $captcha_info_check = $app->getUserState(LAFC_COMPONENT."_captcha_info",'');
    if ($captcha_info_check == '')
        {
        $html = 'Cannot use image captcha because the Joomla session is not working correctly';
        return $html;
        }

// load the additional language file provided by our image packs

	$lang = JFactory::getLanguage();
	$lang->load('com_flexicontact_captcha', JPATH_SITE);

	$html .= "\n".'<div class="fc_line fc_images">';
	$html .= "\n".'<label class="fc_image_text">';
	
// get the description of the target image and make the user prompt
	
	$target_text = JText::_('COM_FLEXICONTACT_IMAGE_'.strtoupper($target_filename));
	$select_image_text = JText::_('COM_FLEXICONTACT_SELECT_IMAGE');
	if (strstr($select_image_text,"%s"))
		$html .= '<span class="fc_image_desc">'.JText::sprintf('COM_FLEXICONTACT_SELECT_IMAGE',$target_text).'</span>';
	else
		$html .= '<span class="fc_image_desc">'.$select_image_text.' '.$target_text.'</span>';
	$html .= "\n".'</label>';
		
// draw the chosen images

	$html .= '<div class="fc_image_inner">';
	foreach ($captcha_info->images as $index => $image)
		{
		$img_id = sprintf('fc_image_%03d', $index);
		$img_name = $image['filename'];
		$image_height = $image['height'];
		$image_width = $image['width'];
			
		if ($config_data->raw_images)
			$src = $image_info['url'].$img_name;
		else
			$src = JURI::root(true).'/index.php?option='.LAFC_COMPONENT.'&amp;tmpl=component&amp;format=raw&amp;lang=en&amp;task=image&amp;n='.$index.'&amp;r='.mt_rand();
		$imageHtml = '<img id="i_'.$img_id.'" src="'.$src.'" width="'.$image_width.'" height="'.$image_height.'" 
			alt="" class="fc_inactive" onclick="imageSelect('."'i_".$img_id."'".')" />';

		$html .= "\n".$imageHtml;
		}
	$html .= "\n".'</div>';
    
// do we have an error message?

	if ($error != '')
		$html .= "\n".$error;
		
	$html .= "\n".'<input type="hidden" name="picselected" id="fc_picselected" value="" />';
	$html .= "\n".'</div>';     // class="fc_line fc_images"
	return $html;
}

// -------------------------------------------------------------------------------
// Serve an image to the browser
//
static function show_image()
{
	$app = JFactory::getApplication();
	$captcha_info = $app->getUserState(LAFC_COMPONENT."_captcha_info",'');
	if ($captcha_info == NULL)
		return;							// the user has no session or it has timed out
	
	$jinput = JFactory::getApplication()->input;
	$image_number = $jinput->get('n', 0, 'INT');
	$filename = $captcha_info->images[$image_number]['filename'];
    $image_info = Flexicontact_Utility::get_captcha_image_path();
	$filepath = $image_info['path'].'/'.$filename;

// set the mime type

	switch ($captcha_info->images[$image_number]['type']) 
		{
		case 1:  
			$mimetype = 'image/gif';
			break;
		case 2:
			$mimetype = 'image/jpeg';
			break;
		case 3:
			$mimetype = 'image/png';
			break;
		default: return;
		}
		
	while (@ob_end_clean());
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	header("Last-Modified: ".gmdate("D, d M Y H:i:s") . "GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header("Content-Type: $mimetype");
	echo readfile($filepath);
	echo self::random_data();
	exit;
}

// -------------------------------------------------------------------------------
// Make some random data to vary the image file length
//
static function random_data()
{
	$str = '';
	$length = rand(0,200);
	for ($i = 0; $i < $length; $i++)
		$str .= chr(rand(0,255));
	return $str;
}

// -------------------------------------------------------------------------------
// Check if the user picked the correct image
// returns 0 for yes, the user picked the correct image
//         1 for no, the user picked the wrong image
//         2 if the user picked the wrong image more than 5 times
//
static function check($pic_selected)
{
	$app = JFactory::getApplication();
	$captcha_info = $app->getUserState(LAFC_COMPONENT."_captcha_info",'');
	if ($captcha_info == '')
		return 1;
	$target_img_id = sprintf('fc_image_%03d', $captcha_info->target);

	if (($pic_selected == '') or (strcmp($target_img_id,$pic_selected) != 0))
		{
		$retry_count = $app->getUserState(LAFC_COMPONENT."_captcha_retry_count",0);
		$retry_count ++;
		$app->setUserState(LAFC_COMPONENT."_captcha_retry_count", $retry_count);
		if ($retry_count <= 5)
			return 1;
		else
			return 2;
		}
	$app->setUserState(LAFC_COMPONENT."_captcha_info", '');	// destroy the session captcha info
	return 0;
}




}


