<article class="rg-portfolio-item">
	<nav>
		<a href="portfolio/">&lt;&lt; Back to overview</a>
		<ol>
			<?php echo $this->pagination->create_links(); ?>
		</ol>
	</nav>

	<ul>
	<?php foreach ($portfolio_item['images'] as $image):?>
		<li>
			<img src="img/portfolio/<?php echo $image['image_url']; ?>" alt="Img x" />
		</li>
	<?php endforeach;?>
	</ul>

	<div class="item-description">
		<h1><?php echo $portfolio_item['title']; ?></h1>
		<?php if (count($portfolio_item['services_used'])) { ?>
			<ol class="rg-services-used">
				<?php foreach ($portfolio_item['services_used'] as $service):?>
					<li><?php echo $service['service_used']; ?></li>
				<?php endforeach;?>
			</ol>
		<?php } ?>

		<?php echo nl2p($portfolio_item['text'], false); ?>
	</div>
</article>