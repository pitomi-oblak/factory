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
?>
<div id="<?php echo $module->id; ?>"
     class="<?php if ($params->get('moduleclass_sfx')) echo ' ' . $params->get('moduleclass_sfx'); ?>">
    <div class="row team-section">
            <?php if (count($items)): ?>
                <?php foreach ($items as $key => $item): ?>
                    <div class="col-sm-6 col-md-3 person-content">
                        <div class="content-wrapper">
                            <?php if ($params->get('itemImage') || $params->get('itemIntroText')): ?>
                                <?php if ($params->get('itemImage') && isset($item->image)): ?>
                                    <div class="person-img">
                                        <img class="img-responsive"
                                             src="<?php echo $item->image; ?>"
                                             alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                                    </div>
                                <?php endif; ?>
                            <?php endif; ?>

                            <?php if ($params->get('itemTitle')): ?>
                                <div class="person-name">
                                    <span><?php echo $item->title; ?></span>
                                </div>
                            <?php endif; ?>

                            <?php foreach ($item->extra_fields as $extraField): ?>
                                <?php if ($extraField->value != '' && $extraField->id == 2): ?>
                                    <div class="designition">
                                        <span><?php echo $extraField->value; ?></span>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>

                            <?php if ($params->get('itemIntroText')): ?>
                                <?php echo $item->introtext; ?>
                            <?php endif; ?>

                            <?php foreach ($item->extra_fields as $extraField): ?>
                                <?php if ($extraField->value != '' && $extraField->id == 3): ?>
                                    <div class="phone">
                                        <span><?php echo $extraField->name; ?></span>
                                        <span><?php echo $extraField->value; ?></span>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>

                            <?php foreach ($item->extra_fields as $extraField): ?>
                                <?php if ($extraField->value != '' && $extraField->id == 4): ?>
                                    <div class="mail">
                                        <span><?php echo $extraField->name; ?></span>
                                        <span><?php echo $extraField->value; ?></span>
                                    </div>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</div>