<?php
/**
 * @version        3.0.x
 * @package        Simple Image Gallery Pro
 * @author        JoomlaWorks - http://www.joomlaworks.net
 * @copyright    Copyright (c) 2006 - 2014 JoomlaWorks Ltd. All rights reserved.
 * @license        http://www.joomlaworks.net/license
 */

// no direct access
defined('_JEXEC') or die('Restricted access');


?>

<div class="grid">
    <?php $i = 0;
    foreach ($gallery as $count => $photo) { ?>
        <div class="grid-item">
            <img src="<?php echo $gallery[$i]->sourceImageFilePath; ?>"
                 alt="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                 title="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                 width="auto"/>
            <?php if ($photo->captionTitle): ?>
                <div class="image-title"><b><?php echo $photo->captionTitle; ?></b></div>
            <?php endif; ?>
        </div>
        <?php $i++;
    } ?>
</div>



