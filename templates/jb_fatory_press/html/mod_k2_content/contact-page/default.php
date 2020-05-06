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

<div class="row flex-parent">
    <?php if ($fields["5"]["value"]): ?>
        <div class="col-xs-12 flex-chiled">
            <div class="single-contact-info">
                <div class="icon-box">
                    <div class="box">
                        <i class="flaticon-placeholder"></i>
                    </div>
                </div>
                <div class="text-box">
                    <h3><?php print $fields["5"]["name"]; ?></h3>
                    <p><?php print $fields["5"]["value"]; ?></p>
                </div>
            </div>
        </div>
    <?php endif; ?>
    <?php if (($fields["6"]["value"]) && ($fields["7"]["value"])): ?>
        <div class="col-xs-12 flex-chiled">
            <div class="single-contact-info">
                <div class="icon-box">
                    <div class="box">
                        <i class="flaticon-technology"></i>
                    </div>
                </div>
                <div class="text-box">
                    <h3><?php print $fields["6"]["name"]; ?>&nbsp&&nbsp<?php print $fields["7"]["name"]; ?></h3>
                    <p><?php print $fields["6"]["value"]; ?></p>
                    <p><?php print $fields["7"]["value"]; ?></p>
                </div>
            </div>
        </div>
    <?php elseif ($fields["6"]["value"]) : ?>
        <div class="col-xs-12 flex-chiled">
            <div class="single-contact-info">
                <div class="icon-box">
                    <div class="box">
                        <i class="flaticon-technology"></i>
                    </div>
                </div>
                <div class="text-box">
                    <h3><?php print $fields["6"]["name"]; ?></h3>
                    <p><?php print $fields["6"]["value"]; ?></p>
                </div>
            </div>
        </div>
    <?php else : ?>
        <div class="col-xs-12 flex-chiled">
            <div class="single-contact-info">
                <div class="icon-box">
                    <div class="box">
                        <i class="flaticon-technology"></i>
                    </div>
                </div>
                <div class="text-box">
                    <h3><?php print $fields["7"]["name"]; ?></h3>
                    <p><?php print $fields["7"]["value"]; ?></p>
                </div>
            </div>
        </div>
    <?php endif; ?>
    <?php if ($fields["8"]["value"]): ?>
        <div class="col-xs-12 flex-chiled">
            <div class="single-contact-info">
                <div class="icon-box">
                    <div class="box">
                        <i class="flaticon-time"></i>
                    </div>
                </div>
                <div class="text-box">
                    <h3><?php print $fields["8"]["name"]; ?></h3>
                    <p><?php print $fields["8"]["value"]; ?></p>

                    <?php if ($fields["9"]["value"]): ?>
                        <p><?php print $fields["9"]["value"]; ?></p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>
