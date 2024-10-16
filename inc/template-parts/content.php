<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

 $count = 1;
 $post_id = get_the_ID();
 $permalink = get_permalink();
 
if ( is_singular() ) :?>

	<article id="post-<?php the_ID(); ?>" <?php post_class('stdl-post-item'); ?>>
		<header class="entry-header">
			<?php
				the_title( '<h1 class="entry-title">', '</h1>' );

			if ( 'post' === get_post_type() ) :
				?>
				<div class="entry-meta">
					<?php
					stone_digital_posted_on();
					stone_digital_posted_by();
					?>
				</div><!-- .entry-meta -->
			<?php endif; ?>
		</header><!-- .entry-header -->

		<?php stone_digital_post_thumbnail(); ?>

		<div class="entry-content">
			<?php
			the_content(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'stone-digital' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				)
			);
			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'stone-digital' ),
					'after'  => '</div>',
				)
			);
			?>
		</div><!-- .entry-content -->
		<footer class="entry-footer">
			<?php stone_digital_entry_footer(); ?>
		</footer><!-- .entry-footer -->
	</article><!-- #post-<?php the_ID(); ?> -->

<?php else : ?>

	<article id="post-<?php echo esc_attr($post_id); ?>" <?php post_class( ['stdl-post-item']); ?>>
		<?php if ($count <= 3 ) : ?>
			<div class="stdl-post__thumb">
			<?php if(get_the_post_thumbnail()) { ?>
				<a href="<?php echo esc_url( $permalink ); ?>"  title="<?php esc_attr(the_title_attribute()); ?>">
					<?php the_post_thumbnail('grid-tile'); ?>
				</a>
				<?php }else{?>
					<a href="<?php echo esc_url( $permalink ); ?>" class="placeholder-img">
						<img class="attachment-grid-tile size-grid-tile wp-post-image" width="536" height="232" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-img.svg' ) ;?>" alt="" >
					</a>
				<?php } ?>
			</div>
			<?php endif ;?>
			<div class="stdl-post__content">
				<h2 class="title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title(); ?></a></h2>
				<p class="desc"> <?php echo wp_trim_words( get_the_content(), 15, '...' ); ?></p>
			</div>
			<div class="stdl-post__footer">
				<div>
					<span><?php echo get_the_date() ;?></span>
					<span><?php echo stdl_reading_time(get_the_content()) ;?></span>
				</div>
			</div>
	</article>
<?php endif;