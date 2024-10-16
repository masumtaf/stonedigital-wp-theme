<?php 
/**
 * Block Name: Cta 
 *
 * This is the template that displays Cta Block
 */

// create id attribute for specific styling
$id = 'section-stdl-magnet-form-' . $block['id'];

$block_title = get_field('block_title');
$block_text = get_field('block_text');
$form_shortcode = get_field('form_shortcode');

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

<section id="<?php echo $id; ?>" class="section-space section-magnet-form <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-magnet-form">
            <?php if ( $block_title || $block_text) : ?>
                <div class="stdl-section__title">
                    <div class="section-header text-center">
                        <?php if ($block_title) : ?>
                            <h2 class="stdl-title"><?php echo ( $block_title ) ;?></h2>
                        <?php endif; ?> 
                        <?php if ($block_text) : ?>
                            <div class="stdl-description"><?php echo ( $block_text ) ;?></div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif ;?>
            <div class="magnet-form">
                <div class="stdl-contact_gravity">
                    <?php echo do_shortcode( "{$form_shortcode}" ); ?>
                </div>
            </div>
        </div>
    </div>
</section>