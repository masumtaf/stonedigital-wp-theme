<?php 
/**
 * Block Name: Custom Terms Link
 *
 * This is the template that displays Custom Terms Link (static or dynamic)
 */

// create id attribute for specific styling
$id = 'section-stdl-custom-link-' . $block['id'];

$block_title = get_field('block_title');
$enable_custom_tag_links = get_field('enable_custom_tag_links');

?>

<div id="<?php echo $id; ?>" class="stdl-section__title custom-link-block">
    <?php if ($block_title) : ?>
        <div class="section-header">
            <h4 class="stdl-tagline"><?php esc_html_e( $block_title ) ;?></h4>
        </div>
    <?php endif;?>
        <?php if ($enable_custom_tag_links) :
            $custom_link_items = get_field('custom_link_items');
        ?>
        <?php if(have_rows('custom_link_items')): ?>
            <div class="custom-link-wrapper">
                <?php while(have_rows('custom_link_items')): the_row(); 
                $custom_link_text = get_sub_field('custom_link_text');
                $custom_link_url = get_sub_field('custom_link_url');
                ?>
           <a class="stdl-custom-link stdl-tag-link" href="<?php echo esc_url($custom_link_url) ;?>"><?php esc_html_e( $custom_link_text ) ;?></a>
        <?php endwhile;?>
            </div>
        <?php endif; ?>
    <?php endif;?>
</div>