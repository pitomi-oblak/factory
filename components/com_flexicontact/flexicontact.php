<?php
/********************************************************************
Product		: Flexicontact
Date		: 2 June 2017
Copyright	: Les Arbres Design 2009-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

require_once JPATH_ADMINISTRATOR.'/components/com_flexicontact/helpers/flexicontact_helper.php';

// load our css

$document = JFactory::getDocument();
$document->addStyleSheet(LAFC_SITE_CSS_URL.'?'.filemtime(LAFC_SITE_CSS_PATH));

require_once( JPATH_SITE.'/components/com_flexicontact/controller.php' );
$controller = new FlexicontactController();

$jinput = JFactory::getApplication()->input;
$task = $jinput->get('task', '', 'STRING');

$controller->execute($task);

$controller->redirect();
