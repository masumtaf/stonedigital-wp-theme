<?php 
/**
 * Block Name: Featured Projects
 *
 * This is the template that displays Featured Project (custom post type)
 */

// create id attribute for specific styling
$id = 'stdl-projects-' . $block['id'];

$enable_section_heading = get_field('enable_section_heading');
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');

$project_btn_text = get_field('view_all__btn');
$project_btn_url = get_field('view_all_link');
$enable_buttons = get_field('enable_buttons');

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

<section id="<?php echo $id; ?>" class="stdl-section-featured-projects std-amin-img-content <?php echo $bg_class; ?>">
    <div class="container">

        <?php if ($enable_section_heading) : ?>
            <?php if ($section_tagline || $section_title || $description) : ?>
                <div class="stdl-section__title section-header text-center">
                    <?php if ($section_tagline) : ?>
                        <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                    <?php endif; if ($section_title) : ?>
                        <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                    <?php endif; ?> 
                    <?php if ($description) : ?>
                        <p class="stdl-description"><?php echo ( $description ) ;?></p>
                    <?php endif; ?>
                </div>
            <?php endif ;?>
        <?php endif ;?>

        <div class="stdl-featured-projects">
        <?php if(get_field('featured_projects')) {
               $featured_projects = get_field('featured_projects');
            } else {
                $projects_args = array(
                    'post_type' => 'project',
                    'orderby' => 'date', 
                    'order'   => 'ASC',
                    'posts_per_page' => 4,
                    'post_status' => 'publish'
                );
                $projects_query = new WP_Query( $projects_args );
                $featured_projects = $projects_query->get_posts();
            }
            ?>
            <?php if (count($featured_projects) > 0): ?>
                <?php foreach ($featured_projects as $project ): ?>
                    <?php 
                        setup_postdata($project);
                        $project_id = $project->ID;
                        $permalink = get_the_permalink($project_id);
                           
                    ?>
                    <div class="stdl-featured-project std-amin-item">
                        <div class="featured-project__thumb std-amin-img">
                            <?php if(get_the_post_thumbnail($project)) { ?>
                                <a href="<?php echo esc_url($permalink ); ?>">
                                    <?php echo get_the_post_thumbnail( $project_id, 'heighlight-tile', 'block_img', true ); ?>
                                </a>
                            <?php } else { ?>
                                <a href="<?php echo esc_url( $permalink ); ?>" class="placeholder-img">
                                    <img class="attachment-grid-tile size-grid-tile wp-post-image" width="536" height="232" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
                                </a>
                            <?php } ?>
                        </div>

                        <div class="featured-project__content std-amin-content">
                            <?php echo get_the_term_list( $project_id, 'project-type', '<ul class="project-type stdl-cpt__meta"><li>', '</li><li>', '</li></ul>' ); ?>
                            <h2 class="block_title title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title($project); ?></a></h2>
                                <?php 
                                if (has_excerpt($project_id)) { ?>
                                    <p class="block_decs desc post-excerpt" style="-webkit-box-orient:vertical !important;"><?php echo get_the_excerpt($project_id);?></p>
                                <?php } else { ?>
                                    <p class="block_decs desc"> <?php echo wp_trim_words( get_the_content($project), 20, '...' ); ?></p>
                                <?php } ?>
                            <a class="block_link" href="<?php echo esc_url($permalink); ?>">Read More Details</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif ;?>
        </div>

        <?php if ( $enable_buttons ) : ?>
            <div class="section-btn-warp text-center">
                <a class="stdl-section-btn btn-primary" href="<?php echo esc_url($project_btn_url) ;?>"><?php esc_html_e( $project_btn_text ) ;?></a>
            </div>
        <?php endif ;?>
    </div>
</section>