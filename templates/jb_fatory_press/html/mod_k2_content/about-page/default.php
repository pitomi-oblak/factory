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
     class="about-section <?php if ($params->get('moduleclass_sfx')) echo ' ' . $params->get('moduleclass_sfx'); ?>">
    <?php if (count($items)): ?>
        <?php foreach ($items as $key => $item): ?>
            <?php if ($params->get('itemIntroText')): ?>
                <?php echo $item->introtext; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    <?php endif; ?>
    <?php foreach ($items as $key => $item): ?>
        <?php if ($item->gallery) : ?>
            <?php echo $item->gallery; ?>
        <?php endif ?>
    <?php endforeach; ?>
</div>