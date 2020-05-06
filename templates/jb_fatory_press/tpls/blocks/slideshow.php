<?php
/**
 * ------------------------------------------------------------------------
 * TP Splash template
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - Copyrighted Commercial Software
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites:  http://www.joomlart.com -  http://www.joomlancers.com
 * This file may not be redistributed in whole or significant part.
 * ------------------------------------------------------------------------
 */

defined('_JEXEC') or die;
?>

<?php if ($this->countModules('slideshow')) : ?>
<!-- Slideshow -->
<div class="wrap jb-slideshow <?php $this->_c('slideshow') ?>">
	
		<jdoc:include type="modules" name="<?php $this->_p('slideshow') ?>" style="raw" />
	
</div>
<!-- //Slideshow -->
<?php endif ?>

