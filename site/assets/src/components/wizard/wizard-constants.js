export const Wizards = {
    gettingStarted: 'getting-started',
    makeAGroup: 'make-a-group',
    makeFirstGroup: 'make-first-group',
    makeMoreGroups: 'make-more-groups',
    getACoach: 'get-a-coach',
    joinATraining: 'join-a-training',
    planDecision: 'plan-decision',
    notifyOfFutureTrainings: 'notify-of-future-trainings',
    connectWithFriend: 'connect-with-friend',
    joinFriendsPlan: 'join-friends-training',
    joinFriendsPlanWithCode: 'join-friends-training-with-code',
    checkin: 'checkin',
    setProfile: 'set-profile',
    joinCommunity: 'join-the-community',
    joinCommunityFromVision: 'join-the-community-vision',
    inviteFriends: 'invite',
}
export const Modules = {
    completeProfile: 'completeProfile',
    makePlan: 'makePlan',
    inviteFriends: 'inviteFriends',
    getACoach: 'getACoach',
    joinTraining: 'joinTraining',
    connectFriend: 'connectFriend',
    joinFriendsTraining: 'joinFriendsTraining',
    notifyOfFutureTrainings: 'notifyOfFutureTrainings',
    checkin: 'checkin',
    planDecision: 'planDecision',
    joinCommunity: 'joinCommunity',
    joinCommunityFromVision: 'joinCommunityFromVision',
}
const makeAPlanSteps = {
    planDecision: 'plan-decision',
    howManySessions: 'how-many-sessions',
    scheduleDecision: 'schedule-decision',
    howOften: 'how-often',
    startDate: 'what-start-date',
    timeNote: 'time-note',
    location: 'what-location',
    review: 'review-steps',
    name: 'group-name',
}
export const Steps = {
    updateName: 'update-your-name',
    updateLocation: 'update-your-location',
    updatePhone: 'update-your-phone',
    inviteFriends: 'invite-friends',
    requestCoachExplanation: 'request-coach-explanation',
    contactPreferences: 'contact-preferences',
    languagePreferences: 'preferred-language',
    howCanWeServe: 'how-can-we-serve',
    connectingToCoach: 'connecting-to-coach',
    joinTraining: 'public-training',
    joinTrainingSelection: 'public-training-selection',
    connectToFriend: 'connect-friend',
    joinFriendsPlan: 'friend-training',
    joinCode: 'join-code',
    confirmPlan: 'verify-plan',
    checkinSubmit: 'checkin-submit',
    joinCommunity: 'join-community',
    joinCommunityExplanation: 'join-community-explanation',
    notifyOfFutureTrainings: 'notify-of-future-trainings',
    ...makeAPlanSteps,
}
export const ConnectedFields = {
    [Steps.updateName]: {
        field: 'name',
        testExistance: (field, profile) => profile.has_set_name,
    },
    [Steps.updateLocation]: {
        field: 'location',
        testExistance: (field) => {
            if (field.source && field.source === 'ip') {
                return false
            }
            return true
        },
    },
    [Steps.updatePhone]: {
        field: 'phone',
        testExistance: (phone) => !!phone,
    },
}
