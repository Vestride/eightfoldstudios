<?php
/**
 * Twenty Eleven functions and definitions
 *
 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 980;

/**
 * Tell WordPress to run vestride_setup() when the 'after_setup_theme' hook is run.
 */
add_action( 'after_setup_theme', 'vestride_setup' );

if ( ! function_exists( 'vestride_setup' ) ):
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 *
 * To override vestride_setup() in a child theme, add your own vestride_setup to your child theme's
 * functions.php file.
 *
 * @uses load_theme_textdomain() For translation/localization support.
 * @uses add_editor_style() To style the visual editor.
 * @uses add_theme_support() To add support for post thumbnails, automatic feed links, and Post Formats.
 * @uses register_nav_menus() To add support for navigation menus.
 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
 *
 * @since Twenty Eleven 1.0
 */
function vestride_setup() {
	load_theme_textdomain( 'vestride', TEMPLATEPATH . '/languages' );

	$locale = get_locale();
	$locale_file = TEMPLATEPATH . "/languages/$locale.php";
	if ( is_readable( $locale_file ) )
            require_once( $locale_file );

	// This theme styles the visual editor with editor-style.css to match the theme style.
	add_editor_style();

	// Load up our theme options page and related code.
	require( dirname( __FILE__ ) . '/inc/theme-options.php' );

	// Grab Twenty Eleven's Ephemera widget.
	//require( dirname( __FILE__ ) . '/inc/widgets.php' );

	// Add default posts and comments RSS feed links to <head>.
	add_theme_support( 'automatic-feed-links' );

	// This theme uses wp_nav_menu() in one location.
	//register_nav_menu( 'primary', __( 'Primary Menu', 'vestride' ) );

	// Add support for a variety of post formats
	add_theme_support( 'post-formats', array( 'aside', 'link', 'gallery', 'status', 'quote', 'image' ) );

	// Add support for custom backgrounds
	//add_custom_background();

	// This theme uses Featured Images (also known as post thumbnails) for per-post/per-page Custom Header images
	add_theme_support( 'post-thumbnails' );
	
}
endif; // vestride_setup


/**
 * Sets the post excerpt length to 40 words.
 *
 * To override this length in a child theme, remove the filter and add your own
 * function tied to the excerpt_length filter hook.
 */
function vestride_excerpt_length( $length ) {
    return 40;
}
add_filter( 'excerpt_length', 'vestride_excerpt_length' );

/**
 * Returns a "Continue Reading" link for excerpts
 */
function vestride_continue_reading_link() {
    return ' <a href="'. esc_url( get_permalink() ) . '">' . __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'vestride' ) . '</a>';
}

/**
 * Replaces "[...]" (appended to automatically generated excerpts) with an ellipsis and vestride_continue_reading_link().
 *
 * To override this in a child theme, remove the filter and add your own
 * function tied to the excerpt_more filter hook.
 */
function vestride_auto_excerpt_more( $more ) {
    return ' &hellip;' . vestride_continue_reading_link();
}
add_filter( 'excerpt_more', 'vestride_auto_excerpt_more' );

/**
 * Adds a pretty "Continue Reading" link to custom post excerpts.
 *
 * To override this link in a child theme, remove the filter and add your own
 * function tied to the get_the_excerpt filter hook.
 */
function vestride_custom_excerpt_more($output) {
    if (has_excerpt() && !is_attachment()) {
        $output .= vestride_continue_reading_link();
    }
    return $output;
}
add_filter( 'get_the_excerpt', 'vestride_custom_excerpt_more' );

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 */
function vestride_page_menu_args($args) {
    $args['show_home'] = true;
    return $args;
}
add_filter( 'wp_page_menu_args', 'vestride_page_menu_args' );


/**
 * Display navigation to next/previous pages when applicable
 */
function vestride_content_nav( $nav_id ) {
    global $wp_query;

    if ( $wp_query->max_num_pages > 1 ) : ?>
        <nav id="<?php echo $nav_id; ?>">
            <h3 class="assistive-text"><?php _e( 'Post navigation', 'vestride' ); ?></h3>
            <div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'vestride' ) ); ?></div>
            <div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>', 'vestride' ) ); ?></div>
        </nav><!-- #nav-above -->
    <?php endif;
}

