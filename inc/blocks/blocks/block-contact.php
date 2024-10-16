<?php 
/**
 * Block Name: Contact Block
 *
 * This is the template that displays Contact Block
 */

// create id attribute for specific styling
$id = 'section-stdl-contact-' . $block['id'];

$section_title = get_field('contact_title');
$section_text = get_field('contact_details');
$section_btn_text = get_field('contact_button_text');
$section_btn_url = get_field('contact_button_url');
$gravity_form = get_field('contact_form_shotrcode');
$section_bg_color = get_field( 'select_background_color' );
$enable_btn = get_field( 'enable_btn' );

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

<section id="<?php echo $id; ?>" class="stdl-section-contact std-amin-common-section <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-contact stdl-grid-col-2">
            <div class="stdl-contact__content std-amin-common-content">
                <div class="stdl-contact__details">
                    <h4 class="stdl-contact__title block_title">
                        <?php esc_html_e( $section_title ) ;?>
                    </h4> 
                    <div class="stdl-contact__desc block_decs">
                        <?php echo( $section_text ) ;?>
                    </div>
                </div>
                <?php if($enable_btn ) : ?>
                    <?php if($section_btn_url && $section_btn_text ) : ?>
                        <div class="section-btn-warp text-left">
                            <a class="block_link" href="<?php echo esc_url($section_btn_url) ;?>"><?php esc_html_e( $section_btn_text ) ;?></a>
                        </div>
                    <?php endif ;?>
                <?php else : ?>
                    <div class="stdl-contact-details">
                        <h4>Sydney Office</h4>
                        <ul>
                            <li><a href="tel:<?php echo esc_attr( STDL_PHONE_NO );?>"><?php esc_html_e( STDL_PHONE_NO ) ;?></a></li>
                            <li><span> 3/55 Pyrmont Bridge Rd, <br>Pyrmont NSW 2009</span></li>
                        </ul>
                    </div>
                <?php endif ;?>
            </div>
            <?php 
            // Get the email parameter value from the URL
            $dynamic_email = isset($_GET['email']) ? sanitize_email($_GET['email']) : '';

            ?>
            <div class="stdl-contact_gravity std-amin-common-content">
                <?php echo do_shortcode( '[gravityform id="4" title="false" ajax="true" field_values="email=' . $dynamic_email . '"]' ); ?>
            </div>
        </div>
    </div>
</section>

