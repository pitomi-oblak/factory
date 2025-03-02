<?php
/*
# mod_sp_quickcontact - Ajax based quick contact Module by JoomShaper.com
# -----------------------------------------------------------------------	
# Author    JoomShaper http://www.joomshaper.com
# Copyright (C) 2010 - 2014 JoomShaper.com. All Rights Reserved.
# License - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.joomshaper.com
*/

// no direct access
defined('_JEXEC') or die('Restricted access');
?>
<div id="sp_quickcontact<?php echo $uniqid ?>" class="sp_quickcontact home-contact-form contact-form">
    <div id="sp_qc_status"></div>
    <div class="form-wrapper">
        <form id="sp-quickcontact-form">
                <input type="text" name="name" id="name"
                       onfocus="if (this.value=='<?php echo $name_text ?>') this.value='';"
                       onblur="if (this.value=='') this.value='<?php echo $name_text ?>';"
                       value="<?php echo $name_text ?>" required/>
                    <input type="email" name="email" id="email"
                           onfocus="if (this.value=='<?php echo $email_text ?>') this.value='';"
                           onblur="if (this.value=='') this.value='<?php echo $email_text ?>';"
                           value="<?php echo $email_text ?>" required/>
            <textarea name="message" id="message" onfocus="if (this.value=='<?php echo $msg_text ?>') this.value='';"
                      onblur="if (this.value=='') this.value='<?php echo $msg_text ?>';" cols=""
                      rows=""><?php echo $msg_text ?></textarea>
                <?php if ($formcaptcha) { ?>
                    <input type="text" name="sccaptcha" placeholder="<?php echo $captcha_question ?>" required/>
                <?php } ?>
            </div>
                <button id="sp_qc_submit" class="button btn btn-primary" type="submit">
                    <?php echo $send_msg ?>
                </button>
        </form>
    </div>
</div>