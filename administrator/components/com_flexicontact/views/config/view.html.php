<?php
/********************************************************************
Product	   : Flexicontact
Date       : 6 February 2017
Copyright  : Les Arbres Design 2009-2017
Contact	   : http://www.lesarbresdesign.info
Licence	   : GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted access');

class FlexicontactViewConfig extends JViewLegacy
{
function display($tpl = null)
{
	Flexicontact_Utility::viewStart();
	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIGURATION'), 'flexicontact.png');
	if (JFactory::getUser()->authorise('core.admin', 'com_flexicontact'))
		JToolBarHelper::preferences('com_flexicontact');

// Set up the configuration links

	$config_table = array(
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_form&param1=config_general',
			'icon' => 'config_general.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_GENERAL_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_GENERAL_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_text&param1=admin_template',
			'icon' => 'config_email_a.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_ADMIN_EMAIL_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_ADMIN_EMAIL_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_text&param1=user_template',
			'icon' => 'config_email_u.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_USER_EMAIL_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_USER_EMAIL_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_text&param1=confirm_text',
			'icon' => 'config_text.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_CONFIRM_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_CONFIRM_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_form&param1=config_fields',
			'icon' => 'config_fields.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_FIELDS_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_FIELDS_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_text&param1=page_text',
			'icon' => 'config_text_top.gif',
			'name' => 'COM_FLEXICONTACT_V_TOP_TEXT',
			'desc' => 'COM_FLEXICONTACT_CONFIG_TOP_BOTTOM_TEXT_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_text&param1=bottom_text',
			'icon' => 'config_text_bottom.gif',
			'name' => 'COM_FLEXICONTACT_V_BOTTOM_TEXT',
			'desc' => 'COM_FLEXICONTACT_CONFIG_TOP_BOTTOM_TEXT_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_form&param1=config_captcha',
			'icon' => 'config_captcha.gif',
			'name' => 'COM_FLEXICONTACT_CAPTCHA_CONFIG',
			'desc' => 'COM_FLEXICONTACT_CAPTCHA_CONFIG_DESC'),
		array(
			'link' => LAFC_COMPONENT_LINK.'&task=config&function=edit_css',
			'icon' => 'config_css.gif',
			'name' => 'COM_FLEXICONTACT_CONFIG_CSS_NAME',
			'desc' => 'COM_FLEXICONTACT_CONFIG_CSS_DESC')
		);

    $this->form();

	echo '<table class="table table-striped"><thead><tr>';
	echo '<th style="width:5%;"></th>';
	echo '<th style="width:20%; white-space:nowrap;">'.JText::_('COM_FLEXICONTACT_CONFIG_NAME').'</th>';
	echo '<th style="width:75%; white-space:nowrap;">'.JText::_('COM_FLEXICONTACT_CONFIG_DESC').'</th>';
	echo '</tr></thead>';

	foreach ($config_table as $config)
		{
		$icon = '<img src="'.LAFC_ADMIN_ASSETS_URL.$config['icon'].'" alt="" />';
		echo "<tr>
				<td>$icon</td>
				<td>".JHTML::link($config['link'], JText::_($config['name']))."</td>
				<td>".JText::_($config['desc'])."</td>
			</tr>";
		}
	echo '</table></form>';
	Flexicontact_Utility::viewEnd();
}

//-------------------------------------------------------------------------------
// Handle form-based config pages
//
function edit_form()
{
	Flexicontact_Utility::viewStart();
	$param1 = $this->param1;
	if ($param1 == 'config_general')
    	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_GENERAL_NAME'), 'flexicontact.png');
	if ($param1 == 'config_fields')
    	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_FIELDS_NAME'), 'flexicontact.png');
	if ($param1 == 'config_captcha')
    	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CAPTCHA_CONFIG'), 'flexicontact.png');
	JToolBarHelper::apply();
	JToolBarHelper::save();
	JToolBarHelper::cancel();
    
    $this->form();

	JForm::addFieldPath(JPATH_ROOT.'/administrator/components/com_flexicontact/forms');
	$form = JForm::getInstance($param1, JPATH_ROOT.'/administrator/components/com_flexicontact/forms/'.$param1.'.xml');
	$field_sets = $form->getFieldsets();
	foreach ($field_sets as $fieldset_name => $fieldset)	
        echo self::renderFieldSet($form, $fieldset, $this->config_data);

	echo '</form>';
	Flexicontact_Utility::viewEnd();
}

//-------------------------------------------------------------------------------
// Edit text with the wysiwyg editor
//
function edit_text()
{
	Flexicontact_Utility::viewStart();
	$param1 = $this->param1;			// param1 is the field name
	if ($param1 == 'user_template')
		JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_USER_EMAIL_NAME'), 'flexicontact.png');
	if ($param1 == 'admin_template')
		JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_ADMIN_EMAIL_NAME'), 'flexicontact.png');
	if ($param1 == 'confirm_text')
    	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_CONFIRM_NAME'), 'flexicontact.png');
	if ($param1 == 'page_text')
		JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_V_TOP_TEXT'), 'flexicontact.png');
	if ($param1 == 'bottom_text')
		JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_V_BOTTOM_TEXT'), 'flexicontact.png');

	JToolBarHelper::apply();
	JToolBarHelper::save();
	JToolBarHelper::cancel();

    $this->form();
    
	if ($param1 == 'confirm_text')
        {
        echo "\n<div><strong>".JText::_('COM_FLEXICONTACT_LINK').'</strong>';
        echo ' <input type="text" size="60" name="confirm_link" value="'.$this->config_data->confirm_link.'" /> ';
        echo Flexicontact_Utility::make_info(JText::_('COM_FLEXICONTACT_CONFIRM_LINK_DESC'));
        if ($this->config_data->confirm_link)
            {
            $link = strtolower($this->config_data->confirm_link);
            if (substr($link,0,4) != 'http')
                $link = JURI::root().$link;            
            $onclick = 'onclick="window.open('."'".$link."', 'fccl', 'width=640,height=480,scrollbars=1,location=0,menubar=0,resizable=1'); return false;".'"';
            echo ' <button class="btn btn-info"'.$onclick.'>'.JText::_('JGLOBAL_PREVIEW').'</button>';
            }
        echo '</div><br />';
        }
    
    echo '<fieldset class="lad-fieldset" style="max-width:60%">';
	$editor = JFactory::getEditor();
	echo "\n".$editor->display($param1, htmlspecialchars($this->config_data->$param1, ENT_QUOTES),'98%','300px','70','20',array('pagebreak', 'readmore', 'article', 'module'));
	echo "\n".'</fieldset>';

    if ( ($param1 != 'page_text') and ($param1 != 'bottom_text') )
        {
        echo "\n".'<fieldset class="lad-fieldset lad-border width-auto" style="max-width:30%">';
	    echo '<legend>'.JText::_('COM_FLEXICONTACT_VARIABLES').'</legend>';
    	echo self::make_key_table();
        echo '</fieldset>';
        }
    
    echo "\n</form>";
    
	Flexicontact_Utility::viewEnd();
}

//-------------------------------------------------------------------------------
// Create the Variables Key Table
//
static function make_key_table()
{
    JHtml::_('bootstrap.tooltip');
    $js= "function fc_add(tag)
        {var tt=document.createElement('textarea'); tt.id='tt'; tt.style.height=0; document.body.appendChild(tt);
         tt.value=tag.innerHTML; document.getElementById('tt').select(); document.execCommand('copy'); document.body.removeChild(tt); };\n";
	$doc = JFactory::getDocument();
	$doc->addScriptDeclaration($js);
    
    $keys = array(
        LAFC_T_FROM_NAME => JText::_('COM_FLEXICONTACT_NAME'),
        LAFC_T_FROM_EMAIL => JText::_('COM_FLEXICONTACT_EMAIL'),
        LAFC_T_MESSAGE_PROMPT => JText::_('COM_FLEXICONTACT_MESSAGE').' '.JText::_('COM_FLEXICONTACT_V_PROMPT'),
        LAFC_T_MESSAGE_DATA => JText::_('COM_FLEXICONTACT_MESSAGE').' '.JText::_('COM_FLEXICONTACT_DATA'),
        LAFC_T_SUBJECT => JText::_('COM_FLEXICONTACT_ADMIN_SUBJECT'),
        LAFC_T_LIST_PROMPT => JText::_('COM_FLEXICONTACT_LIST').' '.JText::_('COM_FLEXICONTACT_V_PROMPT'),
        LAFC_T_LIST_DATA => JText::_('COM_FLEXICONTACT_LIST').' '.JText::_('COM_FLEXICONTACT_DATA'),
        LAFC_T_FIELD1_PROMPT => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_V_PROMPT').' 1',
        LAFC_T_FIELD1_DATA => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_DATA').' 1',
        LAFC_T_FIELD2_PROMPT => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_V_PROMPT').' 2',
        LAFC_T_FIELD2_DATA => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_DATA').' 2',
        LAFC_T_FIELD3_PROMPT => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_V_PROMPT').' 3',
        LAFC_T_FIELD3_DATA => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_DATA').' 3',
        LAFC_T_FIELD4_PROMPT => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_V_PROMPT').' 4',
        LAFC_T_FIELD4_DATA => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_DATA').' 4',
        LAFC_T_FIELD5_PROMPT => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_V_PROMPT').' 5',
        LAFC_T_FIELD5_DATA => JText::_('COM_FLEXICONTACT_FIELD').' '.JText::_('COM_FLEXICONTACT_DATA').' 5',
        LAFC_T_BROWSER => JText::_('COM_FLEXICONTACT_BROWSER'),
        LAFC_T_IP_ADDRESS => JText::_('COM_FLEXICONTACT_IP_ADDRESS')
        );
    
	$keytable = '<table class="table table-striped table-bordered table-condensed width-auto">';
    foreach ($keys as $key => $value)
        $keytable .= '<tr><td><span onclick="fc_add(this)" class="hasTooltip lad-key" title="'.JText::_('JGLOBAL_COPY').'">'.$key.'</span></td><td>'.$value.'</td></tr>';

	$keytable .= '</table>';
    return $keytable;
}

//-------------------------------------------------------------------------------
// Edit the front end CSS file
//
function edit_css()
{
	JToolBarHelper::title(LAFC_COMPONENT_NAME.': '.JText::_('COM_FLEXICONTACT_CONFIG_CSS_NAME'), 'flexicontact.png');
	JToolBarHelper::apply('apply_css');
	JToolBarHelper::save('save_css');
	JToolBarHelper::cancel();
	
	if (!file_exists(LAFC_SITE_CSS_PATH)) 
		{ 
		$app = JFactory::getApplication();
		$app->redirect(LAFC_COMPONENT_LINK.'&task=config',
			JText::_('COM_FLEXICONTACT_CSS_MISSING').' ('.LAFC_SITE_CSS_PATH.')', 'error');
		return;
		}
		
	if (!is_readable(LAFC_SITE_CSS_PATH)) 
		{ 
		$app = JFactory::getApplication();
		$app->redirect(LAFC_COMPONENT_LINK.'&task=config',
			JText::_('COM_FLEXICONTACT_CSS_NOT_READABLE').' ('.LAFC_SITE_CSS_PATH.')', 'error'); 
		return;
		}

	if (!is_writable(LAFC_SITE_CSS_PATH)) 
		{ 
		$app = JFactory::getApplication();
		$app->redirect(LAFC_COMPONENT_LINK.'&task=config',
			JText::_('COM_FLEXICONTACT_CSS_NOT_WRITEABLE').' ('.LAFC_SITE_CSS_PATH.')', 'error'); 
		return;
		}
		
	$css_contents = @file_get_contents(LAFC_SITE_CSS_PATH);

	Flexicontact_Utility::viewStart();

    $this->form();
	
	echo '<table><tr><td>';
	echo '<textarea name="css_contents" rows="25" cols="125" class="width-auto">'.$css_contents.'</textarea>';
	echo '</td><td style="vertical-align:top;">';
	echo Flexicontact_Utility::make_info('www.w3schools.com/css','http://www.w3schools.com/css/default.asp');
	echo '</td></tr></table></form>';

	Flexicontact_Utility::viewEnd();
}

//-------------------------------------------------------------------------------
// Output the form common to all config pages
//
function form()
{
	echo '<form action="index.php" method="post" name="adminForm" id="adminForm" class="form-horizontal form-inline">';
	echo '<input type="hidden" name="option" value="com_flexicontact" />';
	echo '<input type="hidden" name="task" value="" />';
	echo '<input type="hidden" name="function" value="'.$this->function.'" />';
	echo '<input type="hidden" name="param1" value="'.$this->param1.'" />';
}

//---------------------------------------------------------------------------------------------
// Render a JForm with the possibility of fields side-by-side
// This function also supports our info and link buttons
// and the 'data_field' attribute can override the field name usedto initialise the data
//
// for simple lines: 
//		<div class="form-group">
//      	<label>..</label><input>
//      </div>
//
// for lines with multiple fields: 
//		<div class="form-group">
//      	<label>..</label><input>
//      	<span class="lad-inline"><label>..</label><input></span>
//      	<span class="lad-inline"><label>..</label><input></span>
//      </div>
////
static function renderFieldSet($form, $fieldset, $data)
{
    if (isset($fieldset->class))
        $html = '<fieldset class="'.$fieldset->class.'">';
    else
        $html = '<fieldset>';
    if ($fieldset->label != '')
        $html .= '<legend>'.JText::_($fieldset->label).'</legend>';
    
    $fields = $form->getFieldset($fieldset->name);
    $div_open = false;
    foreach ($fields as $field)
        {
        $field_name = $field->name;					                            // get the field name 
        $field_class = $form->getFieldAttribute($field_name,'class','');		// and class
		$data_field_name = $form->getFieldAttribute($field_name, 'data_field', $field_name);

        if (isset($data->$data_field_name))		                                // set the value
            $form->setValue($field_name, null, $data->$data_field_name);

        if ($field->hidden)							                            // if it's a hidden field
            {
            $html .= $form->getInput($field_name);	                            // draw the field itself
            continue;								                            // .. and nothing else
            }

        if (strstr($field_class,'lad-inline'))
            $html .= "\n".'<span class="'.$field_class.'">';
        else
            {
            if ($div_open)
                $html .= "\n".'</div>';
            $html .= "\n".'<div class="'.$field_class.'">';
            $div_open = true;
            }

        $html .= "\n".$form->getLabel($field_name);			// draw the label
        $html .= "\n".$form->getInput($field_name);	
        $desc = $form->getFieldAttribute($field_name,'desc','');
        $link = $form->getFieldAttribute($field_name,'link','');
        if ($desc != '')
            $html .= ' '.Flexicontact_Utility::make_info(JText::_($desc),$link);

        if (strstr($field_class,'lad-inline'))
            $html .= "\n".'</span>';
        }

    if ($div_open)				    // no more fields in this fieldset but we might have ended on an inline field
        $html .= "\n".'</div>';		// so must finish the div
    $html .= '</fieldset>';
    return $html;
}


}