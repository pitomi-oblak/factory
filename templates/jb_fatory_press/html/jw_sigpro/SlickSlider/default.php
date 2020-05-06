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
<div class="row">
    <div class="col-sm-12 slick-gallery">
        <?php $i = 0;
        foreach ($gallery as $count => $photo) { ?>
            <div class="slick-item">
                <img class="sigProGalleriaWhiteTargetImg"
                     src="<?php echo $gallery[$i]->sourceImageFilePath; ?>"
                     alt="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                     title="<?php echo JText::_('JW_SIGP_LABELS_08') . ' ' . $gallery[$i]->filename; ?>"
                     max-width="100%"/>
            </div>
            <?php $i++;
        } ?>
    </div>
</div>