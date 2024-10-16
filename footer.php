<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Stone_Digital
 */

?>

	<footer id="colophon" class="stdl-footer">
		
		<div class="container">
			<div class="site-branding stdl-footer-logo">
				<?php the_custom_logo(); ?>
			</div>
			<div class="stdl-footer-widget-wrapper">
				<div class="stdl-footer-widget footer-one">
					<?php if ( is_active_sidebar( 'footer-1' ) ) :
							dynamic_sidebar( 'footer-1' );
					endif; ?>
				</div>
				<div class="stdl-footer-widget footer-two">
					<?php if ( is_active_sidebar( 'footer-2' ) ) :
						dynamic_sidebar( 'footer-2' );
					endif; ?>
				</div>
				<div class="stdl-footer-widget footer-three">
					<?php if ( is_active_sidebar( 'footer-3' ) ) :
						dynamic_sidebar( 'footer-3' );
					endif; ?>
				</div>
		
				<div class="stdl-footer-widget footer-four">
					<?php if ( is_active_sidebar( 'footer-4' ) ) :
						dynamic_sidebar( 'footer-4' );
					endif; ?>
				</div>
			</div>
		</div>
	</footer><!-- #colophon -->
	
	<div class="site-info">
		<div class="container">
			<div class="stdl-footer__links">
				<div class="stdl-footer__link">
					<a href="<?php echo esc_url( __( 'https://stonedigital.com.au/', 'stone-digital' ) ); ?>">
						<?php
						/* translators: %s: CMS name, i.e. WordPress. */
						printf( esc_html__( '© ' . '%1$s' . ' Stone Digital Pty Limited. All rights reserved.', 'stone-digital' ), Date('Y') );
						?>
					</a>
				</div>
				<div class="stdl-social__icons">
					<a href="https://www.facebook.com/stonedigitalau/"  target="_blank"><span><?php echo stdl_get_svg('facebook.svg') ;?></span></a>
                	<a href="https://www.instagram.com/stonedigitalau"  target="_blank"><span><?php echo stdl_get_svg('instagram.svg') ;?></span></a>
                	<a href="https://www.linkedin.com/company/stone-digital-au"  target="_blank"><span><?php echo stdl_get_svg('linkedin.svg') ;?></span></a>
				</div>
			</div>
		</div>
	</div><!-- .site-info -->
</div><!-- #page -->
<div id="magic-cursor" class="light-content">
	<div class="pointer"></div>
	<div id="ball">
		<div id="ball-drag-x"></div>
		<div id="ball-drag-y"></div>
		<div id="ball-loader"></div>
	</div>
</div>

<?php stdl_show_template('header/toggle-menu') ;?>

<!-- Modal Content load in Ajax Here (.stdl-popup-content) -->
<div class="stdl-popup">
    <div class="stdl-popup-module">
            <span class="stdl-close-btn">
				<?php echo stdl_get_svg('x.svg');?>
			</span>
        <div class="container">
            <div class="stdl-popup-content">

            </div>
        </div>
    </div>
</div>
<div class="stdl-popup-overlay"></div>
<!-- Modal End -->

<?php echo stdl_render_popup_content();?>

<?php wp_footer(); ?>
<!-- <script>
// Function to push events to dataLayer and log to console for testing
function pushToDataLayer(event, details = {}) {
    const data = {
        'event': event,
        ...details
    };

    // Log the data to the console for testing
    console.log('Data to be pushed to dataLayer:', data);

    // Uncomment the line below to actually push the data to dataLayer
    // window.dataLayer.push(data);
}

// Function to determine the calendar location
function getCalendarLocation() {
    // Check if the calendar is inside .stdl-popup-content or .site-main
    const calendarElement = document.querySelector('#your-calendar-element'); // Adjust selector for your calendar element
    if (!calendarElement) return 'unknown';

    const isInPopup = calendarElement.closest('.stdl-popup-content') !== null;
    const isInSiteMain = calendarElement.closest('.site-main') !== null;

    if (isInPopup) return 'popup';
    if (isInSiteMain) return 'page';

    return 'unknown';
}

// Simulate the calendar loaded event
document.addEventListener('DOMContentLoaded', function() {
    const calendarLocation = getCalendarLocation();
    pushToDataLayer('calendar_loaded', {
        'calendarLocation': calendarLocation
    });
});

// Example event listeners for your calendar
const calendar = document.querySelector('#your-calendar-element'); // Adjust selector for your calendar element

if (calendar) {
    // Example event listener for day selection
    calendar.addEventListener('selectDay', function(e) {
        const calendarLocation = getCalendarLocation();
        pushToDataLayer('calendar_select_day', {
            'calendarLocation': calendarLocation,
            'selectedDay': e.detail.selectedDay // Adjust based on your library
        });
    });

    // Example event listener for time selection
    calendar.addEventListener('selectTime', function(e) {
        const calendarLocation = getCalendarLocation();
        pushToDataLayer('calendar_select_time', {
            'calendarLocation': calendarLocation,
            'selectedTime': e.detail.selectedTime // Adjust based on your library
        });
    });

    // Example event listener for meeting scheduled
    calendar.addEventListener('meetingScheduled', function(e) {
        const calendarLocation = getCalendarLocation();
        pushToDataLayer('calendar_meeting_scheduled', {
            'calendarLocation': calendarLocation,
            'meetingDetails': e.detail.meetingDetails // Adjust based on your library
        });
    });
}

// Event listener for #sdcl-firstButton
document.addEventListener('DOMContentLoaded', function() {
    const firstButton = document.getElementById('sdcl-firstButton');
    if (firstButton) {
        firstButton.addEventListener('click', function() {

		});
	}
});
</script> -->
</body>
</html>
