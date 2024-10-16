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
$slug = "service-" . $slug ;

?>

	<main id="primary" <?php post_class( ['site-main stdl-single-project__item', $slug]); ?>>
	
		<?php
			while ( have_posts() ) :
				the_post();
			
				the_content();
				
			endwhile; // End of the loop.
		?>
	</main><!-- #main -->

<?php
get_footer();
