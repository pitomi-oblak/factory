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
    <div class="container  section-bottom section-top">
        <?php $this->spotlight('spotlight-1', 'position-1, position-2, position-3, position-4') ?>
    </div>
    <!-- //SPOTLIGHT 1 -->
<?php endif ?>

<?php if ($this->countModules('home-4')) : ?>
    <!-- HOME SL 4 -->
    <div class="container">
        <jdoc:include type="modules" name="<?php $this->_p('home-4') ?>" style="T3Xhtml"/>
    </div>
    <!-- //HOME SL 4 -->
<?php endif ?>

<?php if ($this->countModules('home-1')) : ?>
    <!-- HOME SL 1 -->
    <jdoc:include type="modules" name="<?php $this->_p('home-1') ?>" style="raw"/>
    <!-- //HOME SL 1 -->
<?php endif ?>

<?php if ($this->countModules('home-5')) : ?>
    <!-- HOME SL 5 -->
    <div class="container">
        <jdoc:include type="modules" name="<?php $this->_p('home-5') ?>" style="T3Xhtml"/>
    </div>
    <!-- //HOME SL 5 -->
<?php endif ?>

<?php if ($this->countModules('home-2')) : ?>
    <!-- HOME SL 2 -->
            <jdoc:include type="modules" name="<?php $this->_p('home-2') ?>" style="T3Xhtml"/>
    <!-- //HOME SL 2 -->
<?php endif ?>