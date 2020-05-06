<?php
/*
 * Copyright (c) 2016-2017 Aimy Extensions, Lingua-Systems Software GmbH
 *
 * http://www.aimy-extensions.com/
 *
 * License: GNU GPLv2, see LICENSE.txt within distribution and/or
 *          http://www.aimy-extensions.com/software-license.html
 */
 defined( '_JEXEC' ) or die(); function _render_button( $route, $icon, $i18n, $dis = false, $title = false ) { $href = $dis ? '#' : JRoute::_( 'index.php?' . $route ); $cls = 'btn' . ( $dis ? ' btn-disabled' : '' ); $text = JText::_( $i18n ); $attr = $dis ? 'disabled="disabled" onclick="alert(this.title);return false;"' : ''; if ( $title === false ) { $title = $text; } else { $title = JText::_( $title ); } echo '<div class="aimy-icon-container">', '<a href="', $href, '" class="', $cls, '" ', $attr, 'title="', htmlspecialchars( $title ), '">', '<span class="icon"><img src="', JUri::root( true ), '/media/com_aimysitemap/', $icon, '_64x64.png', '" alt="', $icon, '" ', 'width="64" height="64" />', '</span>', '<span class="text">', $text, '</span>', '</a>', '</div>'; } ?>

<div class="row-fluid" id="aimy-dashboard-container">
<div class="span8">

<h1>Aimy Sitemap <?php echo JText::_( 'AIMY_SM_LINK_DASHBOARD' ); ?></h1>


<h2><?php
 echo JText::_( 'AIMY_SM_DASHBOARD_MAIN' ); ?></h2>

<?php
 _render_button( 'option=com_aimysitemap&amp;view=crawl', 'goman', 'AIMY_SM_LINK_CRAWL' ); _render_button( 'option=com_aimysitemap&view=urls', 'sitemap', 'AIMY_SM_LINK_MANAGE' ); _render_button( 'option=com_aimysitemap&amp;view=notify', 'broadcast', 'AIMY_SM_LINK_NOTIFY' ); ?>


<h2><?php
 echo JText::_( 'AIMY_SM_DASHBOARD_SETUP' ); ?></h2>

<?php
 _render_button( 'option=com_aimysitemap&view=robotstxt', 'robot', 'AIMY_SM_LINK_ROBOTSTXT' ); _render_button( 'option=com_config&view=component&component=com_aimysitemap', 'gear', 'JOPTIONS', ! $this->allow_config, $this->allow_config ? 'JOPTIONS' : '' ); ?>

<h2><?php
 echo JText::_( 'AIMY_SM_DASHBOARD_ADVANCED' ); ?></h2>

<?php
 _render_button( 'option=com_aimysitemap&amp;view=periodic', 'stopwatch', 'AIMY_SM_LINK_PERIODIC' , true, 'AIMY_SM_MSG_FEATURE_PRO_ONLY' ); _render_button( 'option=com_aimysitemap&amp;view=linkcheck', 'link-404', 'AIMY_SM_LINK_LINKCHECK' , true, 'AIMY_SM_MSG_FEATURE_PRO_ONLY' ); ?>

</div><!-- /.span8 -->
<div class="span4" id="aimy-right">
    <p>
        <img src="<?php
 echo JUri::root( true ), '/media/com_aimysitemap/aimy-logo_340x327.png'; ?>" width="340" height="327" alt="Aimy Sitemap" />
    </p>
    <p>
        <b>Aimy Sitemap  v3.20.3</b>
        <br/>
        <br/>
        <a href="http://www.aimy-extensions.com/joomla/sitemap.html" target="_blank">http://www.aimy-extensions.com/joomla/sitemap.html</a>
    </p>
</div><!-- /.span4 -->
</div><!-- /.row-fluid -->

<?php
 include( JPATH_ADMINISTRATOR . '/components/com_aimysitemap/helpers/footer.php' ); 
