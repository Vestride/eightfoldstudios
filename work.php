<?
$project_categories = get_categories(array('type' => 'project', 'exclude' => '1'));

$projects = get_project_posts();
?>
    <section id="work">
        <? vestride_svg_title('Work', 81); ?>
        <div class="filter clearfix">
            <ul class="filter-options">
                <li class="active" data-key="all">Most Recent</li>
                <? foreach ($project_categories as $cat) : ?>
                <li data-key="<?= $cat->slug; ?>"><?= $cat->name; ?></li>
                <? endforeach; ?>
            </ul>
        </div>
        
        <div id="grid">
            
            <?php foreach ($projects as $project): ?>
            <div class="item" data-key='<?= json_encode($project->category_slugs); ?>'>
                <div class="item-img"><? echo $project->img; ?></div>
                <div class="item-details">
                    <a href="<? echo $project->permalink; ?>">
                        <div class="item-title"><?= $project->post_title; ?></div>
                        <div class="item-type"><?= $project->categories; ?></div>
                    </a>
                </div>
                <div class="pane">
                    <a href="<? echo $project->permalink; ?>">
                        <div class="pane-title"><?= $project->post_title; ?></div>
                        <span class="pane-view"><?= $project->categories; ?></span>
                    </a>
                </div>
            </div>
            
            <?php endforeach; ?>
        </div>
        
        <div class="paginate-controls"></div>
    </section>