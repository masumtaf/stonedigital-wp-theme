

<?php 
/**
 * Block Name: Cta 
 *
 * This is the template that displays Cta Block
 */

// create id attribute for specific styling
$id = 'section-stdl-popup-btns-' . $block['id'];

$primary_btn = get_field('primary_btn_text');
$primary_btn_popup_content = get_field('primary_btn_popup_content');
$primary_popup_post_id = $primary_btn_popup_content->ID;
$secondary_btn_text = get_field('secondary_btn_text');
$secondary_btn_popup_content = get_field('secondary_btn_popup_content');
$secondary_popup_post_id = $secondary_btn_popup_content->ID;
$section_btn_align = get_field( 'buttons_align' );

switch ($section_btn_align) {
	case 'btn_left':
		$align_class = 'text-left';
		break;
	case 'btn_center':
		$align_class = 'text-center';
		break;
	case 'btn_right':
		$align_class = 'text-right';
		break;	
	default:
		$align_class = '';
		break;
}

$enable_primary_btn_popup = get_field( 'enable_primary_btn_popup' );
$enable_secondary_btn_popup = get_field( 'enable_secondary_btn_popup' );

?>

<div id="<?php echo $id; ?>" class="section-btn-warp <?php echo $align_class; ?>">
<?php if($enable_primary_btn_popup) : ?>
    	<a class="stdl-section-btn btn-primary popup-action" data-action-id="popup-id-<?php echo esc_attr($primary_popup_post_id);?>" href="javascript:void(0)"><?php esc_html_e( $primary_btn ) ;?></a>
	<?php else : 
		$primary_btn_url = get_field( 'primary_btn_url' );
		?> 
		<a class="stdl-section-btn btn-primary" href="<?php echo esc_url($primary_btn_url);?>"><?php esc_html_e( $primary_btn ) ;?></a>
	<?php endif; ?> 
	<?php if($enable_secondary_btn_popup) : ?>
    <a class="stdl-section-btn btn-secondary popup-action"  data-action-id="popup-id-<?php echo esc_attr($secondary_popup_post_id);?>" href="javascript:void(0)"><?php esc_html_e( $secondary_btn_text ) ;?></a>
	<?php else : 
		$secondary_btn_url = get_field( 'secondary_btn_url' );
		?> 
		<a class="stdl-section-btn btn-secondary" href="<?php echo esc_url($secondary_btn_url);?>"><?php esc_html_e( $secondary_btn_text ) ;?></a>
	<?php endif; ?> 
</div>
