<?php 
/**
 * Block Name: Brand Logo
 *
 * This is the template that displays - Brand Logo
 */

// create id attribute for specific styling
$id = 'section-stdl-brand-logo-' . $block['id'];
$section_heading = get_field('section_title');

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

<section id="<?php echo $id; ?>" class="stdl-section-brand-logo <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-brand-logo">
            <?php if ($enable_section_heading) : ?>
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
                <?php endif ;?>
            <?php endif ;?>
            <div class="stdl-brand-logo-carousel owl-carousel owl-theme">
                <?php if(have_rows('brand_logo_rept')):
                    while(have_rows('brand_logo_rept')): the_row(); 
                    $brand_logo_data = get_sub_field('brand_logo_img');
                    $brand_logo__id = $brand_logo_data["ID"];
                    $brand_logo_img_url = wp_get_attachment_image_url($brand_logo__id, 'full');
                    $brand_logo_url = get_sub_field('brand_logo_url');
                    ?>
                    <div class="brand-logo-item">
                        <?php if (!empty($brand_logo_url)) { ?> <a href="<?php echo esc_url($brand_logo_url) ;?>" target="_blank"> <?php } ?>
                            <img class="brand-logo-item__img" src="<?php echo esc_url($brand_logo_img_url); ?>" alt="<?php echo esc_attr($brand_logo_data['alt']); ?>"/>
                        <?php if (!empty($brand_logo_url)) { ?></a> <?php } ?>
                    </div>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </div>
</section>