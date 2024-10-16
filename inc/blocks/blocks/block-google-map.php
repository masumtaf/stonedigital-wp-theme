<?php 
/**
 * Block Name: Display Google Map
 *
 * This is the template Google Map
 */

// create id attribute for specific styling
$id = 'section-stdl-gmap-' . $block['id'];
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

$gmap_style_data = get_field('google_map_style_json_data', 'option');
$gmap_set_location = get_field('set_location');
$field_obj = get_field_object('set_location');
$zoom_label = get_field('zoom_label');

$set_location_lat = $gmap_set_location['lat'];
$set_location_lng = $gmap_set_location['lng'];
?>

<div id="<?php echo $id; ?>" class="">
    <div class="stdl-stdl-gmap">
        <div id="gmap-<?php echo $id; ?>" class="stdl-gmap-render" data-lat="<?php echo esc_attr($set_location_lat);?>" data-lng="<?php echo esc_attr($set_location_lng);?>">
        </div>
    </div>
</div>

<script>
    jQuery(document).ready(function ($) {
      
    
        function initMap() {
            let map;
        var mapTargetwrapper = $('.stdl-stdl-gmap').find(".stdl-gmap-render");
        var mapTarget = $(mapTargetwrapper).attr('id');
        
        var lat = <?php echo $set_location_lat ;?>;
        var lng = <?php echo $set_location_lng ;?>;
        var zoom = <?php echo $zoom_label ;?> || 12;

        var stdlGmapLatlng = new google.maps.LatLng(lat,lng);
            var styledMapType = new google.maps.StyledMapType( <?php echo $gmap_style_data; ?>,
                {name: "Styled Map"}
            );

            map = new google.maps.Map(document.getElementById(mapTarget), {
                center: stdlGmapLatlng,
                zoom: zoom || 13,
                disableDefaultUI: true
            });

                        
            var circleOptions = {
                draggable: false,
                editable: false,
                strokeColor: '#d75947',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#d75947',
                fillOpacity: 0.15,
                map: map,
                center: stdlGmapLatlng,
                radius: 5000
            };

            var circle = new google.maps.Circle(circleOptions);

            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set("styled_map", styledMapType);
            map.setMapTypeId("styled_map");

            new google.maps.Marker({
                position: {lat: lat, lng: lng},
                icon: "<?php echo esc_url( STDL_ASSETS_URI . 'img/location.svg' ) ;?>",
                map,
                title: "<?php echo $marker_location; ?>",
            });
        }

        window.initMap = initMap;
        initMap();
    });
</script>