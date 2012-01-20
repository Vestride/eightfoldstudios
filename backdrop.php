<?php
$es_id = 8;
$es = get_page($es_id);
$es->subtitle = get_post_meta($es_id, 'subtitle', true);
$es_title = explode(' ', $es->post_title);
$es->title_1 = $es_title[0];
$es->title_2 = $es_title[1];

?>
<div class="backdrop">
    <div class="backdrop-inside">
        <h1 class="tagline">
            <a class="tagline-img" href="<?= bloginfo('url'); ?>">
                <img src="<?= get_template_directory_uri(); ?>/img/es.svg" alt="<? echo $es->title_1 . ' ' . $es->title_2; ?>" width="168" height="168" />
            </a>
            <div class="tagline-title"><? echo $es->title_1 . ' ' . $es->title_2; ?></div>
        </h1>
    </div>
    <div class="city"></div>
</div>