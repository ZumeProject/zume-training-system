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
    public $parent_grid_id = null;
    public $location_data = null;
    public $global_div = 50000; // this equals 2 for every 50000
    public $us_div = 5000; // this is 2 for every 5000

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
            $this->parent_grid_id = sanitize_text_field( wp_unslash( $_GET['parent_grid_id'] ?? '' ) );

            if ( $this->grid_id === '' && $this->parent_grid_id === '' && is_user_logged_in() ) {
                $profile = zume_get_user_profile();
                $grid_id = $profile['location']['grid_id'];
                $this->grid_id = $grid_id;
                $this->parent_grid_id = $this->get_parent_grid_id( $this->grid_id );
            }

            $child_grid_ids = $this->get_child_grid_ids( $this->parent_grid_id );
            if ( !in_array( $this->grid_id, $child_grid_ids ) ) {
                $this->grid_id = '';
            }

            $this->location_data = $this->get_location_data( $this->parent_grid_id );

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
                font-size: clamp(16px, 1vw, 48px);
            }

            .container {
                max-width: 700px;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 40px 20px;
                background-color: transparent;
                gap: 1rem;
            }

            .title-section {
                width: 70%;
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
                text-align: left;
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
                aspect-ratio: 16 / 9;      /* preferred: keeps proportions across paper sizes */
                height: auto;              /* let aspect-ratio define height */
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
                position: relative;
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
            @media print {
                @page {
                    margin: 0.5in;
                    size: auto;
                }

                html, body {
                    width: 100%;
                    height: auto;
                }

                .container {
                    max-width: none !important;
                    width: 80% !important;
                }
                #map, #map canvas { width: 100% !important; height: 100% !important; }

                .title-section h1 {
                    font-size: 36px;
                    font-size: clamp(24px, 6vw, 48px);
                }
                .title-section h2 {
                    font-size: 28px;
                    font-size: clamp(18px, 4.5vw, 36px);
                }

                .population .number {
                    font-size: 48px;
                    font-size: clamp(28px, 8vw, 64px);
                }

                .goals-title {
                    font-size: 36px;
                    font-size: clamp(24px, 5vw, 48px);
                }

                .goal-item {
                    flex-direction: column;
                    gap: 20px;
                }

                .goal-title {
                    font-size: 28px;
                    font-size: clamp(18px, 4vw, 32px);
                }

                .stat-number {
                    font-size: 36px;
                    font-size: clamp(20px, 4.5vw, 47px);
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
                'parent_grid_id' => $this->parent_grid_id,
                'parent_level' => $this->location_data['level'],
                'location_data' => $this->location_data,
                'mirror_url' => dt_get_location_grid_mirror( true ),
                'us_div' => 5000,
                'global_div' => 50000,
                'trainees_percentage' => $this->calculate_progress_percentages(),
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
                    projection: 'mercator', // Ensures a flat map
                    minZoom: 2,
                    maxZoom: 16
                });
                window.localmap = map

                // Disable map rotation
                map.dragRotate.disable();
                map.touchZoomRotate.disableRotation();

                // Add navigation controls
                map.addControl(new mapboxgl.NavigationControl({
                    position: 'bottom-right',
                    showCompass: false
                }));

                // Wait for map to load before adding markers and data
                map.on('load', async function() {
                    // Check map container dimensions
                    checkMapContainerDimensions();
                    let parentGeojsonData = null;
                    let geojsonData = null;

                    try {
                        parentGeojsonData = await getGeoJSON(localMapObject.parent_grid_id);
                    } catch (error) {
                        console.error('Could not load grid polygon:', error.message);
                        return;
                    }
                    localMapObject.parentGeojsonData = parentGeojsonData;

                    // add in percentage data into geojson for mapping
                    parentGeojsonData.features.forEach(feature => {
                        if (!localMapObject.trainees_percentage[feature.properties.grid_id]) {
                            feature.properties.percentage = 0.0;
                            return
                        }
                        feature.properties.percentage = parseFloat(localMapObject.trainees_percentage[feature.properties.grid_id].percent);
                    });

                    await loadGridPolygon(localMapObject.parent_grid_id + 'parent', parentGeojsonData);

                    if (localMapObject.grid_id !== '') {
                        try {
                            geojsonData = await getGeoJSON(localMapObject.grid_id, 'low');
                        } catch (error) {
                            console.error('Could not load grid polygon:', error.message);
                            return;
                        }
                        localMapObject.geojsonData = geojsonData;

                        geojsonData.features.forEach(feature => {
                            if (!localMapObject.trainees_percentage[feature.properties.grid_id]) {
                                feature.properties.percentage = 0.0;
                                return
                            }
                            feature.properties.percentage = parseFloat(localMapObject.trainees_percentage[feature.properties.grid_id].percent);
                        });

                        await loadGridPolygon(localMapObject.grid_id, geojsonData, {
                            fill: {
                                color: '#00bcd4',
                                opacity: 0.5,
                            },
                            outline: {
                                color: '#00bcd4',
                                width: 4,
                                opacity: 0.8,
                            }
                        });
                    }

                    if (geojsonData) {
                        fitMapToBounds(calculatePolygonBounds(geojsonData));
                    } else {
                        fitMapToBounds(calculatePolygonBounds(parentGeojsonData));
                    }

                    const cameraChanged = (event) => {
                        const labeledFeatures = filterFeaturesToBounds(parentGeojsonData.features, getMapBounds());
                        // Add grid name label at the center of the polygon
                        addGridNameLabel(labeledFeatures, localMapObject.grid_id);
                        loadActivityData(labeledFeatures);
                    }
                    map.on('moveend', cameraChanged);
                    map.on('zoomend', cameraChanged);
                    map.on('pitchend', cameraChanged);
                    map.on('rotateend', cameraChanged);

                    // Add click handler for more detailed information
                    addMapClickHandlers();

                    preparePageForPrint();
                });

                function preparePageForPrint() {
                    const mapEl = document.getElementById('map');
                    const containerEl = mapEl ? mapEl.parentElement : null;
                    if (!map || !mapEl || !containerEl) return;

                    let ro = null;
                    let rafId = null;

                    const resizeMap = () => {
                        // lock #map to current container size (prevents CSS % ambiguity in print)
                        mapEl.style.width = containerEl.clientWidth + 'px';
                        mapEl.style.height = containerEl.clientHeight + 'px';
                        // two passes to catch late layout updates
                        if (rafId) cancelAnimationFrame(rafId);
                        rafId = requestAnimationFrame(() => {
                            map.resize();
                            setTimeout(() => map.resize(), 150);
                        });
                    };

                    const startPrintWatch = () => {
                        resizeMap();
                        // watch for print-preview size changes (paper size/orientation, margins)
                        ro = new ResizeObserver(resizeMap);
                        ro.observe(containerEl);
                    };

                    const endPrintWatch = () => {
                        if (ro) { ro.disconnect(); ro = null; }
                        mapEl.style.width = '';
                        mapEl.style.height = '';
                        setTimeout(() => map.resize(), 100);
                    };

                    // Cross-browser hooks
                    const mql = window.matchMedia('print');
                    if (mql && mql.addEventListener) {
                        mql.addEventListener('change', e => e.matches ? startPrintWatch() : endPrintWatch());
                    }
                    window.addEventListener('beforeprint', startPrintWatch);
                    window.addEventListener('afterprint', endPrintWatch);
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
                        const centerLng = (east + west) / 2;
                        const centerLat = (north + south) / 2;
                        return {
                            north: north,
                            south: south,
                            east: east,
                            west: west,
                            centerLng: centerLng,
                            centerLat: centerLat
                        };
                    }

                    return null;
                }

                /**
                 * Add grid name label at the center of the polygon
                 */
                function addGridNameLabel(features = [], gridId) {
                    if (features.length === 0) {
                        return;
                    }

                    const id = `grid-name-label-${gridId}`;
                    //const id = 'grid-name-label';

                    // Remove existing grid label if it exists
                    if (map.getLayer(id)) {
                        map.removeLayer(id);
                        map.removeSource(id);
                    }

                    // Get the location name from the data
                    const locationName = locationData.name || `Grid ${localMapObject.grid_id}`;

                    const data = features.length === 1 ? {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [features[0].properties.centerLng, features[0].properties.centerLat]
                                },
                                'properties': {
                                    'name': locationName
                                }
                            }
                        ]
                    } : {
                        'type': 'FeatureCollection',
                        'features': features.map(feature => ({
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [feature.properties.centerLng, feature.properties.centerLat]
                            },
                            'properties': {
                                'name': feature.properties.label
                            }
                        }))
                    }

                    // Add source for grid name label
                    map.addSource(id, {
                        'type': 'geojson',
                        'data': data,
                    });

                    // Add grid name label layer
                    map.addLayer({
                        'id': id,
                        'type': 'symbol',
                        'source': id,
                        'layout': {
                            'text-field': ['get', 'name'],
                            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                            'text-size': 22,
                            'text-anchor': 'center',
                            'text-justify': 'center',
                            'text-allow-overlap': true,
                            'text-ignore-placement': true,
                        },
                        'paint': {
                            'text-color': '#111',
                            'text-halo-color': '#ffffff',
                            'text-halo-width': 3,
                            'text-opacity': 0.9
                        }
                    });
                }

                function getParentGridID(gridId) {
                    const locationData = localMapObject.location_data;
                    const level = Number(locationData.level);

                    if (level === 0 || level === -3) {
                        return gridId;
                    }

                    if (level === 1) {
                        return locationData.admin0_grid_id;
                    }

                    if (level === 2) {
                        return locationData.admin1_grid_id;
                    }

                    return locationData.admin2_grid_id;
                }

                async function getGeoJSON(gridId, folder = 'collection') {
                    const mirrorUrl = localMapObject.mirror_url;
                    const polygonUrl = `${mirrorUrl}${folder}/${gridId}.geojson`;
                    const response = await fetch(polygonUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch polygon: ${response.status}`);
                    }
                    return response.json();
                }

                /**
                 * Load and display the polygon for the current grid_id
                 */
                async function loadGridPolygon(gridId, geojsonData, options = {}) {
                    if (!geojsonData) {
                        return;
                    }

                    const defaultOptions = {
                        fill: {
                            opacity: 0.2
                        },
                        outline: {
                            width: 2,
                            opacity: 0.8
                        }
                    }

                    options = { ...defaultOptions, ...options };

                    const sourceName = `grid-polygon-${gridId}`;

                    // Add the polygon source
                    map.addSource(sourceName, {
                        'type': 'geojson',
                        'data': geojsonData
                    });

                    if (options.fill) {
                        //Add polygon fill layer
                        map.addLayer({
                            'id': `grid-polygon-fill-${gridId}`,
                            'type': 'fill',
                            'source': sourceName,
                            'paint': {
                                'fill-color': [
                                    "step",
                                    ['get', 'percentage'],
                                    'red',
                                    33,
                                    'orange',
                                    66,
                                    'green',
                                ],
                                'fill-opacity': options.fill.opacity
                            }
                        });
                    }

                    if (options.outline) {
                        // Add polygon outline layer
                        map.addLayer({
                            'id': `grid-polygon-outline-${gridId}`,
                            'type': 'line',
                            'source': sourceName,
                            'paint': {
                                'line-color': [
                                    "step",
                                    ['get', 'percentage'],
                                    'red',
                                    33,
                                    'orange',
                                    66,
                                    'green',
                                ],
                                'line-width': options.outline.width,
                                'line-opacity': options.outline.opacity
                            }
                        });
                    }

                    const polygonBounds = calculatePolygonBounds(geojsonData);

                    console.log('Grid polygon loaded successfully');
                }

                function fitMapToBounds(polygonBounds) {
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
                        const bounds = getMapBounds();
                        const labeledFeatures = filterFeaturesToBounds(localMapObject.parentGeojsonData.features, bounds);
                        addGridNameLabel(labeledFeatures, localMapObject.grid_id);
                    }, 2100);
                }

                function getMapBounds() {
                    const bounds = map.getBounds();
                    return {
                        north: bounds.getNorth(),
                        south: bounds.getSouth(),
                        east: bounds.getEast(),
                        west: bounds.getWest(),
                        centerLng: bounds.getCenter().lng,
                        centerLat: bounds.getCenter().lat
                    };
                }

                function filterFeaturesToBounds(features, polygonBounds) {
                    const featuresInBounds = features
                        .map(feature => withCenter(feature))
                        .filter(feature => isInBounds(feature, polygonBounds));
                    featuresInBounds.sort((a, b) => b.properties.centerLng - a.properties.centerLng);
                    featuresInBounds.sort((a, b) => b.properties.centerLat - a.properties.centerLat);
                    const labeledFeatures = featuresInBounds.map((feature, index) => withLabel(feature, `${index + 1}`));

                    return labeledFeatures;
                }

                function withCenter(feature) {
                    const bounds = calculatePolygonBounds(feature);
                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            centerLng: bounds.centerLng,
                            centerLat: bounds.centerLat
                        }
                    }
                }
                function withLabel(feature, label) {
                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            label: label
                        }
                    }
                }
                function isInBounds(feature, bounds) {
                    if (feature.properties.centerLat > bounds.south &&
                        feature.properties.centerLat < bounds.north &&
                        feature.properties.centerLng > bounds.west &&
                        feature.properties.centerLng < bounds.east
                    ) {
                        return true;
                    }
                    return false;
                }

                /**
                 * Load activity data for the location and surrounding areas
                 */
                function loadActivityData(features) {
                    const tableBody = document.getElementById('local-map-table-body');
                    tableBody.innerHTML = '';
                    const loadingSpinner = document.querySelector('.loading-spinner');
                    loadingSpinner.classList.add('active');

                    // order the features by the label
                    features.sort((a, b) => a.properties.label - b.properties.label);

                    // move the current grid_id feature to the top of the list
                    const currentGridId = localMapObject.grid_id;
                    const currentGridIdIndex = features.findIndex(feature => feature.properties.grid_id === currentGridId);
                    if (currentGridIdIndex !== -1) {
                        const currentGridIdFeature = features.splice(currentGridIdIndex, 1)[0];
                        features.unshift(currentGridIdFeature);
                    }

                    // add the features to the table
                    for (const feature of features) {
                        const levelData = localMapObject.trainees_percentage[feature.properties.grid_id];
                        let linkURL = `/map/local?parent_grid_id=${feature.properties.grid_id}`
                        if (localMapObject.parent_level === '1') {
                            linkURL = `/map/local?parent_grid_id=${localMapObject.parent_grid_id}&grid_id=${feature.properties.grid_id}`;
                        }
                        tableBody.innerHTML += `
                            <tr>
                                <td>${feature.properties.label}</td>
                                <td><a class="child-map-link" href="${linkURL}">${levelData?.name}</a></td>
                                <td>${levelData?.population}</td>
                                <td>${levelData?.needed}</td>
                                <td>${levelData?.reported}</td>
                                <td>${levelData?.percent}</td>
                            </tr>
                        `;
                    }

                    loadingSpinner.classList.remove('active');
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
        ?>

        <?php if ( $this->parent_grid_id === '' ) : ?>
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
                    <div id="map" class="map-placeholder"></div>
                </div>
                <?php if ( $this->parent_grid_id !== '1' ) : ?>
                    <a id="parent-map-link" href="/map/local?parent_grid_id=<?php echo esc_attr( $this->get_parent_grid_id( $this->parent_grid_id ) ) ?>&grid_id=<?php echo esc_attr( $this->parent_grid_id ) ?>" class="">View Parent Map</a>
                <?php endif; ?>
                <div>
                    <table class="no-resize">
                        <thead>
                            <tr>
                                <th><?php echo esc_html__( 'No.', 'zume' ) ?></th>
                                <th><?php echo esc_html__( 'Name', 'zume' ) ?></th>
                                <th><?php echo esc_html__( 'Population', 'zume' ) ?></th>
                                <th><?php echo esc_html__( 'Trainees Needed', 'zume' ) ?></th>
                                <th><?php echo esc_html__( 'Trainees Reported', 'zume' ) ?></th>
                                <th><?php echo esc_html__( '%', 'zume' ) ?></th>
                            </tr>
                        </thead>
                        <tbody id="local-map-table-body">
                            <span class="loading-spinner active"></span>
                        </tbody>
                    </table>
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

        if ( $grid_id === '' ) {
            return null;
        }

        $grid_id = intval( $grid_id );

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
                admin0.grid_id as admin0_grid_id,
                admin1.name as admin1_name,
                admin1.grid_id as admin1_grid_id,
                admin2.name as admin2_name,
                admin2.grid_id as admin2_grid_id,
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

    private function get_child_grid_ids( $grid_id ) {
        global $wpdb;

        $children = $wpdb->get_results( $wpdb->prepare(
            'SELECT grid_id FROM zume_dt_location_grid
             WHERE parent_id = %d OR admin0_grid_id = %d OR admin1_grid_id = %d OR admin2_grid_id = %d OR admin3_grid_id = %d',
            $grid_id, $grid_id, $grid_id, $grid_id, $grid_id
        ), ARRAY_A );

        return array_column( $children, 'grid_id' );
    }

    private function calculate_progress_percentages() {
        if ( !defined( 'WP_DEBUG' ) || !WP_DEBUG ) {
            $level_data = get_transient( 'zume_local_map_level_data_' . $this->grid_id );
            if ( $level_data ) {
                return $level_data;
            }
        }

        $child_grid_ids = $this->get_child_grid_ids( $this->parent_grid_id );

        $location_data = $this->get_location_data( $this->parent_grid_id );
        $level = 'a3';
        if ( (int) $location_data['level'] === -3 ) {
            $level = 'a0';
        }
        if ( (int) $location_data['level'] === 0 ) {
            $level = 'a1';
        }
        if ( (int) $location_data['level'] === 1 ) {
            $level = 'a2';
        }
        if ( (int) $location_data['level'] === 2 ) {
            $level = 'a3';
        }

        $list = Zume_Funnel_App_Heatmap::query_funnel_grid_totals( $level, [ 3, 4, 5, 6 ] );

        $level_data = [];
        foreach ( $child_grid_ids as $child_grid_id ) {
            $level_data[$child_grid_id] = Zume_Funnel_App_Heatmap::endpoint_get_level( $child_grid_id, $level, $list, $this->global_div, $this->us_div );
        }

        set_transient( 'zume_local_map_level_data_' . $this->grid_id, $level_data, 60 * 60 * 24 );

        return $level_data;
    }

    private function get_parent_grid_id( $grid_id ) {
        $location_data = $this->get_location_data( $grid_id );
        if ( (int) $location_data['level'] === 0 || (int) $location_data['level'] === -3 ) {
            return 1;
        }
        if ( (int) $location_data['level'] === 1 ) {
            return $location_data['admin0_grid_id'];
        }
        if ( (int) $location_data['level'] === 2 ) {
            return $location_data['admin1_grid_id'];
        }
        if ( (int) $location_data['level'] === 3 ) {
            return $location_data['admin2_grid_id'];
        }
        return $location_data['admin3_grid_id'];
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
Zume_Local_Map::instance();
