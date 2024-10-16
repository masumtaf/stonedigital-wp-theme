<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Stone_Digital
 */

get_header();
?>

	<main id="primary" class="site-main">
		<section class="section-single-blog-hero">
			<div class="container">
				<div class="single-hero">
					<div class="single-hero__content section-header">
						<a class="stdl-back-link" href="<?php echo esc_url( home_url( '/blog' ) ); ?>">← Back to Blog</a>

						<?php echo stdl_reading_time(get_the_content()); ?>
						<h1 class="stdl-title pt-20"><?php single_post_title(); ?></h1>

						<div class="stdl-meta_tag">
							<?php //stone_digital_posted_on() ;?>
				
							<?php
								$posted_on = get_the_date();
								$update_on = get_the_modified_date()
							?>
							<span class="posted-on"><span>Posted <a href="<?php echo esc_url( get_permalink() ) ;?>" rel="bookmark"><time class="entry-date published" datetime="<?php echo esc_attr($posted_on); ?>"><?php echo $posted_on ?></time></a></span><span class="updated-on">Updated - <a href="<?php echo esc_url( get_permalink() ) ;?>" rel="bookmark"><time class="updated" datetime="<?php echo esc_attr($update_on); ?>"><?php echo $update_on ?></time></a></span></span>		
							
							
						</div>
					</div>
					<div class="single-hero__thumb">
						
					</div>
				</div>
			</div>
		</section>

		<section class="post-meta-info stdl-bg-dark-gray">
			<div class="container">
				<div class="post-meta-wrap">
					<div class="post-author__info">
						<span class="post-author__info-thumb">
							<?php echo get_avatar(get_the_author_meta('ID'), 45) ;	?>
						</span>
						<div class="post-author__info-name">
							<?php $current_user = wp_get_current_user();?>
							<?php stone_digital_posted_by();?>
							<div class="post-author__info-social">
								<?php if ($current_user->twitter) { ?>
									<a href="<?php echo esc_url($current_user->twitter) ;?>" target="_blank"><span><?php echo stdl_get_svg('twitter.svg') ;?></span></a>
									<?php } if($current_user->linkedin) { ?>
									<a href="<?php echo esc_url($current_user->linkedin) ;?>" target="_blank"><span><?php echo stdl_get_svg('linkedin.svg') ;?></span></a>
								<?php } ;?>
							</div>
						</div>
					</div>
					<div class="post-meta_tag">
						<?php echo stone_digital_category_list();?>
						<?php echo stone_digital_tag_list();?>
					</div>
				</div>
			</div>
		</section>

		<div id="toc-container" class="table-of-contents-mobile">
			<div class="container">
				<h4 class="widget-title">Table of Contents</h4>
				<div class="table-of-contents__wrapper">
					<div id="toc-content" class="hidden">
						<!-- ToC will be generated here -->
					</div>
				</div>
			</div>
		</div>
		<section class="single-post-content">
			<div class="container">
				<div class="stdl-post-content-wrap">
					<div class="stdl-post-content-left">
						<h1 class="stdl-title pb-30"><?php single_post_title(); ?></h1>
						<?php
						while ( have_posts() ) :

							the_post();

							the_content();

						endwhile; // End of the loop.
						?>
						<div class="stdl-comment-from">
							<?php 
								if ( comments_open() || get_comments_number() ) :
									comments_template();
								endif; 
							?>
						</div>
					</div>
					<aside class="sidebar single-sidebar">
						<div class="widget-box widget-box_black table-of-contents-desktop">
							<div class="table-of-contents__wrapper">
								<h4 class="widget-title">Content</h4>
								<nav id="table-of-contents__nav"></nav>
							</div>
						</div>	
						<div class="widget-box widget-box_black">
							<h4 class="widget-title">Book A Meeting </h4>
							<p class="widget-text">
								Unlock your website's potential with our expert advice.
							</p>
							<a class="widget-btn" href="<?php echo esc_url(home_url('/contact')) ;?>">Book Now</a>
						</div>	
						<div class="widget-box widget-box_gradient">
							<h4 class="widget-title">Explore Our Portfolio </h4>
							<p class="widget-text">
								Browse our web projects and see our top tier expertise in action.
							</p>
							<a class="widget-btn" href="<?php echo esc_url(home_url('/portfolio')) ;?>">View Portfolio</a>
						</div>	
					</aside>
				</div>
			</div>
		</section>

		<?php stdl_show_template('dynamic/featured-post') ;?>
		<?php echo std_get_acf_block_data_by_name(892, 'acf/block-call-to-action'); ?>
	</main><!-- #main -->

<?php
get_footer();
