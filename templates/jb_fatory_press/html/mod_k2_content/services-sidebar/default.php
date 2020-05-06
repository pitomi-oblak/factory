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

<div id="k2ModuleBox<?php echo $module->id; ?>"
     class="service-test k2ItemsBlock<?php if ($params->get('moduleclass_sfx')) echo ' ' . $params->get('moduleclass_sfx'); ?>">

    <?php if (count($items)): ?>
        <div class="col-sm-5 col-md-4 tab-column">
            <div class="tab">
                <?php foreach ($items as $key => $item): ?>
                    <?php if ($params->get('itemTitle')): ?>
                        <a class="tablinks" onclick="openTab(event, '<?php echo $item->title; ?>')"
                        ><?php echo $item->title; ?></a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="col-sm-7 col-md-8 tab-column">
            <?php foreach ($items as $key => $item): ?>
                <div id="<?php echo $item->title; ?>" class="tabcontent">

                    <?php if (!empty($item->image) && !(!empty($item->gallery))): ?>
                        <div class="single-img">
                            <img src="<?php echo $item->image; ?>"
                                 alt="<?php if (!empty($item->image_caption)) echo K2HelperUtilities::cleanHtml($item->image_caption); else echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                        </div>
                    <?php endif; ?>

                    <?php if ($item->gallery) : ?>
                        <?php echo $item->gallery; ?>
                    <?php endif ?>

                    <?php if ($params->get('itemIntroText')): ?>
                        <p><?php echo $item->introtext; ?></p>
                    <?php endif; ?>

                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>


