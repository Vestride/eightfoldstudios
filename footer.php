<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
?>
        <footer>
            <p>
                Eightfold<span class="main-color">Studios</span>
                <br />
                <small>&copy; <?= date('Y'); ?> Eightfold Studios. All rights reserved.</small>
            </p>
        </footer>
    </div> <!--! end of #container -->


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script>window.jQuery || document.write('<script src="<? echo get_template_directory_uri(); ?>/js/libs/jquery-1.7.1.min.js"><\/script>')</script>


    <script defer src="<? echo get_template_directory_uri(); ?>/js/plugins.js"></script>
    <script defer src="<? echo get_template_directory_uri(); ?>/js/script.js"></script>


    <!-- Change UA-XXXXX-X to be your site's ID -->
    <script>
    /*window._gaq = [['_setAccount','UAXXXXXXXX1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });*/
    
    Vestride.themeUrl = '<? echo get_template_directory_uri(); ?>';
    </script>


    <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
    <!--[if lt IE 7 ]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
    <![endif]-->

<?php wp_footer(); ?>