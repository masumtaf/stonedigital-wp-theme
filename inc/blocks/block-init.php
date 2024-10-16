<?php
/**
 * The Register Acf Blocks
 *
 * @package Stone_Digital
 */

 function stone_digital_register_block_categories( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'stdl-block',
				'title' => 'StoneDigital Blocks',
			),
		)
	);
}
add_action( 'block_categories_all', 'stone_digital_register_block_categories', 10, 2 );


// @TODO: Move this to /inc directory eg. /inc/acf.php
add_action( 'acf/init', 'stone_digital_acf_init_blocks' );
function stone_digital_acf_init_blocks() {

	// Check function exists.
	if ( function_exists( 'acf_register_block_type' ) ) {

		acf_register_block_type(
			array(
				'name'            => 'hero-block',
				'title'           => 'Hero Block',
				'description'     => 'SD: Hero Block',
				'render_template' => 'inc/blocks/blocks/block-hero.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'featured-logo',
				'title'           => 'Featured Logo Block',
				'description'     => 'SD: Featured Logo',
				'render_template' => 'inc/blocks/blocks/featured-logo.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'featured-projects',
				'title'           => 'Featured Projects Block',
				'description'     => 'SD: Featured Projects',
				'render_template' => 'inc/blocks/blocks/dynamic/featured-projects.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'icon-service-box',
				'title'           => 'Icon Box (Tile) List',
				'description'     => 'SD: IIcon Box (Tile) List',
				'render_template' => 'inc/blocks/blocks/icon-service-box.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		acf_register_block_type(
			array(
				'name'            => 'side-by-side-block',
				'title'           => 'Side by Side',
				'description'     => 'SD: Side by Side',
				'render_template' => 'inc/blocks/blocks/side-by-side-block.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'brand-logo',
				'title'           => 'Brand Logo',
				'description'     => 'SD: Brand Logo',
				'render_template' => 'inc/blocks/blocks/brand-logo.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'post-block',
				'title'           => 'Post Block',
				'description'     => 'SD: Post Block',
				'render_template' => 'inc/blocks/blocks/dynamic/post-block.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Content 
		acf_register_block_type(
			array(
				'name'            => 'block-contact',
				'title'           => 'Contact Block',
				'description'     => 'SD: Contact Block',
				'render_template' => 'inc/blocks/blocks/block-contact.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	

		// Faq - full wodth / left / right with content
		acf_register_block_type(
			array(
				'name'            => 'block-faq',
				'title'           => 'FAQ Block',
				'description'     => 'SD: FAQ Block',
				'render_template' => 'inc/blocks/blocks/block-faq.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		// Projects Showcase
		acf_register_block_type(
			array(
				'name'            => 'block-showcase',
				'title'           => 'ShowCase Block',
				'description'     => 'SD: ShowCase Block',
				'render_template' => 'inc/blocks/blocks/block-showcase.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'horizontal-slider-block',
				'title'           => 'Horizontal Slider Block',
				'description'     => 'SD: Horizontal Slider Block',
				'render_template' => 'inc/blocks/blocks/horizontal-slider-block.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		acf_register_block_type(
			array(
				'name'            => 'common-fields',
				'title'           => 'Common Block',
				'description'     => 'Common Block',
				'render_template' => 'inc/blocks/blocks/common-fields.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Our Services 
		acf_register_block_type(
			array(
				'name'            => 'our-services',
				'title'           => 'Custom Service Box',
				'description'     => 'Custom Service Box',
				'render_template' => 'inc/blocks/blocks/our-services.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-simplify',
				'title'           => 'Simplify Block',
				'description'     => 'Simplify Block',
				'render_template' => 'inc/blocks/blocks/block-simplify.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		// Claim website Audit
		acf_register_block_type(
			array(
				'name'            => 'claim-website-audit',
				'title'           => 'Claim Website Audit Block',
				'description'     => 'Claim Website Audit Block',
				'render_template' => 'inc/blocks/blocks/claim-website-audit.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		// Our Team - Grid & Carousel
		acf_register_block_type(
			array(
				'name'            => 'block-our-team',
				'title'           => 'Our Team Block',
				'description'     => 'Our Team Block',
				'render_template' => 'inc/blocks/blocks/block-our-team.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Customer Reviews
		acf_register_block_type(
			array(
				'name'            => 'block-customer-reviews',
				'title'           => 'Customer Reviews Block',
				'description'     => 'Customer Reviews Block',
				'render_template' => 'inc/blocks/blocks/block-customer-reviews.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		// Icon List
		acf_register_block_type(
			array(
				'name'            => 'block-icon-list',
				'title'           => 'Icon List Block',
				'description'     => 'Icon List Block',
				'render_template' => 'inc/blocks/blocks/block-icon-list.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		// Pricing Table
		acf_register_block_type(
			array(
				'name'            => 'block-pricing-table',
				'title'           => 'Pricing Table Block',
				'description'     => 'Pricing Table Block',
				'render_template' => 'inc/blocks/blocks/block-pricing-table.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Pricing Table
		acf_register_block_type(
			array(
				'name'            => 'block-testimonilas-',
				'title'           => 'Testimonials Block',
				'description'     => 'Testimonials Block',
				'render_template' => 'inc/blocks/blocks/block-testimonilas.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Showing All Post Table
		acf_register_block_type(
			array(
				'name'            => 'archive-blog',
				'title'           => 'Archive Block',
				'description'     => 'Archive Block',
				'render_template' => 'inc/blocks/blocks/dynamic/archive-blog.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Filter Widgets
		acf_register_block_type(
			array(
				'name'            => 'search-category-filter',
				'title'           => 'Search Filter Block',
				'description'     => 'Search Filter Block',
				'render_template' => 'inc/blocks/blocks/dynamic/search-category-filter.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		// Show All Current Vacancies
		acf_register_block_type(
			array(
				'name'            => 'current-vacancies',
				'title'           => 'Current Vacancies Block',
				'description'     => 'Current Vacancies Block',
				'render_template' => 'inc/blocks/blocks/dynamic/block-current-vacancies.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		// Career Form Block (Single Page)
		acf_register_block_type(
			array(
				'name'            => 'career-form',
				'title'           => 'Career Form Block',
				'description'     => 'Career Form Block',
				'render_template' => 'inc/blocks/blocks/block-career-form.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		//Counter Block
		acf_register_block_type(
			array(
				'name'            => 'block-counter-icon',
				'title'           => 'Counter Block',
				'description'     => 'Counter Block',
				'render_template' => 'inc/blocks/blocks/block-counter-icon.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		//Archive Services Block
		acf_register_block_type(
			array(
				'name'            => 'block-services',
				'title'           => 'Archive Services',
				'description'     => 'Archive Services',
				'render_template' => 'inc/blocks/blocks/dynamic/block-services.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		//Archive Projects
		acf_register_block_type(
			array(
				'name'            => 'archive-projects',
				'title'           => 'Archive Projects',
				'description'     => 'Archive Projects',
				'render_template' => 'inc/blocks/blocks/dynamic/archive-projects.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		//CALL to action 
		acf_register_block_type(
			array(
				'name'            => 'block-call-to-action',
				'title'           => 'Call To Action',
				'description'     => 'Call To Action',
				'render_template' => 'inc/blocks/blocks/block-call-to-action.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		//CALL to action 
		acf_register_block_type(
			array(
				'name'            => 'block-google-reviews',
				'title'           => 'Google / Clutc Reviews',
				'description'     => 'Google / Clutc Reviews',
				'render_template' => 'inc/blocks/blocks/block-google-reviews.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		//PopUp Btn
		acf_register_block_type(
			array(
				'name'            => 'block-popup-btn',
				'title'           => 'PopUp Buttons',
				'description'     => 'PopUp Buttons',
				'render_template' => 'inc/blocks/blocks/block-popup-btn.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		//PopUp Btn
		acf_register_block_type(
			array(
				'name'            => 'block-client-feedback',
				'title'           => 'Client FeedBack',
				'description'     => 'Client FeedBack',
				'render_template' => 'inc/blocks/blocks/block-client-feedback.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-hero-v2',
				'title'           => 'Hero V2 Image Scroll',
				'description'     => 'Hero V2 Image Scroll',
				'render_template' => 'inc/blocks/blocks/block-hero-v2.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-image-gallery',
				'title'           => 'Image Gallery',
				'description'     => 'Image Gallery',
				'render_template' => 'inc/blocks/blocks/block-image-gallery.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-google-map',
				'title'           => 'Google Map',
				'description'     => 'Google Map',
				'render_template' => 'inc/blocks/blocks/block-google-map.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-marquee',
				'title'           => 'Marquee Text/Image',
				'description'     => 'Marquee Marquee Text/Image',
				'render_template' => 'inc/blocks/blocks/block-marquee.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		acf_register_block_type(
			array(
				'name'            => 'custom-term-links',
				'title'           => 'Custom Term Links',
				'description'     => 'Custom Term Links',
				'render_template' => 'inc/blocks/blocks/custom-term-links.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);
		
		acf_register_block_type(
			array(
				'name'            => 'block-banner-projects',
				'title'           => 'Single Page Banner',
				'description'     => 'Single Page Banner',
				'render_template' => 'inc/blocks/blocks/block-banner-projects.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'block-full-screen-images',
				'title'           => 'Full Screen Image',
				'description'     => 'Full Screen Image',
				'render_template' => 'inc/blocks/blocks/block-full-screen-images.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);	
		
		acf_register_block_type(
			array(
				'name'            => 'block-gallery',
				'title'           => 'Masonry Gallery',
				'description'     => 'Masonry Gallery',
				'render_template' => 'inc/blocks/blocks/block-gallery.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'block-team-hobbies',
				'title'           => 'Team Hobbies',
				'description'     => 'Team Hobbies',
				'render_template' => 'inc/blocks/blocks/block-team-hobbies.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon'
			)
		);
		
		acf_register_block_type(
			array(
				'name'            => 'block-team-banner',
				'title'           => 'Team Banner',
				'description'     => 'Team Banner',
				'render_template' => 'inc/blocks/blocks/block-team-banner.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon'
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'block-lead-magnet-form',
				'title'           => 'Magnet Form',
				'description'     => 'Magnet Form',
				'render_template' => 'inc/blocks/blocks/block-lead-magnet-form.php',
				'category'        => 'stdl-block',
				'icon'            => 'stdl-block-icon'
			)
		);

	}
}
