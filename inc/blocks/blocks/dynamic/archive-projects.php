<?php 
/**
 * Block Name: All Project  - Block
 *
 * This is the template that displays All Project  - Block
 */

// create id attribute for specific styling
$id = 'section-stdl-arch-project' . $block['id'];
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

if(get_field('select_projects')) {
	$select_projects = get_field('select_projects');
} else {
	$query_arg = array(
		'post_type' => 'project',
		'posts_per_page' => 6,
		'post_status' => 'publish',
		'order'     => 'DESC',
		'orderby'   => 'date',
	   
	);
	$archive_query = new WP_Query( $query_arg );
	$count = 1;
	$total = $archive_query->found_posts;
	$max_pages = $archive_query->max_num_pages;

	$select_projects = $archive_query->get_posts();
}
?>

<section id="<?php echo $id; ?>" class="section-space stdl-section-archive-project <?php echo $bg_class; ?>">
    <div class="container">
		<?php echo stdl_filterable_terms_list('project-type') ;?>
        <div class="stdl-project">

            <div class="article-wrapper article-project project-layout_col-2">
			<?php if (count($select_projects) > 0): ?>
                <?php foreach ($select_projects as $post ): ?>
                    <?php 
                        setup_postdata($post);
                        $post_id = $post->ID;
                        $permalink = get_the_permalink($post_id);
						$post_id = $post->ID;
						$project_title = get_field('project_title', $post_id);
						$descriptions = get_field('project_descriptions', $post_id);
						$technology = get_field('technology', $post_id);
						$industry = get_field('industry', $post_id);
					
						$slug = basename(get_permalink($post_id));
						$slug = "article-" . $slug ;
                    ?>
				
				<article id="post-<?php the_ID(); ?>" class="grid-article article-item <?php echo stdl_get_categories_name_for_class($post_id) ;?>">
					<div class="article-item__thumb">
						<?php if(get_the_post_thumbnail($post_id)) { ?>
							<a href="<?php echo esc_url($permalink); ?>">
								<?php echo get_the_post_thumbnail( $post_id, 'project-tile', 'block_img', true ); ?>
							</a>
						<?php }else{?>
							<a href="<?php echo esc_url($permalink); ?>" class="placeholder-img">
								<img class="attachment-full size-full wp-post-image" width="536" height="550" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
							</a>
						<?php } ?>
					</div>
					<div class="article-item__content stdl-bg-dark">
						<?php echo get_the_term_list( $post_id, 'project-type', '<ul class="project-type stdl-cpt__meta"><li>', '</li><li>', '</li></ul>' ); ?>
						<div class="article__title">
							<h2 class="title block_title"><a href="<?php echo esc_url( $permalink ) ;?>" rel="bookmark"><?php echo get_the_title($post_id); ?></a></h2>
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
							<a class="stdl-section-btn btn-link" href="<?php echo esc_url($permalink) ;?>"><?php esc_html_e( 'View Project' ) ;?></a>
						</div>
					</div>
				</article>
				<?php 
						endforeach;
					endif;
				?>
			</div>

        </div>
		<?php if(!get_field('select_projects')) { ?>
			<div class="section-btn-warp text-center">
				<a class="stdl-section-btn btn-primary stdl-load-project" data-max-num="<?php echo esc_attr($max_pages) ;?>" href="javascript:void(0)"><?php esc_html_e( 'Load More' ) ;?></a>
			</div>
		<?php } ?>
    </div>
</section>