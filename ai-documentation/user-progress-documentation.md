# Zume User Progress Flow Documentation

## Overview

The Zume Training System implements a sophisticated user progression system that tracks users through various stages of discipleship training and multiplication. The system uses a funnel-based approach with 7 distinct stages (0-6) that represent different levels of engagement and competency.

## Core Functions

### `zume_get_user_stage($user_id, $log, $number_only)`

**Purpose**: Determines the current stage of a user based on their activity log and progress indicators.

**Parameters**:
- `$user_id` (int|null): User ID to check, defaults to current user
- `$log` (array|null): User activity log, defaults to fetching from database
- `$number_only` (bool): Return only stage number (true) or full stage object (false)

**Returns**: 
- If `$number_only = true`: Integer stage value (0-6)
- If `$number_only = false`: Array containing stage data and user state

## Funnel Stages

The system defines 7 progressive stages through the `zume_funnel_stages()` function:

### Stage 0: Anonymous (Value: 0)
- **Key**: `anonymous`
- **Label**: Anonymous
- **Description**: Anonymous visitors to the website
- **Characteristics**: Anonymous website visitor
- **Next Steps**: Register, Join online training, Get a coach

### Stage 1: Registrant (Value: 1)
- **Key**: `registrant`
- **Label**: Registrant
- **Description**: Trainee who has registered for the training
- **Characteristics**: Has registered for a user account
- **Next Steps**: Make a training plan, Invite friends

### Stage 2: Active Training (Value: 2)
- **Key**: `active_training_trainee`
- **Label**: Active Training Trainee
- **Description**: Trainee who is in active training
- **Characteristics**: Has made a training plan
- **Next Steps**: Complete training, Create post training plan

### Stage 3: Post-Training (Value: 3)
- **Key**: `post_training_trainee`
- **Label**: Post-Training Trainee
- **Description**: Trainee who has completed training
- **Characteristics**: Has completed training
- **Next Steps**: Make first practitioner report, Complete post training plan, Establish ongoing coaching relationship

### Stage 4: Partial Practitioner (Value: 4)
- **Key**: `partial_practitioner`
- **Label**: (S1) Partial Practitioner
- **Description**: Practitioner still coaching through MAWL checklist
- **Characteristics**: 
  - Has made first practitioner report
  - Working on HOST/MAWL checklist
  - Consistent effort, inconsistent fruit
- **Next Steps**: Full skills competence, Continued reporting, Connect with S1 and S2 practitioners

### Stage 5: Full Practitioner (Value: 5)
- **Key**: `full_practitioner`
- **Label**: (S2) Practitioner
- **Description**: Practitioner who has completed the MAWL checklist, but is not multiplying
- **Characteristics**:
  - Has completed HOST/MAWL
  - Consistent effort, inconsistent fruit
  - Inconsistent 1st generation fruit
- **Next Steps**: Consistent 2,3,4 generation fruit, Consistent 2,3,4 gen groups, Peer coaching/mentoring

### Stage 6: Multiplying Practitioner (Value: 6)
- **Key**: `multiplying_practitioner`
- **Label**: (S3) Multiplying Practitioner
- **Description**: Practitioner who is seeing generational fruit
- **Characteristics**:
  - 2,3,4 generations of disciples
  - 2,3,4 generations of churches
- **Next Steps**: Downstream coaching for consistent generations

## Progression Logic

The system tracks user progression through specific activity subtypes in the user log:

### Stage Advancement Triggers

#### Stage 1 → Stage 2
- **Trigger**: `registered` subtype logged
- **Action**: User has registered for an account

#### Stage 2 → Stage 3
- **Trigger**: `plan_created` subtype logged
- **Action**: User has created a training plan

#### Stage 3 → Stage 4
- **Triggers**:
  - `training_completed` subtype logged
  - OR 25+ "heard" activities logged (indicating training completion)
- **Action**: User has completed the training curriculum

#### Stage 4 → Stage 5
- **Triggers**:
  - `first_practitioner_report` subtype logged
  - OR `join_community` subtype logged
