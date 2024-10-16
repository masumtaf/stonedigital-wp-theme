<?php 
/**
 * Block Name: Post Block
 *
 * This is the template that displays Post Block
 */
$query_featured = new WP_Query(array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'order'     => 'DESC',
    'orderby'   => 'date',
    'posts_per_page' => -1,
    'tax_query' => array(
        array(
            'taxonomy' => 'category',
            'field'    => 'slug',
            'terms'    => 'featured'
        ),
    ),
));
$featured_query = new WP_Query( $query_featured );
        
?>
<section class="stdl-section-post-content stdl-bg-dark">
    <div class="container">
        <div class="stdl-section__title section-header text-center">
            <h2 class="stdl-title"><?php esc_html_e('Featured Posts') ;?></h2>
        </div>
        <div class="stdl-post">
            <div class="stdl-post__carousel owl-carousel owl-theme">
            <?php if($featured_query->have_posts()) : ?>
                <?php while($featured_query->have_posts()) :
                        $featured_query->the_post(); ?>
                    <?php 
                        $post_id = get_the_ID();
                        $permalink = get_permalink();
                    ?>
                    <article id="post-<?php echo esc_attr($post_id); ?>" <?php post_class( ['stdl-post-item']); ?>>
                        <div class="stdl-post__thumb">
                        <?php if(get_the_post_thumbnail()) { ?>
                            <a href="<?php echo esc_url( $permalink ); ?>"  title="<?php esc_attr(the_title_attribute()); ?>">
                               <?php the_post_thumbnail('grid-tile'); ?>
                            </a>
                            <?php }else{?>
                                <a href="<?php echo esc_url( $permalink ); ?>" class="placeholder-img">
                                    <img class="attachment-grid-tile size-grid-tile wp-post-image" width="536" height="232" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
                                </a>
                            <?php } ?>
                        </div>
                        <div class="stdl-post__content">
                            <h2 class="title"><a class="title-truncate" href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title(); ?></a></h2>
                            <p class="desc"> <?php echo wp_trim_words( get_the_content(), 15, '...' ); ?></p>
                        </div>
                        <div class="stdl-post__footer">
                            <div>
                                <span><?php echo get_the_date('F j, Y', $post_id) ;?></span>
                                <span><?php echo stdl_reading_time(get_the_content($post_id)) ;?></span>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php endif ;?>
            </div>
        </div>
    </div>
</section>