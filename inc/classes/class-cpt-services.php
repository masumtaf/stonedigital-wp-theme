<?php
/**
 * 
 * Custom Post Type - Services
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

class Stone_Digital_Services {

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
		add_action( 'init', [ $this, 'service_cpt' ], 1 );
        add_action( 'init', [ $this, 'service_taxonomy' ], 1);
        add_filter( 'manage_edit-service_columns', [ $this, 'service_edit_columns' ] );
        add_action( 'manage_service_posts_custom_column', [ $this, 'service_column_display' ], 10, 2 );

	}

	// Register Custom Post Type Service
	public function service_cpt() {

		$labels = [
			'name'                  => _x( 'Services', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'Service', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'Services', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'Service', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'Service Archives', 'stone-digital' ),
			'attributes'            => __( 'Service Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent Service:', 'stone-digital' ),
			'all_items'             => __( 'All Services', 'stone-digital' ),
			'add_new_item'          => __( 'Add New Service', 'stone-digital' ),
			'add_new'               => __( 'Add New', 'stone-digital' ),
			'new_item'              => __( 'New Service', 'stone-digital' ),
			'edit_item'             => __( 'Edit Service', 'stone-digital' ),
			'update_item'           => __( 'Update Service', 'stone-digital' ),
			'view_item'             => __( 'View Service', 'stone-digital' ),
			'view_items'            => __( 'View Service', 'stone-digital' ),
			'search_items'          => __( 'Search Service', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into Service', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Service', 'stone-digital' ),
			'items_list'            => __( 'Services list', 'stone-digital' ),
			'items_list_navigation' => __( 'Services list navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter Services list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'Services', 'stone-digital' ),
			'description'         => __( 'The Services', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-carrot',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
			],
			// 'taxonomies'          => [],
			'public'              => true,
            'rewrite'             => array( 'slug' => 'service', 'with_front' => false ),
			'show_ui'             => true,
            'show_in_rest'        => true, // for enable gutenberg editor for custom post type - 
			'show_in_menu'        => true,
			'menu_position'       => 6,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		];

        add_filter( 'enter_title_here',  [ $this, 'change_default_title' ] ); 

		register_post_type( 'service', $args );

	}

    // Register Custom Post Type Service Taxonomy
    public function service_taxonomy() {
	
        register_taxonomy(
            "service_cat", 
            array("service"), 
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
            'service_tag', 
            'service', 
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

        if ( 'service' == $screen->post_type )
            $title = esc_html__( "Enter Service Name Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to service Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function service_edit_columns( $service_columns ) {
        $service_columns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "service_cat" => esc_html__('Categories', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $service_columns;
    }
   
    public function service_column_display( $service_columns, $post_id ) {
	
        switch ( $service_columns ) {
            
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
                
            // Display the service tags in the column view
            case "service_cat":
            
            if ( $category_list = get_the_term_list( $post_id, 'service_cat', '', ', ', '' ) ) {
                echo $category_list; // No need to escape
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
Stone_Digital_Services::get_instance();