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
     class=" <?php if ($params->get('moduleclass_sfx')) echo ' ' . $params->get('moduleclass_sfx'); ?>">
    <div class="fact-counter-section ">
        <?php if (count($items)): ?>
            <?php foreach ($items as $key => $item): ?>
                <?php if ($params->get('itemExtraFields') && count($item->extra_fields)): ?>
                    <div class="col-sm-6 col-md-3">`
                        <div class="single-fact-counter">
                            <div class="row">
                                <div class="col-sm-7">
                                    <div class="text-box">
                                        <?php foreach ($item->extra_fields as $extraField): ?>
                                            <?php if ($extraField->value != '' && $extraField->id == 11): ?>
                                                <div class="animated-number">
                                                    <span class="count"><?php echo $extraField->value; ?></span>
                                                </div>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                        <?php foreach ($item->extra_fields as $extraField): ?>
                                            <?php if ($extraField->value != '' && $extraField->id == 10): ?>
                                                <div class="animated-number-title">
                                                    <span><?php echo $extraField->value; ?></span>
                                                </div>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <?php foreach ($item->extra_fields as $extraField): ?>
                                        <?php if ($extraField->value != '' && $extraField->id == 12): ?>
                                            <div class="icon-box">
                                                <i class="<?php echo $extraField->value; ?>"></i>
                                            </div>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>