<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Vestride
 * @since Vestride 1.0
 */
?><!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
    <head>
        <meta charset="<?php bloginfo('charset'); ?>" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title><?php
/*
 * Print the <title> tag based on what is being viewed.
 */
global $page, $paged;

wp_title('|', true, 'right');

// Add the blog name.
bloginfo('name');

// Add the blog description for the home/front page.
$site_description = get_bloginfo('description', 'display');
if ($site_description && ( is_home() || is_front_page() ))
    echo " | $site_description";

// Add a page number if necessary:
if ($paged >= 2 || $page >= 2)
    echo ' | ' . sprintf(__('Page %s', 'twentyeleven'), max($paged, $page));
?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <!--<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo('stylesheet_url'); ?>" />-->
        <link rel="stylesheet" href="<? bloginfo('stylesheet_url'); ?>" />
        <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,300,400,700,800' />
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
        <script src="<?php echo get_template_directory_uri(); ?>/js/libs/modernizr-2.0.6.min.js"></script>
        <?php
        /* We add some JavaScript to pages with the comment form
         * to support sites with threaded comments (when in use).
         */
        if (is_singular() && get_option('thread_comments'))
            wp_enqueue_script('comment-reply');

        /* Always have wp_head() just before the closing </head>
         * tag of your theme, or you will break many plugins, which
         * generally use this hook to add elements to <head> such
         * as styles, scripts, and meta tags.
         */
        wp_head();
        ?>
    </head>
    <body>
        <div id="container">