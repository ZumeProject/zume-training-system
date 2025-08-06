# Zume DT Reports Table Documentation

## Table Schema

```sql
CREATE TABLE `zume_dt_reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `post_type` varchar(20) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `subtype` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_520_ci,
  `value` bigint NOT NULL DEFAULT '0',
  `lng` float DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `level` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `grid_id` bigint DEFAULT NULL,
  `time_begin` int DEFAULT NULL,
  `time_end` int DEFAULT NULL,
  `timestamp` int NOT NULL,
  `hash` varchar(65) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `language_code` varchar(10) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `type` (`type`),
  KEY `subtype` (`subtype`),
  KEY `lng` (`lng`),
  KEY `lat` (`lat`),
  KEY `level` (`level`),
  KEY `grid_id` (`grid_id`),
  KEY `time_begin` (`time_begin`),
  KEY `time_end` (`time_end`),
  KEY `parent_id` (`parent_id`),
  KEY `post_type` (`post_type`),
  KEY `value` (`value`),
  KEY `user_id` (`user_id`),
  KEY `language_code` (`language_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10072403 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
```

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | bigint unsigned | Primary key, auto-increment |
| `user_id` | bigint | WordPress user ID (nullable) |
| `parent_id` | bigint | Parent report ID for hierarchical relationships (nullable) |
| `post_id` | bigint | Related post/contact ID (nullable) |
| `post_type` | varchar(20) | Type of related post (nullable) |
| `type` | varchar(100) | **Required** - Main category of the report |
| `subtype` | varchar(100) | Specific action or event within the type (nullable) |
| `payload` | longtext | Additional JSON data (nullable) |
| `value` | bigint | Numeric value associated with the report (default: 0) |
| `lng` | float | Longitude coordinate (nullable) |
| `lat` | float | Latitude coordinate (nullable) |
| `level` | varchar(100) | Geographic level (nullable) |
| `label` | varchar(255) | Human-readable label (nullable) |
| `grid_id` | bigint | Location grid ID (nullable) |
| `time_begin` | int | Start timestamp (nullable) |
| `time_end` | int | End timestamp (nullable) |
| `timestamp` | int | **Required** - Unix timestamp of report creation |
| `hash` | varchar(65) | SHA256 hash for duplicate detection (nullable) |
| `language_code` | varchar(10) | Language code (nullable) |

## Report Types and Subtypes

The table uses a hierarchical system where `type` represents the main category and `subtype` represents specific actions or events.

### 1. `training` Type
Tracks user progress through the Zume training curriculum.

#### Common Subtypes:
- **`registered`** - User registered for training
- **`plan_created`** - User created a training plan
- **`training_completed`** - User completed full training
- **`host_completed`** - User completed as a host
- **`mawl_completed`** - User completed MAWL training
- **`made_post_training_plan`** - User created post-training plan
- **`completed_3_month_plan`** - User completed 3-month plan

#### Training Session Subtypes (Pattern: `{session}_heard/shared/obeyed/trained`):
- **`1_heard`** through **`33_heard`** - User heard session content
- **`1_shared`** through **`33_shared`** - User shared session content
- **`1_obeyed`** through **`33_obeyed`** - User obeyed session teachings
- **`1_trained`** through **`33_trained`** - User trained others in session

#### Training Set Subtypes:
- **`set_a_01`** through **`set_a_10`** - Set A training items
- **`set_b_01`** through **`set_b_20`** - Set B training items  
- **`set_c_1`** through **`set_c_5`** - Set C training items

### 2. `system` Type
Tracks system-level user actions and profile completion.

#### Common Subtypes:
- **`current_level`** - User's current training stage/level (value field contains stage number)
- **`set_profile`** - User completed full profile
- **`set_partial_profile`** - User completed partial profile
- **`set_profile_name`** - User set their name
- **`set_profile_phone`** - User set their phone
- **`set_profile_location`** - User set their location
- **`registered`** - User registered in system
- **`plan_created`** - System created plan
- **`made_post_training_plan`** - System recorded post-training plan

#### Celebration Subtypes:
- **`celebrated_set_profile`** - Celebrated profile completion
- **`celebrated_plan_unlocked`** - Celebrated plan unlock
- **`celebrated_coach_request`** - Celebrated coach request
- **`celebrated_joining_training`** - Celebrated joining training
- **`celebrate_plan_created`** - Celebrated plan creation
- **`made_post_training_plan_celebrated`** - Celebrated post-training plan
- **`celebrated_coach_connect`** - Celebrated coach connection
- **`celebrated_join_community`** - Celebrated community joining
- **`completed_3_month_plan_celebrated`** - Celebrated 3-month plan completion
- **`celebrated_set_partial_profile`** - Celebrated partial profile

#### Other System Subtypes:
- **`joined_online_training`** - User joined online training
- **`joined_friends_training`** - User joined friends' training
- **`invited_friends`** - User invited friends

### 3. `coaching` Type
Tracks coaching relationships and progress.

#### Common Subtypes:
- **`requested_a_coach`** - User requested a coach
- **`connected_to_coach`** - User connected to coach
- **`sent_message_to_coach`** - User sent message to coach

#### Coaching Session Subtypes (Pattern: `{session}_{action}`):
- **`4_assisting`** through **`33_assisting`** - Coach assisting in session
- **`4_modeling`** through **`33_modeling`** - Coach modeling session
- **`4_watching`** through **`33_watching`** - Coach watching session
- **`4_launching`** through **`33_launching`** - Coach launching session

#### Manual Upgrade Subtypes:
- **`manual_upgrade_to_2`** through **`manual_upgrade_to_6`** - Manual stage upgrades
- **`mawl_completed`** - MAWL training completed

### 4. `practicing` Type
Tracks user practice and real-world application.

#### Common Subtypes:
- **`join_community`** - User joined community
- **`new_church`** - User reported new church
- **`first_practitioner_report`** - User's first practitioner report
- **`practitioner_report`** - User submitted practitioner report
- **`seeing_generational_fruit`** - User seeing generational fruit

### 5. `stage` Type
Tracks user progression through training stages.

#### Subtypes:
- **`current_level`** - Current user stage/level

## Query Patterns and Examples

### Core Query Pattern for User Stages
The most common query pattern gets user stages from the system:

```sql
SELECT r.user_id, r.post_id, r.post_id as contact_id, 
       MAX(r.value) as stage, MAX(r.id) as rid 
FROM zume_dt_reports r
WHERE r.type = 'system' and r.subtype = 'current_level'
GROUP BY r.user_id, r.post_id
```

### Example Queries from `queries.php`

#### 1. Stage Totals Query
```php
public static function stage_totals() {
    global $wpdb;
    $query_for_user_stage = self::$query_for_user_stage;

    $results = $wpdb->get_results(
        "SELECT tb.stage, count(tb.user_id) as total
            FROM
            (
               $query_for_user_stage
            ) as tb
            GROUP BY tb.stage;",
    ARRAY_A );

    $stages = [];
    if ( empty( $results ) ) {
        return $stages;
    }
    foreach ( $results as $result ) {
        $stages[ $result['stage'] ] = $result;
    }
    return $stages;
}
```

**Purpose**: Counts users at each training stage/level.

#### 2. Stage by Location Query
```php
public static function stage_by_location( array $range = [ 1 ] ) {
    global $wpdb;
    $query_for_user_stage = self::$query_for_user_stage;

    if ( count( $range ) > 1 ) {
        $range = '(' . implode( ',', $range ) . ')';
    } else {
        $range = '(' . $range[0] . ')';
    }

    $results = $wpdb->get_results(
        "SELECT p.post_title as name, tb.user_id, tb.post_id, lgm.post_type, 
                tb.stage, lgm.label, lgm.grid_id, lgm.lng, lgm.lat, lgm.level
        FROM
        (
          $query_for_user_stage
        ) as tb
        LEFT JOIN zume_posts p ON p.ID=tb.post_id
        LEFT JOIN zume_dt_location_grid_meta lgm ON lgm.post_id=tb.post_id AND lgm.post_type='contacts'
        WHERE tb.stage IN $range;", ARRAY_A );

    return empty( $results ) ? [] : $results;
}
```

**Purpose**: Gets users at specific stages with their location data.

#### 3. Training Subtype Counts Query
```php
public static function training_subtype_counts() {
    global $wpdb;

    $results = $wpdb->get_results( $wpdb->prepare(
        "SELECT subtype, COUNT(*) as value
        FROM zume_dt_reports
        WHERE type = 'training' AND subtype LIKE '%heard'
        GROUP BY subtype
        " ), ARRAY_A );

    return empty( $results ) || is_wp_error( $results ) ? [] : $results;
}
```

**Purpose**: Counts all training "heard" reports by subtype.

#### 4. Total Practitioners Query
```php
public static function query_total_practitioners(): int {
    global $wpdb;
    $query_for_user_stage = self::$query_for_user_stage;

    $results = $wpdb->get_var(
        "SELECT count(*) as practitioners
            FROM
            (
                $query_for_user_stage
            ) as tb
        WHERE tb.stage >= 4;"
    );

    return $results ? (int) $results : 0;
}
```

**Purpose**: Counts users at stage 4 or higher (practitioners).

### Common Query Patterns

#### 1. Get User's Current Stage
```sql
SELECT MAX(value) as stage 
FROM zume_dt_reports 
WHERE user_id = ? AND type = 'system' AND subtype = 'current_level'
```

#### 2. Get User's Training Progress
```sql
SELECT subtype, COUNT(*) as count 
FROM zume_dt_reports 
WHERE user_id = ? AND type = 'training' 
GROUP BY subtype
```

#### 3. Get Location-Based Reports
```sql
SELECT * FROM zume_dt_reports 
WHERE grid_id = ? AND type != 'system'
ORDER BY timestamp DESC
```

#### 4. Get Recent Activity
```sql
SELECT * FROM zume_dt_reports 
WHERE timestamp > ? AND type != 'system'
ORDER BY timestamp DESC
```

## Business Logic Patterns

### Automatic Report Generation
The system automatically generates additional reports based on certain triggers:

1. **Training Progress Cascade**: When a user completes a higher-level training action, lower-level actions are automatically logged:
   - `{session}_trained` → `{session}_shared` → `{session}_obeyed` → `{session}_heard`

2. **Profile Completion**: When users complete profile components, system generates celebration reports:
   - `set_profile_name` + `set_profile_location` → `set_partial_profile`
   - All profile components → `set_profile` → `celebrated_set_profile`

3. **Training Joining**: When users join training, system creates plan-related reports:
   - `joined_online_training` → `plan_created` → `celebrate_plan_created`

### Stage Management
- The `value` field in `system.current_level` reports contains the user's current stage number
- Stages typically range from 1-6, with higher numbers indicating more advanced training
- Stage changes are tracked and can trigger additional system actions

### Location Tracking
- Reports can include geographic data (`lng`, `lat`, `grid_id`, `level`)
- Location data is used for mapping and regional analytics
- Anonymous reports also track location for aggregate statistics

## Usage Examples

### Creating a Training Report
```php
$data = [
    'user_id' => 123,
    'type' => 'training',
    'subtype' => '1_heard',
    'value' => 1,
    'timestamp' => time(),
    'grid_id' => 456,
    'lng' => -122.4194,
    'lat' => 37.7749,
    'language_code' => 'en'
];

$report_id = Zume_System_Log_API::insert($data);
```

### Getting User Progress
```php
$user_id = 123;
$log = zume_get_user_log($user_id);
$stage = zume_get_user_stage($user_id, $log);
echo "User is at stage: " . $stage;
```

### Querying Training Completion
```php
$results = $wpdb->get_results(
    "SELECT user_id, COUNT(*) as sessions_completed 
     FROM zume_dt_reports 
     WHERE type = 'training' AND subtype LIKE '%_heard' 
     GROUP BY user_id 
     HAVING sessions_completed >= 10"
);
```

## Core Logging System Functions

### `Zume_System_Log_API::log()`
**Purpose**: Main entry point for creating reports in the system.

**Key Logic**:
1. **Data Preparation**: Initializes a report array with default values
2. **User ID Resolution**: Uses provided user_id, current logged-in user, or 0 for anonymous
3. **Location Detection**: Gets user location from data or user profile
4. **Language Detection**: Uses provided language or user's preferred language
5. **Duplicate Prevention**: Checks if report already exists when `log_once = true`
6. **Data Enhancement**: Prepares post_id, time_end, value, and payload
7. **Hash Generation**: Creates SHA256 hash for duplicate detection
8. **Database Insertion**: Inserts the report into `zume_dt_reports`
9. **Additional Actions**: Triggers automatic report generation based on business rules
10. **Stage Management**: Checks for and creates stage progression reports
11. **Plan Updates**: Updates user's encouragement plan

**Parameters**:
- `$type` (string): Report type (training, system, coaching, etc.)
- `$subtype` (string): Specific action within the type
- `$data` (array): Additional data for the report
- `$log_once` (bool): Prevent duplicate reports

### `Zume_System_Log_API::_add_additional_log_actions()`
**Purpose**: Implements complex business logic that automatically generates additional reports based on triggers.

**Key Business Rules**:

#### 1. Training Progress Cascade
When a user completes a higher-level action, lower-level actions are automatically logged:
- `{session}_trained` → `{session}_shared` → `{session}_obeyed` → `{session}_heard`
- `{session}_shared` → `{session}_obeyed` → `{session}_heard`
- `{session}_obeyed` → `{session}_heard`

#### 2. Coaching Progress Cascade
Similar cascade for coaching activities:
- `{session}_launching` → `{session}_watching` → `{session}_assisting` → `{session}_modeling`

#### 3. Profile Completion Triggers
- When both `set_profile_name` and `set_profile_location` exist → `set_partial_profile`
- When all profile components exist → `set_profile` → `celebrated_set_profile`

#### 4. Training Session Mapping
When users complete training sets, individual session reports are automatically created:
- `set_a_01` → `1_heard`, `2_heard`, `3_heard`, `4_heard`, `5_heard`
- `set_b_01` → `1_heard`, `2_heard`, `3_heard`
- And many more complex mappings for all training sets

#### 5. Completion Milestones
- Training completion triggers when all sessions are heard
- Host completion when user has shared 25+ sessions and trained 5+ sessions
- MAWL completion when user has modeled, assisted, and watched 16+ sessions each

#### 6. System Registration
- Automatically logs `training.registered` for logged-in users who haven't been registered

### `zume_get_user_log()`
**Purpose**: Retrieves all reports for a specific user with optional filtering.

**Key Logic**:
1. **Base Query**: Selects all reports for the user with `post_type = 'zume'`
2. **Type Filtering**: Optionally filters by specific report type
3. **Subtype Filtering**: Optionally filters by specific subtype
4. **Result Formatting**: Returns array of reports with `log_key` field (concatenated type_subtype)
5. **Error Handling**: Returns empty array if query fails

**Parameters**:
- `$user_id` (int): WordPress user ID
- `$type` (string, optional): Filter by report type
- `$subtype` (string, optional): Filter by report subtype

**Return**: Array of report objects with all database fields plus `log_key`

### Key Helper Functions

#### `_needs_to_be_logged()` and `_already_logged()`
- Check if a specific type/subtype combination already exists in user's log
- Used to prevent duplicate automatic report generation

#### `_check_for_stage_change()`
- Monitors user's current stage vs. highest logged stage
- Automatically creates `system.current_level` reports for stage progression
- Creates reports for each stage level between current and highest logged

#### `insert()` and `insert_anonymous()`
- Handle database insertion with duplicate checking
- Generate SHA256 hashes for duplicate prevention
- Trigger WordPress actions after successful insertion

This logging system creates a comprehensive audit trail of user activities while automatically generating related reports based on complex business rules, ensuring data integrity and providing rich analytics capabilities.

This documentation provides a comprehensive understanding of the `zume_dt_reports` table structure, usage patterns, and query strategies for AI systems to accurately interpret and work with this data.


