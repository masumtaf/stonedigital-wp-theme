<?php
/**
 * Stone Digital functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Stone_Digital
 */

if ( ! defined( 'STDL' ) ) {
	// Replace the version number of the theme on each release.
	define( 'STDL', '1.0.0' );
}
if ( ! defined( 'STDL_GMAP_APIKEY' ) ) {
	// Google map api key
	define( 'STDL_GMAP_APIKEY', 'AIzaSyDoSQEG4A2-h1zezltVYv3D_MolmgHF4ZA' );
}

if ( ! defined( 'STDL_DIR_PATH' ) ) {
	define( 'STDL_DIR_PATH', untrailingslashit( get_template_directory() ) );
}

if ( ! defined( 'STDL_DIR_URI' ) ) {
	define( 'STDL_DIR_URI', untrailingslashit( get_template_directory_uri() ) );
}

if ( ! defined( 'STDL_ASSETS_URI' ) ) {
	define( 'STDL_ASSETS_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/' );
}

if ( ! defined( 'STDL_INC' ) ) {
	define( 'STDL_INC', untrailingslashit( get_template_directory() ) . '/inc/' );
}

$countryCode = isset($_SERVER['HTTP_CF_IPCOUNTRY']) ? $_SERVER['HTTP_CF_IPCOUNTRY'] : 'Unknown';

if ( ! defined( 'STDL_CNTRY_CODE' ) ) {
	define( 'STDL_CNTRY_CODE', $countryCode );
}



/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function stone_digital_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Stone Digital, use a find and replace
		* to change 'stone-digital' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'stone-digital', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'stone-digital' ),
			'footer-menu' => esc_html__( 'Footer Menu', 'stone-digital' ),
			'mobile-menu' => esc_html__( 'Mobile Menu', 'stone-digital' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'stone_digital_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

	/**
	 * Add Custom Image Size.
	 *
	 */
	add_image_size( 'hero-tile', 310, 200, true );
	add_image_size( 'grid-tile', 536, 350, true );
	add_image_size( 'standard-size-full', 1140, 650, true );
	add_image_size( 'standard-size-sm', 850, 450, true );
	add_image_size( 'project-tile', 1100, 900, true );
	add_image_size( 'square', 600, 600, true );
	add_image_size( 'heighlight-tile', 690, 465, true );
	add_image_size( 'reviewer-thumb', 150, 150, true );
	add_image_size( 'team-thumb', 693, 595, true );
	add_image_size( 'hobby-gallery', 475, 532, true );

	
	add_theme_support('wp-block-styles');
	add_theme_support('editor-style');
	add_theme_support('editor-styles');
	add_editor_style('editor-style.css');

}
add_action( 'after_setup_theme', 'stone_digital_setup' );

/**
 * Showing Image block editor - custom size
 */
