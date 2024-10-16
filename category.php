<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Stone_Digital
 */

get_header();

global $wp_query;
$current_tax = $wp_query->get_queried_object()->slug;
$current_id = $wp_query->get_queried_object_id();

$total = $wp_query->found_posts;
// echo $total;
$post_per_Page = 3;
$query_arg = array(
    'post_type' => 'post',
    'posts_per_page' => $post_per_Page,
    'post_status' => 'publish',
    'order'     => 'DESC'
);
if ( isset($current_id) && !empty($current_id)) {
    $query_arg['tax_query'] = array(
       'relation' => 'AND',
       array(
           'taxonomy' => 'category',
           'field'    => 'id',
           'terms'    => $current_id
       ),
   );
}

$tax_Page_query = new WP_Query( $query_arg );
?>

<main id="primary" class="site-main">
<?php stdl_show_template('dynamic/page-banner') ;?>
<?php echo std_get_acf_block_data_by_name(892, 'acf/search-category-filter'); ?>
    <div class="container">
        <?php if ( $tax_Page_query->have_posts() ) : ?>
            <div class="stdl-post section-space stdl-section-archive-post stdl-bg-light-dark">
                <div class="stdl-post__grid stdl-grid-col-3">
                    <?php
                    /* Start the Loop */
                    while ( $tax_Page_query->have_posts() ) :
                        $tax_Page_query->the_post();
            
                        stdl_show_template('content');

                    endwhile;
                    the_posts_navigation( array(
                        'prev_text' => __( '←', 'stone-digital' ),
                        'next_text' => __( '→', 'stone-digital' ),
                    ));
                else :

                    get_template_part( 'inc/template-parts/content', 'none' );

                endif;
                ?>
            </div>
            <?php if( $total > $post_per_Page ) : ?>
                <div class="section-btn-warp text-center">
                    <a class="stdl-section-btn btn-primary stdl-loadmore-terms" data-taxonomy="category" data-taxslug="<?php echo esc_attr($current_tax);?>" data-taxid="<?php echo esc_attr($current_id);?>" href="javascript:void(0)"><?php esc_html_e( 'Load More' ) ;?></a>
                </div>
            <?php endif ;?>
        </div>
    </div>
    <?php echo std_get_acf_block_data_by_name(892, 'acf/block-call-to-action'); ?>
</main><!-- #main -->

<?php
get_footer();
