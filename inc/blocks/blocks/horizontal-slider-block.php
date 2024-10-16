<?php 
/**
 * Block Name: Horizontal Slider - Projects
 *
 * This is the template that displays Horizontal Slider -  Projects
 */

// create id attribute for specific styling
$id = 'section-stdl-horizon-panels-' . $block['id'];
$count = 1;

?>

<section id="<?php echo $id; ?>" class="stdl-section-horizontal-slider">
    <div class="container-full">
        <div class="stdl-panels-wrapper">
            <?php if(have_rows('panel_items')):
                while(have_rows('panel_items')): the_row(); 
                $panel_img_data = get_sub_field('panel_image');
                $panel_img__id = $panel_img_data["ID"];
                $panel_img_url = wp_get_attachment_image_url($panel_img__id, 'full');
                $panel_title = get_sub_field('panel_title');
                $panel_btn_text = get_sub_field('panel_btn_text');
                $panel_btn_url = get_sub_field('panel_btn_url');
                $class = '';
                
                ?>
                <div class="stdl-panel-item">
                    <div class="panel-item" data-color="#000" data-firstline="View" data-secondline="More">
                    
                        <?php if (!empty($panel_btn_url)) { ?>
                            <div class="panel-item__img">
                                <a href="<?php echo esc_url($panel_btn_url) ;?>">
                                    <img src="<?php echo esc_url($panel_img_url); ?>" alt="<?php echo esc_attr($panel_img_data['alt']); ?>"/>
                                </a>
                            </div>
                        <?php } ?>

                        <div class="panel-item__content">
                            <h4 class="stdl-title block_title"><?php esc_html_e( $panel_title ) ;?></h4>
                            <a class="block_link" href="<?php echo esc_url($panel_btn_url); ?>"><?php esc_html_e( $panel_btn_text ) ;?></a>
                        </div>
                    </div>
                </div>
            <?php $count++ ;endwhile; endif; ?>
        </div>
    </div>
</section>