<?php
/**
 * Auto loads 2 levels of php files, and file in subdirectories
 */

// Load dependencies first
require_once( __DIR__ . '/enqueue.php' );
require_once( __DIR__ . '/zume-magic-page.php' );
require_once( __DIR__ . '/login/login.php' );
require_once( __DIR__ . '/login/login-functions.php' );
require_once( __DIR__ . '/parts/anonymous-logger.php' );
require_once( __DIR__ . '/parts/hreflang.php' );

$skip_folders = [
    'parts',
    'login',
    'template',
];

// Load all other files
$dir = scandir( __DIR__ );
foreach ( $dir as $file ){
    if ( 'php' === substr( $file, -3, 3 ) && 'index.php' !== $file && 'loader.php' !== $file && substr( $file, 0, 1 ) !== '.' ) {
        require_once( __DIR__ . '/' . $file );
    }
    if ( 'index.php' !== $file && 'loader.php' !== $file && substr( $file, 0, 1 ) !== '.' && is_dir( __DIR__ . '/' . $file ) && !in_array( $file, $skip_folders ) ) {
        $subdir = scandir( __DIR__ . '/'. $file );
        foreach ( $subdir as $subfile ){
            if ( in_array( $subfile, $skip_folders ) ) {
                continue;
            }
            if ( 'php' === substr( $subfile, -3, 3 ) && 'index.php' !== $subfile && 'loader.php' !== $subfile && substr( $subfile, 0, 1 ) !== '.' ) {
                require_once( __DIR__ . '/'. $file . '/' . $subfile );
            }
            if ( substr( $subfile, 0, 1 ) !== '.' && is_dir( __DIR__ . '/'. $file . '/' . $subfile ) ) {
                $subsubdir = scandir( __DIR__ . '/'. $file . '/' . $subfile );
                foreach ( $subsubdir as $subsubfile ){
                    if ( in_array( $subsubfile, $skip_folders ) ) {
                        continue;
                    }
                    if ( 'php' === substr( $subsubfile, -3, 3 ) && 'index.php' !== $subsubfile && 'loader.php' !== $subsubfile && substr( $subsubfile, 0, 1 ) !== '.' ) {
                        require_once( __DIR__ . '/'. $file . '/' . $subfile . '/' . $subsubfile );
                    }
                }
            }
        }
    }
}
