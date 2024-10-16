<?php 
/**
 * Block Name: Service Box
 *
 * This is the template that displays Service Box
 */

// create id attribute for specific styling
$id = 'section-stdl-service-' . $block['id'];
$background_style = get_field('background_style');
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$layout_type = get_field('layout_type');
$enable_btns = get_field('enable_btn');
//button background
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

<section id="<?php echo $id; ?>" class="custom-icon-tile section-stdl-service service-layout--<?php echo esc_attr($layout_type) ;?> <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_tagline || $section_title || $description) : ?>
            <div class="section-header text-align">
                <?php if ($section_tagline) : ?>
                    <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                <?php endif; if ($section_title) : ?>
                    <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                <?php endif; if ($description) : ?>
                    <p class="stdl-description"><?php esc_html_e( $description ) ;?></p>
                <?php endif; ?>
            </div>
        <?php endif ;?>

        <div class="service-items stdl-grid-col-3 service-item--<?php echo esc_attr($layout_type) ;?> service-item-bg-<?php echo esc_attr($background_style) ;?>">
            <?php if(have_rows('service_items_rept')):
                while(have_rows('service_items_rept')): the_row(); 
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
                            <?php endif ;?>
                            <div class="header__title">
                                <h4 class="header__title"><?php esc_html_e( $service_title ) ;?></h4>
                            </div>
                        </div>
                  
                    <div class="service-item__body">
                        <?php echo ( $service_text ) ;?>
                    </div>
                   
                </div>
              
            <?php endwhile; endif; ?>
        </div>
        <?php if ($enable_btns) : ?>
            <?php
                $button_one_text = get_field('button_one_text');
                $button_one_url = get_field('button_one_url');
                $button_two_text = get_field('button_two_text');
                $button_two_url = get_field('button_two_url');
            ?>
            <div class="section-btn-warp text-center">
                <?php if ($button_one_text) : ?>
                    <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($button_one_url) ;?>"><?php esc_html_e( $button_one_text ) ;?></a>
                <?php endif; ?> 
                <?php if ($button_two_text) : ?>
                    <a class="stdl-section-btn btn-secondary" href="<?php echo esc_url($button_two_url) ;?>"><?php esc_html_e( $button_two_text ) ;?></a>
                <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>
</section>