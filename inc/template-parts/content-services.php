<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Stone_Digital
 */

?>
<?php
$post_id = get_the_ID();

$service_tagline = get_field('service_tagline', $post_id);
$short_text = get_field('short_text', $post_id);
$descriptions = get_field('single_page_descriptions', $post_id);

$service_icon_data = get_field('service_icon', $post_id);
$service_icon_id = $service_icon_data["ID"];
$service_icon_url = wp_get_attachment_image_url($service_icon_id, 'full');

$slug = basename(get_permalink($post_id));
$slug = "article-" . $slug ;
?>

<a id="post-<?php the_ID(); ?>" <?php post_class(['grid-article article-item', $slug]); ?> href="<?php echo esc_url(get_permalink($post_id)) ;?>">
    <div class="article-item__header">
        <?php if ($service_icon_id) :?>
            <div class="header__img">
                <span>
                    <?php echo stdl_get_svg($service_icon_id);?>
                </span>
            </div> 
        <?php endif ;?>
        <div class="article__title">
            <?php the_title( '<h2 class="title">', '</h2>' ); ?>
        </div>
    </div>
    <div class="article-item__body">
        <p><?php esc_html_e( $short_text ) ;?></p>
    </div>
</a>