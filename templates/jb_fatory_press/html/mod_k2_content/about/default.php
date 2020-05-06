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
    <div class="row about-section">

        <?php if (count($items)): ?>
            <div class="col-sm-6 about-section-gallery">
                <?php foreach ($items as $key => $item): ?>
                    <?php if ($item->gallery) : ?>
                        <?php echo $item->gallery; ?>
                    <?php else: ?>
                        <img class="lazyg" data-original="<?php echo $item->image; ?>"
                             alt="<?php echo K2HelperUtilities::cleanHtml($item->title); ?>"/>
                    <?php endif ?>
                <?php endforeach; ?>
            </div>
            <div class="col-sm-6 description">
                <?php foreach ($items as $key => $item): ?>
                    <?php if ($params->get('itemIntroText')): ?>
                        <?php echo $item->introtext; ?>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>