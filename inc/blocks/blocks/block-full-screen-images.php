<?php 
/**
 * Block Name: Full Screen Image Block
 *
 * This is the template that displays Full Screen Image Block
 */

// create id attribute for specific styling
$id = 'section-stdl-full-image-' . $block['id'];

$desk_img_obj = get_field('desktop_background_image');
$desk_img_id = $desk_img_obj["ID"];
$desk_img_url = wp_get_attachment_image_url($desk_img_id, 'full');

$mob_img_obj = get_field('mobile_background_image');
$mob_img_id = $mob_img_obj["ID"];
$mob_img_url = wp_get_attachment_image_url($mob_img_id, 'full');

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

<section id="<?php echo $id; ?>" class="stdl-section-full-image <?php echo $bg_class; ?>">
    <?php if ($desk_img_url) : ?>
        <div class="desktop-image">
            <figure class="wp-block-image size-full mb-0">
                <img src="<?php echo esc_url($desk_img_url); ?>" alt="<?php echo esc_attr($desk_img_obj['alt']); ?>" class="">
            </figure>
        </div>
    <?php endif ;?>
    <?php if ($mob_img_url) : ?>
        <div class="mobile-image">
            <figure class="wp-block-image size-full mb-0">
                <img src="<?php echo esc_url($mob_img_url); ?>" alt="<?php echo esc_attr($mob_img_obj['alt']); ?>" class="">
            </figure>
        </div>
    <?php endif ;?>
</section>