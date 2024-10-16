<?php 
/**
 * Block Name:  Counter Icon Block
 *
 * This is the template that displays - Counter Icon Block
 */

$id = 'section-stdl-counter-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
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

<section id="<?php echo $id; ?>" class="stdl-section-counter section-space <?php echo $bg_class; ?>">
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
        
        <div class="counter-items stdl-grid-col-4">
            <?php if(have_rows('counter_icon_items')):
                while(have_rows('counter_icon_items')): the_row(); 
                
                $counter_icon_data = get_sub_field('counter_item_icon');
                $counter_icon_id = $counter_icon_data["ID"];
                $counter_icon_url = wp_get_attachment_image_url($counter_icon_id, 'full');
                $counter_number = get_sub_field('counter_item_number');
                $counter_text = get_sub_field('counter_item_text');
                ?>
                <div class="counter-item">
                    <div class="counter__icon">
                        <span>
                            <?php echo stdl_get_svg($counter_icon_id);?>
                        </span>
                    </div>
                    <div class="counter-number">
                        <h4 class="number"><?php esc_html_e( $counter_number ) ;?></h4>
                    </div>
                    <div class="counter-text">
                        <p><?php esc_html_e( $counter_text ) ;?></p>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>

    </div>
</section>