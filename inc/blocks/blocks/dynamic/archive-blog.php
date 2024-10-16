<?php 
/**
 * Block Name: Post Grid - Block
 *
 * This is the template that displays Contact Block
 */

// create id attribute for specific styling
$id = 'section-stdl-contact-' . $block['id'];

$section_title = get_field('section_title');
$section_bg_color = get_field( 'select_background_color' );
$enable_btn = get_field( 'enable_btn' );

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
$count = 1;
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$postperpage = 3;
$query_arg = array(
    'post_type' => 'post',
    'posts_per_page' => $postperpage,
    'post_status' => 'publish',
    'order'     => 'DESC',
    'orderby'   => 'date',
    'offset' => ($paged - 1) * $postperpage,
    'paged'=>$paged,
   
);
$arch_query = new WP_Query( $query_arg );
?>

<section id="<?php echo $id; ?>" class="section-space stdl-section-archive-blog <?php echo $bg_class; ?>">
    <div class="container">
        <?php if ($section_title) : ?>
            <div class="stdl-section__title section-header text-center">
                <h2 class="stdl-title"><?php esc_html_e($section_title) ;?></h2>
            </div>
        <?php endif ;?>
        <div class="stdl-post-wrapper">
            <div class="stdl-post">
          
                <?php if($arch_query->have_posts()) : ?>
                    <div class="stdl-post__grid stdl-grid-col-3">
                    <?php while($arch_query->have_posts()) :
                            $arch_query->the_post();
                            $post_id = get_the_ID();
                            $permalink = get_permalink();
                        ?>
                        <article id="post-<?php echo esc_attr($post_id); ?>" <?php post_class( ['stdl-post-item']); ?>>
                        <?php if ($count <= 3 ) : ?>
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
                            <?php endif ;?>
                            <div class="stdl-post__content">
                                <h2 class="title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title(); ?></a></h2>
                                <p class="desc"> <?php echo wp_trim_words( get_the_content(), 15, '...' ); ?></p>
                            </div>
                            <div class="stdl-post__footer">
                                <div>
                                    <span><?php echo get_the_date() ;?></span>
                                    <span><?php echo stdl_reading_time(get_the_content()) ;?></span>
                                </div>
                            </div>
                        </article>
                    <?php $count ++; endwhile; 
              
                    $countpost = $arch_query->found_posts;
                    $tens = floor($countpost/3);
                    $ones = $tens%3;
                    $tenones = ($ones==0) ? false : true;
                    ?>    
                    <?php wp_reset_postdata(); ?>
                    </div>
                    <?php echo pagination( $paged, $arch_query->max_num_pages); ?>
                <?php endif ;?>
            </div>
        </div>
    </div>
</section>