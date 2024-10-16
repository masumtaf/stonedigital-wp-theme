<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function stdl_page_banner_title() { ?>

	<?php if(is_page() || is_single()){ ?>

	<h2 class="wp-block-heading stdl-title"><?php echo esc_html( get_the_title() ); ?></h2>

	<?php } elseif( is_search() ){ ?>

	<h2 class="wp-block-heading stdl-title"><?php printf( __( 'Search Results for: %s', 'stone-digital' ), '<span>' . get_search_query() . '</span>' ); ?></h2>

	<?php }elseif( is_404() ){ ?>

	<h2 class="wp-block-heading stdl-title"><?php echo esc_html( 'Page Not Found: 404', 'stone-digital'); ?></h2>

	<?php }elseif( is_home() ){ ?>

	<h2 class="wp-block-heading stdl-title"><?php single_post_title(); ?></h2>

	<?php } 

	else {
	if(is_archive()) {
		the_archive_title( '<h2 class="wp-block-heading stdl-title">', '</h2>' ); 
	}
	?>

	<?php if ( is_single() ) { ?>
		<h2 class="wp-block-heading stdl-title"><?php single_post_title(); ?></h2>
	<?php  }

	}

}

// Just a simple grey box placeholder
function chr_svg_placeholder() {
	return '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="-0.073" fill="#D1D3D4" width="100.073" height="100"/></svg>';
}

// echo an svg, wrapper function
function stdl_the_svg( $path ) {
	echo stdl_get_svg( $path ); }

/*
 * Returns the content of an SVG, with filters and processing being done
 */
function stdl_get_svg( $path ) {
	if ( is_numeric( $path ) ) {
		$path = get_attached_file( $path );
	}

	if ( substr( $path, 0, 1 ) !== '/' && substr( $path, 0, 2 ) !== 's3' ) {
		// Not an absolute path
		$path = get_template_directory() . '/assets/img/' . $path;
	}

	// Make sure it exists
	if ( ! file_exists( $path ) ) {
		return chr_svg_placeholder();
	}

	// Return only the 'svg' element
	$svg_raw     = file_get_contents( $path );
	$find_string = '<svg';
	$pos         = strpos( $svg_raw, $find_string );

	// return the placeholder if no svg found
	if ( $pos === false ) {
		return chr_svg_placeholder();
	}

	$svg_raw = substr( $svg_raw, $pos );

	// Remove title attribute for SVG to avoid conflict with SEO.
	$svg_raw = preg_replace( '/<title>.*?<\/title>/', '', $svg_raw );

	$svg = new DOMDocument();
	$svg->loadXML( $svg_raw );
	/**
	 * Removing all ID's
   *
	 * @var $element DOMElement
	 */
	foreach ( $svg->getElementsByTagName( '*' ) as $element ) {
		$element->removeAttribute( 'id' );
	}

	// Removing comments
	$x_svg = new DOMXPath( $svg );
	foreach ( $x_svg->query( '//comment()' ) as $comment ) {
		$comment->parentNode->removeChild( $comment );
	}

	$svg = $svg->saveHtml();

	return $svg;
}
/**
 *  Enable Gutenberg Editor
 */
add_filter( 'use_block_editor_for_post_type', 'enable_gutenberg_editor_for_stdl', 10, 2 );
function enable_gutenberg_editor_for_stdl( $can_edit, $post_type ) {
	if ( $post_type == 'team' || $post_type == 'page'|| $post_type == 'project' ) {
		$can_edit = true;
	}
	if($post_type == 'testimonial') {
        return false;
    } 

	return $can_edit;
}

/**
 *  Get Post Type items - 3 limit
 */
function featured_items($postType) {
	$output = '';
	ob_start(); 
	?>
	<?php 
		$featured_blog_args = new WP_Query(array(
			'post_type' => $postType,
			'post_status' => 'publish',
			'order'     => 'DESC',
			'orderby'   => 'date',
			'posts_per_page' => 3,
		));
	?>
		<div class="sdtl-featured-wrap">
			<?php if ( $featured_blog_args->have_posts() ) :
				while ( $featured_blog_args->have_posts() ) :
					$featured_blog_args->the_post();?>
					<div class="sdtl-featured-grid">
						<a class="featured-link" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
							<div class="sdtl-featured_thumb">
								<?php if(get_the_post_thumbnail()) {
										the_post_thumbnail('thumbnail');
									}else{ ?>
										<img class="attachment-thumbnail size-thumbnail wp-post-image" width="150" height="150" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="<?php the_title_attribute();?>" loading="lazy">
								<?php } ?>
							</div>
							<h4 class="sdtl-featured_title"><?php the_title() ;?></h4>
						</a>
					</div>
				<?php endwhile;
				wp_reset_postdata();
			endif; ?>
		</div>
	<?php
	$output .= ob_get_clean();
	return $output;
}


