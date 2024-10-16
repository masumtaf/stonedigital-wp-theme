<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */


$header_popup_content = get_field( 'popup_template', 'option' );
$popup_post_id = $header_popup_content->ID;
?>

<header id="stdl-header" class="stdl-header">
    <div class="stdl-sticky-header">
        <div class="container">
            <div class="stdl-header__content">
                <div class="stdl-header__logo">
                    <div class="site-branding">
                        <?php the_custom_logo(); ?>
                    </div>
                </div>
                <div class="stdl-header__menu">
                    <nav id="site-navigation" class="main-navigation">
                        <?php
                            wp_nav_menu(
                                array(
                                    'theme_location' => 'menu-1',
                                    'menu_id'        => 'primary-menu',
                                    'menu_class'     => 'primary-navigation stdl-menu-wrapper',
                                    'container'      => '',
                                    'fallback_cb'    => false,
                                    'walker'         => new Stone_Digital_Menu_Walker(),
                                )
                            );
                        ?>
                    </nav><!-- #site-navigation -->
                </div>
                <div class="stdl-header__cta">
                    <a class="stdl_btn popup-action" data-action-id="popup-id-<?php echo esc_attr($popup_post_id);?>" href="javascript:void(0)"><span>Book A Free Consult</span></a>
                    <div class="stdl_menu-toggle">
                        <a class="stdl-toggle-action" href="javascript:void(0)"><span><?php echo stdl_get_svg('menu.svg');?></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>