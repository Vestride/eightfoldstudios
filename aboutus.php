<?
$whoWeAre_id = 6;
$whoWeAre = get_page($whoWeAre_id);

$whatWeDo_id = 8;
$whatWeDo = get_page($whatWeDo_id);

$whyWeDoIt_id = 15;
$whyWeDoIt = get_page($whyWeDoIt_id);

?>
    <section id="about">
        <? Utils::svgTitle('About Us'); ?>
        <div class="about-us">
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
        </div>
    </section>