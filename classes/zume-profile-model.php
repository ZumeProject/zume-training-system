<?php

class Zume_Profile_Model {

    public static function get() {
        $profile = [];

        $user_id = get_current_user_id();
        $contact_id = Disciple_Tools_Users::get_contact_for_user( $user_id );

        $user = wp_get_current_user();
        $post = DT_Posts::get_post( 'contacts', $contact_id );

        $profile['email'] = $user->user_email;
        $profile['name'] = $post['name'];
        $profile['location_grid_meta'] = isset( $post['location_grid_meta'] ) && !empty( $post['location_grid_meta'] ) ? $post['location_grid_meta'][0] : [ 'label' => '',];
        $profile['phone'] = isset( $post['contact_phone'] ) && !empty( $post['contact_phone'] ) ? $post['contact_phone'][0] : [ 'value' => '', 'key' => '',];

        return $profile;
    }

    public static function update( $fields ) {
    }

}