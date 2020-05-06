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

<?php if ($this->countModules('home-5')) : ?>
    <!-- HOME SL 5 -->
    <div class="container">
        <jdoc:include type="modules" name="<?php $this->_p('home-5') ?>" style="T3Xhtml"/>
    </div>
    <!-- //HOME SL 5 -->
<?php endif ?>

<?php if ($this->countModules('home-1')) : ?>
    <!-- HOME SL 1 -->
    <jdoc:include type="modules" name="<?php $this->_p('home-1') ?>" style="raw"/>
    <!-- //HOME SL 1 -->
<?php endif ?>