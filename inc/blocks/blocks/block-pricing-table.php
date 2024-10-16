<?php 
/**
 * Block Name: Display Pricing Table
 *
 * This is the template that Pricing Table
 */

// create id attribute for specific styling
$id = 'section-stdl-pricing-table-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
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

<section id="<?php echo $id; ?>" class="stdl-section-pricing-table section-space <?php echo $bg_class; ?>">
    <div class="container">
            <?php if ($section_tagline || $section_title || $description) : ?>
                <div class="section-header text-center">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline text-center"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif; if ($section_title) : ?>
                        <h2 class="stdl-title text-center"><?php echo ( $section_title ) ;?></h2>
                    <?php endif; ?> 
                    <?php if ($description) : ?>
                        <div class="section-description text-center">
                            <p class="stdl-description"><?php echo ( $description ) ;?></p>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif ;?>

        <div class="stdl-pricing-table-wrap">
            <?php if(have_rows('pricing_table')):
                while(have_rows('pricing_table')): the_row(); 
                    $enable_popular_tag = get_sub_field('enable_popular_tag');
                    $popular_text = get_sub_field('popular_text');
                    $pricing_table_title = get_sub_field('pricing_table_title');
                    $pricing_table_sub_title = get_sub_field('pricing_table_sub_title');
                    $pricing_table_price = get_sub_field('pricing_table_price');
                    $short_text_after_pricing = get_sub_field('short_text_after_pricing');
                    $pricing_table_btn_text = get_sub_field('pricing_table_btn_text');
                    $pricing_table_btn_url = get_sub_field('pricing_table_btn_url');
                    $inclusions_lists = get_sub_field('inclusions_lists');
                ?>
                <div class="pricing-table-item <?php if($enable_popular_tag == 1) : echo "stdl-popular-tag";endif;?>">
                    <div class="pricing-table-item__header text-center">
                            <?php if ( $enable_popular_tag) :?>
                                <span class="stdl-popular-tag"><?php esc_html_e( $popular_text ) ;?></span>
                            <?php endif; ?>
                        <div class="pricing-table-item__title">
                            <h2><?php esc_html_e( $pricing_table_title ) ;?></h2>
                            <h4><?php esc_html_e( $pricing_table_sub_title ) ;?></h4>
                        </div>
                        <div class="pricing-table-item__price"><?php esc_html_e( $pricing_table_price ) ;?></div>
                        <h6 class="pricing-table-item__short-text"><?php esc_html_e( $short_text_after_pricing ) ;?></h6>
                        <div class="pricing-table-item__btn">
                            <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($pricing_table_btn_url) ;?>"><?php esc_html_e( $pricing_table_btn_text ) ;?></a>
                        </div>
                    </div>
                    <div class="pricing-table-item__body">
                        <?php echo $inclusions_lists ;?>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</div>