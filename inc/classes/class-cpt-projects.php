<?php
/**
 * 
 * Custom Post Type - Projects
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

class Stone_Digital_Projects {

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
		add_action( 'init', [ $this, 'project_cpt' ], 1 );
        add_action( 'init', [ $this, 'project_taxonomy' ], 1);
        add_filter( 'manage_edit-project_columns', [ $this, 'project_edit_columns' ] );
        add_action( 'manage_project_posts_custom_column', [ $this, 'project_column_display' ], 10, 2 );

	}

	// Register Custom Post Type Project
	public function project_cpt() {

		$labels = [
			'name'                  => _x( 'Projects', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'Project', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'Projects', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'Project', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'Project Archives', 'stone-digital' ),
			'attributes'            => __( 'Project Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent Project:', 'stone-digital' ),
			'all_items'             => __( 'All Projects', 'stone-digital' ),
			'add_new_item'          => __( 'Add New Project', 'stone-digital' ),
			'add_new'               => __( 'Add New', 'stone-digital' ),
			'new_item'              => __( 'New Project', 'stone-digital' ),
			'edit_item'             => __( 'Edit Project', 'stone-digital' ),
			'update_item'           => __( 'Update Project', 'stone-digital' ),
			'view_item'             => __( 'View Project', 'stone-digital' ),
			'view_items'            => __( 'View Project', 'stone-digital' ),
			'search_items'          => __( 'Search Project', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into Project', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Project', 'stone-digital' ),
			'items_list'            => __( 'Projects list', 'stone-digital' ),
			'items_list_navigation' => __( 'Projects list navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter Projects list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'Projects', 'stone-digital' ),
			'description'         => __( 'The Projects', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-format-gallery',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
                'excerpt'
			],
			// 'taxonomies'          => [],
			'public'              => true,
            'rewrite'             => array( 'slug' => 'project', 'with_front' => false ),
			'show_ui'             => true,
            'show_in_rest'        => true, // for enable gutenberg editor for custom post type - 
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		];

        add_filter( 'enter_title_here',  [ $this, 'change_default_title' ] ); 

		register_post_type( 'project', $args );

	}

    // Register Custom Post Type Project Taxonomy
    public function project_taxonomy() {
	
        register_taxonomy(
            "project_cat", 
            array("project"), 
            array(
                "hierarchical"   => true, 
                "label"          => __( 'Categories', 'stone-digital' ), 
                "singular_label" => __( 'Category', 'stone-digital' ),
                'rewrite'       => array( 'slug' => 'project_cat', 'with_front' => false ),
                'show_ui'        => true,
                'show_admin_column' => true,
                "rewrite"        => true
            )
        );
    
        register_taxonomy( 
            'project-type', 
            'project', 
            array( 
                'hierarchical'  => false, 
                'label'         => __( 'Tags', 'stone-digital' ), 
                'singular_name' => __( 'Tag', 'stone-digital' ),
                'show_ui'       => true, 
                'rewrite'       => array( 'slug' => 'project-type', 'with_front' => false ),
                'query_var'     => true 
            )  
        );
    
    }
  
    
    public function change_default_title( $title ) {
        $screen = get_current_screen();

        if ( 'project' == $screen->post_type )
            $title = esc_html__( "Enter Project Name Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to project Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function project_edit_columns( $project_columns ) {
        $project_columns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "project_cat" => esc_html__('Categories', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $project_columns;
    }
   
    public function project_column_display( $project_columns, $post_id ) {
	
        switch ( $project_columns ) {
            
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
                
            // Display the project tags in the column view
            case "project_cat":
            
            if ( $category_list = get_the_term_list( $post_id, 'project_cat', '', ', ', '' ) ) {
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
Stone_Digital_Projects::get_instance();