<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <h1 class="entry-title section-title text-right"><span><?php the_title(); ?></span></h1>
    </header><!-- .entry-header -->

    <div class="entry-content">
        <?php the_content(); ?>
        <?php wp_link_pages(array('before' => '<div class="page-link"><span>' . __('Pages:', 'vestride') . '</span>', 'after' => '</div>')); ?>
    </div><!-- .entry-content -->
    <footer class="entry-meta">
        <?php edit_post_link(__('Edit', 'vestride'), '<span class="edit-link">', '</span>'); ?>
        <nav id="nav-single">
            <h3 class="ir"><?php _e('Project navigation', 'vestride'); ?></h3>
            <span class="nav-previous"><?php previous_post_link('%link', __('<span class="meta-nav">&larr;</span> Previous', 'vestride')); ?></span>
            <span class="nav-next"><?php next_post_link('%link', __('Next <span class="meta-nav">&rarr;</span>', 'vestride')); ?></span>
        </nav><!-- #nav-single -->
    </footer><!-- .entry-meta -->
</article><!-- #post-<?php the_ID(); ?> -->
