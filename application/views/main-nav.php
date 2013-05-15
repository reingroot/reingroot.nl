<?php $separator = isset($enable_anchors) && $enable_anchors ? '#' : ''; ?>

<header role="banner" class="clearfix">
	<nav role="navigation" class="main-nav clearfix">
		<a href="/" class="rg-logo">
			<img src="<?php echo base_url(); ?>img/logo.png" height="142" width="142" alt="Logo - Rein Groot.nl" />
		</a>

		<ol class="clearfix">
			<li>
				<a href="<?php echo $separator ?>">About</a>
			</li>
			<li>
				<a href="<?php echo $separator ?>services">Services</a>
			</li>
			<li>
				<a href="<?php echo $separator ?>portfolio">Portfolio</a>
			</li>
			<li class="last">
				<a href="<?php echo $separator ?>contact">Contact</a>
			</li>
		</ol>
	</nav>

	<p class="tagline">
		Strategy, development and delivery of online and mobile platforms.
	</p>
</header>

<section>