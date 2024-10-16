<?php 
/**
 * Block Name: Claim Technical Website Audit
 *
 * This is the template that displays - Claim Technical Website Audit
 */

// create id attribute for specific styling
$id = 'section-stdl-audit-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('layout_type');
$gravity_form = get_field('gravity_form');

$section_img = get_field('audit_img');
$section_img__id = $section_img["ID"];
$section_img_url = wp_get_attachment_image_url($section_img__id, 'grid-tile');

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

if ($layout_type == 'stdl_content_left') {
    $stdl_class = 'stdl-content--left';
} 
else {
    $stdl_class = 'stdl-content--right';
}
?>

<section id="<?php echo $id; ?>" class="stdl-section-audit section-space <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-audit stdl-grid-col-2 <?php echo esc_attr($stdl_class) ;?>">
            <div class="stdl-audit__img">
                <img src="<?php echo esc_url($section_img_url);?>" alt="<?php echo esc_attr($section_img['alt']) ;?>">
            </div>
            <div class="stdl-audit__content">
                <?php
                $available_spots = 4;
                $current_day = date('j');
                $current_month = date('F');
                $weeks_passed = floor(($current_day - 1) / 7);
                $available_spots -= $weeks_passed;
                $final_available_spots = max(1, $available_spots);
                ?>

                <?php if ($section_tagline || $section_title || $description) : ?>
                    
                        <div class="section-header">
                            <?php if ($section_tagline) : ?>
                                <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                            <?php endif; if ($section_title) : ?>
                                <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                            <?php endif; ?> 
                        </div>
                        <div class="spot">
                            <p><?php echo "Only {$final_available_spots} spot remains in {$current_month}";?></p>
                        </div>
                        <?php if ($description) : ?>
                            <div class="section-description">
                                <p class="stdl-description"><?php echo ( $description ) ;?></p>
                            </div>
                        <?php endif; ?>

                        <?php if ($description) : ?> 
                            <div class="stdl-section-form">
                                <?php echo do_shortcode( "{$gravity_form}" ); ?>
                            </div>
                        <?php endif; ?>
                    
                <?php endif ;?>
            </div>
        </div>
    </div>
</section>