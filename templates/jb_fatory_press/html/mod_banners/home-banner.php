<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_banners
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JLoader::register('BannerHelper', JPATH_ROOT . '/components/com_banners/helpers/banner.php');
$baseurl = JUri::base();
?>
<div class="bannergroup <?php echo $moduleclass_sfx; ?>">
    <div class="call-to-action-home">
        <?php foreach ($list as $item) : ?>
            <div class="banneritem">
                <?php $description = $item->description; ?>
                <div class="description">
                    <h3><?php echo $description; ?></h3>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>