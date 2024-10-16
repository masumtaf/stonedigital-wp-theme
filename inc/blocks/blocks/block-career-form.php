<?php 
/**
 * Block Name: Career Form
 *
 * This is the template that displays Career Form Block
 */

// create id attribute for specific styling
$id = 'section-stdl-career-' . $block['id'];

$section_title = get_field('career_title');
$section_text = get_field('career_desciptions');
$gravity_form = get_field('shortcode_form');
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

<section id="<?php echo $id; ?>" class="section-space stdl-section-career <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-career stdl-grid-col-2">
            <div class="stdl-career__content">
                <div class="stdl-career__details">
                    <div class="stdl-career__desc block_decs">
                        <?php echo( $section_text ) ;?>
                    </div>
                    <ul class="stdl-icon-lists">
                        <?php if(have_rows('list_icon_items')):
                            while(have_rows('list_icon_items')): the_row(); 
                                $icon_data = get_sub_field('list_icon_icon');
                                $icon__id = $icon_data["ID"];
                                $icon_url = wp_get_attachment_image_url($icon__id, 'full');
                                $icon_list_text = get_sub_field('list_icon_text');
                            ?>
                            <li class="stdl-icon-list">
                                <span class="stdl-icon-list__icon"><?php echo stdl_get_svg($icon__id);?></span>
                                <span class="stdl-icon-list__text"><?php esc_html_e( $icon_list_text ) ;?></span>
                            </li>
                        <?php $count++ ;endwhile; endif; ?>
                    </ul>
                </div>
            
            </div>
            <div class="stdl-career_gravity">
                <h4 class="stdl-career__title block_title">
                    <?php esc_html_e( $section_title ) ;?>
                </h4> 
                <div class="stdl-contact_gravity std-amin-common-content">
                    <?php echo do_shortcode( "{$gravity_form}" ); ?>
                </div>
            </div>
        </div>
    </div>
</section>