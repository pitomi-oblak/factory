<?php
/*
 * Copyright (c) 2014-2017 Aimy Extensions, Lingua-Systems Software GmbH
 *
 * http://www.aimy-extensions.com/
 *
 * License: GNU GPLv2, see LICENSE.txt within distribution and/or
 *          http://www.aimy-extensions.com/software-license.html
 */
 defined( '_JEXEC' ) or die(); try { JHtml::_( 'jquery.framework' ); JHtml::_( version_compare( JVERSION, '3.3.0', 'lt' ) ? 'behavior.framework' : 'behavior.core' ); } catch ( Exception $e ) { } ?>

<div class="row-fluid">
<form action="<?php
 echo JRoute::_( 'index.php?option=com_aimysitemap&view=robotstxt' ); ?>" method="post" name="adminForm" id="adminForm">
        <input type="hidden" name="task" id="adminFormTask" value="" />
        <?php echo JHtml::_( 'form.token' ); ?>
<fieldset>
<div class="form-group">
    <textarea class="form-control" id="robotstxt" name="robotstxt" <?php
 echo $this->allow_save ? '' : 'disabled="disabled"'; ?> rows="14"><?php
 echo $this->robotstxt; ?></textarea>
</div>
</fieldset>
</form>
</div><!-- /.row-fluid -->

<script type="text/javascript">
jQuery(document).ready(function()
{
    Joomla.submitbutton = function( task )
    {
        if ( task == 'robotstxt.load_default' )
        {
            jQuery( '#robotstxt' )
                .slideUp( 'fast' )
                .text( <?php
 echo json_encode( $this->robotstxt_default ); ?> )
                .slideDown( 'slow' );

            return false;
        }
        else
        {
            jQuery( '#adminFormTask' ).val( task );
            jQuery( '#adminForm' ).submit();
        }
    };
});
</script>

<?php
 include( JPATH_ADMINISTRATOR . '/components/com_aimysitemap/helpers/footer.php' ); 
