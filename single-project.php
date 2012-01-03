<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Vestride
 * @since Vestride 1.0
 */

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

if (!Utils::is_ajax()) {
    get_header();
    vestride_header('work');
    ?>
<div class="backdrop backdrop-small">
    <div class="city"></div>
</div>
<div id="main">
    <section class="project">
        <header>
            <h1 class="section-title text-right">
                <svg width="153" height="25" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <linearGradient id="gradientDefinition" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%"   stop-color="#F0F0F0" />
                            <stop offset="93%"  stop-color="#9E9E9E" />
                            <stop offset="100%" stop-color="#F0F0F0" />
                        </linearGradient>
                    </defs>
                    <text id="horizontalText" x="0" y="25" fill="url(#gradientDefinition)" >
                        <?= strtoupper($post->post_title); ?>
                    </text>
                </svg>
            </h1>
        </header>
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
        <div class="project-info clearfix">
            <div class="project-overview lfloat">
                <h3>Overview</h3>
                <p><? echo $post->post_excerpt; ?></p>
            </div>
            <div class="project-content">
                <? echo $post->post_content; ?>
            </div>
        </div>
    </section>
</div>
    <?
    get_footer();
    ?>
    <script>
    $(document).ready(function() {
        Vestride.onHomePage = false;
        Vestride.adjustSvgTitles();
    });
    </script>
    <?
    vestride_end();
} else {
    // Page requested via ajax
    
    ?>
    
    <span class="blockbox-status rfloat"></span>
    <h2 class="short"><?= $post->post_title; ?></h2>

    <!--<span><?= get_the_categories(', '); ?></span>-->

    <div class="project-preview clearfix">
        <section class="project-sidebar project-specs lfloat">
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <div class="blockbox-nav blockbox-nav-prev lfloat"></div>
            <div class="blockbox-nav blockbox-nav-next lfloat"></div>
        </section>

        <section class="project-details lfloat">
            <div class="project-img"><? echo $hero; ?></div>
            <div class="project-desc">
                <h3>Overview</h3>
                <? echo $post->post_excerpt; ?>
            </div>
        </section>

        <section class="project-sidebar project-what lfloat">
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <div class=" lfloat"></div>
            <a class="project-details-link lfloat" href="<? the_permalink() ?>" data-title="Project details"></a>
            <div class="blockbox-close lfloat" title="Close"></div>
        </section>
    </div>
    
    <?
}