/**
 * This MartkUp For Mega Menu
 */
add_shortcode('stdl-services', 'stdl_services_html');

function stdl_services_html( $atts = array() , $content ) { 

    $pairs = array( );

    extract( shortcode_atts( $pairs, $atts ) );

    ob_start(); ?>
	 <div class="stdl-content stdl-grid-col-2-3rd">
            <div class="stdl-contact__content std-amin-common-content">
                <div class="section-header">
                    <h4 class="stdl-contact__title stdl-tagline">
						Custom Web Development Services for Your Business
					</h4>
					<P class="stdl-description">At Stone Digital, we specialize in providing top-notch web development services tailored to your specific needs. Our team of expert developers is skilled in custom WordPress, WooCommerce, and Shopify development, ensuring that your website stands out from the competition.competition.</P>
                </div>
            </div>
            <div class="">
					<div class="service-items stdl-grid-col-2 service-item--center_align">
						<div class="service-item">
							<a href="<?php echo esc_url( home_url( '/service/custom-web-development/' ) ); ?>">
								<div class="service-item__header">
									<div class="header__img"><?php echo stdl_get_svg('services-icon/wordpress-white.svg') ;?></div>
									<div class="header__title" style="line-height: 1.3;">Custom Wordpress Development</div>
								</div>
							</a>
						</div>
						<div class="service-item">
							<a href="<?php echo esc_url( home_url( '/service/shopify-theme-development' ) ); ?>">
								<div class="service-item__header">
									<div class="header__img"><?php echo stdl_get_svg('services-icon/shopping-cart.svg') ;?></div>
									<div class="header__title" style="line-height: 1.3;">Shopify <br>Development</div>
								</div>
							</a>
						</div>
						<div class="service-item">
							<a href="<?php echo esc_url( home_url( '/service/woocommerce-website-development' ) ); ?>">
								<div class="service-item__header">
									<div class="header__img"><?php echo stdl_get_svg('services-icon/shopping-cart.svg') ;?></div>
									<div class="header__title" style="line-height: 1.3;">WooCommece <br>Development</div>
								</div>
							</a>
						</div>	
						<div class="service-item">
							<div class="section-btn-warp text-center" style="margin-top:0px;">
								<a class="stdl-section-btn btn-primary-tp" href="<?php echo esc_url( home_url( '/services' ) ); ?>">All Services</a>
							</div>
						</div>
					</div>
            </div>
        </div>
	<?php
    $content .= ob_get_clean();
	return $content;
}


/**
 *  This MarkUp for Mega Menu
 */
add_shortcode('stdl-resouce', 'stdl_resouce_html');

function stdl_resouce_html( $atts = array() , $content ) { 

    $pairs = array( );

    extract( shortcode_atts( $pairs, $atts ) );

    ob_start(); ?>
	 <div class="stdl-content stdl-grid-col-1-4rd">
            <div class="stdl-contact__content std-amin-common-content">
                <div class="stdl-contact__details">
					<a class="menu-tagline" href="<?php echo esc_url( home_url( '/blog' ) ); ?>">Resources</a>
						<ul class="menu-link-items">
							<li class="menu-link-item">
								<a href="<?php echo esc_url( home_url( '/blog' ) ); ?>">
									<span>Blog</span>
									<span>Guides, Insights and Handy Resources</span>
								</a>
							</li>
							<li class="menu-link-item">
								<a href="<?php echo esc_url( home_url( '/projects' ) ); ?>">
									<span>Case Study</span>
									<span>Success Stories from Our Clients</span>
								</a>
							</li>
							<li class="menu-link-item">
								<a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">
									<span>Contact</span>
									<span>Get in Touch for Expert Web Solutions</span>
								</a>
							</li>
							<li class="menu-link-item">
								<a href="<?php echo esc_url( home_url( '/careers' ) ); ?>">
									<span>Careers</span>
									<span>Join Our Team: Work on Exciting Web Projects</span>
								</a>
							</li>
						</ul>
            	</div>
            </div>
            <div class="">
					<div class="stdl-grid-col-2">
						<div class="sdtl-featured-blog">
							<a class="menu-tagline" href="<?php echo esc_url( home_url( '/blog' ) ); ?>">Blog</a>
							<?php echo featured_items('post'); ?>
						</div>
						
						<div class="sdtl-featured-case">
							<a class="menu-tagline" href="<?php echo esc_url( home_url( '/projects' ) ); ?>">Case Study</a>
							<?php echo featured_items('project'); ?>
						</div>
					</div>
            </div>
        </div>
	<?php
    $content .= ob_get_clean();
	return $content;
}

