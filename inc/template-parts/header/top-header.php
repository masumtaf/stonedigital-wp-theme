<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

?>

<div class="stdl-header-top">
    <div class="container">
        <div class="stdl-header-top__content">
            <div class="header-left">
                <a class="stdl_btn" href="#"><span>Book A Free Consult</span></a>
            </div>
            <div class="header-right">
                <ul class="stdl-cta__links">
                    <li class="stdl-cta__link">
                        <a href="tel:<?php echo esc_attr( STDL_PHONE_NO );?>">
                            <span><?php echo stdl_get_svg('phone.svg') ;?></span>
                            <span><?php esc_html_e( STDL_PHONE_NO ) ;?></span>
                        </a>
                    </li>
                    <li class="stdl-cta__link">
                        <a href="">
                            <span><?php echo stdl_get_svg('pin.svg') ;?></span>
                            <span>3/55 Pyrmont Bridge Rd, Pyrmont NSW 2009</span>
                        </a>
                    </li> 
                    <li class="dark-light-toggle">
                        <div class="stdl-scheme-switch" onclick="themeToggle()">
                            <span class="dark"><?php echo stdl_get_svg('moon.svg');?></span>
                            <span class="light"><?php echo stdl_get_svg('sun.svg');?></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>