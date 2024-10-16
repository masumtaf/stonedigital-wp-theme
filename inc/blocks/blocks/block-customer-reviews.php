<?php 
/**
 * Block Name: Customer Reviews
 *
 * This is the template that displays Customer Reviews
 */

// create id attribute for specific styling
$id = 'section-stdl-reviews-' . $block['id'];

$section_title = get_field('section_title');

$stdl_class = '';

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

<section id="<?php echo $id; ?>" class="stdl-section-reviews section-space <?php echo $bg_class; ?>">
    <div class="container">
        <div class="section-header">
            <h2 class="stdl-title text-left"><?php esc_html_e( $section_title ) ;?></h2>
        </div>

        <div class="stdl-review-items stdl-review-carousel owl-carousel owl-theme">
            <?php if(have_rows('reviews_items')):
                while(have_rows('reviews_items')): the_row(); 
                $review_name = get_sub_field('reviewer_name');
                $review_text = get_sub_field('reviewer_text');
                $review_date = get_sub_field('review_date');
                
                ?>
                <div class="stdl-review-item stdl-grid-col-2">
                    <div class="stdl-reviewer__info">
                        <div class="stdl-reviewer__info--header">
                            <ul class="stdl-reviews__star--wrap">
                                <?php  
                                    for( $i = 1; $i <= 5; $i++ ) { ?>
                                        <li><span><?php echo stdl_get_svg('star-solid.svg');?></span></li>
                                <?php } 
                                ?>
                            </ul>
                        </div>
                        <div class="stdl-reviewer__info--footer">
                            <div class="review-footer__content">
                                <h4 class="reviewer-name"><?php echo $review_name ;?></h4>
                                <div class="reviews-date"><?php echo $review_date ;?></div>
                            </div>
                            <div class="review-owl-nav">
                                <span class="review-next-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></span>
                                <span class="review-prev-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                            </div>
                        </div> 
                    </div>
                    <div class="block_decs">
                        <?php echo $review_text ;?>
                    </div>
                </div>
            <?php endwhile; endif; ?>
        </div>
    </div>
</section>