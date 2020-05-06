<?php
/********************************************************************
Product		: FlexicontactPlus
Date		: 2 June 2017
Copyright	: Les Arbres Design 2010-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

class FlexicontactController extends JControllerLegacy
{
function __construct()
{
	parent::__construct();
	$this->registerTask('save', 'apply');
	$this->registerTask('save_css', 'apply_css');
    $this->jinput = JFactory::getApplication()->input;
}

function config($cachable = false, $urlparams = false)
{
	Flexicontact_Utility::addSubMenu('config');
	$function = $this->jinput->get('function', 'display', 'STRING');
	$param1 = $this->jinput->get('param1', '', 'STRING');
	$view = $this->getView('config', 'html');
    $config_model = $this->getModel('config');
    $config_data = $config_model->getData();
    $view->function = $function;
    $view->config_data = $config_data;          // not all functions need this but never mind
    $view->param1 = $param1;                    // not all functions need this but never mind
	$view->$function();
}

function apply()									        // save changes to the component config
{	
	$task = $this->jinput->get('task', '', 'STRING');		// 'save' or 'apply'
	$function = $this->jinput->get('function', '', 'STRING');
	$param1 = $this->jinput->get('param1', '', 'STRING');
	$config_model = $this->getModel('config');
	$stored = $config_model->store($function, $param1);
	
	if ($stored)
		{
        if ($task == 'apply')
            $this->setRedirect(LAFC_COMPONENT_LINK."&task=config&function=$function&param1=$param1",JText::_('COM_FLEXICONTACT_SAVED'));
        else
            $this->setRedirect(LAFC_COMPONENT_LINK."&task=config",JText::_('COM_FLEXICONTACT_SAVED'));
        }
    else
        $this->config();
        
}   

function apply_css()								        // save changes to front end css
{
	$task = $this->jinput->get('task', '', 'STRING');		// 'save_css' or 'apply_css'
	$css_contents = $_POST['css_contents'];
	if (strlen($css_contents) == 0)
		$this->setRedirect(LAFC_COMPONENT_LINK."&task=config");
	$css_path = JPATH_SITE.'/components/com_flexicontact/assets/com_flexicontact.css';
	$length_written = file_put_contents ($css_path, $css_contents);
	if ($length_written == 0)
		$msg = JText::_('COM_FLEXICONTACT_NOT_SAVED');
	else
		$msg = JText::_('COM_FLEXICONTACT_SAVED');
	if ($task == 'apply_css')
		$this->setRedirect(LAFC_COMPONENT_LINK."&task=config&function=edit_css",$msg);
	else
		$this->setRedirect(LAFC_COMPONENT_LINK."&task=config",$msg);
}

function images()
{
	Flexicontact_Utility::addSubMenu('images');
	$view = $this->getView('images', 'html');
	$view->display();
}

function delete_image()
{
	$cids = $this->jinput->get('cid', array(0), 'ARRAY');
    $image_info = Flexicontact_Utility::get_captcha_image_path();
	foreach ($cids as $file_name)
		@unlink($image_info['path'].'/'.$file_name);
	$this->setRedirect(LAFC_COMPONENT_LINK."&task=images");
}

function log_list()
{
	Flexicontact_Utility::addSubMenu('log');
	$view = $this->getView('log', 'html');
	
	$config_model = $this->getModel('config');
	$config_data = $config_model->getData();

	$logging = (isset($config_data->logging)) ? $config_data->logging : 0;
	$view->logging = $logging;
	
	$log_model = $this->getModel('log');
	$log_list = $log_model->getList();
	$view->log_list = $log_list;
	
	$pagination = $log_model->getPagination();
	$view->pagination =	$pagination;
	
	$view->display();
}

function log_detail()
{
	Flexicontact_Utility::addSubMenu('log');
	$view = $this->getView('log', 'html');

	$id = $this->jinput->get('id', '', 'INT');
	$log_model = $this->getModel('log');
	$log_data = $log_model->getOne($id);
	$view->log_data = $log_data;

	$config_model = $this->getModel('config');
	$config_data = $config_model->getData();
	$view->config_data = $config_data;

	$view->edit();
}

function delete_log()
{
	$log_model = $this->getModel('log');
	$cids = $this->jinput->get('cid', array(0), 'ARRAY');
	foreach ($cids as $id)
		$log_model->delete($id);
	$this->setRedirect(LAFC_COMPONENT_LINK."&task=log_list");
}

function cancel()
{
	$this->setRedirect(LAFC_COMPONENT_LINK."&task=config");
}

function about()
{
	Flexicontact_Utility::addSubMenu('about');
	$view = $this->getView('about', 'html');
	$view->display();
}


}