/**
 *  Get Acf Data by Id
 */
// Get Acf Data by Id
function stdl_get_acf_block_data_by_id( $post_id, $block_name, $block_id ) {

    //get post_content for page
    $post_content = get_post( $post_id )->post_content;

    $blocks = array_filter( parse_blocks( $post_content ), function( $block ) use( $block_name ) {
        return $block_name === $block['blockName'];
    });

    $block_content = '';
    foreach( $blocks as $block ) {
		 // Only look at the block if it matches the $block_id
		 if ( isset( $block['attrs']['id'] ) && $block_id == $block['attrs']['id'] ) {
			$block_content .= render_block( $block );
		}
    }

    return $block_content;
}

/**
 *  Get Acf Data by BlockName - acf/blockName
 */
function std_get_acf_block_data_by_name( $post_id, $block_name ) {

    //get post_content for page
    $post_content = get_post( $post_id )->post_content;

    $blocks = array_filter( parse_blocks( $post_content ), function( $block ) use( $block_name ) {
        return $block_name === $block['blockName'];
    });

    $block_content = '';
    foreach( $blocks as $block ) {
		$block_content .= render_block( $block );
    }

    return $block_content;
}

/**
 * Reading Time - stdl_reading_time( get_the_content() )
 */
function stdl_reading_time( $content ) {
        
	$word_count = str_word_count( strip_tags( $content ) );
	$readingtime = ceil($word_count / 200);

	$timer = '<span>' . $readingtime . __( ' Min Read', 'stone-digital' ) . '</span>';
	$icon = stdl_get_svg('circle-clock.svg');
	
	$totalreadingtime ='<span class="stdl-read-time">' . $icon . $timer .'</span>';

	return $totalreadingtime;
}


/**
 * Ajax Content - LOAD BLOG
 */

add_action( 'wp_ajax_load_more_post', 'stdl_load_more_post_merkup' );
add_action( 'wp_ajax_nopriv_load_more_post', 'stdl_load_more_post_merkup' );	

