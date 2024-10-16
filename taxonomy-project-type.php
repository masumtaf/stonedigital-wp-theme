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
$post_per_Page = 6;
$query_arg = array(
    'post_type' => 'project',
    'posts_per_page' => $post_per_Page,
    'post_status' => 'publish',
    'order'     => 'DESC'
);
if ( isset($current_id) && !empty($current_id)) {
    $query_arg['tax_query'] = array(
       'relation' => 'AND',
       array(
           'taxonomy' => 'project-type',
           'field'    => 'id',
           'terms'    => $current_id
       ),
   );
}

$tax_Page_query = new WP_Query( $query_arg );
$max_pages = $tax_Page_query->max_num_pages;
?>

<main id="primary" class="site-main">
        <?php stdl_show_template('dynamic/page-banner') ;?>
        <section id="<?php echo $id; ?>" class="section-space stdl-section-archive-project stdl-bg-light-dark">
            <div class="container">
                <?php 
                    $terms = get_terms(array(
                        'taxonomy' => 'project-type',
                        'hide_empty' => true,
                    ));
                    ?>
                    <div class="stdl-filterable-menu">
                        <ul class="stdl-filterable-menu">
                            <li class="filter-item" data-filter="all">
                                <a href="<?php echo home_url(); ?>/projects/"><?php echo esc_html__("All"); ?></a>
                            </li>
                            <?php
                           
                                foreach ( $terms as $term ) {
                                  $class_acc = 'filter-item';
                                    if( $term->slug == $current_tax ){
                                        $class_acc = 'filter-item active';
                                    }
                                ?>
                                    <li class="<?php echo esc_attr( $class_acc );?>" data-filter="<?php echo esc_attr( $term->slug ); ?>">
                                    <a href="<?php echo esc_url( get_term_link( $term->term_id ) ) ;?>"><?php echo $term->name; ?></a>
                                </li>
                                <?php }
                            ?>
                        </ul>
                    </div>

                <div class="stdl-project">
                    <div class="article-wrapper article-project project-layout_col-2">
                            <?php if ( $tax_Page_query->have_posts() ) :
                                while ( $tax_Page_query->have_posts() ) :
                                    $tax_Page_query->the_post();
                                    stdl_show_template('content-project');
                                endwhile;
                            endif;
                            ?>
                    </div>
                </div>

                <?php if( $total > $post_per_Page ) : ?>
                    <div class="section-btn-warp text-center">
                        <a class="stdl-section-btn btn-primary stdl-load-project" data-max-num="<?php echo esc_attr($max_pages) ;?>" data-taxonomy="project-type" data-taxslug="<?php echo esc_attr($current_tax);?>" data-taxid="<?php echo esc_attr($current_id);?>" href="javascript:void(0)"><?php esc_html_e( 'Load More' ) ;?></a>
                    </div>
                <?php endif ;?>
            </div>
        </section>
        <?php echo std_get_acf_block_data_by_name(892, 'acf/block-call-to-action'); ?>
	</main><!-- #main -->
<?php
get_footer();
