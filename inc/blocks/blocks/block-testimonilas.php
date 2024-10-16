<?php 
/**
 * Block Name: Display Testimonials
 *
 * This is the template that Testimonials
 */

// create id attribute for specific styling
$id = 'section-stdl-testimonials-' . $block['id'];
$section_bg_color = get_field( 'select_background_color' );
$section_title = get_field('section_title');
$testimonial_video_url = get_field('testimonial_video_url');
$submit_a_review_text = get_field('submit_a_review_text');
$submit_a_review_url = get_field('submit_a_review_text');
$enable_dynamic_testimonials = get_field('enable_dynamic_testimonials');
$testimonial_items = get_field('testimonial_items');

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

if(get_field('select__testimonials_item')) {
    $testimonial_query_content = get_field('select__testimonials_item');
} else {
    $query_arg = array(
        'post_type' => 'testimonial',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'order'     => 'DESC',
        'orderby'   => 'date',
        
    );
    $testimonial_query = new WP_Query( $query_arg );
    $testimonial_query_content = $testimonial_query->get_posts();
    
}
if ($enable_dynamic_testimonials) {
    $count = 2 + count($testimonial_query_content);
} else {
    $count = 2 + count($testimonial_items);
}

?>

<section id="<?php echo $id; ?>" class="stdl-section-testimonials section-space <?php echo $bg_class; ?>">
    <div class="container">
        <div class="stdl-reviews-wrapper">
            <div class="stdl-reviews">
        
            <?php if(! $enable_dynamic_testimonials):
                if(have_rows('testimonial_items')):
                   
                    while(have_rows('testimonial_items')): the_row(); 
                        $reviewer_rating = get_sub_field('reviewer_rating');
                        $reviewer_text = get_sub_field('reviewer_text');
                        $reviewer_name = get_sub_field('reviewer_name');
                        $reviewer_info = get_sub_field('reviewer_info');
                        $reviewer_role = get_sub_field('reviewer_role');
                        $company_name = get_sub_field('company_name');
                        $reviewer_thumb = get_sub_field('reviewer_thumb');
                        $reviewer_thumb__id = $reviewer_thumb["ID"];
                    ?>
                    <?php if ($count == 1) :?>
                        <div class="section-header review_<?php echo $count ;?>">
                            <?php if ($section_title) : ?>
                                <h2 class="stdl-title text-center"><?php echo ( $section_title ) ;?></h2>
                            <?php endif; ?> 
                            <div class="section-btn-warp text-left">
                                <a class="block_link" href="<?php echo esc_url($submit_a_review_url) ;?>"><?php esc_html_e( $submit_a_review_text ) ;?></a>
                            </div>
                        </div>
                    <?php elseif ($count == 2) :?>
                        <div class="stdl-review-item review_<?php echo $count ;?>">
                            <div class="review-full">
                                <div class="stdl-review-item__stars">
                                    <ul class="reviewer__ratings">
                                        <?php for( $i = 1; $i <= 5; $i++ ) {
                                            if( $reviewer_rating >= $i ) { ?>
                                                <li class="reviews-star star-active"><span><?php echo stdl_get_svg('star-active.svg');?></span></li>
                                            <?php } else { ?>
                                                <li class="reviews-star"><span><?php echo stdl_get_svg('star.svg');?></span></li>
                                            <?php }
                                        } ?>
                                    </ul>
                                    <span><?php esc_html_e( number_format((float)$reviewer_rating, 1, '.', '') ) ;?></span>
                                </div>
                                <div class="stdl-review-item__text">
                                    <span class="stdl-published-date"><?php esc_html_e( $reviewer_info ) ;?></span>
                                    <div class="review-text pt-10"><?php esc_html_e( $reviewer_text ) ;?></div>
                                    <a class="read-more" href="javascript:void(0)"><span>Read More</span></a>
                                </div>
                                <div class="stdl-review-item__info">
                                    <div class="review-info">
                                        <span><?php esc_html_e( $reviewer_name ) ;?></span>
                                        <span>
                                            <?php if( $reviewer_role ): ?>
                                                <span><?php esc_html_e( $reviewer_role ) ;?></span> - 
                                            <?php endif; if( $company_name ): ?>
                                                <span><?php esc_html_e( $company_name ) ;?></span>
                                            <?php endif; ?>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="stdl-review-item__info">
                                    <?php if(!empty($reviewer_thumb__id)) :?>
                                        <div class="review-thumb">
                                            <?php  $reviewer_thumb_url = wp_get_attachment_image_url($reviewer_thumb__id, 'square'); ?>
                                            <img src="<?php echo esc_url($reviewer_thumb_url); ?>" alt="<?php echo esc_attr($reviewer_thumb['alt']); ?>"/>
                                        </div>
                                    <?php endif ;?>
                                <div class="review-info">
                                    <span><?php esc_html_e( $reviewer_name ) ;?></span>
                                    <span>
                                        <span><?php esc_html_e( $reviewer_role ) ;?></span> - 
                                        <span><?php esc_html_e( $company_name ) ;?></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    <?php elseif ($count == 6 && !empty($testimonial_video_url)) :?>
                        <div class="stdl-review-item stdl-video-content review_<?php echo $count ;?>">
                            <div class="embedded-media-player">
                                <video id="stdl-video-player" class="stdl-video-player" playsinline controls style="--plyr-color-main: #ab9472;">
                                    <source src="<?php echo $testimonial_video_url ;?>" type="video/mp4" />
                                    <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
                                </video>
                            </div>
                        </div>
                    <?php else : ?>
                        <div class="stdl-review-item review_<?php echo $count ;?>">
                            <div class="stdl-review-item__stars">
                                <ul class="reviewer__ratings">
                                    <?php for( $i = 1; $i <= 5; $i++ ) {
                                        if( $reviewer_rating >= $i ) { ?>
                                            <li class="reviews-star star-active"><span><?php echo stdl_get_svg('star-active.svg');?></span></li>
                                        <?php } else { ?>
                                            <li class="reviews-star"><span><?php echo stdl_get_svg('star.svg');?></span></li>
                                        <?php }
                                    } ?>
                                </ul>
                                <span><?php esc_html_e( number_format((float)$reviewer_rating, 1, '.', '') ) ;?></span>
                            </div>
                            <div class="stdl-review-item__text">
                                <span class="stdl-published-date"><?php esc_html_e( $reviewer_info ) ;?></span>
                                <div class="review-text pt-10"><?php esc_html_e( $reviewer_text ) ;?></div>
                                <a class="read-more" href="javascript:void(0)"><span>Read More</span></a>
                            </div>
                            <div class="stdl-review-item__info">
                                    <?php if(!empty($reviewer_thumb__id)) :?>
                                        <div class="review-thumb">
                                            <?php  $reviewer_thumb_url = wp_get_attachment_image_url($reviewer_thumb__id, 'square'); ?>
                                            <img src="<?php echo esc_url($reviewer_thumb_url); ?>" alt="<?php echo esc_attr($reviewer_thumb['alt']); ?>"/>
                                        </div>
                                    <?php endif ;?>
                                <div class="review-info">
                                    <span><?php esc_html_e( $reviewer_name ) ;?></span>
                                    <span>
                                        <span><?php esc_html_e( $reviewer_role ) ;?></span> - 
                                        <span><?php esc_html_e( $company_name ) ;?></span>
                                    </span>
                            
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>
                <?php $count++ ;endwhile; endif;?> 
                <?php else : 
                    if (count($testimonial_query_content) > 0): ?>
                        <?php $count_dynamic = 1;
                             foreach ($testimonial_query_content as $testimonial_item ):
                                setup_postdata($testimonial_item);
                                $review_id= $testimonial_item->ID;
                                $permalink = get_post_permalink($review_id);
                                $client_image__url = wp_get_attachment_image_url(get_post_thumbnail_id($review_id), 'square');
                                $client_role = get_field('client_role', $review_id);
                                $feedback_placed = get_field('feedback_placed', $review_id);
                                $company_name = get_field('company_name', $review_id);
                                $company_link = get_field('company_link', $review_id);
                                $review_date = get_field('review_date', $review_id);
                                $feedback_placed = get_field('feedback_placed', $review_id);
                                $starts_rating = get_field('starts_rating', $review_id);
                            ?>
                              <?php if ($count_dynamic == 1) :?>
                                <div class="section-header review_<?php echo $count_dynamic ;?>">
                                    <?php if ($section_title) : ?>
                                        <h2 class="stdl-title text-center"><?php echo ( $section_title ) ;?></h2>
                                    <?php endif; ?> 
                                    <div class="section-btn-warp text-left">
                                        <a class="block_link" href="<?php echo esc_url($submit_a_review_url) ;?>"><?php esc_html_e( $submit_a_review_text ) ;?></a>
                                    </div>
                                </div>
                            <?php elseif ($count_dynamic == 2) :?>
                                <div class="stdl-review-item review_<?php echo $count_dynamic ;?>">
                                    <div class="review-full">
                                        <div class="stdl-review-item__stars">
                                            <ul class="reviewer__ratings">
                                                <?php for( $i = 1; $i <= 5; $i++ ) {
                                                    if( $starts_rating >= $i ) { ?>
                                                        <li class="reviews-star star-active"><span><?php echo stdl_get_svg('star-active.svg');?></span></li>
                                                    <?php } else { ?>
                                                        <li class="reviews-star"><span><?php echo stdl_get_svg('star.svg');?></span></li>
                                                    <?php }
                                                } ?>
                                            </ul>
                                            <span><?php esc_html_e( number_format((float)$starts_rating, 1, '.', '') ) ;?></span>
                                        </div>
                                        <div class="stdl-review-item__text">
                                            <span class="stdl-published-date"><?php esc_html_e( $review_date ) ;?></span>
                                            <div class="review-text pt-10"><?php echo get_the_content($review_id); ?></div>
                                            <a class="read-more" href="javascript:void(0)"><span>Read More</span></a>
                                        </div>
                                        <div class="stdl-review-item__info">
                                            <div class="review-info">
                                                <span><?php echo esc_html_e( get_the_title($review_id) ) ;?></span>
                                                <span>
                                                    <?php if (!empty($company_link)) { ?> <a href="<?php echo esc_url($company_link) ;?>" target="_blank"> <?php } ?>
                                                        <?php if( $client_role ): ?>
                                                            <span><?php esc_html_e( $client_role ) ;?></span> - 
                                                        <?php endif; if( $company_name ): ?>
                                                            <span><?php esc_html_e( $company_name ) ;?></span>
                                                        <?php endif; ?>
                                                    <?php if (!empty($company_link)) { ?></a> <?php } ?>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="stdl-review-item__info">
                                            <?php if(!empty(get_the_post_thumbnail($review_id))) :?>
                                                <div class="review-thumb">
                                                    <img src="<?php echo esc_url($client_image__url); ?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"/>
                                                </div>
                                            <?php else : ?>
                                                <div class="review-thumb">
                                                    <img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy">
                                                </div>
                                            <?php endif ;?>
                                        <div class="review-info">
                                            <span><?php echo esc_html_e( get_the_title($review_id) ) ;?></span>
                                            <span>
                                                <?php if (!empty($company_link)) { ?> <a href="<?php echo esc_url($company_link) ;?>" target="_blank"> <?php } ?>
                                                    <?php if( $client_role ): ?>
                                                        <span><?php esc_html_e( $client_role ) ;?></span> - 
                                                    <?php endif; if( $company_name ): ?>
                                                        <span><?php esc_html_e( $company_name ) ;?></span>
                                                    <?php endif; ?>
                                                <?php if (!empty($company_link)) { ?></a> <?php } ?>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            <?php elseif ($count_dynamic == 6 && !empty($testimonial_video_url)) :?>
                                <div class="stdl-review-item stdl-video-content review_<?php echo $count_dynamic ;?>">
                                    <div class="embedded-media-player">
                                        <video id="stdl-video-player" class="stdl-video-player" playsinline controls style="--plyr-color-main: #ab9472;">
                                            <source src="<?php echo $testimonial_video_url ;?>" type="video/mp4" />
                                            <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
                                        </video>
                                    </div>
                                </div>
                            <?php else : ?>
                                <div class="stdl-review-item review_<?php echo $count_dynamic ;?>">
                                    <div class="stdl-review-item__stars">
                                        <ul class="reviewer__ratings">
                                            <?php for( $i = 1; $i <= 5; $i++ ) {
                                                if( $starts_rating >= $i ) { ?>
                                                    <li class="reviews-star star-active"><span><?php echo stdl_get_svg('star-active.svg');?></span></li>
                                                <?php } else { ?>
                                                    <li class="reviews-star"><span><?php echo stdl_get_svg('star.svg');?></span></li>
                                                <?php }
                                            } ?>
                                        </ul>
                                        <span><?php esc_html_e( number_format((float)$starts_rating, 1, '.', '') ) ;?></span>
                                    </div>
                                    <div class="stdl-review-item__text">
                                        <span class="stdl-published-date"><?php esc_html_e( $review_date ) ;?></span>
                                        <div class="review-text pt-10"><?php echo get_the_content($review_id); ?></div>
                                        <a class="read-more" href="javascript:void(0)"><span>Read More</span></a>
                                    </div>
                                    <div class="stdl-review-item__info">
                                            <?php if(!empty(get_the_post_thumbnail($review_id))) :?>
                                                <div class="review-thumb">
                                                    <img src="<?php echo esc_url($client_image__url); ?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"/>
                                                </div>
                                                <?php else : ?>
                                                    <div class="review-thumb">
                                                        <img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy">
                                                    </div>
                                            <?php endif ;?>
                                        <div class="review-info">
                                            <span><?php echo esc_html_e( get_the_title($review_id) ) ;?></span>
                                            <span>
                                                <?php if (!empty($company_link)) { ?> <a href="<?php echo esc_url($company_link) ;?>" target="_blank"> <?php } ?>
                                                    <?php if( $client_role ): ?>
                                                        <span><?php esc_html_e( $client_role ) ;?></span> - 
                                                    <?php endif; if( $company_name ): ?>
                                                        <span><?php esc_html_e( $company_name ) ;?></span>
                                                    <?php endif; ?>
                                                <?php if (!empty($company_link)) { ?></a> <?php } ?>
                                            </span>
                                    
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                         
                    <?php $count_dynamic++; endforeach; endif; ?>
                
                <?php endif; ?>
               
            </div>
        </div>
    </div>
</section>