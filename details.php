<?php
// es/wordpress/wp-load.php
// es/wordpress/wp-content/themes/vestride/details.php
require_once('../../../wp-load.php');

$project = isset($_GET['project']) ? $_GET['project'] : 'blarg';
    //header("Location: 404.html");

$projectName = 'Wall-E';
$projectCategories = "Wallpaper, Graphic Design";
$projectDetails = "Vivamus vestibulum lacus ac ante vestibulum in lacinia tortor rutrum. Nam tincidunt laoreet congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer sed nunc pretium massa ullamcorper interdum. Praesent pharetra elit vel arcu vulputate posuere. Quisque at nulla nec eros eleifend rutrum. Nulla sagittis gravida elit sed sollicitudin. Quisque pulvinar faucibus enim rhoncus molestie. Aenean enim ante, vestibulum ac tristique imperdiet, tristique mollis risus. In sed urna eget nisi pharetra vestibulum ut eget diam.";

$projectName = $project;
$pageTitle = $projectName;

$isAjax = Utils::is_ajax();
if (!$isAjax) {
    get_header();
    ?>
    <section class="home">
        <a href="index.php"><img src="img/es.png" alt="Eightfold Studios" /></a>
    </section>
    <section>
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
                        <?= strtoupper($projectName); ?>
                    </text>
                </svg>
            </h1>
        </header>
        <div class="project-details clearfix">

            <h2>Project Details</h2>

            <div class="slideshow">
                <ul class="carousel carousel-small">
                    <li><img src="http://lorempixum.com/600/337/abstract/" alt="" /></li>
                    <li><img src="http://lorempixum.com/600/337/technics/" alt="" /></li>
                    <li><img src="http://lorempixum.com/600/337/city/" alt="" /></li>
                    <li><img src="http://lorempixum.com/600/337/transport/" alt="" /></li>
                </ul>
                <div class="carousel-control"></div>
            </div>
        
            <hgroup>
                <h3><?= $projectName; ?></h3>
                <h5><?= $projectCategories; ?></h5>
            </hgroup>

            <div class="content">
                 <p class="drop-cap"><?= $projectDetails; ?></p>
            </div>

        </div>
    </section>
    <?
    get_footer();
    ?>
    <script>
    $(document).ready(function() {
        Vestride.initCycle('cycleNoLinks', '.project-details .carousel');
        Vestride.onHomePage = false;
        Vestride.adjustSvgTitles();
    });
    </script>
    <?
    vestride_end();
} else {
    // Page requested via ajax
    ?>

    <div class="project-details clearfix">

        <div class="slideshow">
            <ul class="carousel carousel-small">
                <li><img src="http://lorempixum.com/600/337/abstract/" alt="" /></li>
                <li><img src="http://lorempixum.com/600/337/technics/" alt="" /></li>
                <li><img src="http://lorempixum.com/600/337/city/" alt="" /></li>
                <li><img src="http://lorempixum.com/600/337/transport/" alt="" /></li>
            </ul>
            <div class="carousel-control"></div>
        </div>
        
        <hgroup>
            <h3><?= $projectName; ?></h3>
            <h5><?= $projectCategories; ?></h5>
        </hgroup>

        <div class="content">
             <p class="drop-cap"><?= $projectDetails; ?></p>
        </div>
        
        <a href="<?= $_SERVER['PHP_SELF'] . '?project=' . $project; ?>">Project details &rarr;</a>

    </div>
    
    <?
}

