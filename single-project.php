<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Vestride
 * @since Vestride 1.0
 */

// Project got featured without the checkbox

$args = array(
    'post_type' => 'attachment',
    'numberposts' => -1,
    'post_status' => null,
    'post_parent' => $post->ID
);
$attachments = get_posts($args);

// If a second image was uploaded (index 1), use that. Otherwise, we'll use the thumbnail from the featured image.
$hero_id = $attachments[1] == null ? $attachments[0]->ID : $attachments[1]->ID;
$hero = wp_get_attachment_image($hero_id, 'work-promo');
$hero_full = wp_get_attachment_image_src($hero_id, 'full');


get_header();
vestride_header('work');
get_template_part('backdrop', 'small');
?>
<div id="main">
    <section class="project">
        <h3 class="section-title text-right"><span><?= $post->post_title; ?></span></h3>
        <div class="project-preview clearfix">
            <section class="project-sidebar project-specs lfloat">
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
            </section>

            <section class="project-details lfloat">
                <div class="project-img" data-full="<? echo $hero_full[0]; ?>" data-full-width="<? echo $hero_full[1]; ?>" data-full-height="<? echo $hero_full[2]; ?>">
                    <? echo $hero; ?>
                </div>
                <div class="project-desc">
                    View full screen
                </div>
            </section>

            <section class="project-sidebar project-what lfloat">
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
                <div class=" lfloat"></div>
            </section>
        </div>
        <section class="section-info clearfix">
            <div class="section-details rfloat">
                <article><?= $post->post_excerpt; ?></article>
            </div>
            <div class="section-overview">
                <span class="article-title">Overview</span>
                <span class="article-subtitle"><?= $post->post_title; ?></span>
            </div>
        </section>
        <section class="section-info clearfix">
            <div class="section-details rfloat">
                <article><?= $post->post_content; ?></article>
            </div>
            <div class="section-overview">
                <span class="article-title">Challenges</span>
                <span class="article-subtitle"><?= $post->post_title; ?></span>
            </div>
        </section>
    </section>
</div>
<?
get_footer();
?>
<script>
$(document).ready(function() {
    Vestride.onHomePage = false;
});
</script>
<?
vestride_end();