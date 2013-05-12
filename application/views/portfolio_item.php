<?php
/**
 * $data array holds the $navigation_items value
 *
 * @see Portfolio::item()
 * @var Portfolio $navigation_items
 */
?>

<article class="rg-portfolio-item" id="portfolio-item">
	<nav>
		<a href="#portfolio" class="js-to-overview">&lt;&lt; Back to overview</a>
		<ol>
			<li>
				<a href="<?php echo base_url() . 'portfolio/item/' . $navigation_items[0]["slug"]; ?>" class="js-to-previous">&lt; Previous</a>
			</li>
			<li>
				<a href="<?php echo base_url() . 'portfolio/item/' . $navigation_items[1]["slug"]; ?>" class="js-to-next">Next &gt;</a>
			</li>
		</ol>
	</nav>

	<ul>
	<?php foreach ($portfolio_item['images'] as $image):?>
		<li>
			<img src="<?php echo base_url(); ?>img/portfolio/<?php echo $image['thumb_image_url']; ?>" alt="Img x" />
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