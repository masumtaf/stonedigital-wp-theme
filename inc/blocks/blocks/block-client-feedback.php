<?php 
/**
 * Block Name: Client Feedback
 *
 * This is the template that displays Client Feedback
 */

// create id attribute for specific styling
$id = 'section-stdl-client-fbk-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$button_text = get_field( 'button_text' );
$enable_custom_review = get_field( 'enable_custom_review' );

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

 if(get_field('select_client_feedback')) {
    $reviews_query_content = get_field('select_client_feedback');
    } else {
        $query_arg = array(
            'post_type' => 'testimonial',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'order'     => 'ASC',
            'orderby'   => 'date',
           
        );
        $reviews_query = new WP_Query( $query_arg );
        $reviews_query_content = $reviews_query->get_posts();
    }
    $count = 1;
?>

<section id="<?php echo $id; ?>" class="stdl-section-client-fbk section-space <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_tagline || $section_title || $description) : ?>
            <div class="section-header text-center">
                <?php if ($section_tagline) : ?>
                    <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                <?php endif; if ($section_title) : ?>
                    <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                <?php endif; ?> 
                <?php if ($description) : ?>
                    <div class="section-description">
                        <p class="stdl-description"><?php echo ( $description ) ;?></p>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif ;?>

        <?php if ($enable_custom_review) : ?>
            <div class="client-fbk">
            <div class="client-fbk-items stdl-grid-col-3">
                <?php if(have_rows('client_feedback_items')):
                    while(have_rows('client_feedback_items')): the_row(); 
                        $client_image_data = get_sub_field('client_image');
                        $client_image__id = $client_image_data["ID"];
                        $client_image__url = wp_get_attachment_image_url($client_image__id, 'reviewer-thumb');
                        $client_text = get_sub_field('client_text');
                        $client_name = get_sub_field('client_name');
                        $client_role = get_sub_field('client_role');
                        $feedback_placed = get_sub_field('feedback_placed');
                    ?>
                    <div class="client-fbk-item">
                        <div class="client-fbk-item__body">
                            <div class="client-fbk-item__text text-truncate">
                                <?php echo ( $client_text ) ;?>
                            </div>
                            <a class="popup-action" data-action-id="popup-id-<?php echo esc_attr($count);?>" href="javascript:void(0)"><span>Read More</span></a>
                        </div>
                        <div class="client-fbk-item__info">
                            <?php if (!empty($client_image__url)) : ?>
                                <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr( $client_image_data['alt'] ); ?>" loading="lazy"></span>
                            <?php else : ?>
                                <span class="client-img"><img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="client image" loading="lazy"></span>
                            <?php endif ;?>
                            <h4 class="client-name"><?php esc_html_e( $client_name ) ;?></h4>
                            <span class="client-role"><?php esc_html_e( $client_role ) ;?></span>
                            <?php if (!empty($feedback_placed)) { ?><span class="client-placed">via <?php echo esc_html_e( $feedback_placed ) ;?></span><?php } ?>
                        </div>
                    </div>
                  
                <?php $count++; endwhile; endif; ?>
            </div>
            <?php 
            $count_popup = 1;
            if(have_rows('client_feedback_items')):
                while(have_rows('client_feedback_items')): the_row(); 
                    $client_image_data = get_sub_field('client_image');
                    $client_image__id = $client_image_data["ID"];
                    $client_image__url = wp_get_attachment_image_url($client_image__id, 'full');
                    $client_text = get_sub_field('client_text');
                    $client_name = get_sub_field('client_name');
                    $client_role = get_sub_field('client_role');
                    $feedback_placed = get_sub_field('feedback_placed');
                ?>
                <div class="stdl-popup popup-id-<?php echo $count_popup; ?>">
                    <div class="stdl-popup-module module-id-<?php echo $count_popup; ?>">
                        <span class="stdl-close-btn">
                            <?php echo stdl_get_svg('x.svg');?>
                        </span>
                    <div class="container">
                        <div class="stdl-popup-content">
                            <div class="client-fbk-item__info">
                                <?php if (!empty($client_image__url)) : ?>
                                <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr( $client_image_data['alt'] ); ?>" loading="lazy"></span>
                                <?php else : ?>
                                    <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr( $client_image_data['alt'] ); ?>" loading="lazy"></span>
                                    <img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="client image" loading="lazy">
                                <?php endif ;?>

                                <h4 class="stdl-tagline client-name"><?php esc_html_e( $client_name ) ;?></h4>
                                <span class="client-role"><?php esc_html_e( $client_role ) ;?></span>
                                <?php if (!empty($feedback_placed)) { ?><span class="client-placed">via <?php echo esc_html_e( $feedback_placed ) ;?></span><?php } ?>
                            </div>
                            <div class="client-fbk-item__body">
                                <?php echo ( $client_text ) ;?>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            <?php $count_popup++; endwhile; endif; ?>
        </div>
        <?php else : ?>
        <div class="client-fbk">
            <div class="client-fbk-items stdl-grid-col-3">
            <?php if (count($reviews_query_content) > 0): ?>
                <?php $count_dynamic = 1;
                    foreach ($reviews_query_content as $reviews_item ):
                        setup_postdata($reviews_item);
                        $review_id= $reviews_item->ID;
                        $permalink = get_post_permalink($review_id);
                        $client_image__url = wp_get_attachment_image_url(get_post_thumbnail_id($review_id), 'reviewer-thumb');
                        $company_name = get_field('company_name', $review_id);
                        $company_link = get_field('company_link', $review_id);
                        $client_role = get_field('client_role', $review_id);
                        $feedback_placed = get_field('feedback_placed', $review_id);
                    ?>
                    <div class="client-fbk-item">
                        <div class="client-fbk-item__body">
                            <div class="client-fbk-item__text text-truncate">
                                <?php echo get_the_content($review_id); ?>
                            </div>
                            <a class="popup-action" data-action-id="popup-id-<?php echo esc_attr($review_id);?>" href="javascript:void(0)"><span>Read More</span></a>
                        </div>
                        <div class="client-fbk-item__info">
                            <?php if (!empty(get_the_post_thumbnail($reviews_item))) : ?>
                                <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"></span>
                            <?php else : ?>
                                <span class="client-img"><img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"></span>
                            <?php endif ;?>
                            <h4 class="client-name"><?php echo esc_html_e( get_the_title($review_id) ) ;?></h4>
                            <span class="client-info">
                                <?php if (!empty($company_link)) { ?> <a href="<?php echo esc_url($company_link) ;?>" target="_blank"> <?php } ?>
                                    <?php if( $client_role ): ?>
                                        <span class="client-role"><?php esc_html_e( $client_role ) ;?></span> 
                                    <?php endif; if( $company_name ): ?>
                                        <span class="client-company"><?php esc_html_e( $company_name ) ;?></span>
                                    <?php endif; ?>
                                <?php if (!empty($company_link)) { ?></a> <?php } ?>
                            </span>
                            <?php if (!empty($feedback_placed)) { ?><span class="client-placed">via <?php echo esc_html_e( $feedback_placed ) ;?></span><?php } ?>
                        </div>
                    </div>
                  
                <?php $count_dynamic++; endforeach; endif; ?>
            </div>
            <?php 
                $count_dynamic_popup = 1;
                if (count($reviews_query_content) > 0):
                    foreach ($reviews_query_content as $reviews_item ):
                        setup_postdata($reviews_item);
                        $review_id= $reviews_item->ID;
                        $permalink = get_post_permalink($review_id);
                        $client_image__url = wp_get_attachment_image_url(get_post_thumbnail_id($review_id), 'reviewer-thumb');
                        $company_name = get_field('company_name', $review_id);
                        $company_link = get_field('company_link', $review_id);
                        $client_role = get_field('client_role', $review_id);
                        $feedback_placed = get_field('feedback_placed', $review_id);
                    ?>
                    <div class="stdl-popup popup-id-<?php echo $review_id; ?>">
                        <div class="stdl-popup-module module-id-<?php echo $review_id; ?>">
                            <span class="stdl-close-btn">
                                <?php echo stdl_get_svg('x.svg');?>
                            </span>
                        <div class="container">
                            <div class="stdl-popup-content">
                                <div class="client-fbk-item__info">
                                    <?php if (!empty(get_the_post_thumbnail($reviews_item))) : ?>
                                        <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"></span>
                                    <?php else : ?>
                                        <span class="client-img"><img src="<?php echo esc_url( $client_image__url ); ?>" alt="<?php echo esc_attr(get_the_title($review_id)); ?>" loading="lazy"></span>
                                        <img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/reviewer-placeholder-img.png' ) ;?>" alt="client image" loading="lazy">
                                    <?php endif ;?>

                                    <h4 class="stdl-tagline client-name"><?php echo esc_html_e( get_the_title($review_id) ) ;?></h4>
                                    <span class="client-info">
                                        <?php if (!empty($company_link)) { ?> <a href="<?php echo esc_url($company_link) ;?>" target="_blank"> <?php } ?>
                                            <?php if( $client_role ): ?>
                                                <span class="client-role"><?php esc_html_e( $client_role ) ;?></span> 
                                            <?php endif; if( $company_name ): ?>
                                                <span class="client-company"><?php esc_html_e( $company_name ) ;?></span>
                                            <?php endif; ?>
                                        <?php if (!empty($company_link)) { ?></a> <?php } ?>
                                    </span>
                                    <?php if (!empty($feedback_placed)) { ?><span class="client-placed">via <?php echo esc_html_e( $feedback_placed ) ;?></span><?php } ?>
                                </div>
                                <div class="client-fbk-item__body pt-20">
                                    <?php echo get_the_content($review_id); ?>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                <?php $count_dynamic_popup++; endforeach; endif; ?>
        </div>
        <?php endif; ?>
        <div class="section-btn-warp text-center">
            <a class="stdl-section-btn btn-primary" href="javascript:void(0)"><?php esc_html_e( $button_text ) ;?></a>
        </div>
    </div>
</section>