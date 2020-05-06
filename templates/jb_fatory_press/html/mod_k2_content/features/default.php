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
    <div class="container">
        <div class="row">
            <?php if (count($items)): ?>
                <?php foreach ($items as $key => $item): ?>
                    <div class="col-sm-4 feature-column">
                        <div class="single-our-feature" style="overflow: hidden">
                            <?php if ($params->get('itemReadMore')): ?>
                                <div style="background-image: url(images/single-featured-bg.jpg);" class="overlay">
                                    <div class="box">
                                        <div class="box-content">
                                            <a href="<?php echo $item->link; ?>">
                                                <?php echo JText::_('K2_READ_MORE'); ?> <i
                                                        class="fa fa-angle-double-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <?php if ($params->get('itemExtraFields') && count($item->extra_fields)): ?>
                                <?php foreach ($item->extra_fields as $extraField): ?>
                                    <?php if ($extraField->value != ''): ?>
                                        <div class="icon-box"><i class="<?php echo $extraField->value; ?>"></i>
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            <?php endif; ?>

                            <?php if ($params->get('itemTitle')): ?>
                                <h3><?php echo $item->title; ?></h3>
                            <?php endif; ?>

                            <?php if ($params->get('itemIntroText')): ?>
                                <?php echo $item->introtext; ?>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</div>