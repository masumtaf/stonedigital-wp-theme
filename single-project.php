<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Stone_Digital
 */

get_header();

global $post;
$post_id = $post->ID;
$slug = basename(get_permalink($post_id));
$slug = "project-" . $slug ;

$project_title = get_field('project_title', $post_id );
$project_descriptions = get_field('project_descriptions', $post_id );
$single_project_banner_bg__img_data = get_field('single_project_banner_bg__img', $post_id );
$banner_bg__id = $single_project_banner_bg__img_data["ID"];
$banner_bg__id_url = wp_get_attachment_image_url($banner_bg__id, 'full');
$live_site_link = get_field('live_site_link', $post_id );
// $team_member_role = get_field('team_member_role', $post_id );
?>

	<main id="primary" <?php post_class( ['site-main stdl-single-project__item', $slug]); ?>>
		<?php
			while ( have_posts() ) :
				the_post();

				the_content();
				
			endwhile; // End of the loop.
		?>
		<?php stdl_show_template('content-cta') ;?>
	</main><!-- #main -->
	
<?php
get_footer();
