<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

?>

<?php
    $post_id = get_the_ID();
    $project_title = get_field('project_title', $post_id);
    $descriptions = get_field('project_descriptions', $post_id);
    $technology = get_field('technology', $post_id);
    $industry = get_field('industry', $post_id);

    $slug = basename(get_permalink($post_id));
    $slug = "article-" . $slug ;
?>

<article id="post-<?php the_ID(); ?>" class="grid-article article-item <?php echo stdl_get_categories_name_for_class() ;?>">
    <div class="article-item__thumb">
        <?php if(get_the_post_thumbnail()) { ?>
            <a href="<?php echo esc_url( get_permalink() ); ?>">
                <?php echo get_the_post_thumbnail( $post_id, 'project-tile', 'block_img', true ); ?>
            </a>
        <?php }else{?>
            <a href="<?php echo esc_url( get_permalink() ); ?>" class="placeholder-img">
                <img class="attachment-full size-full wp-post-image" width="536" height="550" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
            </a>
        <?php } ?>
    </div>
    <div class="article-item__content stdl-bg-dark">
        <?php echo get_the_term_list( $post_id, 'project-type', '<ul class="project-type stdl-cpt__meta"><li>', '</li><li>', '</li></ul>' ); ?>
        <div class="article__title">
            <?php the_title( '<h2 class="title block_title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' ); ?>
            <p class="title block_decs desc"><?php esc_html_e( $descriptions ) ;?></p>
        </div>
        <div class="article__info">
            <div class="article__info-tech">
                <span><?php esc_html_e( 'Technology' ) ;?></span>
                <span><?php esc_html_e( $technology ) ;?></span>
            </div>
            <div class="article__info-indtry">
                <span><?php esc_html_e( 'Industry' ) ;?></span>
                <span><?php esc_html_e( $industry ) ;?></span>
            </div>
        </div>
        <div class="section-btn-warp text-left"> 
            <a class="stdl-section-btn btn-link" href="<?php echo esc_url(get_permalink()) ;?>"><?php esc_html_e( 'View Project' ) ;?></a>
        </div>
    </div>
</article>