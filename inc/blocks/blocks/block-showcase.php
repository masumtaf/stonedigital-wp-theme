<?php 
/**
 * Block Name: Showcase Projects
 *
 * This is the template that displays Showcase Projects
 */

// create id attribute for specific styling
$id = 'section-stdl-showcase-' . $block['id'];
$count = 1;

?>

<section id="<?php echo $id; ?>" class="stdl-section-showcase parallax-two-grid">
    <div class="container">
        <div class="stdl-showcase ">
            <?php if(have_rows('showcase_items')):
                while(have_rows('showcase_items')): the_row(); 
                $showcase_img_data = get_sub_field('showcase_image');
                $showcase_img__id = $showcase_img_data["ID"];
                $showcase_img_url = wp_get_attachment_image_url($showcase_img__id, 'full');
                $showcase_client_name = get_sub_field('client_name');
                $showcase_project_name = get_sub_field('project_name');
                $showcase_btn_text = get_sub_field('project_button_text');
                $showcase_btn_url = get_sub_field('project_button_url');
                $class = '';
                $classnested = '';
                if ($count == 2 || $count == 3 || $count == 5 || $count == 7 ) {
                    $class = 'vertical-parallax';
                    $classnested = 'parallax-item-active';
                }
                
                ?>
                <div class="stdl-showcase-item <?php echo $class;?>" data-number="02" data-color="#95121e" data-firstline="View" data-secondline="Project" >
                    <div class="item-parallax <?php echo $classnested;?>">
                    
                        <?php if (!empty($showcase_btn_url)) { ?>
                            <div class="stdl-showcase-item__img">
                                <a href="<?php echo esc_url($showcase_btn_url) ;?>">
                                    <img src="<?php echo esc_url($showcase_img_url); ?>" alt="<?php echo esc_attr($showcase_img_data['alt']); ?>"/>
                                </a>
                            </div>
                        <?php } ?>
                        <div class="stdl-showcase-item__content-demo">
                            <div class="item-arrow"><i class="arrow-icon"></i></div>
                            <?php if (!empty($showcase_client_name)) { ?>
                                <h4 class="stdl-client-name"><?php esc_html_e( $showcase_client_name ) ;?></h4>
                            <?php } ?>
                            <h4 class="stdl-project-name"><?php esc_html_e( $showcase_project_name ) ;?></h4>
                        </div>
                        <div class="stdl-showcase-item__content">
                            <h4 class="stdl-title"><?php esc_html_e( $showcase_project_name ) ;?></h4>
                            <a href="<?php echo esc_url($showcase_btn_url); ?>"><?php esc_html_e( $showcase_btn_text ) ;?></a>
                        </div>
                    </div>
                </div>
            <?php $count++ ;endwhile; endif; ?>
        </div>
    </div>
</section>