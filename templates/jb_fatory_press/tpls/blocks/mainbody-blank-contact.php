<?php
/**
 * @package   T3 Blank
 * @copyright Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license   GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
?>
<?php if ($this->hasMessage()) : ?>
    <jdoc:include type="message"/>
<?php endif ?>
<jdoc:include type="component"/>


<?php if ($this->checkSpotlight('spotlight-1', 'position-1, position-2, position-3, position-4')) : ?>
    <!-- SPOTLIGHT 1 -->
    <div class="top-section">
        <?php $this->spotlight('spotlight-1', 'position-1, position-2, position-3, position-4') ?>
    </div>
    <!-- //SPOTLIGHT 1 -->
<?php endif ?>

<?php if ($this->countModules('home-4')) : ?>
    <!-- HOME SL 4 -->
    <div class="container section-top section-bottom">
        <jdoc:include type="modules" name="<?php $this->_p('home-4') ?>" style="T3Xhtml"/>
    </div>
    <!-- //HOME SL 4 -->
<?php endif ?>