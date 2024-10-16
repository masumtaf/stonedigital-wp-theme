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
		<section class="section-space stdl-bg-light-dark ">
			<div class="container">
				<div class="article-wrapper article-project project-layout_col-2">
					<?php if ( have_posts() ) :
						/* Start the Loop */
						while ( have_posts() ) :
							the_post();

							stdl_show_template('content-project');

						endwhile;

						the_posts_navigation();

					else :

						get_template_part( 'inc/template-parts/content', 'none' );

					endif;
					?>
				</div>
			</div>
		</section>
		<?php echo stdl_get_acf_block_data_by_id(531, 'acf/icon-service-box', 'acf-block-6527fea8ec05a'); ?>
		<?php echo std_get_acf_block_data_by_name(217, 'acf/block-simplify'); ?>
		<?php echo std_get_acf_block_data_by_name(217, 'acf/block-customer-reviews'); ?>
		<?php echo std_get_acf_block_data_by_name(217, 'acf/claim-website-audit'); ?>
	

		<?php stdl_show_template('content-cta') ;?>
	</main><!-- #main -->

<?php
get_footer();
