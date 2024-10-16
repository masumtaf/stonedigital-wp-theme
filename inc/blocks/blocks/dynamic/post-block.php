<?php 
/**
 * Block Name: Post Block
 *
 * This is the template that displays Post Block
 */

// create id attribute for specific styling
$id = 'section-stdl-post-' . $block['id'];
$enable_section_heading = get_field('enable_section_heading');
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
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
?>
<?php
    if(get_field('post_content')) {
        $featured_posts = get_field('post_content');
    } else {
        $query_blog = new WP_Query(array(
            'post_type' => 'post',
            'post_status' => 'publish',
            'order'     => 'DESC',
            'orderby'   => 'date',
            'posts_per_page' => -1,
        ));
        $posts_query = new WP_Query( $query_blog );
        $featured_posts = $posts_query->get_posts();
    }
           
?>
<section id="<?php echo $id; ?>" class="stdl-section-post-content <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($enable_section_heading) : ?>
            <?php if ($section_tagline || $section_title || $description) : ?>
                <div class="stdl-section__title section-header text-center">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif; if ($section_title) : ?>
                        <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                    <?php endif; ?> 
                    <?php if ($description) : ?>
                        <p class="stdl-description"><?php echo ( $description ) ;?></p>
                    <?php endif; ?>
                </div>
            <?php endif ;?>
        <?php endif ;?>
        <div class="stdl-post">
            <?php if( get_field('select_layout_type') == 'post_carousel' ) { ?>
                <div class="stdl-post__carousel owl-carousel owl-theme">
            <?php } else { ?>
                <div class="stdl-post__grid stdl-grid-col-3">
            <?php } ?>
            <?php if (count($featured_posts) > 0): ?>
                <?php foreach ($featured_posts as $post ): ?>
                    <?php 
                        setup_postdata($post);
                        $post_id = $post->ID;
                        $permalink = get_the_permalink($post_id);
                    ?>
                    <article id="post-<?php echo esc_attr($post_id); ?>" <?php post_class( ['stdl-post-item']); ?>>
                        <div class="stdl-post__thumb">
                            <?php if(get_the_post_thumbnail($post_id)) { ?>
                            <a href="<?php echo esc_url( $permalink ); ?>"  title="<?php esc_attr(the_title_attribute()); ?>">
                                <?php echo get_the_post_thumbnail( $post_id, 'grid-tile' ); ?>
                            </a>
                            <?php }else{?>
                                <a href="<?php echo esc_url( $permalink ); ?>" class="placeholder-img">
                                    <img class="attachment-grid-tile size-grid-tile wp-post-image" width="536" height="232" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
                                </a>
                            <?php } ?>
                        </div>
                        <div class="stdl-post__content">
                            <h2 class="title"><a class="title-truncate" href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title($post); ?></a></h2>
                            <p class="desc"> <?php echo wp_trim_words( get_the_content($post), 15, '...' ); ?></p>
                        </div>
                        <div class="stdl-post__footer">
                            <div>
                                <span><?php echo get_the_date('F j, Y', $post_id) ;?></span>
                                <span><?php echo stdl_reading_time(get_the_content($post)) ;?></span>
                            </div>
                        </div>
                        
                    </article>
                <?php endforeach; ?>
            <?php endif ;?>
            </div>
        </div>
        <?php if ( $enable_btns ): ?>
            <div class="section-btn-warp text-center">
                <?php 
                    $section_btn_text = get_field('block_btn_text');
                    $section_btn_url = get_field('block_btn_url');
                    $button_two_text = get_field('second_btn_text');
                    $button_two_url = get_field('second_btn_url');

                if($section_btn_url && $section_btn_text ) : ?>
                        <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($section_btn_url) ;?>"><?php esc_html_e( $section_btn_text ) ;?></a>
                    <?php endif; ?> 
                    <?php if ($button_two_text) : ?>
                        <a class="stdl-section-btn btn-secondary" href="<?php echo esc_url($button_two_url) ;?>"><?php esc_html_e( $button_two_text ) ;?></a>
                    <?php endif; ?>
            </div>
        <?php endif ;?>
    </div>
</section>