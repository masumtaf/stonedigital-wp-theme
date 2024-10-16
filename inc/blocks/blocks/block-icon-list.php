<?php 
/**
 * Block Name: Display Icon List
 *
 * This is the template that Icon List
 */

// create id attribute for specific styling
$id = 'section-stdl-icon-list-' . $block['id'];
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

<div id="<?php echo $id; ?>">
    <ul class="stdl-icon-lists">
        <?php if(have_rows('icon_list_items')):
            while(have_rows('icon_list_items')): the_row(); 
                $icon_data = get_sub_field('icon_list_item__image');
                $icon__id = $icon_data["ID"];
                $icon_url = wp_get_attachment_image_url($icon__id, 'full');
                $icon_list_text = get_sub_field('icon_list_item_text');
            ?>
            <li class="stdl-icon-list">
                <span class="stdl-icon-list__icon"><?php echo stdl_get_svg($icon__id);?></span>
                <span class="stdl-icon-list__text"><?php esc_html_e( $icon_list_text ) ;?></span>
            </li>
        <?php $count++ ;endwhile; endif; ?>
    </ul>
</div>