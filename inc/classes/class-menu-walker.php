<?php
/**
 * Navigation walker
 *
 * @package Ehsanbd
 */

// **********************************************************************//
// ! Navigation walker
// **********************************************************************//

if ( ! class_exists( 'Stone_Digital_Menu_Walker' ) ) {
	class Stone_Digital_Menu_Walker extends Walker_Nav_Menu {
		/**
		 * Design.
		 *
		 * @var string
		 */
		private $color_scheme;

		/**
		 * Design.
		 *
		 * @var string
		 */
		private $design = 'nornal';

		/**
		 * ID.
		 *
		 * @var integer
		 */
		private $id;

		/**
		 * Stone_Digital_Menu_Walker constructor.
		 */
		public function __construct() {
			$this->color_scheme = 'dropdowns-color-light';
		}

		/**
		 * Starts the list before the elements are added.
		 *
		 * @since 3.0.0
		 *
		 * @param string $output Passed by reference. Used to append additional content.
		 * @param int    $depth  Depth of menu item. Used for padding.
		 * @param mixed  $args   An array of arguments. @see wp_nav_menu().
		 *
		 * @see   Walker::start_lvl()
		 */
		public function start_lvl( &$output, $depth = 0, $args = array() ) {
			$indent        = str_repeat( "\t", $depth );
			$classes       = '';
            $enable_megamenu =  get_field('enable_mega_menu', $this->id);
            $megamenu_html =  get_field('add_short_code_dropdown', $this->id);

			if ( 0 === $depth && $enable_megamenu ) {
				$classes .= ' stdl-megamenu';
				$classes .= ' stdl-megamenu';
			}

			if ( 0 === $depth ) {
                $sub_menu_class  = ' stdl-dropdown';
			} else {
				$sub_menu_class = ' stdl-dropdown';
			}

			$output .= "\n$indent<ul class=\"$sub_menu_class\">\n";
		}

		/**
		 * Ends the list of after the elements are added.
		 *
		 * @since 3.0.0
		 *
		 * @param string $output Passed by reference. Used to append additional content.
		 * @param int    $depth  Depth of menu item. Used for padding.
		 * @param mixed  $args   An array of arguments. @see wp_nav_menu().
		 *
		 * @see   Walker::end_lvl()
		 */
		public function end_lvl( &$output, $depth = 0, $args = array() ) {
			$indent        = str_repeat( "\t", $depth );
			$output       .= "$indent</ul>\n";
		}

		/**
		 * Start the element output.
		 *
		 * @since 3.0.0
		 *
		 * @param string $output Passed by reference. Used to append additional content.
		 * @param object $item   Menu item data object.
		 * @param int    $depth  Depth of menu item. Used for padding.
		 * @param mixed  $args   An array of arguments. @see wp_nav_menu().
		 * @param int    $id     Current item ID.
		 *
		 * @see   Walker::start_el()
		 */
		public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
			$this->id      = $item->ID;
			$indent        = $depth ? str_repeat( "\t", $depth ) : '';
			$classes       = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[]     = 'menu-item-' . $item->ID;
			$classes[]     = 'item-level-' . $depth;
			$label_out     = '';
            $enable_megamenu =  get_field('enable_mega_menu', $this->id);
            $megamenu_html =  get_field('add_short_code_dropdown', $this->id);
		
			if ( ! is_object( $args ) ) {
				return;
			}

			if ( 0 === $depth && !$enable_megamenu ) {
				$classes[] = 'menu-simple-dropdown';
			}

			if ( $megamenu_html && $enable_megamenu ) {
				$classes[] = 'menu-item-has-markup';
			}

			if ( ! empty( $label ) ) {
				$classes[] = 'item-with-label';
				$classes[] = 'item-label-' . $label;
				$label_out = '<span class="menu-label menu-label-' . $label . '">' . esc_attr( $label_text ) . '</span>';
			}

			if ( ! empty( $megamenu_html ) && ! $args->walker->has_children ) {
				$classes[] = 'menu-item-has-children';
			}

			/**
			 * Filter the CSS class(es) applied to a menu item's list item element.
			 *
			 * @since 3.0.0
			 * @since 4.1.0 The `$depth` parameter was added.
			 *
			 * @param array  $classes The CSS classes that are applied to the menu item's `<li>` element.
			 * @param object $item    The current menu item.
			 * @param array  $args    An array of {@see wp_nav_menu()} arguments.
			 * @param int    $depth   Depth of menu item. Used for padding.
			 */
			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

			/**
			 * Filter the ID applied to a menu item's list item element.
			 *
			 * @since 3.0.1
			 * @since 4.1.0 The `$depth` parameter was added.
			 *
			 * @param string $menu_id The ID that is applied to the menu item's `<li>` element.
			 * @param object $item    The current menu item.
			 * @param array  $args    An array of {@see wp_nav_menu()} arguments.
			 * @param int    $depth   Depth of menu item. Used for padding.
			 */
			$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
			$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

			$output .= $indent . '<li' . $id . $class_names . '>';

			$atts           = array();
			$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
			$atts['target'] = ! empty( $item->target ) ? $item->target : '';
			$atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
			$atts['href']   = ! empty( $item->url ) ? $item->url : '';

			/**
			 * Filter the HTML attributes applied to a menu item's anchor element.
			 *
			 * @since 3.6.0
			 * @since 4.1.0 The `$depth` parameter was added.
			 *
			 * @param array  $atts   {
			 *                       The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
			 *
			 * @type string  $title  Title attribute.
			 * @type string  $target Target attribute.
			 * @type string  $rel    The rel attribute.
			 * @type string  $href   The href attribute.
			 * }
			 *
			 * @param object $item   The current menu item.
			 * @param array  $args   An array of {@see wp_nav_menu()} arguments.
			 * @param int    $depth  Depth of menu item. Used for padding.
			 */
			$atts          = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );
			$atts['class'] = 'stdl-nav-link';

			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value       = 'href' === $attr ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}
            $icon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>';
			$item_output = '';
			$item_output  = $args->before;
			$item_output .= '<a' . $attributes . '>';
			
			/** This filter is documented in wp-includes/post-template.php */
			if ( 0 === $depth ) {
				$item_output .= '<span class="nav-link-text">' . $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after . '</span>';
			} else {
				$item_output .= '<span class="nav-link-text">' . $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after . '</span>';
			}
            if ( $args->walker->has_children ) {
				$item_output .= '<span class="stdl-nav-icon">' . $icon . '</span>';
			}
            if ( $enable_megamenu && ! $args->walker->has_children ) {
                $item_output .= '<span class="stdl-nav-icon">' . $icon . '</span>';
            }
			$item_output .= $label_out;
			$item_output .= '</a>';
			$item_output .= $args->after;

			if ( $enable_megamenu ) {
				if ( $enable_megamenu && ! $args->walker->has_children ) {
					$classes = '';
					$classes .= ' stdl-megamenu stdl-megamenu-wrapper';

					$item_output .= "\n$indent<section class=\"" . trim( $classes ) . "\">\n";
					$item_output .= "\n$indent<div class=\"container\">\n";
				
					$item_output .=  do_shortcode( "{$megamenu_html}" );
					
					$item_output .= "\n$indent</div>\n";
					$item_output .= "\n$indent</section>\n";
				}
			}

			/**
			 * Filter a menu item's starting output.
			 *
			 * The menu item's starting output only includes `$args->before`, the opening `<a>`,
			 * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
			 * no filter for modifying the opening and closing `<li>` for a menu item.
			 *
			 * @since 3.0.0
			 *
			 * @param string $item_output The menu item's starting HTML output.
			 * @param object $item        Menu item data object.
			 * @param int    $depth       Depth of menu item. Used for padding.
			 * @param array  $args        An array of {@see wp_nav_menu()} arguments.
			 */
			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
}