- **Action**: User has made their first practitioner report or joined a community

#### Stage 5 → Stage 6
- **Triggers**:
  - `mawl_completed` subtype logged
  - OR `host_completed` subtype logged
- **Action**: User has completed the MAWL (Model, Assist, Watch, Leave) checklist

#### Stage 6 (Final Stage)
- **Triggers**:
  - `seeing_generational_fruit` subtype logged
  - OR `new_church` subtype logged
- **Action**: User is seeing generational multiplication

### Manual Stage Overrides

The system also supports manual stage advancement through specific subtypes:
- `manual_upgrade_to_2`: Force advancement to Stage 2
- `manual_upgrade_to_3`: Force advancement to Stage 3
- `manual_upgrade_to_4`: Force advancement to Stage 4
- `manual_upgrade_to_5`: Force advancement to Stage 5
- `manual_upgrade_to_6`: Force advancement to Stage 6

## User State Tracking

In addition to stage progression, the system tracks detailed user state through various activity subtypes:

### Profile Completion
- `set_profile`: User has set their profile
- `set_profile_location`: User has set their location
- `set_profile_phone`: User has set their phone number
- `set_profile_name`: User has set their name

### Training Engagement
- `joined_online_training`: User has joined online training
- `invited_friends`: User has invited friends
- `requested_a_coach`: User has requested coaching (includes timestamp)
- `made_post_training_plan`: User has created a post-training plan
- `completed_3_month_plan`: User has completed their 3-month plan

### Advanced Features
- `can_create_3_month_plan`: Triggered when user completes training session 26
- `join_community`: User has joined a community
- `first_practitioner_report`: User has made their first practitioner report

## Stage Change Detection

### `_check_for_stage_change()` Function

**Purpose**: Automatically detects and logs stage changes when user activity triggers progression.

**Process**:
1. Retrieves current user stage
2. Finds the highest previously logged stage in user history
3. If current stage is higher than logged stage, creates system logs for each intermediate stage
4. Each stage change is logged with:
   - Type: `system`
   - Subtype: `current_level`
   - Value: Stage number
   - Location data from user profile
   - Unique hash for deduplication

**Location**: `globals.php` lines 8191-8223

## Implementation Details

### Log Structure
User activities are logged with the following structure:
```php
[
    'type' => 'activity_type',
    'subtype' => 'specific_action',
    'timestamp' => time(),
    'user_id' => $user_id,
    'value' => $stage_number,
    'hash' => $unique_hash
]
```

### Stage Determination Algorithm
1. Initialize funnel steps array (all false)
2. Process each log entry to check for progression triggers
3. Set corresponding funnel step to true when trigger is found
4. Determine highest achieved stage based on funnel steps
5. Return stage data with user state information

### Performance Considerations
- User logs are cached to avoid repeated database queries
- Stage calculations are performed in-memory for efficiency
- Hash-based deduplication prevents duplicate stage change logs

## Usage Examples

### Getting User Stage
```php
// Get current user's stage number
$stage_number = zume_get_user_stage(null, null, true);

// Get current user's full stage data
$stage_data = zume_get_user_stage();

// Get specific user's stage
$user_stage = zume_get_user_stage($user_id);
```

### Checking Stage Progression
```php
// Check if user has completed training
$user_log = zume_get_user_log($user_id);
$has_completed_training = false;

foreach ($user_log as $entry) {
    if ($entry['subtype'] === 'training_completed') {
        $has_completed_training = true;
        break;
    }
}
```

## Related Functions

- `zume_get_user_log()`: Retrieves user activity log
- `zume_get_user_location()`: Gets user location data
- `zume_get_user_contact_id()`: Gets user contact ID
- `zume_log_insert()`: Inserts new log entries

## Notes

- Stage progression is irreversible - users cannot move backward in stages
- Manual stage overrides bypass normal progression logic
- The system automatically handles stage change logging when new activities are recorded
- User state tracking provides detailed insights into user engagement beyond just stage level
