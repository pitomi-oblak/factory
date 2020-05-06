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
<div class="bannergroup clients<?php echo $moduleclass_sfx; ?>">

    <?php foreach ($list as $item) : ?>
        <div class="col-sm-3">
            <div class="banneritem">
                <?php $link = JRoute::_('index.php?option=com_banners&task=click&id=' . $item->id); ?>
                <?php $imageurl = $item->params->get('imageurl'); ?>
                <?php $width = $item->params->get('width'); ?>
                <?php $height = $item->params->get('height'); ?>
                <?php if (BannerHelper::isImage($imageurl)) : ?>
                    <?php // Image based banner ?>
                    <?php $alt = $item->params->get('alt'); ?>
                    <?php $alt = $alt ?: $item->name; ?>
                    <?php $alt = $alt ?: JText::_('MOD_BANNERS_BANNER'); ?>
                    <?php if ($item->clickurl) : ?>
                        <?php // Wrap the banner in a link ?>
                        <?php $target = $params->get('target', 1); ?>
                        <?php if ($target == 1) : ?>
                            <?php // Open in a new window ?>
                            <a href="<?php echo $link; ?>" target="_blank" rel="noopener noreferrer"
                               title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8'); ?>">
                                <img class="img-responsive" src="<?php echo $baseurl . $imageurl; ?>"
                                     alt="<?php echo $alt; ?>"
                                    <?php if (!empty($width)) echo ' width="' . $width . '"'; ?>
                                    <?php if (!empty($height)) echo ' height="' . $height . '"'; ?>
                                />
                            </a>
                        <?php elseif ($target == 2) : ?>
                            <?php // Open in a popup window ?>
                            <a
                                    href="<?php echo $link; ?>" onclick="window.open(this.href, '',
								'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=550');
								return false"
                                    title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8'); ?>">
                                <img
                                        src="<?php echo $baseurl . $imageurl; ?>"
                                        alt="<?php echo $alt; ?>"
                                    <?php if (!empty($width)) echo ' width="' . $width . '"'; ?>
                                    <?php if (!empty($height)) echo ' height="' . $height . '"'; ?>
                                />
                            </a>
                        <?php else : ?>
                            <?php // Open in parent window ?>
                            <a
                                    href="<?php echo $link; ?>"
                                    title="<?php echo htmlspecialchars($item->name, ENT_QUOTES, 'UTF-8'); ?>">
                                <img
                                        src="<?php echo $baseurl . $imageurl; ?>"
                                        alt="<?php echo $alt; ?>"
                                    <?php if (!empty($width)) echo ' width="' . $width . '"'; ?>
                                    <?php if (!empty($height)) echo ' height="' . $height . '"'; ?>
                                />
                            </a>
                        <?php endif; ?>
                    <?php else : ?>
                        <?php // Just display the image if no link specified ?>
                        <img
                                src="<?php echo $baseurl . $imageurl; ?>"
                                alt="<?php echo $alt; ?>"
                            <?php if (!empty($width)) echo ' width="' . $width . '"'; ?>
                            <?php if (!empty($height)) echo ' height="' . $height . '"'; ?>
                        />
                    <?php endif; ?>
                <?php endif; ?>
                <div class="clr"></div>
            </div>
        </div>
    <?php endforeach; ?>
</div>
