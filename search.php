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
    <section id="" class="section-space stdl-section-search" style="background: var(--color-dark-gray)!important;padding:34px 0 34px;">
        <div class="container">
            <div class="search-widget-wrapper">
                <div class="search-widget">
                    <form role="search" id="searchform" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) );?>">
                        <label>
                            <span class="screen-reader-text">Search…</span>
                            <input type="hidden" class="" id="stdl-researchedtext">
                            <input type="hidden" class="" id="stdl-typepsearch">
                            <span class="search-field">
                                <?php echo stdl_get_svg('search.svg');?>
                                <input type="search" class="search-field" id="stdl-resourcesearch" placeholder="Search…" name="s" value="<?php echo get_search_query() ;?>" >
                            </span>
                            
                        </label>
                    </form>
                </div>
                <div class="terms-widget">
                   
                </div>
            </div>
        </div>
    </section>
    <section id="" class="section-space stdl-bg-light-dark">
		<div class="container">
			<?php if ( have_posts() ) : ?>
				<div class="stdl-post">
					<div class="stdl-post__grid stdl-grid-col-3">
						<?php
						/* Start the Loop */
						while ( have_posts() ) :
							the_post();
				
							stdl_show_template('content');
	
						endwhile;

					else :

						get_template_part( 'inc/template-parts/content', 'none' );

					endif;
					?>
				</div>
			</div>
		</div>
        </section>
	</main><!-- #main -->

<?php
get_footer();
