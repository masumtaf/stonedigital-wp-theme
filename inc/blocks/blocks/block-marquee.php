<?php 
/**
 * Block Name: Display Marquee Text/image
 *
 * This is the template that Marquee Text/image
 */

// create id attribute for specific styling
$id = 'section-stdl-marquee-' . $block['id'];
$section_bg_color = get_field( 'select_background_color' );
$count = 1;
$font_size = get_field( 'text_font_size' ) ?  get_field( 'text_font_size' ) : 110;
$line_height = $font_size + 20;
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

<section id="<?php echo $id; ?>" class="stdl-section-marque section-space <?php echo $bg_class; ?>">
    <div class="stdl-marque-content">
        <div class="stdl-marque-items">
            <ul>
                <?php if(have_rows('marque_items')):
                    while(have_rows('marque_items')): the_row(); 
                        $marque_text = get_sub_field('marque_text');
                        $marque_text_link = get_sub_field('marque_link');
                    ?>
                    <li class="stdl-marque-item" style="font-size:<?php echo esc_attr($font_size) ;?>px;line-height:<?php echo esc_attr($line_height) ;?>px">
                        <?php if (!empty($marque_text_link)) { ?> <a href="<?php echo esc_url($marque_text_link) ;?>" target="_blank"> <?php } ?>
                            <span class="stdl-marque-item__text"><?php esc_html_e( $marque_text ) ;?></span>
                        <?php if (!empty($marque_text_link)) { ?></a> <?php } ?>
                    </li>
                <?php $count++ ;endwhile; endif; ?>
            </ul>
        </div>
    </div>
</section>