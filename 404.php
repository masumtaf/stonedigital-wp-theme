<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Stone_Digital
 */

get_header();
?>

	<main id="primary" class="site-main">

		<section class="stdl-bg-gradient section-space_bottom error-page-area">
			<div class="container">
				<div class="stdl-error">
					<div class="thumbnail">
						<img src="<?php echo esc_url( STDL_ASSETS_URI . 'img/404-error.svg' ) ;?>" alt="404 Error">
					</div>
					<div class="stdl-section__title section-header text-center">
						<h2 class="stdl-tagline text-center">Oops! That page can&rsquo;t be found.</h2>
						<h4 class="stdl-title text-center">The page you are looking for does not exist.</h4>
						<div class="section-btn-warp text-center">
                            <a class="stdl-section-btn btn-primary-tp" href="<?php echo esc_url(home_url()) ;?>"><?php esc_html_e( 'Back to Homepage' ) ;?></a>
                		</div>
					</div>
				</div>
			</div>
		</section><!-- .error-404 -->

	</main><!-- #main -->

<?php
get_footer();
