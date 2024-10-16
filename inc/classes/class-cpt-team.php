<?php
/**
 * 
 * Custom Post Type - Team
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

class Stone_Digital_Team {

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
		add_action( 'init', [ $this, 'team_cpt' ], 1 );
        add_action( 'init', [ $this, 'team_taxonomy' ], 1);
        add_filter( 'manage_edit-team_columns', [ $this, 'team_edit_columns' ] );
        add_action( 'manage_team_posts_custom_column', [ $this, 'team_column_display' ], 10, 2 );

	}

	// Register Custom Post Type Team
	public function team_cpt() {

		$labels = [
			'name'                  => _x( 'Our Team', 'Post Type General Name', 'stone-digital' ),
			'singular_name'         => _x( 'Our Team', 'Post Type Singular Name', 'stone-digital' ),
			'menu_name'             => _x( 'Our Team', 'Admin Menu text', 'stone-digital' ),
			'name_admin_bar'        => _x( 'Our Team', 'Add New on Toolbar', 'stone-digital' ),
			'archives'              => __( 'Our Team Archives', 'stone-digital' ),
			'attributes'            => __( 'Our Team Attributes', 'stone-digital' ),
			'parent_item_colon'     => __( 'Parent Our Team:', 'stone-digital' ),
			'all_items'             => __( 'All Members', 'stone-digital' ),
			'add_new_item'          => __( 'Add New Team Member', 'stone-digital' ),
			'add_new'               => __( 'Add New Member', 'stone-digital' ),
			'new_item'              => __( 'New Team Member', 'stone-digital' ),
			'edit_item'             => __( 'Edit Team Member', 'stone-digital' ),
			'update_item'           => __( 'Update Team Member', 'stone-digital' ),
			'view_item'             => __( 'View Team Members', 'stone-digital' ),
			'view_items'            => __( 'View Team Members', 'stone-digital' ),
			'search_items'          => __( 'Search Team Members', 'stone-digital' ),
			'not_found'             => __( 'Not found', 'stone-digital' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'stone-digital' ),
			'featured_image'        => __( 'Featured Image', 'stone-digital' ),
			'set_featured_image'    => __( 'Set featured image', 'stone-digital' ),
			'remove_featured_image' => __( 'Remove featured image', 'stone-digital' ),
			'use_featured_image'    => __( 'Use as featured image', 'stone-digital' ),
			'insert_into_item'      => __( 'Insert into Team', 'stone-digital' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Team', 'stone-digital' ),
			'items_list'            => __( 'Our Team', 'stone-digital' ),
			'items_list_navigation' => __( 'Our Team navigation', 'stone-digital' ),
			'filter_items_list'     => __( 'Filter Team list', 'stone-digital' ),
		];
		$args   = [
			'label'               => __( 'Our Team', 'stone-digital' ),
			'description'         => __( 'Our Team Member', 'stone-digital' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-businessperson',
			'supports'            => [
				'title',
				'editor',
				'thumbnail',
                'page-attributes',
                'custom-fields'
			],
			// 'taxonomies'          => [],
			'public'              => true,
            'rewrite'             => array( 'slug' => 'team', 'with_front' => false ),
			'show_ui'             => true,
            'query_var'           => true,
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

		register_post_type( 'team', $args );

	}

    // Register Custom Post Type Team Taxonomy
    public function team_taxonomy() {
	
        register_taxonomy(
            "team_cat", 
            array("team"), 
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
            'team_tag', 
            'team', 
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

        if ( 'team' == $screen->post_type )
            $title = esc_html__( "Enter Team Member Name Here", 'stone-digital' );

        return $title;
    }   

    /* ----------------------------------------------------- */
    /* Add Columns to team Edit Screen
    * http://wptheming.com/2010/07/column-edit-pages/
    /* ----------------------------------------------------- */
    public function team_edit_columns( $team_columns ) {
        $team_columns = array(
            "cb"                     => "<input type=\"checkbox\" />",
            "title"                  => esc_html__('Title', 'stone-digital'),
            "thumbnail"              => esc_html__('Thumbnail', 'stone-digital'),
            "team_cat" => esc_html__('Categories', 'stone-digital'),
            "date"                   => esc_html__('Date', 'stone-digital'),
        );
        return $team_columns;
    }
   
    public function team_column_display( $team_columns, $post_id ) {
	
        switch ( $team_columns ) {
            
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
                
            // Display the team tags in the column view
            case "team_cat":
            
            if ( $category_list = get_the_term_list( $post_id, 'team_cat', '', ', ', '' ) ) {
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
Stone_Digital_Team::get_instance();