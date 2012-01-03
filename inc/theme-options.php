<?php
add_action('admin_init', 'vestride_theme_options_init');
add_action('admin_menu', 'vestride_theme_options_add_page');

/**
 * Init plugin options to white list our options
 */
function vestride_theme_options_init() {
    // If we have no options in the database, let's add them now.
    if ( false === vestride_get_theme_options() )
        add_option( 'vestride_theme_options', vestride_get_default_theme_options() );
    
    register_setting(
        'vestride_options',
        'vestride_theme_options', 
        'vestride_theme_options_validate'
    );
}

/**
 * Load up the menu page
 */
function vestride_theme_options_add_page() {
    add_theme_page(
        __('Theme Options', 'vestride'),
        __('Theme Options', 'vestride'),
        'edit_theme_options',
        'theme_options',
        'vestride_theme_options_do_page'
    );
}

function vestride_get_default_theme_options() {
    return array(
        'featured' => 'no'
    );
}

function vestride_get_theme_options() {
    return get_option( 'vestride_theme_options', vestride_get_default_theme_options() );
}

/**
 * Create the options page
 */
function vestride_theme_options_do_page() {

    if (!isset($_REQUEST['settings-updated']))
        $_REQUEST['settings-updated'] = false;
    ?>
    <div class="wrap">
    <?php screen_icon();
    echo "<h2>" . get_current_theme() . __(' Theme Options', 'vestride') . "</h2>"; ?>

        <?php if (false !== $_REQUEST['settings-updated']) : ?>
            <div class="updated fade"><p><strong><?php _e('Options saved', 'vestride'); ?></strong></p></div>
        <?php endif; ?>

        <form method="post" action="options.php">
            <?php settings_fields('vestride_options'); ?>
            <?php $options = get_option('vestride_theme_options'); ?>

            <table class="form-table">
                
                <tr valign="top"><th scope="row"><?php _e('Use the featured section', 'vestride'); ?></th>
                    <td>
                        <input id="vestride_theme_options[featured]" name="vestride_theme_options[featured]" type="checkbox" value="1" <?php checked('yes', $options['featured']); ?> />
                        <label class="description" for="vestride_theme_options[featured]"><?php _e('Featured', 'vestride'); ?></label>
                    </td>
                </tr>

            </table>

            <p class="submit">
                <input type="submit" class="button-primary" value="<?php _e('Save Options', 'vestride'); ?>" />
            </p>
        </form>
    </div>
    <?php
}

/**
 * Sanitize and validate input. Accepts an array, return a sanitized array.
 */
function vestride_theme_options_validate($input) {
    // Our checkbox value is either 0 or 1
    if (!isset($input['featured']))
        $input['featured'] = null;
    $input['featured'] = ($input['featured'] == '1' ? 'yes' : 'yes');

    // Say our text option must be safe text with no HTML tags
    //$input['sometext'] = wp_filter_nohtml_kses($input['sometext']);

    // Our select option must actually be in our array of select options
    /*if (!array_key_exists($input['selectinput'], $select_options))
        $input['selectinput'] = null;

    // Our radio option must actually be in our array of radio options
    if (!isset($input['radioinput']))
        $input['radioinput'] = null;
    if (!array_key_exists($input['radioinput'], $radio_options))
        $input['radioinput'] = null;

    // Say our textarea option must be safe text with the allowed tags for posts
    $input['sometextarea'] = wp_filter_post_kses($input['sometextarea']);
    */
    return $input;
}

// adapted from http://planetozh.com/blog/2009/05/handling-plugins-options-in-wordpress-28-with-register_setting/