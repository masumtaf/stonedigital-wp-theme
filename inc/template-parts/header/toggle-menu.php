<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

?>
<!--Mobile Menu-->
<div class="stdl-toggle_menu">
    <div class="toggle_menu-overlay"></div>
    <div class="toggle_menu-inner">
        <div class="toggle_menu__header">
            <div class="site-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <span id="stone-digital-logo" alt="<?php echo esc_attr(get_bloginfo('name')); ?>"><?php echo stdl_get_svg('stonedigital-logo.svg') ;?><span>
                </a>
            </div>
            <a href="#" class="stdl-close_btn"><span><?php echo stdl_get_svg('x.svg') ;?></span></a>
        </div>
        <nav class="toggle_menu__body mobile-nav__container">
        <?php
            wp_nav_menu(
                array(
                    'theme_location' => 'mobile-menu',
                    'menu_id'        => 'mobile-menu',
                    'menu_class'     => 'stdl-mobile-menu-wrapper',
                    'container'      => '',
                    'fallback_cb'    => false,
                    'walker'         => new Stone_Digital_Menu_Walker(),
                )
            );
        ?>
        </nav>
        <div class="toggle_menu__footer">
           <ul class="stdl-info">
                <li><a href="tel:<?php echo esc_attr( STDL_PHONE_NO );?>"><?php esc_html_e( STDL_PHONE_NO ) ;?></a></li>
                <li><span> 3/55 Pyrmont Bridge Rd,<br>Pyrmont NSW 2009</span></li>
           </ul>
            <div class="stdl-social__icons">
                <a href="https://www.facebook.com/stonedigitalau/"  target="_blank"><span><?php echo stdl_get_svg('facebook.svg') ;?></span></a>
                <a href="https://www.instagram.com/stonedigitalau"  target="_blank"><span><?php echo stdl_get_svg('instagram.svg') ;?></span></a>
                <a href="https://www.linkedin.com/company/stone-digital-au"  target="_blank"><span><?php echo stdl_get_svg('linkedin.svg') ;?></span></a>
            </div>
        </div>
        <div class="gradient-bg-color"></div>
    </div>
</div>