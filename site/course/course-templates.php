<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * zume_course_slide_template()
 * zume_course_slide_css()
 */

function zume_course_slide_template( $slide ) {

    switch ( $slide['type'] ) {
        case 'title':
            ?>
                <title-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></title-slide>
            <?php
            break;
        case 'checkin':
            ?>
                <checkin-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></checkin-slide>
            <?php
            break;
        case 'pray':
            ?>
                <pray-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></pray-slide>
            <?php
            break;
        case 'review':
        case 'overview':
            ?>
                <overview-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></overview-slide>
            <?php
            break;
        case 'challenge':
        case 'center':
            ?>
                <center-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></center-slide>
            <?php
            break;
        case 'watch':
            ?>
                <watch-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></watch-slide>
            <?php
            break;
        case 'video':
            ?>
                <video-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></video-slide>
            <?php
            break;
        case 'discuss':
        case 'look_back':
            ?>
                <discuss-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></discuss-slide>
            <?php
            break;
        case 'left_content':
        case 'activity':
            ?>
                <activity-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></activity-slide>
            <?php
            break;
        case 'obey':
            ?>
                <obey-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></obey-slide>
            <?php
            break;
        case 'left_image':
            ?>
                <left-image-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></left-image-slide>
            <?php
            break;
        case 'next_steps':
            ?>
                <next-steps-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></next-steps-slide>
            <?php
            break;
        case 'break':
            ?>
                <break-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></break-slide>
            <?php
            break;
        case 'congratulations':
            ?>
                <congratulations-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></congratulations-slide>
            <?php
            break;
        case 'final':
            ?>
                <final-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></final-slide>
            <?php
            break;
        default:
            ?>
                <course-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></course-slide>
            <?php
            break;

    }
}

function zume_course_slide_css( $build ) {
    ?>
    <style>
        #blank-template-body {
            padding: 1em;
        }
        /* progress bar row */
        .stage {
            height: 30px;
            padding-top: 10px;
            text-align: center;
            background-color: white !important;
            margin-bottom: 5px;
        }
        .progress-bar-wrapper {
            width: fit-content;
            background-image: url('https://storage.googleapis.com/zume-file-mirror/images/horizontal-line.png');
            background-repeat: repeat-x;
            height: 20px;
            margin: 0 auto;
        }
        .progress-bar-item {
            width: 17px;
            height: 17px;
            border: 1px solid lightgrey;
            background: white;
            float:left;
        }
        .progress-bar-divider {
            width: 17px;
            height: 17px;
            float:left;
        }
        <?php
            // itemized progress bar active incicator. Puts blue background on active slide
           foreach( $build as $slide ) {
               echo '.' . $slide['key'] . '-bar .' . $slide['key'] . '-bar { background-color: #5dccff; }';
           }
        ?>
    </style>

    <?php
}
