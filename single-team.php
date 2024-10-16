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

$short_info = get_field('short_info', $post_id );
$team_member_role = get_field('team_member_role', $post_id );
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			the_content();
			
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
