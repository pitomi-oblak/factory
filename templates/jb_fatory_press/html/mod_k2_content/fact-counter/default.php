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

            var_dump($item_n['value']);

        }
    endforeach;
endif;
?>

    <?php foreach ($items as $key => $item): ?>

        <?php if ($extraField->value != '' && $extraField->id == 11): ?>
            <div class="animated-number">
                <span class="count"><?php echo $extraField->value; ?></span>
            </div>
        <?php endif; ?>


    <?php endforeach; ?>