/**
 * Return the URL for the first link found in the post content.
 *
 * @since Twenty Eleven 1.0
 * @return string|bool URL or false when no link is present.
 */
function vestride_url_grabber() {
    if (!preg_match('/<a\s[^>]*?href=[\'"](.+?)[\'"]/is', get_the_content(), $matches))
        return false;

    return esc_url_raw($matches[1]);
}

/**
 * Count the number of footer sidebars to enable dynamic classes for the footer
 */
function vestride_footer_sidebar_class() {
    $count = 0;

    if (is_active_sidebar('sidebar-3'))
        $count++;

    if (is_active_sidebar('sidebar-4'))
        $count++;

    if (is_active_sidebar('sidebar-5'))
        $count++;

    $class = '';

    switch ($count) {
        case '1':
            $class = 'one';
            break;
        case '2':
            $class = 'two';
            break;
        case '3':
            $class = 'three';
            break;
    }

    if ($class)
        echo 'class="' . $class . '"';
}

if ( ! function_exists( 'vestride_comment' ) ) :
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own vestride_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 *
 * @since Twenty Eleven 1.0
 */
function vestride_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
            case 'pingback' :
            case 'trackback' :
	?>
	<li class="post pingback">
            <p><?php _e( 'Pingback:', 'vestride' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __( 'Edit', 'vestride' ), '<span class="edit-link">', '</span>' ); ?></p>
	<?php
                    break;
            default :
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
            <article id="comment-<?php comment_ID(); ?>" class="comment">
                <footer class="comment-meta">
                    <div class="comment-author vcard">
                        <?php
                            $avatar_size = 68;
                            if ( '0' != $comment->comment_parent )
                                    $avatar_size = 39;

                            echo get_avatar( $comment, $avatar_size );

                            /* translators: 1: comment author, 2: date and time */
                            printf( __( '%1$s on %2$s <span class="says">said:</span>', 'vestride' ),
                                    sprintf( '<span class="fn">%s</span>', get_comment_author_link() ),
                                    sprintf( '<a href="%1$s"><time pubdate datetime="%2$s">%3$s</time></a>',
                                            esc_url( get_comment_link( $comment->comment_ID ) ),
                                            get_comment_time( 'c' ),
                                            /* translators: 1: date, 2: time */
                                            sprintf( __( '%1$s at %2$s', 'vestride' ), get_comment_date(), get_comment_time() )
                                    )
                            );
                        ?>

                        <?php edit_comment_link( __( 'Edit', 'vestride' ), '<span class="edit-link">', '</span>' ); ?>
                    </div><!-- .comment-author .vcard -->

                    <?php if ( $comment->comment_approved == '0' ) : ?>
                        <em class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'vestride' ); ?></em>
                        <br />
                    <?php endif; ?>

                </footer>

                <div class="comment-content"><?php comment_text(); ?></div>

                <div class="reply">
                    <?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply <span>&darr;</span>', 'vestride' ), 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
                </div><!-- .reply -->
            </article><!-- #comment-## -->

	<?php
                    break;
    endswitch;
}
endif; // ends check for vestride_comment()

