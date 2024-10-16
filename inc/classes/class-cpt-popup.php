<?php
/**
 * 
 * Custom Post Type - PopUps
 * 
 * @package Stone_Digital
 */


defined( 'ABSPATH' ) || exit; // disable direct access

/**
 * Register Post Types
 *
 * @package Stone_Digital
 * @since 1.0.0
 */

class Stone_Digital_PopUp {

    private static $instance;
    
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) :
			self::$instance = new self();
		endif;

		return self::$instance;
	}


	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'init', [ $this, 'popup_cpt' ], 1 );
        // add_action( 'init', [ $this, 'popup_taxonomy' ], 1);
        add_filter( 'manage_edit-popup_columns', [ $this, 'popup_edit_columns' ] );
        add_action( 'manage_popup_posts_custom_column', [ $this, 'popup_column_display' ], 10, 2 );

	}

	// Register Custom Post Type PopUp
	public function popup_cpt() {

		$labels = [
			'name'                  => _x( 'PopUps', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'PopUp', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'PopUps', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'PopUp', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'PopUp Archives', 'stone-digital' ),
			'attributes'            => __( 'PopUp Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent PopUp:', 'stone-digital' ),
			'all_items'             => __( 'All PopUps', 'stone-digital' ),
			'add_new_item'          => __( 'Add New PopUp', 'stone-digital' ),
			'add_new'               => __( 'Add New', 'stone-digital' ),
			'new_item'              => __( 'New PopUp', 'stone-digital' ),
			'edit_item'             => __( 'Edit PopUp', 'stone-digital' ),
			'update_item'           => __( 'Update PopUp', 'stone-digital' ),
			'view_item'             => __( 'View PopUp', 'stone-digital' ),
			'view_items'            => __( 'View PopUp', 'stone-digital' ),
			'search_items'          => __( 'Search PopUp', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into PopUp', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this PopUp', 'stone-digital' ),
			'items_list'            => __( 'PopUps list', 'stone-digital' ),
			'items_list_navigation' => __( 'PopUps list navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter PopUps list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'PopUps', 'stone-digital' ),
			'description'         => __( 'The PopUps', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-images-alt2',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
			],
			// 'taxonomies'          => [],
			'public'              => false,
            'rewrite'             => array( 'slug' => 'popup', 'with_front' => false ),
			'show_ui'             => true,
            'show_in_rest'        => true, // for enable gutenberg editor for custom post type - 
			'show_in_menu'        => true,
			'menu_position'       => 10,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'post',
		];

        add_filter( 'enter_title_here',  [ $this, 'change_default_title' ] ); 

		register_post_type( 'popup', $args );

	}

    // Register Custom Post Type PopUp Taxonomy
    public function popup_taxonomy() {
	
        register_taxonomy(
            "popup_cat", 
            array("popup"), 
            array(
                "hierarchical"   => true, 
                "label"          => __( 'Categories', 'stone-digital' ), 
                "singular_label" => __( 'Category', 'stone-digital' ),
                'show_ui'        => true,
                'show_admin_column' => true,
                "rewrite"        => true
            )
        );
    
        register_taxonomy( 
            'popup_tag', 
            'popup', 
            array( 
                'hierarchical'  => false, 
                'label'         => __( 'Tags', 'stone-digital' ), 
                'singular_name' => __( 'Tag', 'stone-digital' ),
                'show_ui'       => true, 
                'rewrite'       => true, 
                'query_var'     => true 
            )  
        );
    
    }
  
    
    public function change_default_title( $title ) {
        $screen = get_current_screen();

        if ( 'popup' == $screen->post_type )
            $title = esc_html__( "PopUp Title Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to popup Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function popup_edit_columns( $popup_columns ) {
        $popup_columns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "popup_cat" => esc_html__('Categories', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $popup_columns;
    }
   
    public function popup_column_display( $popup_columns, $post_id ) {
	
        switch ( $popup_columns ) {
            
            // Display the thumbnail in the column view
            case "thumbnail":
                $width = (int) 64;
                $height = (int) 64;
                $thumbnail_id = get_post_meta( $post_id, '_thumbnail_id', true );
                
                // Display the featured image in the column view if possible
                if ( $thumbnail_id ) {
                    $thumb = wp_get_attachment_image( $thumbnail_id, array($width, $height), true );
                }
                if ( isset( $thumb ) ) {
                    echo $thumb; // No need to escape
                } else {
                    echo esc_html__('None', 'stone-digital');
                }
                break;
        }
    }

}


/**
 * Init this class by calling 'get_instance()' method
 */
Stone_Digital_PopUp::get_instance();