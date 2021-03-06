<article class="content rg-contact clearfix" id="contact">
	<h1>Contact</h1>
	<p>
        Do you have a new platform in development? See how Rein can help you develop a modern, user friendly and effective solution that fits your needs. Contact Rein for an initial, free, consultation.
	</p>

	<?php
	if (! validation_errors() == "") { ?>
		<p class="system-feedback error">
			Thank you for trying to get in touch. It seems that some fields need your attention. Maybe you left a field blank or typed an incorrect email address. Once they are corrected, you're on your way.
		</p>
	<?php } ?>

	<form action="<?php echo base_url() . $this->uri->uri_string(); ?>#contact" method="post">
		<fieldset class="message">
			<label for="message"><strong>How can Rein help you?</strong></label>
			<textarea name="message" id="message" class="form-element <?php echo (form_error('message') != '' ? 'error' : ''); ?>"><?php echo set_value('message'); ?></textarea>
		</fieldset>
		<fieldset class="personal-info-fields">
			<label for="name"><strong>Your name</strong></label>
			<input type="text" name="name" value="<?php echo set_value('name'); ?>" id="name" class="form-element <?php echo (form_error('name') != '' ? 'error' : ''); ?>" />
			<label for="email"><strong>Your email</strong></label>
			<input type="email" name="email" value="<?php echo set_value('email'); ?>" id="email" class="form-element <?php echo (form_error('email') != '' ? 'error' : ''); ?>" />
			<input type="text" value="" name="address" class="required" />
            <input type="submit" value="Submit" class="form-element" />
		</fieldset>
	</form>
</article>