<?php
/**
 * 
 * Custom Post Type - Careers
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

class Stone_Digital_Career {

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
		add_action( 'init', [ $this, 'career_cpt' ], 1 );
        add_action( 'init', [ $this, 'career_taxonomy' ], 1);
        add_filter( 'manage_edit-career_columns', [ $this, 'career_edit_columns' ] );
        add_action( 'manage_career_posts_custom_column', [ $this, 'career_column_display' ], 10, 2 );

	}

	// Register Custom Post Type Career
	public function career_cpt() {

		$labels = [
			'name'                  => _x( 'Careers', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'Career', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'Careers', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'Career', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'Career Archives', 'stone-digital' ),
			'attributes'            => __( 'Career Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent Career:', 'stone-digital' ),
			'all_items'             => __( 'All Careers', 'stone-digital' ),
			'add_new_item'          => __( 'Add New Career', 'stone-digital' ),
			'add_new'               => __( 'Add New', 'stone-digital' ),
			'new_item'              => __( 'New Career', 'stone-digital' ),
			'edit_item'             => __( 'Edit Career', 'stone-digital' ),
			'update_item'           => __( 'Update Career', 'stone-digital' ),
			'view_item'             => __( 'View Career', 'stone-digital' ),
			'view_items'            => __( 'View Career', 'stone-digital' ),
			'search_items'          => __( 'Search Career', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into Career', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Career', 'stone-digital' ),
			'items_list'            => __( 'Careers list', 'stone-digital' ),
			'items_list_navigation' => __( 'Careers list navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter Careers list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'Careers', 'stone-digital' ),
			'description'         => __( 'The Careers', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-groups',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
			],
			// 'taxonomies'          => [],
			'public'              => true,
            'rewrite'             => array( 'slug' => 'career', 'with_front' => false ),
			'show_ui'             => true,
            'show_in_rest'        => true, // for enable gutenberg editor for custom post type - 
			'show_in_menu'        => true,
			'menu_position'       => 9,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		];

        add_filter( 'enter_title_here',  [ $this, 'change_default_title' ] ); 

		register_post_type( 'career', $args );

	}

    // Register Custom Post Type Career Taxonomy
    public function career_taxonomy() {
	
        register_taxonomy(
            "career_cat", 
            array("career"), 
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
            'career_tag', 
            'career', 
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

        if ( 'career' == $screen->post_type )
            $title = esc_html__( "Enter Opening Job Title Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to career Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function career_edit_columns( $career_columns ) {
        $career_columns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "career_cat" => esc_html__('Categories', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $career_columns;
    }
   
    public function career_column_display( $career_columns, $post_id ) {
	
        switch ( $career_columns ) {
            
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
                
            // Display the career tags in the column view
            case "career_cat":
            
            if ( $category_list = get_the_term_list( $post_id, 'career_cat', '', ', ', '' ) ) {
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
Stone_Digital_Career::get_instance();