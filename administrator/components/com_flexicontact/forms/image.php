<?php
/********************************************************************
Product		: Flexicontact
Date		: 2 June 2017
Copyright	: Les Arbres Design 2010-2017
Contact		: http://www.lesarbresdesign.info
Licence		: GNU General Public License
*********************************************************************/
defined('_JEXEC') or die('Restricted Access');

require_once JPATH_ADMINISTRATOR.'/components/com_flexicontact/helpers/flexicontact_helper.php';

class JFormFieldImage extends JFormField
{
protected $type = 'Image';

protected function getLabel()
{
    return '';
}

protected function getInput()
{
	if (empty($this->element['value']))
        return '';
    return '<img src="'.LAFC_ADMIN_ASSETS_URL.$this->element['value'].'" alt="" />';
}


}