function stdl_load_more_post_merkup() {
	global $post;
	$postperpage = 3;
	$count = 1;
	$paged = $_POST['paged'];

	if (isset($_POST['taxId']) && !empty($_POST['taxId'])) {
		$terms_id = $_POST['taxId'];
	}
	if (isset($_POST['keyword']) && !empty($_POST['keyword'])) {
		$search_value = sanitize_text_field($_POST['keyword']);
	}

    ob_start();
	$query_args = array(
		'post_type' => 'post',
		'orderby' => 'date',
		'post_status' => 'publish'
	);

	if(!empty($search_value) && isset($search_value)){
        $query_args[ 's' ] = $search_value;
    }

	if(empty($terms_id) && !isset($terms_id)){
		$query_args[ 'posts_per_page' ] = $postperpage;
        $query_args[ 'paged' ] = $paged;
    }

	if ( !empty($terms_id) && isset($terms_id)) {
		$query_args[ 'posts_per_page' ] = -1;
		$query_args['tax_query'] = array(
			'relation' => 'AND',
			array(
				'taxonomy' => 'category',
				'field'    => 'id',
				'terms'    => $terms_id
			),
		);
	}
	$post_query = new WP_Query( $query_args );
	?>

	 <?php if($post_query->have_posts()) :
		while($post_query->have_posts()) :
				$post_query->the_post(); ?>
			<?php 
				$post_id = get_the_ID();
				$permalink = get_permalink();
			?>
			<article id="post-<?php echo esc_attr($post_id); ?>" <?php post_class( ['stdl-post-item']); ?>>
				<div class="stdl-post__thumb">
				<?php if(get_the_post_thumbnail()) { ?>
					<a href="<?php echo esc_url( $permalink ); ?>"  title="<?php esc_attr(the_title_attribute()); ?>">
						<?php the_post_thumbnail('grid-tile'); ?>
					</a>
					<?php }else{?>
						<a href="<?php echo esc_url( $permalink ); ?>" class="placeholder-img">
							<img class="attachment-grid-tile size-grid-tile wp-post-image" width="536" height="232" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
						</a>
					<?php } ?>
				</div>
				<div class="stdl-post__content">
					<h2 class="title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title(); ?></a></h2>
					<p class="desc"> <?php echo wp_trim_words( get_the_content(), 15, '...' ); ?></p>
				</div>
				<div class="stdl-post__footer">
					<div>
						<span><?php echo get_the_date() ;?></span>
						<span><?php echo stdl_reading_time(get_the_content()) ;?></span>
					</div>
				</div>
			</article>
		<?php $count++ ; endwhile;
		   wp_reset_postdata();
		   $countpost = $post_query->found_posts;
		   $tens = floor($countpost/$postperpage);
		   $ones = $tens%$postperpage;
		   $tenones = ($ones==0) ? false : true;?>
			<?php endif ;?>
     
		   <?php 
		   echo ob_get_clean();
		   die();
}

/**
 * Ajax Content - LOAD PROJECTS
 */

add_action( 'wp_ajax_load_more_projects', 'stdl_load_more_projects_merkup' );
add_action( 'wp_ajax_nopriv_load_more_projects', 'stdl_load_more_projects_merkup' );	

function stdl_load_more_projects_merkup() {
	$paged = $_POST['paged'];
	$taxonomyName = isset( $_POST['taxonomyName'] ) ? ( $_POST['taxonomyName'] ) : null;
	$termSlug = isset( $_POST['termSlug'] ) ? ( $_POST['termSlug'] ) : null;
	$termId = isset( $_POST['termID'] ) ? ( $_POST['termID'] ) : null;
	$query_args = array(
		'post_type' => 'project',
		'post_status' => 'publish',
		'order'     => 'DESC',
		'paged' => $paged,
		'posts_per_page' => 6,
		// 'offset' => ( ( (int)$paged - 1 ) * (int)6),
	);

	if ( isset($termId) && !empty($termId)) {
 		$query_args['tax_query'] = array(
			'relation' => 'AND',
            array(
                'taxonomy' => $taxonomyName,
                'field'    => 'id',
                'terms'    => $termId
            ),
        );
	}

	$post_query = new WP_Query( $query_args );

    ob_start();
	?>
	 <?php if($post_query->have_posts()) :
		while($post_query->have_posts()) :
				$post_query->the_post(); ?>
			<?php 
				$post_id = get_the_ID();
				$permalink = get_permalink();
				stdl_show_template('content-project');
			?>
		<?php endwhile;
		   wp_reset_query();
		   echo ob_get_clean();
		   die();
	endif ;

}

/**
 * Ajax Content - LOAD More Terms page
 */

add_action( 'wp_ajax_load_more_terms', 'stdl_load_more_terms_merkup' );
add_action( 'wp_ajax_nopriv_load_more_terms', 'stdl_load_more_terms_merkup' );	

function stdl_load_more_terms_merkup() {
	$paged = $_POST['paged'];
	$taxonomyName = $_POST['taxonomyName'];
	$termSlug = $_POST['termSlug'];
	$termId = $_POST['termID'];
	$query_args = array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'order'     => 'DESC',
		'paged' => $paged,
		'posts_per_page' => 3,
		// 'offset' => ( ( (int)$paged - 1 ) * (int)6),
	);

	if ( isset($termId) && !empty($termId)) {
 		$query_args['tax_query'] = array(
			'relation' => 'AND',
            array(
                'taxonomy' => $taxonomyName,
                'field'    => 'id',
                'terms'    => $termId
            ),
        );
	}

	$post_query = new WP_Query( $query_args );

    ob_start();
	?>
	 <?php if($post_query->have_posts()) :
		while($post_query->have_posts()) :
				$post_query->the_post(); ?>
			<?php 
				$post_id = get_the_ID();
				$permalink = get_permalink();
				stdl_show_template('content');
			?>
		<?php endwhile;
		   wp_reset_query();
		   echo ob_get_clean();
		   die();
	endif ;

}

