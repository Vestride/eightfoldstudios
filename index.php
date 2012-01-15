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

get_template_part('backdrop');
?>

<div id="main" class="homepage" role="main">
    <div id="sections">
        <section id="home" class="home">
            <h3 class="section-title"><span class="home-title rfloat"></span></h3>
            <nav class="quick-tiles">
                <ul>
                    <li>
                        
                        <a href="#about">Who We Are<span>Who We Are</span></a>
                    </li><li>
                        
                        <a href="#work">Recent Work<span>Recent Work</span></a>
                    </li><li>
                        
                        <a href="#downloads">Freebies<span>Freebies</span></a>
                    </li><li>
                        <a href="#blog">Blog<span>Blog</span></a>
                    </li>
                </ul>
            </nav>
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