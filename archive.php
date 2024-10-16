<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

get_header();
?>

	<main id="primary" class="site-main">
	<?php stdl_show_template('dynamic/page-banner') ;?>
		<div class="container">
			<?php if ( have_posts() ) : ?>
				<div class="stdl-post section-space">
					<div class="stdl-post__grid stdl-grid-col-3">
						<?php
						/* Start the Loop */
						while ( have_posts() ) :
							the_post();
				
							stdl_show_template('content');
	
						endwhile;

						the_posts_navigation();

					else :

						get_template_part( 'inc/template-parts/content', 'none' );

					endif;
					?>
				</div>
			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
