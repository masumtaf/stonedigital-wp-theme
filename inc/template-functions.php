<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Stone_Digital
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function stone_digital_body_classes( $classes ) {
	global $post;
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'stdl-single';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	if ( isset( $post ) ) {
		$classes[] = 'stdl-' . $post->post_type . '-' . $post->post_name;
	}
	if ( is_home() || is_front_page() ) {
		$classes[] = 'stdl-home';
	} else {
		$classes[] = 'stdl-inner-page';
	}

	return $classes;
}
add_filter( 'body_class', 'stone_digital_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function stone_digital_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'stone_digital_pingback_header' );