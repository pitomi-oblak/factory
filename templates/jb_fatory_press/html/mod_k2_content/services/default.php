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
    <?php if (count($items)): ?>
    <div class="row our-services">
        <?php foreach ($items as $key => $item): ?>
            <div class="col-md-4">
                <div class="jb-service">
                    <div class="single-our-service">
                        <?php if ($params->get('itemImage') || $params->get('itemIntroText')): ?>
                            <?php if ($params->get('itemImage') && isset($item->image)): ?>
                                <div class="img-box">
                                <img class="img-responsive"
                                     src="<?php echo $item->image; ?>"
                                     alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                            <?php endif; ?>

                            <?php if ($params->get('itemReadMore')): ?>
                                <div class="overlay">
                                    <div class="box">
                                        <div class="box-content">
                                            <a href="<?php echo $item->link; ?>">
                                                <?php echo JText::_('K2_READ_MORE'); ?> <i
                                                        class="fa fa-angle-double-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <?php endif; ?>

                            <?php if ($params->get('itemTitle')): ?>
                                <a href="<?php echo $item->link; ?>"><h3><?php echo $item->title; ?></h3>
                                </a>
                            <?php endif; ?>

                            <?php if ($params->get('itemIntroText')): ?>
                                <?php echo $item->introtext; ?>
                            <?php endif; ?>

                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>