/**
 * Ajax Content
 */

function stdl_filter_terms_widget($post_args) {
	$count_posts = wp_count_posts();
	$published_posts = $count_posts->publish;

	echo '<div class="stdl-custom-select">';
		echo '<div class="select-btn"><span class="sBtn-text">Categories</span><span>'. stdl_get_svg('chevron-down.svg') .'</span></div>';
		echo '<div class="stdl-terms-wrapper">';
	foreach ($post_args as $post_data) {
			$count = 1;
			$selected_terms_id = array();
			$post_type_label = $post_data['label'];
			$taxonomy = $post_data['taxonomy'];
			$post_slug = $post_data['post_slug'];

		echo '<ul id="stdl-terms-list" class="ajax-action stdl-terms-list" name="topic" data-total-post='. $published_posts .'>';

		$terms = get_terms(array(
			'taxonomy' => $taxonomy,
			'hide_empty' => true,
		));

		if (!empty($terms)) {
			echo '<li data-post-type="' . esc_attr($post_slug) . '" data-taxonomy="'. esc_attr($taxonomy) .'" value="">All</li>';
			foreach ($terms as $term) {
				echo '<li data-post-type="' . esc_attr($post_slug) . '" data-taxonomy="'. esc_attr($taxonomy) .'" data-id="' . $term->term_id .'" value="' . $term->term_id . '">' . $term->name . '</li>';
			}
		}
		echo '</ul>';
	}
	echo '</div>';
	echo '</div>';
}

/**
 * Normal Hiperlinks - DropDown
 */

function stdl_filter_terms_dropdown_widget($post_args) {
	$count_posts = wp_count_posts();
	$published_posts = $count_posts->publish;

	echo '<div class="stdl-custom-select">';
		echo '<div class="select-btn"><span class="sBtn-text">Categories</span><span>'. stdl_get_svg('chevron-down.svg') .'</span></div>';
		echo '<div class="stdl-terms-wrapper">';
	foreach ($post_args as $post_data) {
			$count = 1;
			$selected_terms_id = array();
			$post_type_label = $post_data['label'];
			$taxonomy = $post_data['taxonomy'];
			$post_slug = $post_data['post_slug'];

		echo '<ul id="stdl-terms-list" class="stdl-terms-list" name="topic" data-total-post='. $published_posts .'>';

		$terms = get_terms(array(
			'taxonomy' => $taxonomy,
			'hide_empty' => true,
		));

		if (!empty($terms)) {
			if ($taxonomy == 'category') {
				echo '<li data-post-type="' . esc_attr($post_slug) . '" data-taxonomy="'. esc_attr($taxonomy) .'" value=""><a href="'. home_url('/blog') .'">All</a></li>';
			} else {
				echo '<li data-post-type="' . esc_attr($post_slug) . '" data-taxonomy="'. esc_attr($taxonomy) .'" value=""><a href="'. home_url('/projects') .'">All</a></li>';
			}
		
			foreach ($terms as $term) {
				if ($term->slug == 'uncategorized') {
					continue;
				}
				echo '<li data-post-type="' . esc_attr($post_slug) . '" data-taxonomy="'. esc_attr($taxonomy) .'" data-id="' . $term->term_id .'" value="' . $term->term_id . '"><a href="' .get_term_link( $term->term_id) .'">' . $term->name . '</a></li>';
			}
		}
		echo '</ul>';
	}
	echo '</div>';
	echo '</div>';
}

function stdl_filterable_terms_list($taxonomy_type) { 

	$terms = get_terms(array(
		'taxonomy' => $taxonomy_type,
		'hide_empty' => true,
	));
	ob_start();
	?>
	<div class="stdl-filterable-menu">
		<ul class="stdl-filterable-menu">
			<li class="filter-item active"  data-filter="all"><?php echo esc_html__("All"); ?></li>
			<?php
				foreach ( $terms as $term ) {
					if ($term->slug == 'uncategorized') {
						continue;
					}
					?>
					<li class="filter-item" data-filter="<?php echo esc_attr( $term->slug ); ?>"> <a href="<?php echo esc_url( get_term_link( $term->term_id ) ) ;?>"><?php echo $term->name; ?></a></li>
				<?php }
			   ?>
		</ul>
	</div>
	<?php
	return ob_get_clean();
}

