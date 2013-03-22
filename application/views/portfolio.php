<article class="content rg-portfolio">
	<h1>Portfolio</h1>
	<ol class="items rg-inline-list">

		<?php
		if (is_array($portfolio_items) && count($portfolio_items))
		{
			foreach ($portfolio_items as $item):?>

				<li class="rg-inline-list-item rg-portfolio-preview">
					<a href="portfolio/item/<?php echo $item['slug']; ?>">
						<img src="img/portfolio_item_x.png" alt="<?php echo $item['title']; ?>" />
						<div>
							<h2><?php echo $item['preview_title']; ?></h2>

							<?php if (count($item['services_used'])) { ?>
								<ol class="rg-services-used">
									<?php foreach ($item['services_used'] as $service):?>
										<li><?php echo $service['service_used']; ?></li>
									<?php endforeach;?>
								</ol>
							<?php } ?>

						</div>
					</a>
				</li>

		<?php
			endforeach;
		} else {
			echo "<p>".$portfolio_items."</p>";
		}
		?>
	</ol>
</article>
