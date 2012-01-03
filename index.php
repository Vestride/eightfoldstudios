<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Vestride
 */
get_header();
vestride_header('home');
?>
<div class="backdrop">
    <div class="backdrop-inside">
        <h1>
            <a id="tagline-es" href="<?= bloginfo('url'); ?>"><img src="<?= get_template_directory_uri(); ?>/img/es.png" alt="Eightfold Studios" /></a>
            <span id="tagline-welcome" class="tagline">Welcome</span>
            <span id="tagline-to" class="tagline">to</span>
            <span id="tagline-eightfold" class="tagline">Eightfold</span>
            <span id="tagline-studios" class="tagline">Studios</span>
        </h1>
    </div>
    <div class="city"></div>
</div>
<div id="main" class="homepage" role="main">
    <div id="sections">
        <section id="home" class="home">
            <h3 class="section-title"><span class="home-title text-right rfloat"></span></h3>
            <div class="clearfix">
                <a href="#work" class="box-link" data-title="Recent Work"></a>
                <a href="#downloads" class="box-link" data-title="Downloads"></a>
                <a href="#blog" class="box-link" data-title="Blog"></a>
                <a href="#contact" class="box-link" data-title="Message"></a> 
            </div>
        </section>
        
        <? 
            $theme_options = vestride_get_theme_options();
            if ($theme_options['featured'] === 'yes') {
                get_template_part('featured');
            }
            get_template_part('aboutus');
            get_template_part('work');
            get_template_part('contact');
            get_template_part('blog');
        ?>
    </div>
</div>
<?php //get_sidebar(); ?>
<?php get_footer(); ?>
<script defer src="<? echo get_template_directory_uri(); ?>/js/index.js"></script>
<?php vestride_end(); ?>