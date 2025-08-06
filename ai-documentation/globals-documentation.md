# Zume Training System - Globals.php Utilities Documentation

## Overview

The `globals.php` file contains a comprehensive collection of utility functions and classes that form the core infrastructure of the Zume Training System. These utilities are used throughout the system and are also shared with the coaching plugin. The file is organized into functional sections with clear separation of concerns.

## Table of Contents

1. [User Data Functions](#user-data-functions)
2. [Language & Localization Functions](#language--localization-functions)
3. [Training & Content Functions](#training--content-functions)
4. [Utility Functions](#utility-functions)
5. [API & Logging Classes](#api--logging-classes)
6. [Notification Functions](#notification-functions)

---

## User Data Functions

### Core User Profile Functions

#### `zume_get_user_profile($user_id = null)`
Retrieves comprehensive user profile data including contact information, coaching relationships, and preferences.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user

**Returns:** Array containing user profile data or false if user not found

**Key Data Points:**
- Basic info: name, email, phone, location, timezone
- Coaching relationships and communication preferences
- Language preferences and SSO identities
- Privacy settings and notification preferences

#### `zume_get_contact_meta($contact_id)`
Retrieves all metadata for a specific contact.

**Parameters:**
- `$contact_id` (int): Contact post ID

**Returns:** Array of contact metadata

### User Stage & Progress Functions

#### `zume_get_user_stage($user_id = null, $log = null, $number_only = false)`
Determines the user's current stage in the training funnel based on their activity log.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$log` (array|null): User activity log, defaults to fetching from database
- `$number_only` (bool): Return only stage number if true

**Returns:** Array with stage information or stage number

**Stages:**
- 0: Anonymous
- 1: Registrant
- 2: Active Training
- 3: Post-Training
- 4: Partial Practitioner
- 5: Full Practitioner
- 6: Multiplying Practitioner

### User Location & Timezone Functions

#### `zume_get_user_location($user_id = null, $ip_lookup = false)`
Retrieves user's geographical location data.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$ip_lookup` (bool): Whether to perform IP-based location lookup

**Returns:** Array with location data (lng, lat, level, label, grid_id, source) or false

#### `zume_get_user_timezone($user_id = null, $location = null)`
Gets user's timezone information.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$location` (array|null): Location data for timezone calculation

**Returns:** Array with timezone details including offset and current time

### Training Progress Functions

#### `zume_get_user_host($user_id = null, $log = null)`
Calculates user's HOST (Hear, Obey, Share, Train) progress across all training items.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$log` (array|null): User activity log

**Returns:** Array with HOST progress breakdown and percentages

#### `zume_get_user_mawl($user_id = null, $log = null)`
Calculates user's MAWL (Model, Assist, Watch, Launch) progress across all training items.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$log` (array|null): User activity log

**Returns:** Array with MAWL progress breakdown and percentages

### User Relationships Functions

#### `zume_get_user_friends($user_id = null)`
Retrieves user's friend relationships.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user

**Returns:** Array of friend relationships

#### `zume_get_user_commitments($user_id = null, $status = 'open', $category = 'custom')`
Retrieves user's commitments/tasks.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$status` (string): 'open', 'closed', or 'all'
- `$category` (string): Commitment category

**Returns:** Array of user commitments

#### `zume_get_user_plans($user_id = null)`
Retrieves user's training plans with session details and participants.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user

**Returns:** Array of training plans with detailed session information

#### `zume_get_user_churches($user_id = null, $by_key = false)`
Retrieves churches associated with the user.

**Parameters:**
- `$user_id` (int|null): User ID, defaults to current user
- `$by_key` (bool): Return indexed by church ID if true

**Returns:** Array of church data

### Helper Functions

#### `zume_get_user_contact_id($user_id)`
Gets the contact post ID associated with a user.

#### `zume_get_user_coaching_contact_id($user_id)`
Gets the coaching contact ID for a user.

#### `zume_get_user_id_by_contact_id($contact_id)`
Gets user ID from contact post ID.

#### `zume_get_user_log($user_id, $type = null, $subtype = null)`
Retrieves user activity log with optional filtering.

**Parameters:**
- `$user_id` (int): User ID
- `$type` (string|null): Log type filter
- `$subtype` (string|null): Log subtype filter

**Returns:** Array of log entries

---

## Language & Localization Functions

### Core Language Functions

#### `zume_languages($type = 'code')`
Returns language configuration data.

**Parameters:**
- `$type` (string): 'code', 'locale', 'full', or 'v5_only'

**Returns:** Array of language configurations

**Language Properties:**
- Basic info: name, code, locale, native name
- Display settings: flag, RTL support
- Feature flags: version availability, translator status, etc.

#### `zume_languages_with_three_circles()`
Returns array of language codes that support the three circles feature.

#### `zume_language_codes()`
Returns array of all supported language codes.

### Language Utility Functions

#### `zume_get_language_cookie()`
Retrieves the current language from cookies.

#### `zume_get_language_locale($code)`
Gets locale string for a language code.

#### `zume_get_language_display_code($code)`
Gets display code for a language code.

#### `zume_google_locales()`
Returns array of Google-supported locales.

#### `zume_apple_locales($type = 'locale')`
Returns array of Apple-supported locales.

### Feature Flag System

#### `zume_feature_flag($flag_name = null, $lang_code = null)`
Manages feature flags for different languages.

**Parameters:**
- `$flag_name` (string|null): Specific flag name
- `$lang_code` (string|null): Language code

**Returns:** Boolean, array, or null depending on parameters

**Available Flags:**
- `version_4_available`: Legacy version support
- `translator_enabled`: Translation system access
- `version_5_ready`: Current version readiness
- `pieces_pages`: Content page availability
- `course_slides_download`: Slide download availability
- `3_circles`: Three circles feature support

---

## Training & Content Functions

### Training Content Management

#### `zume_training_items(): array`
Returns complete training curriculum with 32 training items.

**Returns:** Array with training item details including:
- Title and descriptions
- Video and script references
- Type classification (concept/tool)
- HOST/MAWL applicability

#### `zume_training_items_by_script(): array`
Returns training items indexed by script ID.

#### `zume_training_items_for_session($session_type, $session_number = null): array`
Returns training items for specific session types and numbers.

**Parameters:**
- `$session_type` (string): 'a', 'b', or 'c'
- `$session_number` (int|null): Specific session number

**Returns:** Array of training item keys for the session

### Funnel Stage System

#### `zume_funnel_stages(): array`
Defines the complete user journey funnel with 7 stages.

**Returns:** Array with detailed stage information including:
- Stage metadata (key, value, labels)
- Descriptions and characteristics
- Next steps and priorities
- Pace tracking

**Stage Definitions:**
1. **Anonymous** (0): Website visitors
2. **Registrant** (1): Registered users
3. **Active Training** (2): Users with training plans
4. **Post-Training** (3): Completed training
5. **Partial Practitioner** (4): First practitioner reports
6. **Full Practitioner** (5): Completed MAWL checklist
7. **Multiplying Practitioner** (6): Generational fruit

---

## Utility Functions

### URL & Language Handling

#### `zume_mirror_url()`
Returns the file mirror URL for content delivery.

#### `zume_alt_video($current_language = null)`
Determines if alternative video content should be used.

#### `zume_current_language()`
Gets current language from URL path.

#### `zume_get_url_pieces($url = null)`
Parses URL to extract language code and path components.

#### `zume_set_language_cookie($lang, $args = [])`
Sets language preference cookie.

### Formatting & Calculation Functions

#### `zume_format_int($int)`
Formats integers with comma separators.

#### `zume_get_valence($value, $compare, $negative_stat = false)`
Calculates valence (color coding) for statistical comparisons.

**Parameters:**
- `$value` (float): Current value
- `$compare` (float): Comparison value
- `$negative_stat` (bool): Whether lower is better

**Returns:** CSS class name for valence styling

#### `zume_get_percent($value, $compare)`
Calculates percentage difference between values.

**Returns:** Formatted percentage string with +/- prefix

### Timezone Management

#### `zume_get_timezones($key = null): array`
Returns comprehensive timezone data.

**Parameters:**
- `$key` (string|null): Specific timezone key

**Returns:** Array of timezone configurations or specific timezone data

---

## API & Logging Classes

### Zume_Global_Endpoints Class

REST API endpoints for user data and commitments management.

**Key Methods:**
- `user_data_profile()`: Get user profile data
- `user_data_stage()`: Get user stage information
- `create_commitment()`: Create new commitment
- `list_commitments()`: Retrieve user commitments
- `update_commitment()`: Update commitment details
- `complete_commitment()`: Mark commitment as complete
- `delete_commitment()`: Remove commitment
- `list_host()`: Get HOST progress
- `create_host()`: Create HOST entry
- `delete_host()`: Remove HOST entry

### Zume_System_Log_API Class

Comprehensive logging system for user activities and system events.

**Key Methods:**
- `log()`: Insert new log entry
- `log_anonymous()`: Log anonymous activities
- `insert()`: Database insertion with duplicate checking
- `update()`: Update existing log entries
- `delete()`: Remove log entries
- `make_format()`: Format log data for storage

**Log Types:**
- User activities and progress
- System events and errors
- Anonymous tracking
- Stage progression tracking

### Zume_User_Genmap Class

Generational mapping system for tracking disciple multiplication.

**Key Methods:**
- `modal()`: Display genmap modal interface
- `tree()`: Generate hierarchical tree structure
- `get_query()`: Build database queries for genmap data
- `get_genmap()`: Process query results into genmap structure
- `prepare_menu_array()`: Organize data for tree building
- `build_array()`: Construct hierarchical array structure

### Validation & Security

#### `zume_validate_user_id_request($user_id)`
Validates user permissions for accessing other users' data.

**Permission Checks:**
- Current user accessing own data
- Admin users with list/edit permissions
- Coaching relationships
- Shared contact permissions

**Returns:** User ID if authorized, WP_Error if not

### Logging Wrapper Functions

#### `zume_log_insert($type, $subtype, $data = [], $log_once = false)`
Wrapper for inserting log entries.

#### `zume_log_delete($type, $subtype, $data = [])`
Wrapper for deleting log entries.

#### `zume_log_update($where, $data = [])`
Wrapper for updating log entries.

---

## Notification Functions

### Subscriber Management

#### `zume_get_notification_subscribers()`
Retrieves contacts who have opted in for future training notifications.

#### `zume_get_notification_subscribers_count()`
Returns count of notification subscribers.

#### `zume_get_subscribers_in_online_trainings()`
Returns count of subscribers who have joined online trainings.

---

## Database Schema Dependencies

The utilities rely on several custom database tables:

- `zume_users`: User accounts
- `zume_posts`: Contact and group records
- `zume_postmeta`: Contact metadata
- `zume_p2p`: Relationship connections
- `zume_dt_reports`: Activity logging
- `zume_dt_post_user_meta`: User commitments
- `zume_dt_location_grid_meta`: Location data
- `zume_3_posts`, `zume_3_postmeta`, `zume_3_p2p`: Coaching system tables

## Usage Notes

1. **Global Variables**: The system uses several global variables for caching:
   - `$zume_user_profile`: Current user profile cache
   - `$zume_languages_by_code`: Language configurations
   - `$zume_languages_by_locale`: Locale-based language lookup

2. **Error Handling**: Functions return `false` or `WP_Error` objects for error conditions.

3. **Performance**: User profile data is cached globally to avoid repeated database queries.

4. **Security**: All user data access is validated through permission checks.

5. **Internationalization**: The system supports 50+ languages with comprehensive localization features.

## Maintenance Considerations

- Functions are wrapped in `function_exists()` checks to prevent conflicts
- Database queries use prepared statements for security
- Logging system includes duplicate prevention and hash-based deduplication
- API endpoints include proper authentication and authorization checks
- Language system supports feature flags for gradual rollout of features

This utilities collection provides a robust foundation for the Zume Training System, supporting user management, content delivery, progress tracking, and internationalization across multiple languages and cultures.
