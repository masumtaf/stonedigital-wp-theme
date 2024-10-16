<?php 
/**
 * Block Name: Current Vacancies
 *
 * This is the template that displays Current Vacancies
 */

// create id attribute for specific styling
$id = 'section-stdl-vacancies-' . $block['id'];
$section_title = get_field('section_title');
//button background
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

if(get_field('opening_vacancies')) {
    $opening_vacancies = get_field('opening_vacancies');
} else {
    $query_args = array(
        'post_type' => 'career',
        'post_status' => 'publish',
        'order'     => 'DESC',
        'orderby'   => 'date',
        'posts_per_page' => -1,
    );
    $posts_query = new WP_Query( $query_args );
    $opening_vacancies = $posts_query->get_posts();
}
?>

<section id="<?php echo $id; ?>" class="section-space section-stdl-vacancies <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_title) : ?>
            <div class="section-header text-left">
                <?php if ($section_title) : ?>
                    <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                <?php endif; ?>
            </div>
        <?php endif ;?>

        <div class="vacancies-items stdl-grid-col-3">
            <?php if (count($opening_vacancies) > 0): ?>
                <?php foreach ($opening_vacancies as $career_post ): ?>
                    <?php 
                        setup_postdata($career_post);
                       
                        $post_id = $career_post->ID;
                        $permalink = get_the_permalink($post_id);
        
                        $short_text = get_field('short_text', $post_id);
                        $icon_data = get_field('career_icon', $post_id);
                        $icon__id = $icon_data["ID"];
                        $icon_url = wp_get_attachment_image_url($icon__id, 'full');
                     
                    ?>
                <div class="vacancies-item">
                    <div class="vacancies-item__header">
                        <div class="vacancies-item__thumb">
                            <span>
                                <?php echo stdl_get_svg($icon__id);?>
                            </span>
                        </div> 
                    </div>
                    <div class="vacancies-item__body">
                        <h2 class="title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title($career_post); ?></a></h2>
                        <p class="desc"><?php esc_html_e( $short_text ) ;?></p>
                    </div> 
                    <div class="section-btn-warp vacancies-item__footer text-center">
                        <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($permalink) ;?>"><?php esc_html_e( 'Apply Now' ) ;?></a>
                    </div>
                </div>
            <?php endforeach; endif; ?>
        </div>
    </div>
</section>