function stdl_get_categories_name_for_class( ) {
	$separator = ' ';
	$cat_name_as_class = '';
	$post_type = get_post_type(get_the_ID());   
	$taxonomies = get_object_taxonomies($post_type);   
	$taxonomy_slugs = wp_get_object_terms(get_the_ID(), $taxonomies,  array("fields" => "slugs"));
	
	foreach($taxonomy_slugs as $tax_slug) :            
		$cat_name_as_class .= $tax_slug . $separator ; 
	endforeach;
	return trim( $cat_name_as_class, $separator );
	 
}

function stone_digital_popup_content($post_id) {
	$output = '';
	$args = array(
		'post_type' => 'popup',
		'post_status' => 'publish',
		'p' => $post_id,
	);
	$loop = new WP_Query($args);
	ob_start();
	if ( $loop->have_posts() ) :
		while ( $loop->have_posts() ) :
			$loop->the_post();
			$blocks = parse_blocks( get_the_content() );
			foreach ( $blocks as $block ) {
				echo render_block( $block );
			}
		endwhile; 
		wp_reset_postdata();
	endif;
	$output .= ob_get_clean();
	return $output;
}

/**
 * Ajax PopUp Content Bilder - LOAD Content
 */

 add_action( 'wp_ajax_load_popup_content', 'stdl_load_popup_content_merkup' );
 add_action( 'wp_ajax_nopriv_load_popup_content', 'stdl_load_popup_content_merkup' );

 function stdl_load_popup_content_merkup() {
	$output = '';
	$post_id = $_POST['popUpId'];
	$args = array(
		'post_type' => 'popup',
		'post_status' => 'publish',
		'p' => $post_id,
	);
	$loop = new WP_Query($args);
	ob_start();
	if ( $loop->have_posts() ) :
		while ( $loop->have_posts() ) :
			$loop->the_post();
			$blocks = parse_blocks( get_the_content() );
			foreach ( $blocks as $block ) {
				echo render_block( $block );
			}
		endwhile; 
		wp_reset_query();

		echo ob_get_clean();
		die;
	endif;
}

function stdl_render_popup_content() {
	$output=  '';
	$popup_args = array(
		'post_type' => 'popup',
		'post_status' => 'publish',
		'posts_per_page'    => -1
	);
	$popup_query = new WP_Query($popup_args);
	ob_start();
	if ( $popup_query->have_posts() ) : ?>
		<?php while ( $popup_query->have_posts() ) :
			$popup_query->the_post();?>
			<div class="stdl-popup popup-id-<?php echo get_the_ID(); ?>">
				<div class="stdl-popup-module module-id-<?php echo get_the_ID(); ?>">
					<span class="stdl-close-btn">
						<?php echo stdl_get_svg('x.svg');?>
					</span>
				<div class="container">
					<div class="stdl-popup-content">
						<?php
						the_content();
						?>
						</div>
					</div>
				</div>
			</div>
			<?php 
		endwhile; 
		wp_reset_query();
	endif;
	$output .= ob_get_clean();
	return $output;

}

if ( ! function_exists( 'pagination' ) ) :

    function pagination( $paged = '', $max_page = '' ) {
        $big = 999999999;
		$output = '';
		ob_start();
        if( ! $paged ) {
            $paged = get_query_var('paged');
        }

        if( ! $max_page ) {
            global $wp_query;
            $max_page = isset( $wp_query->max_num_pages ) ? $wp_query->max_num_pages : 1;
        }
		echo '<nav class="stdl-pagination">';
        echo paginate_links( array(
            'base'       => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
            'format'     => '?paged=%#%',
            'current'    => max( 1, $paged ),
            'total'      => $max_page,
            'mid_size'   => 1,
            'prev_text'  => __( '«' ),
            'next_text'  => __( '»' ),
            'type'       => 'list'
        ) );
		echo '</nav>';

		$output .= ob_get_clean();
		return $output;
    }
endif;