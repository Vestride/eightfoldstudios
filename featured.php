<?php
$featured_projects = get_featured_project_posts();
?>
    <section id="featured">
        <? Utils::svgTitle('Featured'); ?>
        <div class="carousel-container">
            <ul class="carousel">
                <? foreach ($featured_projects as $project) : ?>
                <li>
                    <a href="<? echo $project->permalink; ?>"  data-title="<? echo $project->post_title; ?>" data-categories="<? echo $project->categories; ?>">
                        <? echo $project->img; ?>
                    </a>
                </li>
                <? endforeach; ?>
            </ul>
            <span class="carousel-item-title"></span>
            <div class="carousel-control-container">
                <div class="carousel-links"></div>
                <div class="carousel-control"></div>
            </div>
        </div>
    </section>