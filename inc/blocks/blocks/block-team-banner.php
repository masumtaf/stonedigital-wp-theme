<?php 
/**
 * Block Name: Team Banner
 *
 * This is the template that displays - Team Banner
 */

// create id attribute for specific styling
$id = 'section-stdl-team-banner-' . $block['id'];
$team_member_name = get_field('team_member_name');
$team_member_role = get_field('team_member_role');
$description = get_field('short_bio');

$team_member_image_data = get_field('team_member_image');
$team_member_image_id = $team_member_image_data["ID"];
$team_member_image_url = wp_get_attachment_image_url($team_member_image_id, 'full');
$section_bg_color = get_field( 'select_background_color' );
switch ($section_bg_color) {
	case 'default-color':
		$bg_class = 'stdl-bg-dark';
		break;
	case 'light-dark-color':
		$bg_class = 'stdl-bg-light-dark';
		break;
	case 'light-color':
		$bg_class = 'stdl-bg-light';
		break;
    case 'gradient-color':
        $bg_class = 'stdl-bg-gradient';
        break;
	default:
		$bg_class = '';
		break;
}
?>

<section id="<?php echo $id; ?>" class="section-single-hero <?php echo $bg_class; ?>">
    <div class="container">
        <div class="single-hero">
            <div class="single-hero__content section-header">
                <h1 class="stdl-title"><?php echo $team_member_name ?></h1>
                <span class="stdl-tagline"><?php echo $team_member_role ;?></span>
                <div class="stdl-description"><?php echo $description ;?></div>
         
                    <?php if(have_rows('social_media_links')):?>
                        <ul class="team-solcial-items">
                            <?php 
                            while(have_rows('social_media_links')): the_row(); 
                                $social_link = get_sub_field('social_url');
                                $social_icon_data = get_sub_field('social_icon');
                                $social_icon_id = $social_icon_data["ID"];
                                $social_icon_url = wp_get_attachment_image_url($social_icon_id, 'full');
                                ?>
                                <?php if (!empty($social_link)) { ?>
                                    <li><a href="<?php echo esc_attr($social_link);?>" target="_blank"><?php echo stdl_get_svg($social_icon_id);?></a></li>
                                <?php } ?>
                            <?php endwhile;?>
                        </ul>
                    <?php endif; ?>
                
            </div>
            <div class="single-hero__thumb">
                <div class="post-thumbnail">
                    <img src="<?php echo esc_url($team_member_image_url); ?>" alt="<?php echo esc_attr($team_member_image_data['alt']); ?>">
                </div><!-- .post-thumbnail -->
            </div>
        </div>
    </div>
</section>