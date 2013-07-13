<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>
            <?php if (isset($is_portfolio_item) && $is_portfolio_item) {
                echo $portfolio_item['SEO_title'];
            } else { ?>
                Strategy, development and delivery of online and mobile platforms. | ReinGroot.nl
            <?php } ?>
        </title>

        <?php if (isset($is_portfolio_item) && $is_portfolio_item) { ?>
            <meta name="description" content="<?php echo $portfolio_item['SEO_meta_description']; ?>">
        <?php } else { ?>
            <meta name="description" content="Rein Groot is an experienced UX consultant, skilled front-end developer and qualified project manager, who can fit into multiple roles seamlessly.">
        <?php } ?>

        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="shortcut icon" href="/img/favicon.png" />

        <link rel="stylesheet" href="<?php echo base_url(); ?>css/normalize.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main.css">
        <script src="<?php echo base_url(); ?>js/vendor/modernizr-2.6.2.min.js"></script>
		<script data-main="js/main" src="<?php echo base_url(); ?>js/require-jquery-ck.js"></script>

		<base href="<?php echo base_url(); ?>" />
    </head>
    <body >
		<div class="main-wrapper <?php echo $css_background; ?> " role="main">
            <p class="system-feedback error no-js-msg">
                It seems you don not have JavaScript enabled. You can still use the site. However, turning JavaScript will make your experience smoother.
            </p>
