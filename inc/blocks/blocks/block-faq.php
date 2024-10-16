<?php 
/**
 * Block Name: Faq
 *
 * This is the template that displays faq
 */

// create id attribute for specific styling
$id = 'section-stdl-content-' . $block['id'];

$section_layout = get_field('show_content_on_left_or_right');
$select_font_size = get_field('select_font_size');
$section_heading = get_field('block_title');
$section_text = get_field('block_text');
$section_btn_text = get_field('block_button_text');
$section_btn_url = get_field('block_button_url');

$faq_box_style = get_field('faq_box_style');

$faq_style = 'default';
if ($faq_box_style){
    $faq_style = 'faq-style_box';
}

$stdl_class = '';

if($section_layout == 'stdl_faq_left') {
    $stdl_class = 'stdl-faq--left';
} 
elseif($section_layout == 'stdl_faq_right') {
    $stdl_class = 'stdl-faq--right';
}else {
    $stdl_class = 'stdl-faq--full';
}
$count = 1;
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

<section id="<?php echo $id; ?>" class="stdl-section-faq <?php echo $bg_class; ?> stdl-<?php echo esc_attr($select_font_size) ;?> style-<?php echo esc_attr($faq_style) ;?>">
    <div class="container">
        <div class="stdl-faq__content <?php echo esc_attr($stdl_class) ;?>">
            <?php if ( !empty($section_heading || $section_text) ) : ?>
                <div class="stdl-content__details"> 
                    <div class="stdl-content">
                        <h2 class="block_title">
                            <?php esc_html_e( $section_heading ) ;?>
                        </h2> 
                        <?php if($section_text) : ?>
                            <div class="stdl-contact__desc block_decs">
                                <?php echo $section_text ;?>
                            </div>
                        <?php endif ;?>
                    </div>

                    <?php if($section_btn_url && $section_btn_text ) : ?>
                        <div class="section-btn-warp text-left">
                            <a class="block_link" href="<?php echo esc_url($section_btn_url) ;?>"><?php esc_html_e( $section_btn_text ) ;?></a>
                        </div>
                    <?php endif ;?>
                </div>
            <?php endif ;?>
            <div class="stdl-content__faq">
                <div class="stdl-faq-items">
                    <?php if( have_rows('faq_items_rept') ): ?>
                        <?php while( have_rows('faq_items_rept') ): the_row(); 
                            $faq_item_title = get_sub_field('faq_item_title');
                            $faq_item_text = get_sub_field('faq_item_content');
                        ?>
                            <div class="stdl-faq-item">
                                <?php if(get_sub_field('faq_item_title')): ?>
                                    <div class="stdl-faq-item__title block_title">
                                        <h5 class="faq-title block_title"><?php esc_html_e( $faq_item_title ) ;?></h5>
                                        <span><?php echo stdl_get_svg('chevron-down.svg') ;?></span>
                                    </div>
                                <?php endif; ?>
                                <?php if(get_sub_field('faq_item_content')): ?>
                                    <div class="stdl-faq-item__content block_decs">
                                        <p><?php echo ( $faq_item_text ) ;?></p>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php $count++; endwhile; 
                    endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>