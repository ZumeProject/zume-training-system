<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Local_Map_Old extends Zume_Magic_Page
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

        $this->page_title = esc_html__( 'Local Map', 'zume' );
        $this->page_description = esc_html__( 'Local map showing Zúme training progress and church planting activity for a specific location.', 'zume' );

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code ?? $this->lang;

        if ( isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;
            $this->grid_id = sanitize_text_field( wp_unslash( $_GET['grid_id'] ?? '' ) );

            // Query location data if grid_id is provided
            if ( !empty( $this->grid_id ) ) {
                $this->location_data = $this->get_location_data( $this->grid_id );
            }

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] ); // Removed standard Zume footer
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
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Arial', sans-serif;
                background-color: #f5f5f5;
                color: #333;
            }

            .container {
                max-width: 900px;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 40px 20px;
                background-color: transparent;
            }

            .title-section h1 {
                font-size: 48px;
                font-weight: 300;
                margin-bottom: 10px;
                text-align: left;
                color: black;
            }

            .title-section h1 .zume {
                color: #00bcd4;
                font-weight: 600;
            }

            .title-section h2 {
                font-size: 36px;
                font-weight: 600;
                color: black;
            }

            .population {
                text-align: right;
            }

            .population h3 {
                font-size: 24px;
                color: #00bcd4;
                font-weight: 300;
                margin-bottom: 5px;
            }

            .population .number {
                font-size: 64px;
                font-weight: 700;
                color: black;
            }

            .map-container {
                margin: 20px 40px;
                background-color: #e0e0e0;
                border: 3px solid #00bcd4;
                border-radius: 15px;
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .map-placeholder {
                font-size: 120px;
                font-weight: 300;
                color: #00bcd4;
                opacity: 0.7;
            }

            /* Map styles when active */
            #map {
                width: 100%;
                height: 100%;
                border-radius: 12px;
            }

            .goals-section {
                padding: 40px;
            }

            .goals-title {
                text-align: center;
                font-size: 48px;
                font-weight: 600;
                color: #333;
                margin-bottom: 40px;
            }

            .goals-container {
                display: flex;
                flex-direction: column;
                gap: 60px;
            }

            .goal-item {
                flex: 1;
                display: flex;
                align-items: flex-start;
                gap: 30px;
            }

            .goal-left {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .goal-icon {
                width: 104px;
                height: 104px;
                margin-top: 15px;
            }

            .goal-icon img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .goal-title {
                font-size: 32px;
                color: #00bcd4;
                font-weight: 700;
                margin-bottom: 0;
            }

            .goal-subtitle {
                font-size: 18px;
                color: #333;
                font-weight: 600;
            }

            .goal-middle {
                flex: 2;
                display: flex;
                flex-direction: column;
            }

            .goal-middle .goal-subtitle {
                margin-bottom: 20px;
                text-align: center;
            }

            .section-divider {
                height: 2px;
                background-color: #00bcd4;
                margin: 30px 40px;
            }

            .goal-right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .stats-section {
                width: 100%;
            }

            .stat-labels {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
            }

            .stat-label {
                font-size: 14px;
                color: #666;
                font-weight: 500;
            }

            .stat-numbers {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }

            .stat-number {
                font-size: 47px;
                font-weight: 700;
                color: #333;
            }

            .progress-visual {
                display: flex;
                gap: 5px;
                margin-bottom: 20px;
            }

            .progress-dot {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #e0e0e0;
            }

            .progress-dot.filled {
                background-color: #00bcd4;
            }

            .progress-circle {
                width: 120px;
                height: 120px;
                position: relative;
            }

            .circle-bg {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #e0e0e0;
            }

            .circle-progress {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: conic-gradient(#00bcd4 0deg, #e0e0e0 0deg);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .circle-text {
                font-size: 28px;
                font-weight: 700;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }

            .footer {
                background-color: #00bcd4;
                color: white;
                padding: 30px 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .footer-text {
                font-size: 36px;
                font-weight: 600;
            }

            .qr-code {
                width: 80px;
                height: 80px;
                background-color: white;
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #333;
            }

            .qr-code img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .footer-link {
                text-align: right;
            }

            .footer-link .check-out {
                font-size: 24px;
                font-weight: 300;
                margin-bottom: 5px;
            }

            .footer-link .url {
                font-size: 24px;
                font-weight: 600;
            }

            /* SVG Icons */
            .icon-churches {
                fill: #00bcd4;
            }

            .icon-trainees {
                fill: #00bcd4;
            }

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

            /* Hide or minimize Mapbox attribution */
            .mapboxgl-ctrl-attrib {
                font-size: 5px !important;
                opacity: 0.3 !important;
                background: transparent !important;
            }

            .mapboxgl-ctrl-attrib-inner {
                font-size: 5px !important;
            }

            .mapboxgl-ctrl-logo {
                width: 10px !important;
                height: 5px !important;
                opacity: 0.3 !important;
            }

            /* Alternative: completely hide attribution if preferred */
            /*
            .mapboxgl-ctrl-attrib,
            .mapboxgl-ctrl-logo {
                display: none !important;
            }
            */

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .header {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }

                .title-section h1 {
                    font-size: 36px;
                }

                .title-section h2 {
                    font-size: 28px;
                }

                .population .number {
                    font-size: 48px;
                }

                .goals-title {
                    font-size: 36px;
                }

                .goal-item {
                    flex-direction: column;
                    gap: 20px;
                }

                .goal-title {
                    font-size: 28px;
                }

                .stat-number {
                    font-size: 36px;
                }

                .footer {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }

                .footer-text {
                    font-size: 28px;
                }

                .footer-link .check-out,
                .footer-link .url {
                    font-size: 20px;
                }
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
                'trainees_percentage' => $this->calculate_progress_percentage( 'trainees' ),
                'churches_percentage' => $this->calculate_progress_percentage( 'churches' ),
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
                ],
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
                // Initialize progress visuals first
                initializeProgressVisuals();

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
                    style: 'mapbox://styles/mapbox/streets-v12',
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
                 * Initialize the progress visuals with dynamic data
                 */
                function initializeProgressVisuals() {
                    // Initialize trainees progress dots
                    initializeProgressDots('trainees-progress-dots', localMapObject.trainees_percentage);

                    // Initialize churches progress dots
                    initializeProgressDots('churches-progress-dots', localMapObject.churches_percentage);

                    // Animate the circular progress indicators
                    animateProgress('trainees-progress', localMapObject.trainees_percentage);
                    animateProgress('churches-progress', localMapObject.churches_percentage);
                }

                /**
                 * Generate progress dots based on percentage
                 */
                function initializeProgressDots(elementId, percentage) {
                    const container = document.getElementById(elementId);
                    if (!container) return;

                    // Clear existing dots
                    container.innerHTML = '';

                    // Create 12 dots (matching the HTML template)
                    const totalDots = 12;
                    const filledDots = Math.round((percentage / 100) * totalDots);

                    for (let i = 0; i < totalDots; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'progress-dot';
                        if (i < filledDots) {
                            dot.classList.add('filled');
                        }
                        container.appendChild(dot);
                    }
                }

                /**
                 * Animate the circular progress indicators
                 */
                function animateProgress(elementId, percentage) {
                    const element = document.getElementById(elementId);
                    if (!element) return;

                    const progressCircle = element.querySelector('.circle-progress');
                    if (!progressCircle) return;

                    const degrees = (percentage / 100) * 360;

                    setTimeout(() => {
                        progressCircle.style.background = `conic-gradient(#00bcd4 ${degrees}deg, #e0e0e0 ${degrees}deg)`;
                    }, 500);
                }

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
                            'text-color': '#00bcd4',
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
                                    'fill-color': '#00bcd4',
                                    'fill-opacity': 0.1
                                }
                            });

                            // Add polygon outline layer
                            map.addLayer({
                                'id': 'grid-polygon-outline',
                                'type': 'line',
                                'source': 'grid-polygon',
                                'paint': {
                                    'line-color': '#00bcd4',
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
                                    duration: 2000
                                });

                                // Verify the fit after animation completes
                                setTimeout(() => {
                                    checkMapContainerDimensions();
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
                    loadChildLocations();
                }

                /**
                 * Load child locations and activity points
                 */
                function loadChildLocations() {
                    // Placeholder for future activity data loading
                }

                /**
                 * Add click handlers for additional map interactions
                 */
                function addMapClickHandlers() {
                    // Add click handler for general map clicks
                    map.on('click', function(e) {
                        console.log('Map clicked at:', e.lngLat);
                    });

                    // Add resize handler
                    window.addEventListener('resize', function() {
                        map.resize();
                    });
                }
            });
        </script>
        <?php
    }

    public function body() {
        global $zume_languages_by_code;
        ?>

        <?php if ( empty( $this->grid_id ) ) : ?>
            <div class="container-md stack-2 center py-2">
                <div class="card stack-1 p-2">
                    <h1 class="text-center"><?php echo esc_html__( 'Global Map', 'zume' ) ?></h1>
                    <p class="text-center"><?php echo esc_html__( 'Getting Started', 'zume' ) ?></p>
                    <p class="text-center">
                        <strong><?php echo esc_html__( 'Location', 'zume' ) ?></strong>
                        <?php echo esc_url( site_url() . '/map/local?grid_id=100364199' ) ?>
                    </p>
                </div>
            </div>
        <?php elseif ( empty( $this->location_data ) ) : ?>
            <div class="container-md stack-2 center py-2">
                <div class="card stack-1 p-2">
                    <h1 class="text-center"><?php echo esc_html__( 'No Locations found', 'zume' ) ?></h1>
                    <p class="text-center"><?php echo esc_html__( 'No locations found', 'zume' ) ?> <?php echo esc_html( $this->grid_id ) ?></p>
                </div>
            </div>
        <?php else : ?>
            <div class="container">
                <div class="header">
                    <div class="title-section">
                        <h1><span class="zume">ZÚME</span> <span style="text-transform: uppercase;"><?php echo esc_html__( 'Vision', 'zume' ) ?></span></h1>
                        <h2><?php echo esc_html( $this->location_data['full_name'] ?? $this->location_data['name'] ?? esc_html__( 'Location', 'zume' ) ) ?></h2>
                    </div>
                    <div class="population">
                        <h3><?php echo esc_html__( 'Population', 'zume' ) ?></h3>
                        <div class="number"><?php echo esc_html( $this->format_population( $this->location_data['population'] ?? 0 ) ) ?></div>
                    </div>
                </div>

                <div class="map-container">
                    <div id="map" class="map-placeholder"><?php echo esc_html__( 'Global Map', 'zume' ) ?></div>
                </div>

                <div class="goals-section">
                    <h2 class="goals-title"><?php echo esc_html__( 'Goal', 'zume' ) ?></h2>

                    <div class="goals-container">
                        <!-- Trainees Section -->
                        <div class="goal-item">
                            <div class="goal-left">
                                <div class="goal-title"><?php echo esc_html__( 'Trainees', 'zume' ) ?></div>
                                <div class="goal-icon">
                                    <img src="<?php echo esc_url( plugins_url( 'site/assets/images/countriesandterritories-groups.svg?raw=true', __DIR__ ) ); ?>" alt="<?php echo esc_attr__( 'Trainees', 'zume' ) ?>" />
                                </div>
                            </div>

                            <div class="goal-middle">
                                <div class="goal-subtitle">
                                    <?php if ( $this->location_data['country_code'] === 'US' ) : ?>
                                        <?php echo esc_html__( '1 trained multiplying disciple per 5,000 in the United States', 'zume' ) ?>
                                    <?php else : ?>
                                        <?php echo esc_html__( '1 trained multiplying disciple per 50,000 globally', 'zume' ) ?>
                                    <?php endif; ?>
                                </div>
                                <div class="stats-section">
                                    <div class="progress-visual" id="trainees-progress-dots">
                                        <!-- Progress dots will be generated dynamically -->
                                    </div>
                                    <div class="stat-labels">
                                        <span class="stat-label"><?php echo esc_html__( 'Trainees Reported', 'zume' ) ?></span>
                                        <span class="stat-label"><?php echo esc_html__( 'Trainees Needed', 'zume' ) ?></span>
                                    </div>
                                    <div class="stat-numbers">
                                        <span class="stat-number"><?php echo number_format( $this->get_trainees_count() ) ?></span>
                                        <span class="stat-number"><?php echo number_format( $this->calculate_trainees_needed() ) ?></span>
                                    </div>
                                </div>
                            </div>

                            <div class="goal-right">
                                <div class="progress-circle" id="trainees-progress">
                                    <div class="circle-bg"></div>
                                    <div class="circle-progress">
                                        <div class="circle-text"><?php echo esc_html( $this->calculate_progress_percentage( 'trainees' ) ) ?>%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="section-divider"></div>

                        <!-- Churches Section -->
                        <div class="goal-item">
                            <div class="goal-left">
                                <div class="goal-title"><?php echo esc_html__( 'Churches', 'zume' ) ?></div>
                                <div class="goal-icon">
                                    <img src="<?php echo esc_url( plugins_url( 'site/assets/images/GroupsFormed.svg?raw=true', __DIR__ ) ); ?>" alt="<?php echo esc_attr__( 'Churches', 'zume' ) ?>" />
                                </div>
                            </div>

                            <div class="goal-middle">
                                <div class="goal-subtitle">
                                    <?php if ( $this->location_data['country_code'] === 'US' ) : ?>
                                        <?php echo esc_html__( '2 simple churches per 5,000 people in the United States', 'zume' ) ?>
                                    <?php else : ?>
                                        <?php echo esc_html__( '2 simple churches per 50,000 people globally', 'zume' ) ?>
                                    <?php endif; ?>
                                </div>
                                <div class="stats-section">
                                    <div class="progress-visual" id="churches-progress-dots">
                                        <!-- Progress dots will be generated dynamically -->
                                    </div>
                                    <div class="stat-labels">
                                        <span class="stat-label"><?php echo esc_html__( 'Churches Reported', 'zume' ) ?></span>
                                        <span class="stat-label"><?php echo esc_html__( 'Churches Needed', 'zume' ) ?></span>
                                    </div>
                                    <div class="stat-numbers">
                                        <span class="stat-number"><?php echo number_format( $this->get_churches_count() ) ?></span>
                                        <span class="stat-number"><?php echo number_format( $this->calculate_churches_needed() ) ?></span>
                                    </div>
                                </div>
                            </div>

                            <div class="goal-right">
                                <div class="progress-circle" id="churches-progress">
                                    <div class="circle-bg"></div>
                                    <div class="circle-progress">
                                        <div class="circle-text"><?php echo esc_html( $this->calculate_progress_percentage( 'churches' ) ) ?>%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <div class="footer-text"><?php echo esc_html__( 'Getting Started', 'zume' ) ?></div>
                    <div class="qr-code">
                        <img src="<?php echo esc_url( plugins_url( 'site/assets/images/zt-qr-code.png', __DIR__ ) ); ?>" alt="<?php echo esc_attr__( 'Training', 'zume' ) ?>" />
                    </div>
                    <div class="footer-link">
                        <div class="check-out"><?php echo esc_html__( 'Vision', 'zume' ) ?>:</div>
                        <div class="url">https://zume.training</div>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <?php
    }

    private function get_location_data( $grid_id ) {
        global $wpdb;

        $grid_id = intval( $grid_id );
        if ( empty( $grid_id ) ) {
            return null;
        }

        $result = $wpdb->get_row( $wpdb->prepare(
            'SELECT
                lg.grid_id,
                lg.name,
                lg.population,
                lg.country_code,
                lg.longitude,
                lg.latitude,
                lg.level,
                admin0.name as admin0_name,
                admin1.name as admin1_name,
                admin2.name as admin2_name,
                lgn.name as localized_name,
                admin0_gn.name as admin0_localized_name,
                admin1_gn.name as admin1_localized_name,
                admin2_gn.name as admin2_localized_name
             FROM zume_dt_location_grid lg
             LEFT JOIN zume_dt_location_grid admin0 ON lg.admin0_grid_id = admin0.grid_id
             LEFT JOIN zume_dt_location_grid admin1 ON lg.admin1_grid_id = admin1.grid_id
             LEFT JOIN zume_dt_location_grid admin2 ON lg.admin2_grid_id = admin2.grid_id
             LEFT JOIN zume_location_grid_names lgn ON lg.grid_id = lgn.grid_id AND lgn.language_code = %s
             LEFT JOIN zume_location_grid_names admin0_gn ON admin0.grid_id = admin0_gn.grid_id AND admin0_gn.language_code = %s
             LEFT JOIN zume_location_grid_names admin1_gn ON admin1.grid_id = admin1_gn.grid_id AND admin1_gn.language_code = %s
             LEFT JOIN zume_location_grid_names admin2_gn ON admin2.grid_id = admin2_gn.grid_id AND admin2_gn.language_code = %s
             WHERE lg.grid_id = %d',
            $this->lang_code,
            $this->lang_code,
            $this->lang_code,
            $this->lang_code,
            $grid_id
        ), ARRAY_A );

        if ( $result ) {
            // Use localized names if available, fall back to default names
            $result['name'] = $result['localized_name'] ?? $result['name'];
            $result['admin0_name'] = $result['admin0_localized_name'] ?? $result['admin0_name'];
            $result['admin1_name'] = $result['admin1_localized_name'] ?? $result['admin1_name'];
            $result['admin2_name'] = $result['admin2_localized_name'] ?? $result['admin2_name'];

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
        $one_year_ago = time() - ( 365 * 24 * 60 * 60 );

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
            'SELECT grid_id FROM zume_dt_location_grid
             WHERE parent_id = %d OR admin0_grid_id = %d OR admin1_grid_id = %d OR admin2_grid_id = %d OR admin3_grid_id = %d',
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

    private function format_population( $population ) {
        if ( $population >= 1000000 ) {
            return round( $population / 1000000, 1 ) . 'M';
        } elseif ( $population >= 1000 ) {
            return round( $population / 1000 ) . 'k';
        }
        return number_format( $population );
    }
}

// Initialize the page
//Zume_Local_Map_Old::instance();
