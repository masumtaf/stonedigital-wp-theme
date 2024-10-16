<?php 
/**
 * Block Name: Display Image Gallery
 *
 * This is the template that Image Gallery
 */

// create id attribute for specific styling
$id = 'section-stdl-image-gallery-' . $block['id'];
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('layout_type');
$count = 1;
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
<section class="stdl-section-image-gallery section-space <?php echo $bg_class; ?>">

    <ul class="stdl-image-gallery-items">
        <?php if(have_rows('image_gallery_items')):
            while(have_rows('image_gallery_items')): the_row(); 
                $icon_data = get_sub_field('image_gallery_item');
                $icon__id = $icon_data["ID"];
                $icon_url = wp_get_attachment_image_url($icon__id, 'full');
                $image_link = get_sub_field('image_link');;
            ?>
            <li class="stdl-gallery-item">
                <?php if($image_link) : ?> <a href="<?php echo esc_url($image_link);?>"> <?php endif ;?>
                    <img src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($icon_data['alt']); ?>">
                <?php if($image_link) : ?> </a> <?php endif ;?>
            </li>
        <?php $count++ ;endwhile; endif; ?>
    </ul>

</section>
