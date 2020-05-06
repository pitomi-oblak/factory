<?php
/**
 * @version    2.7.x
 * @package    K2
 * @author     JoomlaWorks http://www.joomlaworks.net
 * @copyright  Copyright (c) 2006 - 2016 JoomlaWorks Ltd. All rights reserved.
 * @license    GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

// no direct access
defined('_JEXEC') or die;

$fields = array();

if (count($items)):
    foreach ($items as $key => $item):
        foreach ($item->extra_fields as $value) {

            $item_n = array();

            $item_n['id'] = $value->id;

            $item_n['name'] = $value->name;

            $item_n['value'] = $value->value;

            $item_n['type'] = $value->type;

            $item_n['group'] = $value->group;

            $item_n['published'] = $value->published;

            $item_n['ordering'] = $value->ordering;

            $item_n['alias'] = $value->alias;

            $fields[$value->id] = $item_n;

        }
    endforeach;
endif;

?>

<div id="k2ModuleBox<?php echo $module->id; ?>"
     class="k2ItemsBlock<?php if ($params->get('moduleclass_sfx')) echo ' ' . $params->get('moduleclass_sfx'); ?>">
    <div class="contact-wrapper">
        <?php if ($fields["5"]["value"]): ?>
            <div class="address">
                <i class="flaticon-placeholder"></i>
                <h3><?php print $fields["5"]["value"]; ?></h3>
            </div>
        <?php endif; ?>
        <?php if ($fields["6"]["value"]): ?>
            <div class="phone">
                <i class="flaticon-technology"></i>
                <h3><?php print $fields["6"]["value"]; ?></h3>
            </div>
        <?php endif; ?>
        <?php if ($fields["7"]["value"]): ?>
            <div class="mail">
                <i class="flaticon-interface"></i>
                <h3><?php print $fields["7"]["value"]; ?></h3>
            </div>
        <?php endif; ?>
        <?php if (($fields["8"]["value"]) && ($fields["9"]["value"])): ?>
            <div class="working-hours">
                <i class="flaticon-time"></i>
                <h3><?php print $fields["8"]["value"]; ?></h3>
                <h3><?php print $fields["9"]["value"]; ?></h3>
            </div>
        <?php elseif ($fields["8"]["value"]) : ?>
            <div class="working-hours">
                <i class="flaticon-time"></i>
                <h3><?php print $fields["8"]["value"]; ?></h3>
            </div>
        <?php else : ?>
            <div class="working-hours">
                <i class="flaticon-time"></i>
                <h3><?php print $fields["9"]["value"]; ?></h3>
            </div>
        <?php endif; ?>
    </div>
</div>
