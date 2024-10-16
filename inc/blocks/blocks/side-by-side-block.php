<?php 
/**
 * Block Name: Side By Sid Content
 *
 * This is the template that displays - Side by Side content
 */

// create id attribute for specific styling
$id = 'section-stdl-content-' . $block['id'];

$section_layout = get_field('show_content_on_left_or_right');
$section_tagline = get_field('section_tagline');
$section_heading = get_field('block_title');
$section_text = get_field('block_text');
$section_img = get_field('block_img');
$section_img__id = $section_img["ID"];
$section_img_url = wp_get_attachment_image_url($section_img__id, 'standard-size-sm');
$enable_btns = get_field('enable_buttons');

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

$stdl_class = '';

if ($section_layout == 'stdl_content_left') {
    $stdl_class = 'stdl-content--left';
} 
else {
    $stdl_class = 'stdl-content--right';
}
?>

<section id="<?php echo $id; ?>" class="stdl-section-content-img section-space std-amin-img-content <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-content-full-img <?php echo esc_attr($stdl_class) ;?> std-amin-item">
            <div class="stdl-content std-amin-content">
                <div class="section-header">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif ?>
                    <h2 class="stdl-content__title block_title">
                        <?php echo ( $section_heading ) ;?>
                    </h2> 
                    <div class="stdl-content__text">
                        <?php echo $section_text ;?>
                    </div>
                </div>
                <div class="section-btn-warp text-left btn-sm-inline">
                    <?php if ( $enable_btns ):
                            $section_btn_text = get_field('block_btn_text');
                            $section_btn_url = get_field('block_bnt_url');
                            $button_two_text = get_field('second_btn_text');
                            $button_two_url = get_field('second_btn_url');

                    if($section_btn_url && $section_btn_text ) : ?>
                            <a class="stdl-section-btn btn-primary-tp" href="<?php echo esc_url($section_btn_url) ;?>"><?php esc_html_e( $section_btn_text ) ;?></a>
                        <?php endif; ?> 
                        <?php if ($button_two_text) : ?>
                            <a class="stdl-section-btn btn-link" href="<?php echo esc_url($button_two_url) ;?>"><?php esc_html_e( $button_two_text ) ;?></a>
                        <?php endif; ?>
                    <?php endif ;?>
                </div>
            </div>
            <div class="stdl-content__img block_img std-amin-img">
                <img src="<?php echo esc_url($section_img_url);?>" alt="<?php echo esc_attr($section_img['alt']) ;?>">
            </div>
        </div>
    </div>
</section>