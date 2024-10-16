<?php 
/**
 * Block Name: Display Our Team and Explore out team
 *
 * This is the template that Our Team and Explore out team
 */

// create id attribute for specific styling
$id = 'section-stdl-team-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );

$things_i_like = get_field( 'things_i_like' );
$things_i_like_items = get_field( 'things_i_like_items' );

$things_i_love = get_field( 'things_i_love' );
$things_i_love_items = get_field( 'things_i_love_items' );

$hobby_gallery = get_field('hobby_gallery');
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

<section id="<?php echo $id; ?>" class="stdl-section-team-hobbies section-space <?php echo $bg_class; ?>">
    <div class="container">
        <div class="team-hobbies stdl-grid-col-2">
            <div class="team-hobbies_gallery swiper-hobby-gallery swiper">
            <?php  if ($hobby_gallery) { ?>
                <div class="stdl-hobbies-gallery swiper-wrapper">
                    <?php foreach ($hobby_gallery as $image) {
                        // Determine the rotation angle based on the item's position
                        // $rotation_angle = 0;
                        // if ($count % 2 == 0) {
                        //     $rotation_angle = -5 * ceil($count / 2);
                        // } elseif ($count > 1) {
                        //     $rotation_angle = 5 * floor(($count + 1) / 2);
                        // }
                        // // Set z-index to layer the items
                        // $z_index = 100 - $count;
                        ?>
                        <div class="stdl-hobbies-gallery__item swiper-slide">
                            <img src="<?php echo esc_url($image['sizes']['hobby-gallery']); ?>" alt="<?php echo esc_attr($image['alt']); ?>"/>
                        </div>
                    <?php $count++; } ?>
                </div>
            <?php } ?>
            </div>  
            <div class="team-hobbies_content">
                <div class="stdl-section__title">
                    <div class="section-header text-center">
                        <?php if ($section_tagline) : ?>
                            <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                        <?php endif; if ($section_title) : ?>
                            <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                        <?php endif; ?> 
                        <?php if ($description) : ?>
                            <p class="stdl-description"><?php echo ( $description ) ;?></p>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="team-hobbies-lists">
                    <div class="hobbies-list">
                        <h4><?php echo ( $things_i_like ) ;?></h4>
                        <div class="hobbies-list-wrap">
                            <?php echo ( $things_i_like_items ) ;?>
                        </div>
                    </div>
                    <div class="hobbies-list">
                        <h4><?php echo ( $things_i_love ) ;?></h4>
                        <div class="hobbies-list-wrap">
                            <?php echo ( $things_i_love_items ) ;?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>  
<script>
  jQuery(document).ready(function ($) {
        var swiper = new Swiper(".swiper-hobby-gallery", {
            effect: "cards",
            grabCursor: true,
            initialSlide: 2,
            speed: 500,
            loop: true,
            rotate: true,
            mousewheel: {
            invert: false,
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        });
    });
</script>