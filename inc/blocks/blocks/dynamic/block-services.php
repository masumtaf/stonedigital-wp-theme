<?php 
/**
 * Block Name: All Services Grid - Block
 *
 * This is the template that displays All Services Grid - Block
 */

// create id attribute for specific styling
$id = 'section-stdl-service-' . $block['id'];

$section_tagline = get_field('section_tigline');
$section_title = get_field('section_title');
$section_description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$background_style = get_field('background_style');
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

if(get_field('select_services')) {
    $selected_services = get_field('select_services');
} else {
    $query_arg = array(
        'post_type' => 'service',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'order'     => 'DESC',
        'orderby'   => 'date',
       
    );
    $archive_query = new WP_Query( $query_arg );
}
$count = 1;
?>

<section id="<?php echo $id; ?>" class="section-space stdl-section-archive-services <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_tagline || $section_title || $section_description) : ?>
            <div class="section-header-wrapper">
                <div class="section-header">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif; if ($section_title) : ?>
                        <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                    <?php endif; ?> 
                </div>
                <?php if ($section_description) : ?>
                    <div class="section-description">
                        <p class="stdl-description"><?php echo ( $section_description ) ;?></p>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif ;?>

        <div class="stdl-services">
            <div class="article-wrapper article-grid-2 service-item-bg-<?php echo esc_attr($background_style) ;?>">
            <?php if ( !empty($selected_services) ): ?>
                <?php foreach ($selected_services as $service_post ): ?>
                    <?php 
                        setup_postdata($service_post);
                       
                        $post_id = $service_post->ID;
                        $service_tagline = get_field('service_tagline', $post_id);
                        $short_text = get_field('short_text', $post_id);
                        $descriptions = get_field('single_page_descriptions', $post_id);
                        $service_icon_data = get_field('service_icon', $post_id);
                        $service_icon_id = $service_icon_data["ID"];
                        $service_icon_url = wp_get_attachment_image_url($service_icon_id, 'full');
                        $slug = basename(get_permalink($post_id));
                        $slug = "article-" . $slug ;
                    ?>
                    
                    <a id="post-<?php the_ID(); ?>" <?php post_class(['grid-article article-item', $slug]); ?> href="<?php echo esc_url(get_permalink($post_id)) ;?>">
                        <div class="article-item__header">
                            <?php if ($service_icon_id) :?>
                                <div class="header__img">
                                    <span>
                                        <?php echo stdl_get_svg($service_icon_id);?>
                                    </span>
                                </div> 
                            <?php endif ;?>
                            <div class="article__title">
                                <h2 class="block_title title"><?php echo get_the_title($post_id); ?></h2>
                            </div>
                        </div>
                        <div class="article-item__body">
                            <p><?php esc_html_e( $short_text ) ;?></p>
                        </div>
                    </a>
            <?php endforeach; else : ?>
                <?php if ( $archive_query->have_posts() ) :
                    while ( $archive_query->have_posts() ) :
                        $archive_query->the_post();
                        stdl_show_template('content-services');
                    endwhile;
                endif;
                ?>
            <?php endif; ?>
			</div>
        </div>
    </div>
</section>