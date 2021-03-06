<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
get_header();
vestride_header('work');
get_template_part('backdrop', 'small');
?>

<div id="main" role="main">
    <section class="clearfix">
    <?php if (have_posts()) : ?>
        <header class="page-header">
            <h1 class="page-title section-title text-right">
                <?php if (is_day()) : ?>
                    <?php printf(__('Daily Archives: %s', 'vestride'), '<span>' . get_the_date() . '</span>'); ?>
                <?php elseif (is_month()) : ?>
                    <?php printf(__('Monthly Archives: %s', 'vestride'), '<span>' . get_the_date('F Y') . '</span>'); ?>
                <?php elseif (is_year()) : ?>
                    <?php printf(__('Yearly Archives: %s', 'vestride'), '<span>' . get_the_date('Y') . '</span>'); ?>
                <?php else : ?>
                    <?php _e('Blog Archives', 'vestride'); ?>
                <?php endif; ?>
            </h1>
        </header>

        <div class="has-posts rfloat">
        <?php vestride_content_nav('nav-above'); ?>

        <?php /* Start the Loop */ ?>
        <?php while (have_posts()) : the_post(); ?>

            <?php
            /* Include the Post-Format-specific template for the content.
             * If you want to overload this in a child theme then include a file
             * called content-___.php (where ___ is the Post Format name) and that will be used instead.
             */
            get_template_part('content', get_post_format());
            ?>

        <?php endwhile; ?>

        <?php vestride_content_nav('nav-below'); ?>
        </div>
    <?php else : ?>

        <article id="post-0" class="post no-results not-found">
            <header class="entry-header">
                <h1 class="entry-title"><?php _e('Nothing Found', 'vestride'); ?></h1>
            </header><!-- .entry-header -->

            <div class="entry-content">
                <p><?php _e('Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'vestride'); ?></p>
                <?php get_search_form(); ?>
            </div><!-- .entry-content -->
        </article><!-- #post-0 -->

    <?php endif; ?>
    <?php get_sidebar(); ?>
</div><!-- #main -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
<script>
    $(document).ready(function() {
        Vestride.onHomePage = false;
    });
</script>
<?php vestride_end(); ?>