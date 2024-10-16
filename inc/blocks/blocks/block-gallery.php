<?php 
/**
 * Block Name: Display Masonry Gallery
 *
 * This is the template that Masonry Gallery
 */

// create id attribute for specific styling
$id = 'section-stdl-team-' . $block['id'];
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('gallery_layout_type');

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

$gallery_img_obj = get_field('select_image');
$count = 1
?>

<div class="masonry-gallery masonry--<?php echo esc_attr($layout_type) ;?>">
    <div class="stdl-masonry-gallery-wrapper">
        <div class="stdl-masonry-gallery <?php echo $layout_type == "grid_style_one" ? "masonry-gallery-style-2" : "masonry-gallery-style-1" ;?>"> 
            <?php foreach ($gallery_img_obj as $image) { ?>
                <div class="stdl-masonry-gallery__item masonry-item-<?php echo $count ;?>">
                    <img src="<?php echo esc_url( $image['url'] ); ?>" alt="<?php echo esc_attr( $image['alt'] ); ?>"/>
                </div>
            <?php $count++; } ?>
        </div>
    </div>
</div>

