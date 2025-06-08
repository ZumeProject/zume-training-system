<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Local_Map extends Zume_Magic_Page
{
    public $magic = false;
    public $parts = false;
    public $page_title = 'Local Map';
    public $root = 'map';
    public $type = 'local';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'map_local';
    public $grid_id = null;
    public $location_data = null;

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        $this->page_title = esc_html__( 'Local Map', 'zume' );
        $this->page_description = esc_html__( 'Local map showing Zúme training progress and church planting activity for a specific location.', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        // Get grid_id from URL parameter
        $this->grid_id = sanitize_text_field( $_GET['grid_id'] ?? '' );

        if ( str_contains( $page_slug, $this->root ) && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;

            // Query location data if grid_id is provided
            if ( !empty( $this->grid_id ) ) {
                $this->location_data = $this->get_location_data( $this->grid_id );
            }

            $this->register_url_and_access();
            // $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] ); // Removed standard Zume footer
            // add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );
            add_action( 'wp_footer', [ $this, 'footer_javascript' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_local_map_scripts' ] );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'jquery';
        $allowed_js[] = 'mapbox-gl';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        $allowed_css[] = 'mapbox-gl-css';
        return zume_training_magic_url_base_allowed_css( $allowed_css );
    }

    public function enqueue_local_map_scripts() {
        // Enqueue jQuery first
        wp_enqueue_script( 'jquery' );
        
        // Enqueue Mapbox GL JS and CSS
        wp_enqueue_script( 'mapbox-gl', 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js', ['jquery'], '2.15.0', true );
        wp_enqueue_style( 'mapbox-gl-css', 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css', [], '2.15.0' );
    }

    public function header_style() {
        ?>
        <style>
            /* Local Map Specific Styles */

            /* Map popups */
            .location-popup {
                padding: 0.5rem;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            .location-popup h4 {
                margin: 0 0 0.5rem 0;
                color: #4154f1;
                font-size: 1.1rem;
                font-weight: 600;
            }

            .location-popup p {
                margin: 0.25rem 0;
                font-size: 0.9rem;
                color: #666;
            }

            .activity-popup {
                padding: 0.5rem;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            .activity-popup h4 {
                margin: 0 0 0.5rem 0;
                color: #28a745;
                font-size: 1.1rem;
                font-weight: 600;
            }

            .activity-popup p {
                margin: 0.25rem 0;
                font-size: 0.9rem;
                color: #666;
            }

            /* MapboxGL popup customizations */
            .mapboxgl-popup-content {
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                border: none;
                padding: 0;
                overflow: hidden;
            }

            .mapboxgl-popup-tip {
                border-top-color: white;
            }

            /* Map controls styling */
            .mapboxgl-ctrl-group {
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .mapboxgl-ctrl-geocoder {
                min-width: 300px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            /* Loading states */
            .map-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                background: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            .map-loading::after {
                content: "";
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: 10px;
                border: 2px solid #4154f1;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Responsive adjustments for map */
            @media (max-width: 768px) {
                .mapboxgl-ctrl-geocoder {
                    min-width: 250px;
                    font-size: 14px;
                }
                
                .mapboxgl-popup-content {
                    max-width: 280px;
                }
                
                .location-popup,
                .activity-popup {
                    padding: 0.75rem;
                }
                
                .location-popup h4,
                .activity-popup h4 {
                    font-size: 1rem;
                }
                
                .location-popup p,
                .activity-popup p {
                    font-size: 0.85rem;
                }
            }

            /* Map container when no data */
            .map-no-data {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 500px;
                background: #f8f9fa;
                border-radius: 8px;
                color: #6c757d;
                font-size: 1.1rem;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            /* Enhanced stats cards for better visual hierarchy */
            .stats-card .card-header {
                position: relative;
                overflow: hidden;
            }

            .stats-card .card-header::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: translate(30px, -30px);
            }

            /* Icon animations */
            .icon-wrapper {
                transition: transform 0.3s ease;
            }

            .stats-card:hover .icon-wrapper {
                transform: scale(1.1);
            }

            /* Progress bar animations */
            .progress-fill {
                animation: progressFill 2s ease-out;
            }

            @keyframes progressFill {
                from {
                    width: 0%;
                }
            }

            /* Tooltip styles for additional information */
            .map-tooltip {
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                pointer-events: none;
                z-index: 1000;
                max-width: 200px;
                word-wrap: break-word;
            }

            /* Error states */
            .map-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 500px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 2px dashed #dee2e6;
                color: #6c757d;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            .map-error-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }

            .map-error-message {
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .map-error-details {
                font-size: 0.9rem;
                opacity: 0.8;
            }

            /* Scrollbar customization for stats cards */
            .stats-card::-webkit-scrollbar {
                width: 6px;
            }

            .stats-card::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }

            .stats-card::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }

            .stats-card::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }

            .vision-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border: none;
                overflow: hidden;
                margin-bottom: 2rem;
            }
            
            .vision-section {
                margin-bottom: 3rem;
            }
            
            .vision-content {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 2rem;
            }
            
            .vision-description {
                flex: 1;
                min-width: 300px;
            }
            
            .vision-description p {
                margin: 0;
                color: #495057;
                line-height: 1.6;
                font-size: 1.1rem;
                font-weight: 500;
            }
            
            .vision-goals {
                display: flex;
                gap: 1.5rem;
                flex-wrap: wrap;
            }
            
            .vision-goal {
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #4154f1;
                padding: 1rem 1.5rem;
                min-width: 200px;
                text-align: center;
            }
            
            .vision-goal strong {
                color: #4154f1;
                display: block;
                margin-bottom: 0.5rem;
                font-size: 1rem;
            }
            
            /* Recent Activity Card Styles */
            .recent-activity-section {
                margin-top: 3rem;
            }
            
            .activity-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border: none;
                overflow: hidden;
                transition: transform 0.3s ease;
            }
            
            .activity-card:hover {
                transform: translateY(-2px);
            }
            
            .activity-card .card-header {
                background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
                color: white;
            }
            
            .activity-content {
                text-align: center;
                padding: 1rem 0;
            }
            
            .activity-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .activity-number {
                font-size: 3rem;
                font-weight: 700;
                color: #6f42c1;
                line-height: 1;
            }
            
            .activity-label {
                font-size: 1.1rem;
                font-weight: 600;
                color: #495057;
            }
            
            .activity-period {
                font-size: 0.9rem;
                color: #6c757d;
                opacity: 0.8;
            }
        </style>
        <script>
            const localMapObject = <?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'grid_id' => $this->grid_id,
                'location_data' => $this->location_data,
                'us_div' => 5000,
                'global_div' => 50000,
                'translation' => [
                    'local_map' => esc_html__( 'Local Map', 'zume' ),
                    'trainees' => esc_html__( 'Trainees', 'zume' ),
                    'churches' => esc_html__( 'Churches', 'zume' ),
                    'population' => esc_html__( 'Population', 'zume' ),
                    'needed' => esc_html__( 'Needed', 'zume' ),
                    'reported' => esc_html__( 'Reported', 'zume' ),
                    'progress' => esc_html__( 'Progress', 'zume' ),
                    'location_not_found' => esc_html__( 'Location not found', 'zume' ),
                    'enter_grid_id' => esc_html__( 'Please enter a grid_id parameter', 'zume' ),
                ]
            ]) ?>;
        </script>
        <?php
    }

    public function footer_javascript() {
        if ( empty( $this->location_data ) ) {
            return;
        }
        ?>
        <script>
            jQuery(document).ready(function($) {
                // Check if localMapObject is available and has location data
                if (typeof localMapObject === 'undefined' || !localMapObject.location_data) {
                    console.log('Local map object or location data not available');
                    return;
                }

                const locationData = localMapObject.location_data;
                
                // Set up Mapbox
                mapboxgl.accessToken = localMapObject.map_key;
                
                // Initialize the map
                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v12', // Zume's custom style
                    center: [parseFloat(locationData.longitude), parseFloat(locationData.latitude)],
                    zoom: getZoomLevel(locationData.level),
                    minZoom: 2,
                    maxZoom: 16
                });

                // Disable map rotation
                map.dragRotate.disable();
                map.touchZoomRotate.disableRotation();

                // Add navigation controls
                map.addControl(new mapboxgl.NavigationControl({
                    position: 'bottom-right',
                    showCompass: false
                }));



                // Wait for map to load before adding markers and data
                map.on('load', function() {
                    // Check map container dimensions
                    checkMapContainerDimensions();
                    
                    // Load the polygon for this grid_id
                    loadGridPolygon();
                    
                    // Load and display activity data if available
                    loadActivityData();
                    
                    // Add click handler for more detailed information
                    addMapClickHandlers();
                });

                /**
                 * Determine appropriate zoom level based on location level
                 */
                function getZoomLevel(level) {
                    switch(parseInt(level)) {
                        case 0: return 6;  // Country level
                        case 1: return 8;  // State/Province level
                        case 2: return 10; // County/Region level
                        case 3: return 12; // City level
                        default: return 10;
                    }
                }

                /**
                 * Check and log map container dimensions for debugging
                 */
                function checkMapContainerDimensions() {
                    const mapContainer = document.getElementById('map');
                    const mapSection = mapContainer.parentElement;
                    
                    if (mapContainer && mapSection) {
                        const containerRect = mapContainer.getBoundingClientRect();
                        const sectionRect = mapSection.getBoundingClientRect();
                        
                    
                        
                        // Force map to resize to ensure it fills the container
                        setTimeout(() => {
                            map.resize();

                        }, 100);
                    }
                }

                /**
                 * Calculate the north, south, east, west bounds of a GeoJSON polygon
                 */
                function calculatePolygonBounds(geojsonData) {
                    let north = -90;  // Start with minimum latitude
                    let south = 90;   // Start with maximum latitude
                    let east = -180;  // Start with minimum longitude
                    let west = 180;   // Start with maximum longitude
                    
                    let hasCoordinates = false;

                    function processCoordinates(coordinates) {
                        if (!coordinates || !Array.isArray(coordinates)) {
                            return;
                        }

                        // Check if this is a coordinate pair [lng, lat]
                        if (coordinates.length === 2 && 
                            typeof coordinates[0] === 'number' && 
                            typeof coordinates[1] === 'number') {
                            
                            const lng = coordinates[0];
                            const lat = coordinates[1];
                            
                            // Update bounds
                            if (lat > north) north = lat;
                            if (lat < south) south = lat;
                            if (lng > east) east = lng;
                            if (lng < west) west = lng;
                            
                            hasCoordinates = true;
                        } else {
                            // Recursively process nested coordinate arrays
                            coordinates.forEach(coord => {
                                processCoordinates(coord);
                            });
                        }
                    }

                    // Handle different GeoJSON structures
                    if (geojsonData.type === 'FeatureCollection') {
                        geojsonData.features.forEach(feature => {
                            if (feature.geometry && feature.geometry.coordinates) {
                                processCoordinates(feature.geometry.coordinates);
                            }
                        });
                    } else if (geojsonData.type === 'Feature' && geojsonData.geometry) {
                        processCoordinates(geojsonData.geometry.coordinates);
                    } else if (geojsonData.coordinates) {
                        processCoordinates(geojsonData.coordinates);
                    }

                    // Return bounds if we found coordinates
                    if (hasCoordinates) {
                        return {
                            north: north,
                            south: south,
                            east: east,
                            west: west
                        };
                    }
                    
                    return null;
                }

                /**
                 * Add grid name label at the center of the polygon
                 */
                function addGridNameLabel(bounds) {
                    // Remove existing grid label if it exists
                    if (map.getLayer('grid-name-label')) {
                        map.removeLayer('grid-name-label');
                        map.removeSource('grid-name-label');
                    }

                    // Calculate center of the polygon
                    const centerLng = (bounds.east + bounds.west) / 2;
                    const centerLat = (bounds.north + bounds.south) / 2;
                    
                    // Get the location name from the data
                    const locationName = locationData.name || `Grid ${localMapObject.grid_id}`;

                    // Add source for grid name label
                    map.addSource('grid-name-label', {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [centerLng, centerLat]
                            },
                            'properties': {
                                'name': locationName
                            }
                        }
                    });

                    // Add grid name label layer
                    map.addLayer({
                        'id': 'grid-name-label',
                        'type': 'symbol',
                        'source': 'grid-name-label',
                        'layout': {
                            'text-field': ['get', 'name'],
                            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                            'text-size': 18,
                            'text-anchor': 'center',
                            'text-justify': 'center'
                        },
                        'paint': {
                            'text-color': '#4154f1',
                            'text-halo-color': '#ffffff',
                            'text-halo-width': 3,
                            'text-opacity': 0.9
                        }
                    });

              
                }

                /**
                 * Load and display the polygon for the current grid_id
                 */
                function loadGridPolygon() {
                    const gridId = localMapObject.grid_id;
                    if (!gridId) {
          
                        return;
                    }

                    const polygonUrl = `https://storage.googleapis.com/location-grid-mirror-v2/high/${gridId}.geojson`;
                    
                    fetch(polygonUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch polygon: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(geojsonData => {
                            // Add the polygon source
                            map.addSource('grid-polygon', {
                                'type': 'geojson',
                                'data': geojsonData
                            });

                            // Add polygon fill layer
                            map.addLayer({
                                'id': 'grid-polygon-fill',
                                'type': 'fill',
                                'source': 'grid-polygon',
                                'paint': {
                                    'fill-color': '#4154f1',
                                    'fill-opacity': 0.1
                                }
                            });

                            // Add polygon outline layer
                            map.addLayer({
                                'id': 'grid-polygon-outline',
                                'type': 'line',
                                'source': 'grid-polygon',
                                'paint': {
                                    'line-color': '#4154f1',
                                    'line-width': 2,
                                    'line-opacity': 0.8
                                }
                            });

                            // Calculate polygon bounds by finding north, south, east, west points
                            const polygonBounds = calculatePolygonBounds(geojsonData);
                            
                            if (polygonBounds) {
                               
                                
                                // Add grid name label at the center of the polygon
                                addGridNameLabel(polygonBounds);
                                
                                // Create bounding box from calculated bounds
                                const bounds = new mapboxgl.LngLatBounds(
                                    [polygonBounds.west, polygonBounds.south], // Southwest corner
                                    [polygonBounds.east, polygonBounds.north]  // Northeast corner
                                );

                               

                                // Fit the map to the polygon bounds with padding
                                map.fitBounds(bounds, {
                                    padding: {top: 50, bottom: 50, left: 50, right: 50},
                                    maxZoom: 15,
                                    duration: 2000 // 2 second animation to see the fitting
                                });
                                
                                // Verify the fit after animation completes
                                setTimeout(() => {
                                    // Re-check container dimensions after fitting
                                    checkMapContainerDimensions();
                                    
                                    const currentBounds = map.getBounds();
                                   
                                    
                                    // Check if polygon bounds are within visible area
                                    const isNorthVisible = polygonBounds.north <= currentBounds.getNorth();
                                    const isSouthVisible = polygonBounds.south >= currentBounds.getSouth();
                                    const isEastVisible = polygonBounds.east <= currentBounds.getEast();
                                    const isWestVisible = polygonBounds.west >= currentBounds.getWest();
                                    
                                   
                                    
                                    // Check if the map canvas is clipped
                                    const canvas = map.getCanvas();
                                    const canvasRect = canvas.getBoundingClientRect();
                                    const containerRect = document.getElementById('map').getBoundingClientRect();
                                    
                                   
                                }, 2100);
                            }

                            console.log('Grid polygon loaded successfully');
                        })
                        .catch(error => {
                            console.log('Could not load grid polygon:', error.message);
                            // Continue without polygon - this is not a critical error
                        });
                }



                /**
                 * Load activity data for the location and surrounding areas
                 */
                function loadActivityData() {
                    // This could be expanded to load actual activity data from the API
                    // For now, we'll add some example functionality

                    // If we have child locations or activity data, we could add those as additional layers
                    loadChildLocations();
                }

                /**
                 * Load child locations and activity points
                 */
                function loadChildLocations() {
                    // This would query for child grid locations and activity
                    // For demonstration, we'll show a simplified version
                    
                    // You could make an AJAX call here to get child locations and activity data
                    // Example:
                    /*
                    $.ajax({
                        url: localMapObject.root + 'zume_system/v1/location_activity',
                        method: 'POST',
                        data: JSON.stringify({
                            grid_id: localMapObject.grid_id,
                            action: 'get_child_activity'
                        }),
                        contentType: 'application/json',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('X-WP-Nonce', localMapObject.nonce);
                        }
                    }).done(function(data) {
                        addActivityPoints(data);
                    }).fail(function(error) {
                        console.log('Error loading activity data:', error);
                    });
                    */
                }

                /**
                 * Add activity points to the map
                 */
                function addActivityPoints(activityData) {
                    if (!activityData || !activityData.length) {
                        return;
                    }

                    // Create GeoJSON from activity data
                    const geojson = {
                        'type': 'FeatureCollection',
                        'features': activityData.map(function(item) {
                            return {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [parseFloat(item.lng), parseFloat(item.lat)]
                                },
                                'properties': {
                                    'type': item.type,
                                    'subtype': item.subtype,
                                    'label': item.label,
                                    'timestamp': item.timestamp
                                }
                            };
                        })
                    };

                    // Add source
                    map.addSource('activity-points', {
                        'type': 'geojson',
                        'data': geojson
                    });

                    // Add layer for trainee activity
                    map.addLayer({
                        'id': 'trainee-points',
                        'type': 'circle',
                        'source': 'activity-points',
                        'filter': ['==', ['get', 'type'], 'trainee'],
                        'paint': {
                            'circle-radius': 8,
                            'circle-color': '#28a745',
                            'circle-opacity': 0.8,
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#ffffff'
                        }
                    });

                    // Add layer for church activity
                    map.addLayer({
                        'id': 'church-points',
                        'type': 'circle',
                        'source': 'activity-points',
                        'filter': ['==', ['get', 'type'], 'church'],
                        'paint': {
                            'circle-radius': 10,
                            'circle-color': '#dc3545',
                            'circle-opacity': 0.8,
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#ffffff'
                        }
                    });

                    // Add popups for activity points
                    map.on('click', 'trainee-points', function(e) {
                        const coordinates = e.features[0].geometry.coordinates.slice();
                        const properties = e.features[0].properties;

                        new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(`
                                <div class="activity-popup">
                                    <h4>Trainee Activity</h4>
                                    <p><strong>Type:</strong> ${properties.subtype}</p>
                                    <p><strong>Date:</strong> ${new Date(properties.timestamp).toLocaleDateString()}</p>
                                </div>
                            `)
                            .addTo(map);
                    });

                    map.on('click', 'church-points', function(e) {
                        const coordinates = e.features[0].geometry.coordinates.slice();
                        const properties = e.features[0].properties;

                        new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(`
                                <div class="activity-popup">
                                    <h4>Church Activity</h4>
                                    <p><strong>Type:</strong> ${properties.subtype}</p>
                                    <p><strong>Date:</strong> ${new Date(properties.timestamp).toLocaleDateString()}</p>
                                </div>
                            `)
                            .addTo(map);
                    });

                    // Change cursor on hover
                    map.on('mouseenter', 'trainee-points', function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    map.on('mouseleave', 'trainee-points', function() {
                        map.getCanvas().style.cursor = '';
                    });
                    map.on('mouseenter', 'church-points', function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    map.on('mouseleave', 'church-points', function() {
                        map.getCanvas().style.cursor = '';
                    });
                }

                /**
                 * Add click handlers for additional map interactions
                 */
                function addMapClickHandlers() {
                    // Add click handler for general map clicks
                    map.on('click', function(e) {
                        // This could be used to show location information or add new points
                        console.log('Map clicked at:', e.lngLat);
                    });

                    // Add resize handler
                    window.addEventListener('resize', function() {
                        map.resize();
                    });
                }

                /**
                 * Update statistics based on current map view
                 */
                function updateStatistics() {
                    // This function could be called when the map view changes
                    // to update the statistics based on what's currently visible
                    const bounds = map.getBounds();
                    
                    // Example: Query for data within current bounds and update the stats cards
                    // This would involve making API calls to get current data
                }

                // Add map move handlers if needed for dynamic updates
                map.on('moveend', function() {
                    // Could call updateStatistics() here if implementing dynamic updates
                });
            });
        </script>
        <?php
    }

    public function body() {
        global $zume_languages_by_code;
        ?>
        
        <div class="local-map-container">
            <?php if ( empty( $this->grid_id ) ) : ?>
                <div class="container-md stack-2 center py-2">
                    <div class="card stack-1 p-2">
                        <h1 class="text-center"><?php echo esc_html__( 'Local Map', 'zume' ) ?></h1>
                        <p class="text-center"><?php echo esc_html__( 'Please provide a grid_id parameter to view location data.', 'zume' ) ?></p>
                        <p class="text-center">
                            <strong><?php echo esc_html__( 'Example:', 'zume' ) ?></strong> 
                            <?php echo esc_url( site_url() . '/map/local?grid_id=100364199' ) ?>
                        </p>
                    </div>
                </div>
            <?php elseif ( empty( $this->location_data ) ) : ?>
                <div class="container-md stack-2 center py-2">
                    <div class="card stack-1 p-2">
                        <h1 class="text-center"><?php echo esc_html__( 'Location Not Found', 'zume' ) ?></h1>
                        <p class="text-center"><?php echo esc_html__( 'No data found for grid_id:', 'zume' ) ?> <?php echo esc_html( $this->grid_id ) ?></p>
                    </div>
                </div>
            <?php else : ?>
                <div class="local-map-header">
                    <div class="container-md py-1">
                        <h1><?php echo esc_html( $this->location_data['full_name'] ?? $this->location_data['name'] ?? 'Location' ) ?></h1>
                        <p class="location-meta">
                            <?php echo esc_html__( 'Grid ID:', 'zume' ) ?> <?php echo esc_html( $this->grid_id ) ?> | 
                            <?php echo esc_html__( 'Population:', 'zume' ) ?> <?php echo number_format( $this->location_data['population'] ?? 0 ) ?> |
                            <?php echo esc_html__( 'Country:', 'zume' ) ?> <?php echo esc_html( $this->location_data['country_code'] ?? 'Unknown' ) ?>
                        </p>
                    </div>
                </div>

                <div class="local-map-content">
                    <!-- Map Section -->
                    <div class="map-section">
                        <div id="map" class="local-map"></div>
                    </div>

                    <!-- Infographic Section -->
                    <div class="infographic-section">
                        <div class="container-md">
                            <!-- Vision Card - Full Width -->
                            <div class="vision-section mb-4">
                                <div class="card vision-card">
                                    <div class="card-header">
                                        <h3><?php echo esc_html__( 'Zúme Vision', 'zume' ) ?></h3>
                                        <div class="icon-wrapper">
                                            <span class="icon z-icon-target"></span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="vision-content">
                                            <div class="vision-description">
                                                <p><?php echo esc_html__( 'The Zúme vision is to saturate the world with multiplying disciples in our generation.', 'zume' ) ?></p>
                                            </div>
                                            <div class="vision-goals">
                                                <div class="vision-goal">
                                                    <strong><?php echo esc_html__( 'Trainees Goal:', 'zume' ) ?></strong><br>
                                                    <?php if ( $this->location_data['country_code'] === 'US' ) : ?>
                                                        1 <?php echo esc_html__( 'per 5,000 people', 'zume' ) ?>
                                                    <?php else : ?>
                                                        1 <?php echo esc_html__( 'per 50,000 people', 'zume' ) ?>
                                                    <?php endif; ?>
                                                </div>
                                                <div class="vision-goal">
                                                    <strong><?php echo esc_html__( 'Churches Goal:', 'zume' ) ?></strong><br>
                                                    <?php if ( $this->location_data['country_code'] === 'US' ) : ?>
                                                        2 <?php echo esc_html__( 'per 5,000 people', 'zume' ) ?>
                                                    <?php else : ?>
                                                        2 <?php echo esc_html__( 'per 50,000 people', 'zume' ) ?>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Stats Cards Grid -->
                            <div class="grid-x grid-margin-x">
                                <!-- Trainees Card -->
                                <div class="cell medium-6">
                                    <div class="card stats-card trainees-card">
                                        <div class="card-header">
                                            <h3><?php echo esc_html__( 'Trainees', 'zume' ) ?></h3>
                                            <div class="icon-wrapper">
                                                <span class="icon z-icon-users"></span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="stat-row">
                                                <span class="stat-label"><?php echo esc_html__( 'Needed:', 'zume' ) ?></span>
                                                <span class="stat-value" id="trainees-needed">
                                                    <?php echo number_format( $this->calculate_trainees_needed() ) ?>
                                                </span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="stat-label"><?php echo esc_html__( 'Reported:', 'zume' ) ?></span>
                                                <span class="stat-value" id="trainees-reported">
                                                    <?php echo number_format( $this->get_trainees_count() ) ?>
                                                </span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: <?php echo $this->calculate_progress_percentage( 'trainees' ) ?>%"></div>
                                            </div>
                                            <div class="progress-text">
                                                <?php echo $this->calculate_progress_percentage( 'trainees' ) ?>% <?php echo esc_html__( 'Progress', 'zume' ) ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Churches Card -->
                                <div class="cell medium-6">
                                    <div class="card stats-card churches-card">
                                        <div class="card-header">
                                            <h3><?php echo esc_html__( 'Simple Churches', 'zume' ) ?></h3>
                                            <div class="icon-wrapper">
                                                <span class="icon z-icon-church"></span>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="stat-row">
                                                <span class="stat-label"><?php echo esc_html__( 'Needed:', 'zume' ) ?></span>
                                                <span class="stat-value" id="churches-needed">
                                                    <?php echo number_format( $this->calculate_churches_needed() ) ?>
                                                </span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="stat-label"><?php echo esc_html__( 'Reported:', 'zume' ) ?></span>
                                                <span class="stat-value" id="churches-reported">
                                                    <?php echo number_format( $this->get_churches_count() ) ?>
                                                </span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: <?php echo $this->calculate_progress_percentage( 'churches' ) ?>%"></div>
                                            </div>
                                            <div class="progress-text">
                                                <?php echo $this->calculate_progress_percentage( 'churches' ) ?>% <?php echo esc_html__( 'Progress', 'zume' ) ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Recent Activity Section -->
                            <div class="recent-activity-section">
                                <div class="card activity-card">
                                    <div class="card-header">
                                        <h3><?php echo esc_html__( 'Recent Growth', 'zume' ) ?></h3>
                                        <div class="icon-wrapper">
                                            <span class="icon z-icon-trending-up"></span>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="activity-content">
                                            <div class="activity-stat">
                                                <div class="activity-number">
                                                    <?php echo number_format( $this->get_new_trainees_last_year() ) ?>
                                                </div>
                                                <div class="activity-label">
                                                    <?php echo esc_html__( 'New Trainees in Last Year', 'zume' ) ?>
                                                </div>
                                                <div class="activity-period">
                                                    <?php echo esc_html__( '(Last 365 days)', 'zume' ) ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <style>
            .local-map-container {
                min-height: 100vh;
            }
            
            .local-map-header {
                background: white;
                color: #4154f1;
                padding: 2rem 0;
                border-bottom: 1px solid #dee2e6;
            }
            
            .local-map-header h1 {
                margin: 0;
                font-size: 2.5rem;
                font-weight: 600;
                color: #4154f1;
            }
            
            .location-meta {
                margin: 0.5rem 0 0 0;
                opacity: 0.8;
                font-size: 1.1rem;
                color: #6c757d;
            }
            
            .map-section {
                height: 600px;
                position: relative;
                max-width: 1600px;
                margin: 0 auto 2rem auto;
                border: 2px solid #dee2e6;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                z-index: 1;
            }
            
            .local-map {
                width: 100%;
                height: 100%;
                max-height: 600px;
            }
            
            .infographic-section {
                padding: 3rem 0;
                background: #f8f9fa;
                position: relative;
                z-index: 2;
                clear: both;
                margin-top: 2rem;
            }
            
            .stats-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border: none;
                overflow: hidden;
                transition: transform 0.3s ease;
            }
            
            .stats-card:hover {
                transform: translateY(-5px);
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                background: linear-gradient(135deg, #4154f1 0%, #2c3cdd 100%);
                color: white;
            }
            
            .trainees-card .card-header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            }
            
            .churches-card .card-header {
                background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
            }
            
            .card-header h3 {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 600;
            }
            
            .icon-wrapper {
                font-size: 2rem;
                opacity: 0.8;
            }
            
            .card-body {
                padding: 1.5rem;
            }
            
            .stat-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .stat-label {
                font-weight: 500;
                color: #6c757d;
            }
            
            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #495057;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e9ecef;
                border-radius: 4px;
                overflow: hidden;
                margin: 1rem 0 0.5rem 0;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
                transition: width 0.3s ease;
            }
            
            .churches-card .progress-fill {
                background: linear-gradient(90deg, #dc3545 0%, #fd7e14 100%);
            }
            
            .progress-text {
                text-align: center;
                font-size: 0.9rem;
                color: #6c757d;
                font-weight: 500;
            }
            
            .vision-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border: none;
                overflow: hidden;
                margin-bottom: 2rem;
            }
            
            .vision-section {
                margin-bottom: 3rem;
            }
            
            .vision-content {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 2rem;
            }
            
            .vision-description {
                flex: 1;
                min-width: 300px;
            }
            
            .vision-description p {
                margin: 0;
                color: #495057;
                line-height: 1.6;
                font-size: 1.1rem;
                font-weight: 500;
            }
            
            .vision-goals {
                display: flex;
                gap: 1.5rem;
                flex-wrap: wrap;
            }
            
            .vision-goal {
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #4154f1;
                padding: 1rem 1.5rem;
                min-width: 200px;
                text-align: center;
            }
            
            .vision-goal strong {
                color: #4154f1;
                display: block;
                margin-bottom: 0.5rem;
                font-size: 1rem;
            }
            
            /* Recent Activity Card Styles */
            .recent-activity-section {
                margin-top: 3rem;
            }
            
            .activity-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border: none;
                overflow: hidden;
                transition: transform 0.3s ease;
            }
            
            .activity-card:hover {
                transform: translateY(-2px);
            }
            
            .activity-card .card-header {
                background: linear-gradient(135deg, #6f42c1 0%, #563d7c 100%);
                color: white;
            }
            
            .activity-content {
                text-align: center;
                padding: 1rem 0;
            }
            
            .activity-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .activity-number {
                font-size: 3rem;
                font-weight: 700;
                color: #6f42c1;
                line-height: 1;
            }
            
            .activity-label {
                font-size: 1.1rem;
                font-weight: 600;
                color: #495057;
            }
            
            .activity-period {
                font-size: 0.9rem;
                color: #6c757d;
                opacity: 0.8;
            }
            
            @media (max-width: 768px) {
                .local-map-header h1 {
                    font-size: 2rem;
                }
                
                .location-meta {
                    font-size: 1rem;
                }
                
                .map-section {
                    height: 500px;
                    max-width: none;
                    margin: 0 0 1rem 0;
                    border: none;
                    border-radius: 0;
                    box-shadow: none;
                    overflow: hidden;
                }
                
                .local-map {
                    max-height: 500px;
                }
                
                .infographic-section {
                    padding: 2rem 0;
                    margin-top: 1rem;
                }
                
                .vision-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .vision-goals {
                    justify-content: center;
                }
                
                .vision-goal {
                    min-width: 180px;
                }
                
                .recent-activity-section {
                    margin-top: 2rem;
                }
                
                .activity-number {
                    font-size: 2.5rem;
                }
                
                .activity-label {
                    font-size: 1rem;
                }
            }
        </style>

        <?php
    }

    private function get_location_data( $grid_id ) {
        global $wpdb;
        
        $grid_id = intval( $grid_id );
        if ( empty( $grid_id ) ) {
            return null;
        }

        $result = $wpdb->get_row( $wpdb->prepare(
            "SELECT 
                lg.grid_id, 
                lg.name, 
                lg.population, 
                lg.country_code, 
                lg.longitude, 
                lg.latitude, 
                lg.level,
                admin0.name as admin0_name,
                admin1.name as admin1_name,
                admin2.name as admin2_name
             FROM zume_dt_location_grid lg 
             LEFT JOIN zume_dt_location_grid admin0 ON lg.admin0_grid_id = admin0.grid_id
             LEFT JOIN zume_dt_location_grid admin1 ON lg.admin1_grid_id = admin1.grid_id
             LEFT JOIN zume_dt_location_grid admin2 ON lg.admin2_grid_id = admin2.grid_id
             WHERE lg.grid_id = %d",
            $grid_id
        ), ARRAY_A );

        if ( $result ) {
            // Build full hierarchical name
            $result['full_name'] = $this->build_hierarchical_name( $result );
        }

        return $result;
    }

    private function build_hierarchical_name( $location_data ) {
        $name_parts = [];
        
        // Add the primary location name
        if ( !empty( $location_data['name'] ) ) {
            $name_parts[] = $location_data['name'];
        }
        
        // Add admin1 name (state/province level)
        if ( !empty( $location_data['admin1_name'] ) && 
             $location_data['admin1_name'] !== $location_data['name'] ) {
            $name_parts[] = $location_data['admin1_name'];
        }
        
        // Add admin0 name (country level) 
        if ( !empty( $location_data['admin0_name'] ) && 
             $location_data['admin0_name'] !== $location_data['name'] &&
             $location_data['admin0_name'] !== $location_data['admin1_name'] ) {
            $name_parts[] = $location_data['admin0_name'];
        }
        
        // If we don't have admin0_name but have country_code, use that
        if ( empty( $location_data['admin0_name'] ) && !empty( $location_data['country_code'] ) ) {
            $name_parts[] = $location_data['country_code'];
        }
        
        return implode( ', ', $name_parts );
    }

    private function calculate_trainees_needed() {
        if ( empty( $this->location_data ) ) {
            return 0;
        }

        $population = intval( $this->location_data['population'] ?? 0 );
        $divisor = ( $this->location_data['country_code'] === 'US' ) ? 5000 : 50000;
        
        return max( 1, round( $population / $divisor ) );
    }

    private function calculate_churches_needed() {
        if ( empty( $this->location_data ) ) {
            return 0;
        }

        $population = intval( $this->location_data['population'] ?? 0 );
        $divisor = ( $this->location_data['country_code'] === 'US' ) ? 5000 : 50000;
        
        return max( 2, round( ( $population / $divisor ) * 2 ) );
    }

    private function get_trainees_count() {
        global $wpdb;
        
        if ( empty( $this->grid_id ) ) {
            return 0;
        }

        // Get children grid IDs for this location
        $children_ids = $this->get_child_grid_ids( $this->grid_id );
        $all_ids = array_merge( [ $this->grid_id ], $children_ids );
        $prepared_list = dt_array_to_sql( $all_ids );

        $count = $wpdb->get_var( "
            SELECT COUNT(DISTINCT r.user_id)
            FROM zume_dt_reports r
            LEFT JOIN zume_dt_location_grid lg ON lg.grid_id = r.grid_id
            WHERE r.grid_id IN ($prepared_list)
            AND r.type = 'system' 
            AND r.subtype = 'current_level'
            AND r.value > 0
        " );

        return intval( $count );
    }

    private function get_churches_count() {
        global $wpdb;
        
        if ( empty( $this->grid_id ) ) {
            return 0;
        }

        // Get children grid IDs for this location
        $children_ids = $this->get_child_grid_ids( $this->grid_id );
        $all_ids = array_merge( [ $this->grid_id ], $children_ids );
        $prepared_list = dt_array_to_sql( $all_ids );

        $count = $wpdb->get_var( "
            SELECT COUNT(DISTINCT r.post_id)
            FROM zume_dt_reports r
            WHERE r.grid_id IN ($prepared_list)
            AND r.type = 'church_report'
        " );

        return intval( $count );
    }

    private function get_new_trainees_last_year() {
        global $wpdb;
        
        if ( empty( $this->grid_id ) ) {
            return 0;
        }

        // Get children grid IDs for this location
        $children_ids = $this->get_child_grid_ids( $this->grid_id );
        $all_ids = array_merge( [ $this->grid_id ], $children_ids );
        $prepared_list = dt_array_to_sql( $all_ids );

        // Calculate timestamp for 365 days ago
        $one_year_ago = time() - (365 * 24 * 60 * 60);

        $count = $wpdb->get_var( $wpdb->prepare("
            SELECT COUNT(DISTINCT r.user_id)
            FROM zume_dt_reports r
            LEFT JOIN zume_dt_location_grid lg ON lg.grid_id = r.grid_id
            WHERE r.grid_id IN ($prepared_list)
            AND r.type = 'system' 
            AND r.subtype = 'current_level'
            AND r.value > 0
            AND r.timestamp >= %d
        ", $one_year_ago) );

        return intval( $count );
    }

    private function get_child_grid_ids( $grid_id ) {
        global $wpdb;
        
        $children = $wpdb->get_results( $wpdb->prepare(
            "SELECT grid_id FROM zume_dt_location_grid 
             WHERE parent_id = %d OR admin0_grid_id = %d OR admin1_grid_id = %d OR admin2_grid_id = %d OR admin3_grid_id = %d",
            $grid_id, $grid_id, $grid_id, $grid_id, $grid_id
        ), ARRAY_A );

        return array_column( $children, 'grid_id' );
    }

    private function calculate_progress_percentage( $type ) {
        if ( $type === 'trainees' ) {
            $needed = $this->calculate_trainees_needed();
            $reported = $this->get_trainees_count();
        } else {
            $needed = $this->calculate_churches_needed();
            $reported = $this->get_churches_count();
        }

        if ( $needed === 0 ) {
            return 0;
        }

        return min( 100, round( ( $reported / $needed ) * 100 ) );
    }
}

// Initialize the page
Zume_Local_Map::instance();
