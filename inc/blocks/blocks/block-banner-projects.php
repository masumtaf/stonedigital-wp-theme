<?php 
/**
 * Block Name: Single - Project (case study) Banner  
 *
 * This is the template that Banner Block
 */

// create id attribute for specific styling
$id = 'section-single-page-banner-' . $block['id'];

$banner_tagline = get_field('banner_tagline');
$banner_tagline_link = get_field('banner_tagline_link');
$banner_title = get_field('banner_title');
$banner_descriptions = get_field('banner_descriptions');
$live_site_link_text = get_field('live_site_link_text');
$live_site_link = get_field('live_site_link');

$banner_img_obj = get_field('banner_background_image');
$banner_img_id = $banner_img_obj["ID"];
$banner_img_url = wp_get_attachment_image_url($banner_img_id, 'full');

$banner_mobl_img_obj = get_field('background_image_for_mobile');
$banner_mobl_img_id = $banner_mobl_img_obj["ID"];
$banner_mobl_img_url = wp_get_attachment_image_url($banner_mobl_img_id, 'full');

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

<style id="<?php echo $id; ?>"> 
    <?php if ($banner_mobl_img_url) : ?>
        .stdl-single-page-banner  {
            background: url('<?php echo esc_url($banner_mobl_img_url);?>');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
        }
    <?php else : ?>
        .stdl-single-page-banner  {
            background: url('<?php echo esc_url($banner_img_url);?>');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
        }
    <?php endif ;?>

    @media (min-width: 992px) {
        .stdl-single-page-banner  {
            background: url('<?php echo esc_url($banner_img_url);?>');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
        }
    }

</style>
<section id="<?php echo $id; ?>" class="section-page-banner stdl-single-page-banner <?php echo $bg_class; ?>">
    <div class="container">
        <div class="banner-header-content">
            <div class="banner-header">
                <h4 class="stdl-tagline">
                    <?php if ($banner_tagline_link) : ?>
                        <a class="block_link" href="<?php echo esc_url($banner_tagline_link) ;?>">
                    <?php endif ;?>
                        <?php esc_html_e( $banner_tagline ) ;?>
                    <?php if ($banner_tagline_link) : ?>
                        </a>
                    <?php endif ;?>
                </h4>
                <h class="stdl-title"><?php echo $banner_title ;?></h1>
            </div> 
            
            <div class="banner-footer">
                <div class="section-banner-btn-warp text-left">
                    <a class="block_link"  target="_blank" href="<?php echo esc_url($live_site_link) ;?>"><?php esc_html_e( $live_site_link_text ) ;?> →</a>
                </div>
                <div class="banner-descriptions">
                    <?php echo $banner_descriptions;?>
                </div>
            </div>
        </div>
    </div>
</section>