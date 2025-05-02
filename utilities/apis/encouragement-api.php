<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Encouragement_API
{
    public function __construct()
    {
        if ( ! has_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'] ) ) {
            add_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'], 10, 3 );
            add_action( 'wp_mail_failed', ['Zume_System_Encouragement_API', 'log_mail_failure'], 10, 1 );
            add_action( 'wp_mail_succeeded', ['Zume_System_Encouragement_API', 'log_mail_success'], 10, 1 );
        }
    }
    
    public static function create_plan( $user_id, $new_plan ) {
        global $wpdb;

        if ( ! is_null( $new_plan ) && ! is_array( $new_plan ) ) {
            return;
        }

        $profile = zume_get_user_profile( $user_id );
        $email = $profile['communications_email'];
        $language_code = $profile['preferred_language'];
        $headers = ['Content-Type: text/html; charset=UTF-8; X-Zume-Email-System: Zume'];
        $templates = self::_query_messages( $language_code );

        foreach ( $new_plan as $message ) {
            $message['to'] = $email;
            $message['headers'] = $headers;
            $message['user_id'] = $user_id;
            // $message['body'] = $templates[$message['message_post_id']]['body'];
            $message['message'] = Encouragement_Email_Template::build_email( $templates[$message['message_post_id']]['body'] );
            $message['subject'] = $templates[$message['message_post_id']]['subject'];
            
            // dt_write_log( $message );
           
            // if immediate is true, send the email immediately
            if ( 0 === $message['drop_date'] ) {
                dt_write_log( 'Sending email immediately' );
                $sent = wp_mail( $message['to'], $message['subject'], $message['message'], $message['headers'] );
                $message['sent'] = $sent;
            }

            if ( isset( $message['id'] ) ) {
                $wpdb->update( 'zume_dt_zume_message_plan', $message, [ 'id' => $message['id'] ] );
            } else {
                $wpdb->insert( 'zume_dt_zume_message_plan', $message );
            }
        }
    }
    public static function log_mail_success( $mail_data ) {
        dt_write_log( 'Mail sent: ' . $mail_data['to'] );
    }
    public static function log_mail_failure( $error ) {
        dt_write_log( 'Mail failed: ' . $error );
    }
    
    public static function read_plan( $user_id ) {

        // Query the message queue in the zume_dt_zume_message_plan table
        // Exclude any sent messages and return the current plan for communication
        global $wpdb;
        
        $current_plan = $wpdb->get_results($wpdb->prepare(
            "SELECT * 
            FROM zume_dt_zume_message_plan 
            WHERE user_id = %d 
            AND sent = 0 
            ORDER BY drop_date ASC",
            $user_id
        ), ARRAY_A);
        
        // If we have messages in the plan, enrich them with message content
        if (!empty($current_plan)) {
            $messages = self::_query_messages();
            
            foreach ($current_plan as $key => $message) {
                if (isset($messages[$message['message_post_id']])) {
                    $current_plan[$key]['message_content'] = $messages[$message['message_post_id']];
                }
            }
        }
        
        return $current_plan;
    }

    public static function update_plan( $user_id, $type, $subtype ) {
        if ( wp_doing_cron() ) {
            dt_write_log( __METHOD__ . " is running as a cron job" );
            return false;
        }
        dt_write_log( __METHOD__ );
        // check for plans for type and subtype
        $potential_plans = self::_get_recommended_plan( $user_id, $type, $subtype );
        if ( empty( $potential_plans ) ) {
            dt_write_log( "No plan suggested for type: $type, subtype: $subtype" );
            return false; // no plan suggested
        }
        $potential_plan_ids = array_unique( array_column( $potential_plans, 'message_post_id' ) );
        
        // get current sent messages and plan messages
        $raw_plan = self::_query_user_messages( $user_id );
        $raw_plan_ids = array_unique( array_column( $raw_plan, 'message_post_id' ) );
        
        // compare the two arrays
        $plan_diff = array_diff( $potential_plan_ids, $raw_plan_ids );
        
        // if there are no differences, return false
        if ( empty( $plan_diff ) ) {
            dt_write_log( "No new messages to add to the plan" );
            return false;
        }

        dt_write_log( $plan_diff );
        
        // if there are differences, get the differences
        $new_plan = array_filter( $potential_plans, function( $message ) use ( $plan_diff ) {
            return in_array( $message['message_post_id'], $plan_diff );
        });
        
        // delete the plan
        self::delete_plan( $user_id );
        
        // create the new plan, with the differences
        self::create_plan( $user_id, $new_plan );
        
        // return true
        return true; // plan updated successfully

    }

    public static function delete_plan( $user_id ) {
        global $wpdb, $table_prefix;
        $wpdb->query( $wpdb->prepare( 'DELETE FROM zume_dt_zume_message_plan WHERE user_id = %s AND sent IS NULL', $user_id ) );
    }

    public static function _get_recommended_plan( $user_id, $type, $subtype ) {
        $plan = [];
        

        if ( 'training' === $type && 'registered' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 100017, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'plan_created' === $subtype ) {
            $plan = [
                [
                    'message_post_id' => 100046, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                [
                    'message_post_id' => 100049, // Finish Strong #1
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+2 day' ),
                ],
                [
                    'message_post_id' => 100050, // Finish Strong #2
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+4 day' ),
                ],
                
            ];
            
            
        }
        else if ( 'system' === $type && 'training_completed' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 23631, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'first_practitioner_report' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 2343, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'mawl_completed' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 23645, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
               
            ];
        }
        else if ( 'system' === $type && 'seeing_generational_fruit' === $subtype ) {
            $plan = [ 
                [
                    'message_post_id' => 23667, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
            ];
        }

        return $plan;
    }
    /**
     * Query all message templates from the database and organize them by post_id
     *
     * @return array Array of recommended messages for the user
     * 
     * @since 1.0
     */
    public static function _query_messages( $language_code ) {
        global $wpdb;
        $raw_messages = $wpdb->get_results( "
            SELECT pm.post_id, pm.meta_key, pm.meta_value
            FROM zume_posts p
            LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key NOT IN ('last_modified', '_edit_lock', '_edit_last')
            WHERE p.post_type = 'zume_messages'", ARRAY_A
        );

        foreach ( $raw_messages as $message ) {
            if ( !isset( $messages[$message['post_id']] ) ) {
                $messages[$message['post_id']] = [];
            }
            if ( str_ends_with( $message['meta_key'], $language_code ) ) {
                $new_key = str_replace( '_'.$language_code, '', $message['meta_key'] );
                $messages[$message['post_id']][$new_key] = $message['meta_value'];
            }
            if ( 'body' === $message['meta_key'] ) {
                $messages[$message['post_id']]['body'] = Encouragement_Email_Template::build_email( $message['meta_value'] );
            }
        }
        // dt_write_log($messages);
       
        return $messages;
    }
    /**
     * Query all messages sent to a user from the database
     *
     * @param int $user_id The user ID to get messages for
     * @return array Array of messages sent to the user
     * 
     * @since 1.0
     */
    public static function _query_user_messages( $user_id ) {
        global $wpdb, $table_prefix;
        $sent_messages = $wpdb->get_results( $wpdb->prepare(
            'SELECT * FROM zume_dt_zume_message_plan WHERE user_id = %d',
            $user_id
        ), ARRAY_A );

        return $sent_messages;
    } 
}
new Zume_System_Encouragement_API;


class Encouragement_Email_Template {


    public static function build_email( $content ){

        $email = self::email_head_part();
        // $email .= self::email_logo_part( $campaign_id, $logo_url );
        $email .= $content;
        $email .= self::email_footer_part();
        return $email;
    }


    public static function email_head_part(){
        ob_start();
        ?>
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Prayer.Tools</title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style>
            <style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' \03D1';} } </style>
            <style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: ' \03D1';} .r0-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 320px !important } .r1-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r2-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r3-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r4-i { background-color: #ffffff !important; padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r5-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r6-o { border-style: solid !important; width: 100% !important } .r7-i { padding-left: 0px !important; padding-right: 0px !important } .r8-o { background-size: auto !important; border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r9-i { padding-bottom: 15px !important; padding-top: 15px !important } .r10-c { box-sizing: border-box !important; text-align: left !important; valign: top !important; width: 100% !important } .r11-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r12-i { padding-bottom: 15px !important; padding-top: 15px !important; text-align: left !important } .r13-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r14-i { text-align: center !important } .r15-r { border-radius: 4px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding-bottom: 12px !important; padding-left: 5px !important; padding-right: 5px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><!--[if !mso]><!-->
            <style type="text/css" emogrify="no"> </style><!--<![endif]--><style type="text/css">p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #2e2d2c; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: bold; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #2e2d2c; text-decoration: underline;}</style>
        </head>
        <body text="#3b3f44" link="#2e2d2c" yahoo="fix" style="">


        <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="width: 100%;">
        <tr><td align="center" class="r0-c">
        <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" class="r1-o" style="table-layout: fixed; width: 600px;">
        <tr><td valign="top" class="">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function get_email_logo_url( $campaign_id, $logo_url = null ){
        if ( empty( $logo_url ) ){
            $campaign = DT_Campaign_Landing_Settings::get_campaign( $campaign_id );
            if ( !empty( $campaign['email_logo'] ) ){
                $logo_url = $campaign['email_logo'];
            }
        }
        if ( empty( $logo_url ) ){
            $logo_url = 'https://s3.prayer.tools/pt-logo.png';
        }
        return $logo_url;
    }

    public static function email_logo_part( $campaign_id, $logo_url = null ){
        $logo_url = self::get_email_logo_url( $campaign_id, $logo_url );
        ob_start();
        ?>
        <tr><td class="r2-c" align="center">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r3-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td class="r4-i" style="background-color: #ffffff; padding-bottom: 20px; padding-top: 20px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><td class="r2-c" align="center">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="228" class="r8-o" style="table-layout: fixed; width: 228px;">
            <tr><td class="r9-i" style="font-size: 0px; line-height: 0px; padding-bottom: 15px; padding-top: 15px;">
                <img src="<?php echo esc_html( $logo_url ); ?>" width="228" border="0" class="" style="display: block; width: 100%;"></td>
            </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table></td>
        </tr>
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_content_part( $content ){
        ob_start();
        ?>

        <tr><td class="r2-c" align="center">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r3-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td class="r4-i" style="background-color: #ffffff;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><td class="r10-c" align="left">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;">
            <tr><td align="left" valign="top" class="r12-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;">
            <div>
                <p style="margin: 0;"><?php echo nl2br( $content ) //phpcs:ignore ?></p>
            </div></td>
            </tr>
            </table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr>
            </table>
        </td></tr>
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_greeting_part( $content ){
        ob_start();
        ?>

        <tr><td class="r2-c" align="center">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r3-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td class="r4-i" style="background-color: #ffffff;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><!-- -->
            <tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
            <tr><td class="r10-c" align="left">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r11-o" style="table-layout: fixed; width: 100%;">
            <tr><td align="left" valign="top" class="r12-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;">
            <div>
                <h3 style="margin: 0;"><?php echo nl2br( $content ) //phpcs:ignore ?></h3>
            </div></td>
            </tr>
            </table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr>
            </table>
        </td></tr>
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_button_part( $button_text, $button_url, $button_color = '#dc3822' ){

        ob_start();
        ?>
        <tr><td class="r2-c" align="center">
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r3-o" style="table-layout: fixed; width: 100%;"><!-- -->
                <tr><td class="r4-i" style="background-color: #ffffff;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
                <tr><th width="100%" valign="top" class="r5-c" style="font-weight: normal;">
                <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r6-o" style="table-layout: fixed; width: 100%;"><!-- -->
                <tr><td valign="top" class="r7-i" style="padding-left: 15px; padding-right: 15px;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
                <tr><td class="r2-c" align="center">
                <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="285" class="r13-o" style="table-layout: fixed; width: 285px;">
                <tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;">­</td> </tr>
                <tr><td height="18" align="center" valign="top" class="r14-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="<?php echo $button_url; //phpcs:ignore ?>" style="v-text-anchor:middle; height: 41px; width: 284px;" arcsize="10%" fillcolor="<?php echo esc_html( $button_color ); ?>" strokecolor="<?php echo esc_html( $button_color ); ?>" strokeweight="1px" data-btn="1">
                    <w:anchorlock> </w:anchorlock>
                    <v:textbox inset="0,0,0,0"> <div style="display:none;"> <center class="default-button">
                    <p><?php echo $button_text; //phpcs:ignore ?></p>
                    </center> </div> </v:textbox>
                    </v:roundrect> <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a href="<?php echo $button_url; //phpcs:ignore ?>" class="r15-r default-button" target="_blank" title="<?php echo $button_text; //phpcs:ignore ?>" data-btn="1" style="font-style: normal; font-weight: bold; line-height: 1.15; text-decoration: none; word-break: break-word; border-style: solid; word-wrap: break-word; display: inline-block; -webkit-text-size-adjust: none; mso-hide: all; background-color: <?php echo esc_html( $button_color ); ?>; border-color: <?php echo esc_html( $button_color ); ?>; border-radius: 4px; border-width: 0px; color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; height: 18px; padding-bottom: 12px; padding-left: 5px; padding-right: 5px; padding-top: 12px; width: 275px;">
                        <p style="margin: 0;"><?php echo $button_text; //phpcs:ignore ?></p>
                    </a> <!--<![endif]--> </td>
                </tr>
                <tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;">­</td> </tr>
            </table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table></td> </tr>
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_footer_part(){
        ob_start();
        ?>
        </table></td></tr></table></td></tr></table></body></html>
        <?php
        $part = ob_get_clean();
        return $part;
    }
}
