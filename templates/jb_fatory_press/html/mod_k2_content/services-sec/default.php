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
            <div class="col-sm-4 service-box">
                <div class="single-our-service-caption-box">
                    <?php if ($params->get('itemImage') || $params->get('itemIntroText')): ?>
                        <?php if ($params->get('itemImage') && isset($item->image)): ?>
                            <div class="img-box">
                                <img src="<?php echo $item->image; ?>"
                                     alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                            </div>
                        <?php endif; ?>

                        <div class="content-box">
                            <?php if ($params->get('itemTitle')): ?>
                                <h3><?php echo $item->title; ?></h3>
                            <?php endif; ?>

                            <?php if ($params->get('itemIntroText')): ?>
                                <?php echo $item->introtext; ?>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>