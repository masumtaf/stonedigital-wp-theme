<?php 
/**
 * Block Name: Search Blog - Block
 *
 * This is the template that displays Search and Category Filter Control
 */

// create id attribute for specific styling
$id = 'section-stdl-contact-' . $block['id'];

$section_title = get_field('section_title');
$section_bg_color = get_field( 'select_background_color' );
$enable_btn = get_field( 'enable_btn' );

switch ($section_bg_color) {
	case 'default-color':
		$bg_class = 'stdl-bg-dark';
		break;
	case 'light-dark-color':
		$bg_class = 'stdl-bg-light-dark';
		break;
	case 'light-color':
		$bg_class = 'stdl-bg-light';
		break;	
    case 'gradient-color':
		$bg_class = 'stdl-bg-gradient';
		break;
	default:
		$bg_class = '';
		break;
}

?>

<section id="<?php echo $id; ?>" class="section-space stdl-section-search <?php echo $bg_class; ?>">
    <div class="container">
        <div class="search-widget-wrapper">
			<div class="search-widget">
				<form role="search" id="searchform" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) );?>">
					<label>
						<span class="screen-reader-text">Search…</span>
						<input type="hidden" class="" id="stdl-researchedtext">
						<input type="hidden" class="" id="stdl-typepsearch">
						<span class="search-field">
							<?php echo stdl_get_svg('search.svg');?>
							<input type="search" class="search-field" id="stdl-resourcesearch" placeholder="Search…" name="s" value="<?php echo get_search_query() ;?>" >
						</span>
						
					</label>
				</form>
			</div>
			<div class="terms-widget">
				<?php
					$post_args = array(
						array(
							'label' => 'Post',
							'post_slug' => 'post',
							'taxonomy' => 'category'
						)
					);
				?>
				<?php stdl_filter_terms_dropdown_widget($post_args) ;?>
        	</div>
        </div>
    </div>
</section>