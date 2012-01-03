<?
$our_mission_id = 6;
$our_mission = get_page($our_mission_id);
$our_mission->subtitle = get_post_meta($our_mission_id, 'subtitle', true);
$our_mission_title = explode(' ', $our_mission->post_title);
$our_mission->title = $our_mission_title[0] . ' <strong>' . $our_mission_title[1] . '</strong>';

$es_id = 8;
$es = get_page($es_id);
$es->subtitle = get_post_meta($es_id, 'subtitle', true);
$es_title = explode(' ', $es->post_title);
$es->title = $es_title[0] . ' <strong>' . $es_title[1] . '</strong>';

$jl_id = 15;
$jl = get_page($jl_id);
$jl->subtitle = get_post_meta($jl_id, 'subtitle', true);
$jl_title = explode(' ', $jl->post_title);
$jl->title = $jl_title[0] . ' <strong>' . $jl_title[1] . '</strong>';

?>
    <section id="about">
        <? vestride_svg_title('About Us'); ?>
        <div class="about-us">
            <img class="hero" src="<?= get_template_directory_uri(); ?>/img/aboutus-hero.png" alt="An Eightfold Production" />
            
            <section class="aboutus-info clearfix">
                <div class="aboutus-details rfloat">
                    <?= $es->post_content; ?>
                </div>
                <div class="aboutus-overview">
                    <span class="aboutus-title"><?= $es->title; ?></span>
                    <span class="aboutus-subtitle"><?= $es->subtitle; ?></span>
                </div>
            </section>
            
            <section class="aboutus-info clearfix">
                <div class="aboutus-details rfloat">
                    <?= $our_mission->post_content; ?>
                </div>
                <div class="aboutus-overview">
                    <span class="aboutus-title"><?= $our_mission->title; ?></span>
                    <span class="aboutus-subtitle"><?= $our_mission->subtitle; ?></span>
                </div>
            </section>
            
            <section class="aboutus-info clearfix">
                <div class="aboutus-details details-with-title rfloat">
                    <span class="aboutus-title"><?= $jl->title; ?></span>
                    <span class="aboutus-subtitle"><?= $jl->subtitle; ?></span>
                    <?= $jl->post_content; ?>
                </div>
                <div class="aboutus-overview">
                    <img class="hero" src="jake here" width="213" height="301" />
                    <ul>
                        <li><a href="#" class="facebook ir">Facebook</a></li>
                        <li><a href="#" class="twitter ir">Twitter</a></li>
                        <li><a href="#" class="xbox-live ir">Xbox Live</a></li>
                        <li><a href="#" class="youtube ir">YouTube</a></li>
                    </ul>
                </div>
            </section>
            <!--
            <section class="whoweare">
                <h2><? echo $whoWeAre->post_title; ?></h2>
                <? echo $whoWeAre->post_content; ?>
            </section>
            <section class="whatwedo">
                <h2 class="inverted"><? echo $whatWeDo->post_title; ?></h2>
                <? echo $whatWeDo->post_content; ?>
                <div class="services">
                    <span class="plus"></span><p>Web Development</p>
                    <span class="plus"></span><p>Graphic Design</p>
                    <span class="plus"></span><p>Motion Graphics</p>
                    <span class="plus"></span><p>Search Engine Optimization</p>
                </div>
                
            </section>
            <section class="whywedoit">
                <h2 class="inverted"><? echo $whyWeDoIt->post_title; ?></h2>
                <? echo $whyWeDoIt->post_content; ?>
            </section>
            -->
        </div>
    </section>