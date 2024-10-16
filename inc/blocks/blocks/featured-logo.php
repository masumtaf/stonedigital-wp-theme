<?php 
/**
 * Block Name: Featured logo Grid /Carousel
 *
 * This is the template that displays Featured logo
 */

// create id attribute for specific styling
$id = 'section-stdl-featured-' . $block['id'];

$enable_section_heading = get_field('enable_section_heading');
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');

$section_bg_color = get_field( 'select_background_color' );
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

<section id="<?php echo $id; ?>" class="section-stdl-featured-logo <?php echo $bg_class; ?>">
    <div class="container">
        
        <?php if ($enable_section_heading) : ?>
            <div class="section-header-wrap">
                <?php if ($section_tagline || $section_title || $description) : ?>
                    <div class="stdl-section__title section-header text-center">
                        <?php if ($section_tagline) : ?>
                            <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                        <?php endif; if ($section_title) : ?>
                            <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                        <?php endif; ?> 
                        <?php if ($description) : ?>
                            <p class="stdl-description"><?php echo ( $description ) ;?></p>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif ;?>
        <?php endif ;?>
        <?php if( get_field('select_layout_type') == 'stdl_carousel' ) { ?>
            <div class="featured-logo-carousel owl-carousel owl-theme stdl_block--content">
        <?php } else { ?>
            <div class="featured-logo-grid-items">
        <?php } ?>
            <?php if(have_rows('featured_logo_rept')):
                while(have_rows('featured_logo_rept')): the_row(); 
                $featured_logo_data = get_sub_field('featured_logo_image');
                $featured_logo__id = $featured_logo_data["ID"];
                $featured_logo_img_url = wp_get_attachment_image_url($featured_logo__id, 'full');
                $featured_logo_url = get_sub_field('featured_logo_url');
                ?>
                <div class="featured-logo-item">
                    <?php if (!empty($featured_logo_url)) { ?> <a href="<?php echo esc_url($featured_logo_url) ;?>" target="_blank"> <?php } ?>
                        <img class="featured-logo-item__img" src="<?php echo esc_url($featured_logo_img_url); ?>" alt="<?php echo esc_attr($featured_logo_data['alt']); ?>"/>
                    <?php if (!empty($featured_logo_url)) { ?></a> <?php } ?>
                </div>
        <?php endwhile; endif; ?>
    </div>
</section>