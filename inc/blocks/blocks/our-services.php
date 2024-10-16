<?php 
/**
 * Block Name: Brand Logo
 *
 * This is the template that displays - Brand Logo
 */

// create id attribute for specific styling
$id = 'section-stdl-our-services-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('layout_type');
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

<section id="<?php echo $id; ?>" class="stdl-section-our-services section-space <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_tagline || $section_title || $description) : ?>
            <div class="section-header-wrapper">
                <div class="section-header">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif; if ($section_title) : ?>
                        <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                    <?php endif; ?> 
                </div>
                <?php if ($description) : ?>
                    <div class="section-description">
                        <p class="stdl-description"><?php echo ( $description ) ;?></p>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif ;?>
        
        <div class="service-items stdl-grid-col-2 service-item--<?php echo esc_attr($layout_type) ;?>">
            <?php if(have_rows('our_service_items_rept')):
                while(have_rows('our_service_items_rept')): the_row(); 
                $service_title = get_sub_field('service_item_title');
                $service_icon_data = get_sub_field('service_item_image');
                $service_icon_id = $service_icon_data["ID"];
                $service_icon_url = wp_get_attachment_image_url($service_icon_id, 'full');
                $service_text = get_sub_field('service_item_text');
             
                ?>
                <div class="service-item">
                    <div class="service-item__header">
                        <?php if ($service_icon_id) :?>
                            <div class="header__img">
                                <span>
                                    <?php echo stdl_get_svg($service_icon_id);?>
                                </span>
                            </div> 
                        <?php endif; ?>
                        <div class="header__title">
                            <h4 class="header__title"><?php esc_html_e( $service_title ) ;?></h4>
                        </div>
                    </div>
                    <div class="service-item__body">
                        <?php echo( $service_text ) ;?>
                    </div>
                </div>
              
            <?php endwhile; endif; ?>
        </div>

    </div>
</section>