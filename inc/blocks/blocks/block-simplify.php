<?php 
/**
 * Block Name: We Simplify for the Client
 *
 * This is the template that displays - We Simplify for the Client
 */

// create id attribute for specific styling
$id = 'section-stdl-simplify-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('layout_type');
$enable_btns = get_field('enable_btn');

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

<section id="<?php echo $id; ?>" class="stdl-section-simplify section-space <?php echo $bg_class; ?>">
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
        
        <div class="simplify-items stdl-grid-col-3 simplify-item--<?php echo esc_attr($layout_type) ;?>">
            <?php if(have_rows('simplify_items_rept')):
                while(have_rows('simplify_items_rept')): the_row(); 
                $simplify_title = get_sub_field('simplify_item_title');
                $simplify_icon_data = get_sub_field('simplify_item_image');
                $simplify_icon_id = $simplify_icon_data["ID"];
                $simplify_icon_url = wp_get_attachment_image_url($simplify_icon_id, 'full');
                $simplify_text = get_sub_field('simplify_item_text');
                ?>
                <div class="simplify-item">
                    <div class="simplify-item__header">
                        <?php if ($simplify_icon_id): ?>
                            <div class="header__img">
                                <span>
                                    <?php echo stdl_get_svg($simplify_icon_id);?>
                                </span>
                            </div> 
                        <?php endif ;?>
                        <div class="header__title">
                            <h4 class="header__title"><?php esc_html_e( $simplify_title ) ;?></h4>
                        </div>
                    </div>
                    <div class="simplify-item__body">
                        <p><?php esc_html_e( $simplify_text ) ;?></p>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>

        <?php if ( $enable_btns ):
                $button_one_text = get_field('learn_morebtn_text');
                $button_one_url = get_field('learn_morebtn_url');
                $button_two_text = get_field('sign_up_btn_text');
                $button_two_url = get_field('sign_up_btn_url');
            ?>
            <div class="section-btn-warp text-center btn-sm-inline">
                <?php if ($button_one_text) : ?>
                    <a class="stdl-section-btn btn-primary-tp" href="<?php echo esc_url($button_one_url) ;?>"><?php esc_html_e( $button_one_text ) ;?></a>
                <?php endif; ?> 
                <?php if ($button_two_text) : ?>
                    <a class="stdl-section-btn btn-link" href="<?php echo esc_url($button_two_url) ;?>"><?php esc_html_e( $button_two_text ) ;?></a>
                <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>
</section>