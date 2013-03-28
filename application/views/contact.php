<article class="content rg-contact clearfix">
	<a name="contact"></a>
	<h1>Contact</h1>
	<p>
		I'm looking forward to helping you realize the mobile or online solution that's right for you. Get in contact and let's have a coffee! On me, of course :)
	</p>

	<?php
	if (! validation_errors() == "")
	{
		echo '<div class="error-collection clean-error">';
		echo '<p>Thank you very much for trying to contact me. Just correct the few typos mentioned below and I\'ll get back to you within 48 hours.</p>';
		echo '<ul>';
		echo validation_errors();
		echo '</ul>';
		echo '</div>';
	} ?>

	<form action="<?php echo base_url() . $this->uri->uri_string(); ?>#contact" method="post">
		<fieldset class="message">
			<label for="message"><strong>How can I help you?</strong></label>
			<textarea name="message" id="message" class="form-element"><?php echo set_value('message'); ?></textarea>
		</fieldset>
		<fieldset class="personal-info-fields">
			<label for="name"><strong>Your name</strong></label>
			<input type="text" name="name" value="<?php echo set_value('name'); ?>" id="name" class="form-element" />
			<label for="email"><strong>Your email</strong></label>
			<input type="email" name="email" value="<?php echo set_value('email'); ?>" id="email" class="form-element" />
			<input type="submit" value="Submit" class="form-element" />
		</fieldset>
	</form>
</article>
