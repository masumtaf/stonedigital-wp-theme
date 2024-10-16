<?php 
/**
 * Block Name: Display Our Team and Explore out team
 *
 * This is the template that Our Team and Explore out team
 */

// create id attribute for specific styling
$id = 'section-stdl-team-' . $block['id'];
$section_tagline = get_field('section_tagline');
$section_title = get_field('section_title');
$description = get_field('section_description');
$section_bg_color = get_field( 'select_background_color' );
$layout_type = get_field('layout_type');

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
// this cloud be you 
$team_avatar_data = get_field('team_avatar');
$team_avatar_data__id = $team_avatar_data["ID"];
$team_avatar_url = wp_get_attachment_image_url($team_avatar_data__id, 'team-thumb');
$team_member_link_field = get_field( 'team_member_link' );
$team_member_link = isset($team_member_link_field) ? $team_member_link_field : esc_url(home_url('/careers/'));
$team_member_name_field = get_field( 'team_member_name' );
$team_member_name = $team_member_name_field ? $team_member_name_field : 'This could be you!';
$team_member_role_field = get_field( 'team_member_role' );
$team_member_role = $team_member_role_field ? $team_member_role_field : 'Become a part of our team';
$team_member_email_field = get_field( 'team_member_email' );
$team_member_email = $team_member_email_field ? $team_member_email_field : 'johndoe@stonedigital.com.au';

?>

<section id="<?php echo $id; ?>" class="stdl-section-team section-space <?php echo $bg_class; ?> team--<?php echo esc_attr($layout_type) ;?>">
    <div class="container">
        <div class="stdl-team">
            <?php if ($section_tagline || $section_title || $description) : ?>
                    <div class="stdl-section__title">
                        <div class="section-header text-center">
                            <?php if ($section_tagline) : ?>
                                <h4 class="stdl-tagline"><?php esc_html_e( $section_tagline ) ;?></h4>
                            <?php endif; if ($section_title) : ?>
                                <h2 class="stdl-title"><?php echo ( $section_title ) ;?></h2>
                            <?php endif; ?> 
                            <?php if ($description) : ?>
                                <p class="stdl-description"><?php echo ( $description ) ;?></p>
                            <?php endif; ?>
                        </div>
                        <?php if( get_field('layout_type') == 'stdl_carousel' ) : ?>
                            <div class="team-owl-nav">
                                <span class="team-next-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></span>
                                <span class="team-prev-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                            </div>
                        <?php endif ;?>
                    </div>
            <?php endif ;?>
            
            <?php if( get_field('layout_type') == 'stdl_carousel' ) { ?>
                <div class="stdl-team-items stdl-our-team__carousel owl-carousel owl-theme">
            <?php } else { ?>
                <div class="stdl-team-items stdl-our-team__grid">
            <?php } ?>

            <?php if(get_field('our_team')) {
                $our_team_obj = get_field('our_team');
                } else {
                    $team_args = array(
                        'post_type' => 'team',
                        'orderby' => 'date', 
                        'order'   => 'ASC',
                        'posts_per_page' => 4,
                        'post_status' => 'publish'
                    );
                    $team_query = new WP_Query( $team_args );
                    $our_team_obj = $team_query->get_posts();
                }
                ?>
                <?php if (count($our_team_obj) > 0): ?>
                    <?php foreach ($our_team_obj as $team ): ?>
                        <div class="stdl-team-item">
                            <?php 
                                setup_postdata($team);
                                $team_id = $team->ID;
                                $permalink = get_the_permalink($team_id);
                                $email_address = get_field('email_address', $team_id);
                            ?>
                            <div class="team-item__thumb std-amin-img">
                                <a href="<?php echo esc_url( $permalink ); ?>">
                                    <?php echo get_the_post_thumbnail( $team_id, 'team-thumb'); ?>
                                </a>
                            </div>
                            <div class="team-item__content">
                                <h2 class="block_title title"><a href="<?php echo esc_url($permalink) ;?>"><?php echo get_the_title($team); ?></a></h2>
                                <p class="team-role"><?php echo get_field('team_member_role', $team_id); ?></p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif ;?>
                <div class="stdl-team-item">
                    <div class="team-item__thumb std-amin-img">
                        <a href="<?php echo esc_url( $team_member_link ); ?>">
                            <?php if($team_avatar_data): ?>
                                 <img src="<?php echo esc_url($team_avatar_url); ?>" alt="<?php echo esc_attr($team_avatar_data['alt']); ?>">
                            <?php else :?>
                                <img class="attachment-team-thumb size-team-thumb wp-post-image" width="693" height="595" src="<?php echo esc_url( STDL_ASSETS_URI . 'img/placeholder-team-2.jpg' ) ;?>" alt="" >
                            <?php endif ;?>
                        </a>
                    </div>
                    <div class="team-item__content">
                        <h2 class="block_title title"><a href="<?php echo esc_url($team_member_link) ;?>"><?php echo $team_member_name; ?></a></h2>
                        <p class="team-role"><?php echo $team_member_role; ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>