add_filter( 'image_size_names_choose', 'stdl_support_block_image_sizes' ); 
function stdl_support_block_image_sizes($sizes) {
    return array_merge($sizes, array(
        'grid-tile' => __('Grid Tile size'),
        'standard-size-full' => __('Standard Full'),
        'standard-size-sm' => __('Standard Sm'),
        'square' => __('square image'),
        'heighlight-tile' => __('Heighlight Tile'),
        'project-tile' => __('Project Tile'),
        'reviewer-thumb' => __('Reviewer Thumb'),
    ));
}

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function stone_digital_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'stone_digital_content_width', 640 );
}
add_action( 'after_setup_theme', 'stone_digital_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function stone_digital_widgets_init() {
	register_sidebar(
			array(
				'name'          => esc_html__( 'Sidebar', 'stone-digital' ),
				'id'            => 'sidebar-1',
				'description'   => esc_html__( 'Add widgets here.', 'stone-digital' ),
				'before_widget' => '<section id="%1$s" class="widget %2$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			)
	);
	register_sidebar(	
		array(
			'name'          => esc_html__( 'Footer Sidebar One', 'stone-digital' ),
			'id'            => 'footer-1',
			'description'   => esc_html__( 'Add widgets here.', 'stone-digital' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar Two', 'stone-digital' ),
			'id'            => 'footer-2',
			'description'   => esc_html__( 'Add widgets here.', 'stone-digital' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar Three', 'stone-digital' ),
			'id'            => 'footer-3',
			'description'   => esc_html__( 'Add widgets here.', 'stone-digital' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer Sidebar Four', 'stone-digital' ),
			'id'            => 'footer-4',
			'description'   => esc_html__( 'Add widgets here.', 'stone-digital' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'stone_digital_widgets_init' );

/**
 * Enqueue Editor scripts and styles.
 */
add_action( 'enqueue_block_editor_assets', 'stone_digital_editor_assets' );
function stone_digital_editor_assets() {
	wp_enqueue_style( 'stone-digital-dahsboard-css', STDL_ASSETS_URI . 'css/admin/admin-dahsboard.css', [], time(), 'all' );
	// wp_enqueue_style( 'stone-digital-editor-css', STDL_ASSETS_URI . 'css/style.min.css', [], time(), 'all' );

	wp_enqueue_script( 'stone-digital-editor-js', STDL_ASSETS_URI . 'js/stone-digital.js', array('jquery'), time(), true );
}


/**
 * Enqueue scripts and styles.
 */
function stone_digital_scripts() {
	$google_map_api_key = get_field('google_map_api_key', 'option');
	wp_enqueue_style( 'stone-digital-style', get_stylesheet_uri(), array(), time() );
	wp_enqueue_style( 'stone-digital-vendor-style', STDL_ASSETS_URI . 'css/vendor-styles.min.css', array(), time() );
	if ( is_singular('team') ) {
		wp_enqueue_style( 'swiper-css', STDL_ASSETS_URI . 'css/swiper-bundle.min.css' );
	}
	wp_enqueue_style( 'stone-digital-main-style', STDL_ASSETS_URI . 'css/style.min.css', array(), time() );

	wp_enqueue_script( 'stone-vendor-scripts-js', STDL_ASSETS_URI . 'js/vendor-scripts.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-page-scroll-js', STDL_ASSETS_URI . 'js/page-scroll.js', array('jquery'), time(), true );
	if ( is_singular('post') ) {
		wp_enqueue_script( 'stone-table-of-contents-js', STDL_ASSETS_URI . 'js/table-of-contents.js', array('jquery'), time(), true );
	}
	// wp_enqueue_script( 'stone-waitforimages-js', STDL_ASSETS_URI . 'js/jquery.waitforimages.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-gsap.min-js', STDL_ASSETS_URI . 'js/gsap.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-draggable.gsap-js', STDL_ASSETS_URI . 'js/Draggable.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-scrolltoplugin.gsap-js', STDL_ASSETS_URI . 'js/ScrollToPlugin.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-scrolltrigger-js', STDL_ASSETS_URI . 'js/ScrollTrigger.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-scrollmagic.gsap-js', STDL_ASSETS_URI . 'js/ScrollMagic.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-animation.gsap-js', STDL_ASSETS_URI . 'js/animation.gsap.min.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-animation-js', STDL_ASSETS_URI . 'js/animation.js', array('jquery'), time(), true );
	wp_enqueue_script( 'stone-googleapis-js', 'https://maps.googleapis.com/maps/api/js?key=' . $google_map_api_key , array(), '1.0.0' , false );

	if ( is_singular('team') ) {
		wp_enqueue_script( 'swiper-js', STDL_ASSETS_URI . 'js/swiper-bundle.min.js', array('jquery'), time(), true );
	}
	wp_enqueue_script( 'stone-digital-main-js', STDL_ASSETS_URI . 'js/stone-digital.js', array('jquery'), time(), true );

	wp_localize_script( 'stone-digital-main-js', 'stdl_ajax_object', array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce('stdl_thm_nonce'),
		'cntry_code' => STDL_CNTRY_CODE,
		'phone_no_au' => STDL_PHONE_NO_AU,
		'phone_no_usa' => STDL_PHONE_NO_USA,
	));

}
add_action( 'wp_enqueue_scripts', 'stone_digital_scripts' );


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require STDL_INC . 'helper-functions.php';

// /**
//  * Customizer additions.
//  */
// require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

function stdl_show_template($path){
    if(defined('STDL_DIR_PATH')){
      $theme_base = STDL_DIR_PATH;
    } else {
      $theme_base = get_template_directory();
    }

    if(!str_starts_with($path, '/')){
      $path = '/' . $path;
    }

    $path = '/inc/template-parts' . $path;

    if(!str_ends_with($path, '.php')){
      $path .= '.php';
    }

    require $theme_base . $path;
}

/**
 * Custom Post Type (Projects).
 */
require STDL_INC . 'classes/class-menu-walker.php';

/**
 * Custom Post Type (Projects).
 */
require STDL_INC . 'classes/class-cpt-projects.php';

/**
 * Custom Post Type (Team).
 */
require STDL_INC . 'classes/class-cpt-team.php';

/**
 * Custom Post Type (Service).
 */
require STDL_INC . 'classes/class-cpt-services.php';

/**
 * Custom Post Type (Career).
 */
require STDL_INC . 'classes/class-cpt-career.php';

/**
 * Custom Post Type (Career).
 */
require STDL_INC . 'classes/class-cpt-popup.php';

/**
 * Custom Post Type (Testimonials).
 */
require STDL_INC . 'classes/class-cpt-testimonials.php';

/**
 * Custom ACF Block Init.
 */
require STDL_INC . 'blocks/block-init.php';

/**
 *  Set Acf Block Id
 */
add_filter(
    'acf/pre_save_block',
    function( $attributes ) {
        if ( empty( $attributes['id'] ) ) {
            $attributes['id'] = 'acf-block-' . uniqid();
        }
        return $attributes;
    }
);
	
//For theme settings
if( function_exists('acf_add_options_page') ) {
	$option_page = acf_add_options_page(array(
		'page_title' 	=> 'Theme Options',
		'menu_title' 	=> 'Theme Option',
		'menu_slug' 	=> 'theme-options',
		'capability' 	=> 'edit_posts',
		'redirect' 	=> false
	));
}

function stdl_support_gmap_api_acf( $api ){
	$$google_map_api_key = get_field('google_map_api_key', 'option');

    acf_update_setting('google_api_key', 'AIzaSyDoSQEG4A2-h1zezltVYv3D_MolmgHF4ZA');
    $api['key'] = 'AIzaSyDoSQEG4A2-h1zezltVYv3D_MolmgHF4ZA' ;
    
    return $api;
    
}

add_filter('acf/fields/google_map/api', 'stdl_support_gmap_api_acf');

// Setting.
function stdl_support_gmap_acf_init() {
    $google_map_api_key = get_field('google_map_api_key', 'option');
    acf_update_setting('google_api_key', 'AIzaSyDoSQEG4A2-h1zezltVYv3D_MolmgHF4ZA');
}

add_action('acf/init', 'stdl_support_gmap_acf_init');

/**
 *  Add icon before input fields in gravity form
 */

add_filter('gform_field_content_1', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_4', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_5', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_6', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_7', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_8', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_10', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_11', 'add_svg_icon_before_input', 10, 5);
add_filter('gform_field_content_12', 'add_svg_icon_before_input', 10, 5);

function add_svg_icon_before_input($field_content, $field, $value, $lead_id, $form_id) {

	do_action( 'qm/debug', $field );
	
    if ( $field->type == 'name') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/single-user.svg') .'</span>';
        $field_content .= $svg_icon;
    }    
	if ( $field->type == 'text') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/bookmark.svg') .'</span>';
        $field_content .= $svg_icon ;
    }  
	if ( $field->type == 'email') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/mail-email.svg') .'</span>';
        $field_content .= $svg_icon ;
    }  
	if ($field->type == 'phone') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/phone.svg') .'</span>';
        $field_content .= $svg_icon;
    }
	if ($field->type == 'website') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/web-network.svg') .'</span>';
        $field_content .= $svg_icon;
    }
	if ($field->type == 'textarea') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/messages.svg') .'</span>';
        $field_content .= $svg_icon;
    }
	if ($field->type == 'fileupload') {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/file-text.svg') .'</span>';
        $field_content .= $svg_icon;
    }

    return $field_content;
}

add_filter('gform_field_content_10', 'add_svg_icon_before_input_for_location_text_field', 10, 5);
add_filter('gform_field_content_11', 'add_svg_icon_before_input_for_location_text_field', 10, 5);
function add_svg_icon_before_input_for_location_text_field($field_content, $field, $value, $lead_id, $form_id) {
	if ($field->id == 8 ) {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/location.svg') .'</span>';
        $field_content .= $svg_icon;
    }

    return $field_content;
}

add_filter('gform_field_content_12', 'add_svg_icon_before_input_for_business_name_text_field', 10, 5);
function add_svg_icon_before_input_for_business_name_text_field($field_content, $field, $value, $lead_id, $form_id) {
	if ($field->id == 12 ) {
        $svg_icon = '<span class="stdl-icon">'. stdl_get_svg('contact-icon/business.svg') .'</span>';
        $field_content .= $svg_icon;
    }

    return $field_content;
}

add_filter( 'comment_form_defaults', 'wpsites_comment_form_defaults' );
function wpsites_comment_form_defaults( $defaults ) {
 
	$defaults['title_reply'] = __( 'Leave A Comment' );
	$defaults['label_submit'] = __( 'Post Comment', 'stone-digital' );
	return $defaults;
}

add_filter( 'comment_form_fields', 'custom_comment_field' );
function custom_comment_field( $fields ) {
    // What fields you want to control.
    $comment_field = $fields['author'];
    $comment_field = $fields['email'];
    $comment_field = $fields['comment'];
    $comment_field = $fields['cookies'];

    // The fields you want to unset (remove).
    unset($fields['author']);
    unset($fields['email']);
    unset($fields['url']);
    unset($fields['comment']);
    unset($fields['cookies']);

    // Display the fields to your own taste.
    // The order in which you place them will determine in what order they are displayed.
    $fields['author'] = '<p class="comment-form-author"><label for="author">Name <span class="required">*</span></label><span class="stdl-icon">'. stdl_get_svg('contact-icon/single-user.svg') .'</span><input type="text" id="author" name="author" require="required" placeholder="Name"></p>';
    $fields['email'] = '<p class="comment-form-email"><label for="email">Email <span class="required">*</span></label><span class="stdl-icon">'. stdl_get_svg('contact-icon/mail-email.svg') .'</span><input type="text" id="email" name="email" require="required" placeholder="Email"></p>'; 
	$fields['url'] = '<p class="comment-form-url"><label for="url">Url <span class="required">*</span></label><span class="stdl-icon">'. stdl_get_svg('contact-icon/web-network.svg') .'</span><input type="url" id="url" name="url" require="required" placeholder="Url"></p>';
    $fields['comment'] = '<p class="comment-form-comment"><label for="comment">Message <span class="required">*</span></label><span class="stdl-icon">'. stdl_get_svg('contact-icon/messages.svg') .'</span><textarea id="comment" name="comment" required="required" placeholder="Message"></textarea></p>';
    $fields['cookies'] = '<p class="comment-form-cookies-consent"><input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"><label for="wp-comment-cookies-consent">By submitting this form: You agree to the processing of the submitted personal data in accordance with Stone Digitals Privacy Policy.</label></p>';
    return $fields;
}


add_filter( 'render_block', 'stdl_add_class_to_blocks', 10, 2 );

function stdl_add_class_to_blocks( $block_content, $block ) {

    if ( 'core/list' === $block['blockName'] ) {
        $block_content = new WP_HTML_Tag_Processor( $block_content );
        $block_content->next_tag();
        $block_content->add_class( 'wp-block-list' );
        $block_content->get_updated_html();
    }  
	if ( 'core/paragraph' === $block['blockName'] ) {
        $block_content = new WP_HTML_Tag_Processor( $block_content );
        $block_content->next_tag(); 
        $block_content->add_class( 'block-text' );
        $block_content->get_updated_html();
    }

    return $block_content;
}

function remove_post_type_from_wp_sitemap( $post_types ) {
	unset( $post_types['popup'] );
	unset( $post_types['testimonial'] );
	return $post_types;
}

add_filter( 'wp_sitemaps_post_types', 'remove_post_type_from_wp_sitemap' );

// add the 'novalidate' setting to <form> tag

function stdl_novalidate($form_tag, $form) {
	// collect field types
	$types = array();
	foreach ( $form['fields'] as $field ) {
	  $types[] = $field['type'];
	}
	// bail if form doesn't have a website field
	if ( ! in_array('website', $types) )
	  return $form_tag;
		// add the 'novalidate' setting to the website <form> element
		$pattern = "#method=\'post\'#i";
		$replacement = "method='post' novalidate";
		$form_tag = preg_replace($pattern, $replacement, $form_tag);
	return $form_tag;
}
add_filter('gform_form_tag','stdl_novalidate',10,2);
  
// add "http://" to website if protocol omitted
function stdl_protocol($form) {
	// loop through fields, taking action if website
	foreach ( $form['fields'] as $field ) {
		// skip if not a website field
		if ( 'website' != $field['type'] )
			continue;
			// retrieve website field value
			$value = RGFormsModel::get_field_value($field);
			// if there is no protocol, add "http://"
			// Recognizes ftp://, ftps://, http://, https://
		if ( ! empty($value) && ! preg_match("~^(?:f|ht)tps?://~i", $value) ) {
			$value = "http://" . $value;
			// update value in the $_POST array
			$id = (string) $field['id'];
			$_POST['input_' . $id] = $value;
		}
	}
	return $form;
}
add_filter('gform_pre_validation','stdl_protocol');


$stdl_phone_no_au = get_field('phone_number_au', 'option');
$stdl_phone_no_usa = get_field('phone_number_usa', 'option');
if ( ! defined( 'STDL_PHONE_NO_AU' ) ) {
	define( 'STDL_PHONE_NO_AU', $stdl_phone_no_au );
}
if ( ! defined( 'STDL_PHONE_NO_USA' ) ) {
	define( 'STDL_PHONE_NO_USA', $stdl_phone_no_usa );
}

if ( STDL_CNTRY_CODE === 'US') {
    define('STDL_PHONE_NO', $stdl_phone_no_usa);
} else {
    define('STDL_PHONE_NO', $stdl_phone_no_au);
}


// add_filter( 'gform_ip_address', 'filter_gform_ip_address' );
// add_filter( 'gform_ip_address', 'get_user_ip' );

// Function to get user's IP address
function stdl_get_user_ip() {
    $ip_address = '';

    // Check for Cloudflare headers
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $ip_address = $_SERVER['HTTP_CF_CONNECTING_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Check for forwarded IP address
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        // Get the client's IP address
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }

    return $ip_address;
}

// Track Second Ip Address
// Function to get user's IP address and fetch country information
function stdl_get_user_country() {
	$country = '';
    $ip_address = '';
    $ip_address = stdl_get_user_ip();
    $api_url = 'http://ip-api.com/json/' . $ip_address;
    $jsondata = file_get_contents($api_url);
    if ($jsondata === false) {
        return '';
    }
    $jsondata = json_decode($jsondata);
    if (!$jsondata || !isset($jsondata->country)) {
        return '';
    }
	$country = $jsondata->country;
    return $country;
}

add_action('gform_pre_submission_1', 'project_enquiry_home_form_1');
function project_enquiry_home_form_1($form){
	//live site input_9 & input_12
	//staging site input_7 & input_12
	$ip = stdl_get_user_ip();
    $_POST['input_9'] = $ip;

    $country = stdl_get_user_country();
    $_POST['input_12'] = $country;
}

add_action('gform_pre_submission_2', 'claim_website_audit_form_2');
function claim_website_audit_form_2($form){
	//staging site input_7 & input_3
    $country = stdl_get_user_country();
    $_POST['input_3'] = $country;
}

add_action('gform_pre_submission_4', 'project_enquiry_form_4');
function project_enquiry_form_4($form){
	//live site input_12 & input_16
	//staging site input_12 & input_16
	$ip = stdl_get_user_ip();
    $_POST['input_12'] = $ip;

    $country = stdl_get_user_country();
    $_POST['input_16'] = $country;
}

add_action('gform_pre_submission_5', 'job_application_form_5');
function job_application_form_5($form){
	//live site input_12 & input_16
	//staging site input_12 & input_13

	$ip = stdl_get_user_ip();
    $_POST['input_12'] = $ip;
	
	$country = stdl_get_user_country();
    $_POST['input_16'] = $country;
}

add_action('gform_pre_submission_6', 'popup_form_6');
function popup_form_6($form){
	//live site input_9 & input_10
	//staging site input_7 & input_9
	
	$ip = stdl_get_user_ip();
    $_POST['input_9'] = $ip;
	
	$country = stdl_get_user_country();
    $_POST['input_10'] = $country;
}

add_action('gform_pre_submission_7', 'book_a_free_consult_form_7');
function book_a_free_consult_form_7($form){
	//live site input_7 & input_11
	//staging site input_7 & input_8
	$ip = stdl_get_user_ip();
    $_POST['input_7'] = $ip;

	$country = stdl_get_user_country();
    $_POST['input_11'] = $country;
}

add_action('gform_pre_submission_8', 'referral_partner_signup_form_8');
function referral_partner_signup_form_8($form){
	//live site input_6 & input_7
	//staging site input_8 & input_9
	$ip = stdl_get_user_ip();
    $_POST['input_6'] = $ip;

	$country = stdl_get_user_country();
    $_POST['input_7'] = $country;
}

// // Display confirmation popup in frontend
add_filter( 'gform_confirmation_2', 'stdl_confirmation_loaded', 10, 4 );
function stdl_confirmation_loaded( $confirmation, $form, $entry, $ajax ) {

	foreach ($form['confirmations'] as $confirm) {

		if( ( $confirm['type'] == "message" || $confirm['type'] == "page" ||  $confirm['type'] == "redirect" ) ){

				GFCommon::log_debug( 'gform_confirmation: running.' );
				$forms = array(2); // Target forms with id 3 Change this to fit your needs.
		
				if ( ! in_array( $form['id'], $forms ) ) {
					return $confirmation;
				}

				$field_id = 1;
		
				$email_value = rgar($entry, $field_id);
				$url = esc_url_raw( esc_url(home_url('/post-lead-magnet-form'))); // 'evaluation'
				
				// GFCommon::log_debug( __METHOD__ . '(): Redirect to URL: ' . $url );
				$final_url = add_query_arg( array( 'email' => $email_value ), $url );
				GFCommon::log_debug(__METHOD__ . '(): Redirect to URL: ' . $final_url);
				$confirmation .= "<script type=\"text/javascript\">
				setTimeout(function() { window.open('$final_url', '_self')}, 300); </script>";
    			return $confirmation;
		}
		else{
			return $confirmation;
		}

	}
}

// claim_website_audit(id 2) form confirmation send email to referral form (id 8) 
function get_email_from_claim_website_audit($value){
	$dynamic_email = isset($_GET['email']) ? sanitize_email($_GET['email']) : '';
	return $dynamic_email;
}

add_filter( 'gform_field_value_stdl_get_email', 'get_email_from_claim_website_audit' );

add_action('gform_after_submission_11', 'send_slack_emergency_request', 10, 2);
function send_slack_emergency_request($entry, $form) {
    // Check if the Slack webhook URL and channel name are defined
	$slack_webhhok_url = get_field('slack_webhook', 'option');
	$slack_channel_name = get_field('slack_channel', 'option');

    if (!$slack_webhhok_url || !$slack_channel_name) {
        return;
    }

    // Get form field values
    $first_name = rgar($entry, '11.3');
    $email = rgar($entry, '5');
    $phone = rgar($entry, '15');
    $message = rgar($entry, '7');     
    $business = rgar($entry, '3');
    $site_url = rgar($entry, '6');
    $submission_time = current_time('mysql');

    // Create Slack client
	$client = new \Maknz\Slack\Client($slack_webhhok_url);
    // Prepare Slack message
    $client->to($slack_channel_name)->attach([
        'fallback' => 'New Emergency Request Form',
        'color' => '#36a64f',
        'fields' => [
            [
                'title' => 'Emergency Request',
                'value' => "Name: $first_name, Email: $email, Phone: $phone, Business: $business, Site Url: $site_url",
				'long' => true
            ], 
			[
                'title' => 'Message',
                'value' => $message,
				'long' => true
            ],
            [
                'title' => 'Submitted At',
                'value' => $submission_time,
            	'long' => true
            ]
        ]
    ])->send("Emergency Request For {$site_url} from {$first_name}");
}

//post form data to Go High Level when submission
add_action('gform_after_submission_4', 'send_to_gohighlevel', 10, 2);

function send_to_gohighlevel($entry, $form) {
    // Replace YOUR_API_KEY with your actual GoHighLevel API key
    $api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkltRm1tb09OY253NFRxbFNUQ0JrIiwiY29tcGFueV9pZCI6InlyUTVFTUxLSm1IdENYOWhuZm91IiwidmVyc2lvbiI6MSwiaWF0IjoxNjkxNTUwNTEwNDkwLCJzdWIiOiJ1c2VyX2lkIn0.TNI3KRo4VdYw1K_MWLfc6uOTATBzF24NF4Z0Tub1hwA';
    $new_website_tag = rgar($entry, '7');
	$budget_tag = rgar($entry, '10'); 
	$url_tag = rgar($entry, '5'); 
    $data = array(
        'name' => rgar($entry, '1.3'),
        'email' => rgar($entry, '3'), 
        'phone' => rgar($entry, '4')
        // 'tags' => array($new_website_tag, $budget_tag, $url_tag)
    );
    $json_data = json_encode($data);
	$url = 'https://rest.gohighlevel.com/v1/contacts';
	$args = array(
		'method'      => 'POST',
		'body'        => $json_data,
		'headers'     => array(
			'Content-Type'  => 'application/json',
			'Authorization' => 'Bearer ' . $api_key
		)
	);
	// Send the request
	$response = wp_remote_request($url, $args);
	// Check for errors
	if (is_wp_error($response)) {
		$error_message = $response->get_error_message();
		error_log('Error sending data to GoHighLevel: ' . $error_message);
	} else {
		// Log the response or handle it as needed
		error_log('Data successfully sent to GoHighLevel');
	}
}
