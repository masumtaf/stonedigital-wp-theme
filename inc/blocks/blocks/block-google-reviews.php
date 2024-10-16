<?php 
/**
 * Block Name: Display Google / Clutc Reviews
 *
 * This is the template that Google / Clutc 
 */

// create id attribute for specific styling
$id = 'section-stdl-ggle-ctc-review-' . $block['id'];
$section_bg_color = get_field( 'select_background_color' );
$count = 1;

?>

<div id="<?php echo $id; ?>">
    <div class="stdl-ggle-ctc-review ggle-ctc-items">
        <?php if(have_rows('reviews_items', 'option')):
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