if ( ! function_exists( 'vestride_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 * Create your own vestride_posted_on to override in a child theme
 *
 * @since Twenty Eleven 1.0
 */
function vestride_posted_on() {
    printf( __( '<span class="sep">Posted on </span><a href="%1$s" title="%2$s" rel="bookmark"><time class="entry-date" datetime="%3$s" pubdate>%4$s</time></a><span class="by-author"> <span class="sep"> by </span> <span class="author vcard"><a class="url fn n" href="%5$s" title="%6$s" rel="author">%7$s</a></span></span>', 'vestride' ),
        esc_url( get_permalink() ),
        esc_attr( get_the_time() ),
        esc_attr( get_the_date( 'c' ) ),
        esc_html( get_the_date() ),
        esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
        sprintf( esc_attr__( 'View all posts by %s', 'vestride' ), get_the_author() ),
        esc_html( get_the_author() )
    );
}
endif;

/**
 * Adds two classes to the array of body classes.
 * The first is if the site has only had one author with published posts.
 * The second is if a singular post being displayed
 *
 * @since Twenty Eleven 1.0
 */
function vestride_body_classes($classes) {
    if (!is_multi_author()) {
        $classes[] = 'single-author';
    }

    if (is_singular() && !is_home() && !is_page_template('showcase.php') && !is_page_template('sidebar-page.php'))
        $classes[] = 'singular';

    return $classes;
}
add_filter( 'body_class', 'vestride_body_classes' );


function create_project_post_type() {
    $labels = array(
        'name' => __('Projects'),
        'singular_name' => __('Project'),
        'menu_name' => __('Projects'),
        'add_new' => __( 'Add New' ),
        'add_new_item' => __( 'Add New Project' ),
        'edit' => __( 'Edit' ),
        'edit_item' => __( 'Edit Project' ),
        'new_item' => __( 'New Project' ),
        'view' => __( 'View Project' ),
        'view_item' => __( 'View Project' ),
        'search_items' => __( 'Search Projects' ),
        'not_found' => __( 'No projects found' ),
        'not_found_in_trash' => __( 'No projects found in Trash' ),
        'parent' => __( 'Parent Project' )
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true, 
        'show_in_menu' => true, 
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'has_archive' => true, 
        'hierarchical' => false,
        'menu_position' => 2,
        'supports' => array('title','editor','thumbnail','excerpt'),
        'taxonomies' => array('category', 'post_tag')
    ); 
    register_post_type('project',$args);
}
add_action( 'init', 'create_project_post_type' );

function project_init() {
    add_meta_box("year_completed_meta", "Year Completed", "year_completed", "project", "side", "low");
    add_meta_box("credits_meta", "Additional Info", "add_info_meta", "project", "normal", "low");
}
add_action("admin_init", "project_init");

function year_completed() {
    global $post;
    $custom = get_post_custom($post->ID);
    $year_completed = $custom["year_completed"][0];
    ?>
        <label>Year:</label>
        <input name="year_completed" value="<?php echo $year_completed; ?>" />
    <?php
}

function add_info_meta() {
    global $post;
    $custom = get_post_custom($post->ID);
    $featured = $custom["featured"][0];
    $client = $custom["client"][0];
    $programs = $custom["programs"][0];
    $programs = maybe_unserialize($programs);
    if (empty($programs)) {
        $programs = array();
    }
    $programs = array_flip($programs);
    ?>
        <p>
            <strong>Use in featured projects</strong>
            <br />
            <label>
                <input type="checkbox" name="featured" value="featured" <? echo $featured === 'featured' ? 'checked' : ''; ?> />
                Featured
            </label>
            
        </p>
        <p>
            <label for="client_meta"><strong>Built For:</strong></label>
            <br />
            <input id="client_meta" name="client" value="<?php echo $client; ?>" />
        </p>
        <p>
            <strong>Programs used:</strong>
            <br />
            <label>
                <input type="checkbox" name="programs[]" value="photoshop" <?php echo array_key_exists('photoshop', $programs) ? 'checked' : ''; ?> />
                Photoshop
            </label>
            <br />
            <label>
                <input type="checkbox" name="programs[]" value="illustrator" <?php echo array_key_exists('illustrator', $programs) ? 'checked' : ''; ?> />
                Illustrator
            </label>
            <br />
            <label>
                <input type="checkbox" name="programs[]" value="cinema4d" <?php echo array_key_exists('cinema4d', $programs) ? 'checked' : ''; ?> />
                Cinema4D
            </label>
            <br />
            <label>
                <input type="checkbox" name="programs[]" value="aftereffects" <?php echo array_key_exists('aftereffects', $programs) ? 'checked' : ''; ?> />
                After Effects
            </label>
            
        </p>
    <?php
}


function save_details() {
    global $post;
    update_post_meta($post->ID, "year_completed", $_POST["year_completed"]);
    update_post_meta($post->ID, "featured", $_POST["featured"]);
    update_post_meta($post->ID, "client", $_POST["client"]);
    update_post_meta($post->ID, "programs", $_POST["programs"]);
}
add_action('save_post', 'save_details');

/**
 *
 * @param int $posts_per_page number of posts to get. Default = null
 * @param string $img_size size of the thumbnail. Default = 'work-thumb'
 * @param bool $onlyFeatured only retrieve projects that are 'featured'. Default = false.
 */
function get_project_posts($posts_per_page = null, $img_size = 'work-thumb', $onlyFeatured = false) {
    
    $args = array(
        'post_type' => 'project',
        'numberposts' => $numberposts
    );
    
    if ($onlyFeatured) {
        $args['meta_key'] = 'featured';
    }
    
    $projects = get_posts($args);
    
    
    foreach ($projects as &$project) {
        $p_categories = get_the_category($project->ID);
        $category_names = array();
        $category_slugs = array();
        foreach ($p_categories as $cat) {
            $category_names[] = $cat->name;
            $category_slugs[] = $cat->slug;
        }

        $project->categories = implode(', ', $category_names);
        $project->category_slugs = $category_slugs;
        $project->img = get_the_post_thumbnail($project->ID, $img_size);
        $project->permalink = get_permalink($project->ID);
    }
    unset($project);
    return $projects;
}

function get_featured_project_posts() {
    return get_project_posts(null, 'featured', true);
}

function get_the_categories($delimiter = ' ', $post_id = false) {
    $thelist = '';
    $categories = get_the_category($post_id);
    for ($i = 0; $i < count($categories); $i++) {
        if ($i != 0) {
            $thelist .= $delimiter;
        }
        $thelist .= $categories[$i]->cat_name;
    }
    return $thelist;
}

function vestride_header($page = 'home') {

    ?>
            <header>
                <nav id="nav" role="navigation">
                    <ul>
                        <li><?= vestride_header_link('Home', '#main', 'home', $page) ?></li>
                        <?
                        $theme_options = vestride_get_theme_options();
                        if ($theme_options['featured'] === 'yes') {
                            echo '<li>' . vestride_header_link('Featured', '#featured', 'featured', $page) . '</li>';
                        }
                        ?>
                        <li><?= vestride_header_link('About Us', '#about', 'about', $page); ?></li>
                        <li><?= vestride_header_link('Work', '#work', 'work', $page); ?></li>
                        <li><?= vestride_header_link('Contact', '#contact', 'contact', $page); ?></li>
                        <li><?= vestride_header_link('Blog', '#blog', 'blog', $page); ?></li>
                    </ul>
                </nav>
            </header>
<?
}

function vestride_header_link($title, $href, $id, $page = '') {
    $class = '';
    if ($id == $page) {
        $class = ' class="in"';
    }
    return "<a href=\"" . get_bloginfo('url') . "/$href\" id=\"a-$id\"$class>$title</a>";
}

function vestride_svg_title($title, $width = 138, $height = 25) {
    static $gradientDefined = false;
    
    if (!$gradientDefined) : ?>
        <svg width="1" height="25" xmlns="http://www.w3.org/2000/svg" version="1.1" style="position:absolute;z-index:0;">
            <defs>
                <linearGradient id="gradientDefinition" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stop-color="#F0F0F0" />
                    <stop offset="93%"  stop-color="#9E9E9E" />
                    <stop offset="100%" stop-color="#F0F0F0" />
                </linearGradient>
            </defs>
        </svg>
        
    <? endif;
    $gradientDefined = true;
    ?>
    <h3 class="section-title text-right">
        <svg width="<?= $width; ?>" height="<?= $height; ?>" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <text x="0" y="25" fill="url(#gradientDefinition)" >
                <?= $title; ?>
            </text>
        </svg>
    </h3>
    <?
}


function vestride_end() {
    ?></body>
    </html><?
}

add_image_size('work-promo', 480, 9999);
add_image_size('work-thumb', 9999, 145);
add_image_size('featured', 980, 9999);

require_once(get_template_directory() . '/libs/Utils.class.php');