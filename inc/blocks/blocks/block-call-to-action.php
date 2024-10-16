<?php 
/**
 * Block Name: Cta 
 *
 * This is the template that displays Cta Block
 */

// create id attribute for specific styling
$id = 'section-stdl-cta-' . $block['id'];

$section_title = get_field('section_heading');
$primary_btn = get_field('primary_btn');
$primary_btn_popup_content = get_field('primary_btn_popup_content');
$primary_popup_post_id = $primary_btn_popup_content->ID;
$secondary_btn_text = get_field('secondary_btn_text');
$secondary_btn_popup_content = get_field('secondary_btn_popup_content');
$secondary_popup_post_id = $secondary_btn_popup_content->ID;
$section_bg_color = get_field( 'select_background_color' );
$enable_first_btn_popup = get_field( 'enable_first_btn_popup' );
$enable_second_btn_popup = get_field( 'enable_second_btn_popup' );

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

<section id="<?php echo $id; ?>" class="section-space section-space section-stdl__cta <?php echo $bg_class; ?>">
    <div class="container">
        <div class="section-header">
            <h2 class="wp-block-heading has-text-align-center stdl-title"><?php echo $section_title ;?></h2>
            <div class="section-btn-warp text-center">
				<?php if($enable_first_btn_popup) : ?>
                <a class="stdl-section-btn btn-primary popup-action" data-action-id="popup-id-<?php echo esc_attr($primary_popup_post_id);?>" href="javascript:void(0)"><?php esc_html_e( $primary_btn ) ;?></a>
				<?php else : 
					$primary_button_url = get_field( 'primary_button_url' );
					?> 
						<a class="stdl-section-btn btn-primary" href="<?php echo esc_url($primary_button_url);?>"><?php esc_html_e( $primary_btn ) ;?></a>
				<?php endif; ?>
				<?php if($enable_second_btn_popup) : ?>
                	<a class="stdl-section-btn btn-secondary popup-action"  data-action-id="popup-id-<?php echo esc_attr($secondary_popup_post_id);?>" href="javascript:void(0)"><?php esc_html_e( $secondary_btn_text ) ;?></a>
				<?php else : 
					$secondary_btn_url = get_field( 'secondary_button_url' );
					?> 
					<a class="stdl-section-btn btn-secondary" href="<?php echo esc_url($secondary_btn_url);?>"><?php esc_html_e( $secondary_btn_text ) ;?></a>
				<?php endif; ?> 

            </div>
        </div>
    </div>
</section>
