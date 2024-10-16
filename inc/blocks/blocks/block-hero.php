<?php 
/**
 * Block Name: Cl
 *
 * This is the template that displays Client Logo in carosuel or grid view
 */

// create id attribute for specific styling
$id = 'section-stdl-hero-' . $block['id'];

$hero_title = get_field('hero_title');
$hero_text = get_field('hero_text');
$hero_img_left = get_field('image_left');
$hero_img_left__id = $hero_img_left["ID"];
$hero_img_left_url = wp_get_attachment_image_url($hero_img_left__id, 'full');
$hero_img_right = get_field('image_right');
$hero_img_right__id = $hero_img_right["ID"];
$hero_img_right_url = wp_get_attachment_image_url($hero_img_right__id, 'full');
$enable_btns = get_field('enable_btn');
?>

<section id="<?php echo $id; ?>" class="stdl-section-hero">
    <div class="container">
        <div class="stdl-hero">
            <div class="stdl-hero__content">
                <div class="stdl-hero__title-wrap">
                    <h1 class="stdl-hero__title">
                        <?php echo( $hero_title ) ;?>
                    </h1> 
                    <p class="stdl-hero__text">
                        <?php echo ( $hero_text ) ;?>
                    </p>
        
                    <?php if ( $enable_btns ):
                            $primary_btn_text = get_field('primary_btn_text');
                            $primary_btn_url = get_field('primary_btn_url');
                            $secondary_btn_text = get_field('secondary_btn_text');
                            $secondary_btn_url = get_field('secondary_btn_url');
                        ?>
                        <div class="section-btn-warp text-left">
                            <?php if ($primary_btn_text) : ?>
                                <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($primary_btn_url) ;?>"><?php esc_html_e( $primary_btn_text ) ;?></a>
                            <?php endif; ?> 
                            <?php if ($secondary_btn_text) : ?>
                                <a class="stdl-section-btn btn-secondary" href="<?php echo esc_url($secondary_btn_url) ;?>"><?php esc_html_e( $secondary_btn_text ) ;?></a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>

                    <div class="stdl-ggle-ctc-review ggle-ctc-items">
                        <?php if(have_rows('reviews_items', 'option')):
                        $count = 1;
                            while(have_rows('reviews_items', 'option')): the_row(); 
                                $icon_data = get_sub_field('reviewer_icon', 'option');
                                $icon__id = $icon_data["ID"];
                                $icon_url = wp_get_attachment_image_url($icon__id, 'full');
                                $reviewer_rating = get_sub_field('reviewer_stars', 'option');
                                $reviewer_no = get_sub_field('reviewer_no', 'option');
                            ?>
                            <div class="ggle-ctc-item ggle-ctc-item-<?php echo esc_attr($count) ;?>">
                                <div class="ggle-ctc-item__icon">
                                    <span class="stdl-icon-list__icon"><?php echo stdl_get_svg($icon__id);?></span>
                                </div> 
                                <div class="ggle-ctc-item_stars">
                                    <ul class="reviewer__ratings">
                                        <?php for( $i = 1; $i <= 5; $i++ ) {
                                            if( $reviewer_rating >= $i ) { ?>
                                                <li class="reviews-star star-active"><span><?php echo stdl_get_svg('star-active.svg');?></span></li>
                                            <?php } else { ?>
                                                <li class="reviews-star"><span><?php echo stdl_get_svg('star.svg');?></span></li>
                                            <?php }
                                        } ?>
                                    </ul>
                                    <span class="no"><?php esc_html_e( $reviewer_no ) ;?></span>
                                </div>
                            </div>
                            <?php $count++ ;endwhile; endif; ?>
                        </div>
                    </div>
             
            </div>
            <div class="stdl-hero__img">
                <picture class="img-left">
                    <img src="<?php echo esc_url($hero_img_left_url);?>" alt="<?php echo esc_attr($hero_img_left['alt']) ;?>">
                </picture>
                <picture class="img-right">
                    <img src="<?php echo esc_url($hero_img_right_url);?>" alt="<?php echo esc_attr($hero_img_right['alt']) ;?>">
                </picture>
            </div>
        </div>
    </div>
</section>