<?
$project_categories = get_categories(array('type' => 'project', 'exclude' => '1', 'hide_empty' => 0));

$projects = vestride_get_project_posts();
?>
    <section id="work">
        <h3 class="section-title text-right"><span>Work<span class="title-icon icon-briefcase"></span></span></h3>
        <div class="paginate">
            <div class="filter">
                <h2 class="short">Most Recent</h2>
                <ul class="filter-options">
                    <li class="filter-option active" data-key="all"><div class="sprite sprite-recent"></div><span>Most Recent</span></li>
                    <? foreach ($project_categories as $cat) : ?>
                    <li class="filter-option" data-key="<?= $cat->slug; ?>"><div class="sprite sprite-<?= $cat->slug; ?>"></div><span><?= $cat->name; ?></span></li>
                    <? endforeach; ?>
                    <li class="paginate-nav paginate-prev nav-prev"></li>
                    <li class="paginate-nav paginate-next nav-next"></li>
                </ul>
            </div>

            <div id="grid">

                <?php foreach ($projects as $project): ?>
                <div class="item" data-key='<?= json_encode($project->category_slugs); ?>'>
                    <div class="item-img"><? echo $project->img; ?></div>
                    <div class="item-details">
                        <a href="<? echo $project->permalink; ?>">
                            <div class="item-title"><?= $project->post_title; ?></div>
                            <div class="item-type">
                                <?php foreach ($project->category_slugs as $cat) : ?>
                                <span class="icon-32 icon-<?php echo $cat; ?>"></span>
                                <?php endforeach; ?>
                            </div>
                        </a>
                    </div>
                    <!--
                    <div class="pane">
                        <a href="<? echo $project->permalink; ?>">
                            <div class="pane-title"><?= $project->post_title; ?></div>
                            <span class="pane-view"><?= implode(', ', $project->categories); ?></span>
                        </a>
                    </div>
                    -->
                </div>

                <?php endforeach; ?>
            </div>
        </div>
        <div class="paginate-controls"></div>
        
    </section>