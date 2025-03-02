<?php
/*
 * Copyright (c) 2014-2017 Aimy Extensions, Lingua-Systems Software GmbH
 *
 * http://www.aimy-extensions.com/
 *
 * License: GNU GPLv2, see LICENSE.txt within distribution and/or
 *          http://www.aimy-extensions.com/software-license.html
 */
 defined( '_JEXEC' ) or die(); try { JHtml::_( 'jquery.framework' ); JHtml::_( version_compare( JVERSION, '3.3.0', 'lt' ) ? 'behavior.framework' : 'behavior.core' ); } catch ( Exception $e ) { } $i18n = array( 'notifying' => JText::_( 'AIMY_SM_NOTIFYING' ), 'dont_close' => JText::_( 'AIMY_SM_MSG_DONT_CLOSE' ) ); ?>

<?php if ( $this->allow_notify ) : ?>


<form action="<?php
 echo JRoute::_( 'index.php?option=com_aimysitemap&view=notify' ); ?>" method="post" name="adminForm" id="adminForm">
        <input type="hidden" name="task" value="" />
        <?php echo JHtml::_( 'form.token' ); ?>
</form>


<div id="notify-hint">
    <img src="../media/com_aimysitemap/go-up_32x32.png" width="32" height="32"
        alt="go up" class="pull-left skip-right" />
    <h1><?php echo JText::_( 'AIMY_SM_NOTIFY_HINT_HEADING' ); ?></h1>
    <p><?php echo JText::_( 'AIMY_SM_NOTIFY_HINT_TEXT' ); ?></p>
</div>


<div id="ping"></div>

<script type="text/javascript">
jQuery(document).ready(function(){
    var cfg  = <?php echo json_encode( $this->ping_cfg ); ?>;
    var i18n = <?php echo json_encode( $i18n ); ?>;

    Joomla.submitbutton = function( task )
    {
        if ( task == 'notify.ping' )
        {
            jQuery( '#toolbar-tree-2 button' ).prop( 'disabled', true );
            jQuery( '#notify-hint' ).html(
                jQuery( '<h2></h2>' ).text( i18n.notifying )
            )
            .append(
                jQuery( '<p></p>' )
                    .append(
                        jQuery( '<strong></strong>' )
                            .text( i18n.dont_close )
                    )
            );

            for ( var se in cfg.ses )
            {
                AimySitemapPing( se, '<?php
 echo JSession::getFormToken(); ?>', '#ping' );
            }

            return false;
        }
    };
});
</script>


<?php endif; ?>


<?php
 include( JPATH_ADMINISTRATOR . '/components/com_aimysitemap/helpers/footer.php' ); 
