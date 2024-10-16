<?php
/**
 * 
 * Custom Post Type - Testimonials
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

class Stone_Digital_Testimonials {

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
		add_action( 'init', [ $this, 'testimonial_cpt' ], 1 );
        add_filter( 'manage_edit-testimonial_columns', [ $this, 'testimonial_edit_columns' ] );
        add_action( 'manage_testimonial_posts_custom_column', [ $this, 'testimonial_column_display' ], 10, 2 );

	}

	// Register Custom Post Type Testimonial
	public function testimonial_cpt() {

		$labels = [
			'name'                  => _x( 'Testimonials', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'Testimonial', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'Testimonials', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'Testimonial', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'Testimonial Archives', 'stone-digital' ),
			'attributes'            => __( 'Testimonial Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent Testimonial:', 'stone-digital' ),
			'all_items'             => __( 'All Testimonials', 'stone-digital' ),
			'add_new_item'          => __( 'Add New Testimonial', 'stone-digital' ),
			'add_new'               => __( 'Add New', 'stone-digital' ),
			'new_item'              => __( 'New Testimonial', 'stone-digital' ),
			'edit_item'             => __( 'Edit Testimonial', 'stone-digital' ),
			'update_item'           => __( 'Update Testimonial', 'stone-digital' ),
			'view_item'             => __( 'View Testimonial', 'stone-digital' ),
			'view_items'            => __( 'View Testimonial', 'stone-digital' ),
			'search_items'          => __( 'Search Testimonial', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into Testimonial', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Testimonial', 'stone-digital' ),
			'items_list'            => __( 'Testimonials list', 'stone-digital' ),
			'items_list_navigation' => __( 'Testimonials list navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter Testimonials list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'Testimonials', 'stone-digital' ),
			'description'         => __( 'The Testimonials', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-format-quote',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
			],
			// 'taxonomies'          => [],
			'public'              => false,
			'rewrite'             => array( 'slug' => 'testimonial', 'with_front' => false ),
			'show_ui'             => true,
            'show_in_rest'        => true, // for enable gutenberg editor for custom post type - 
			'show_in_menu'        => true,
			'menu_position'       => 11,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'post',
		];

        add_filter( 'enter_title_here',  [ $this, 'change_default_title' ] ); 

		register_post_type( 'testimonial', $args );

	}
    
    public function change_default_title( $title ) {
        $screen = get_current_screen();

        if ( 'testimonial' == $screen->post_type )
            $title = esc_html__( "Enter Reviewer's Name Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to testimonial Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function testimonial_edit_columns( $testimonialcolumns ) {
        $testimonialcolumns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $testimonialcolumns;
    }
   
    public function testimonial_column_display( $testimonialcolumns, $post_id ) {
	
        switch ( $testimonialcolumns ) {
            
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
Stone_Digital_Testimonials::get_instance();