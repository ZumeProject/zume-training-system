import {
    Wizards,
    Modules,
    Steps,
} from "./wizard-constants";

export const wizardDefinitions = {
    [Wizards.gettingStarted]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], false),
        [Modules.planDecision]: makeModule([
            Steps.planDecision
        ], false),
    },
    [Wizards.setProfile]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
    },
    [Wizards.makeAGroup]: {
        [Modules.makePlan]: makeModule([
            Steps.howManySessions,
            Steps.howOften,
            Steps.startDate,
            Steps.location,
            Steps.review,
            Steps.inviteFriends,
        ], true),
    },
    [Wizards.getACoach]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
            Steps.updatePhone,
        ]),
        [Modules.getACoach]: makeModule([
            Steps.contactPreferences,
            Steps.languagePreferences,
            Steps.howCanWeServe,
            Steps.connectingToCoach,
        ]),
    },
    [Wizards.joinATraining]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
            Steps.updatePhone,
        ]),
        [Modules.joinTraining]: makeModule([
            Steps.joinTraining,
        ], true),
    },
    [Wizards.connectWithFriend]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
        [Modules.connectFriend]: makeModule([
            Steps.connectToFriend,
        ])
    },
    [Wizards.joinFriendsPlan]: {
        [Modules.completeProfile]: makeModule([
            Steps.updateName,
            Steps.updateLocation,
        ], true),
        [Modules.joinFriendsTraining]: makeModule([
            Steps.joinFriendsPlan,
        ])
    },
    [Wizards.joinCommunity]: {
        [Modules.joinCommunity]: makeModule([
            Steps.joinCommunity,
        ], true),
    },
    [Wizards.checkin]: {
        [Modules.checkin]: makeModule([
            Steps.checkinSubmit,
        ])
    },
}

function makeModule( stepNames = [], skippable = false ) {

    const module = {
        steps: [],
        skippable,
    }

    stepNames.forEach(stepName => {
        if ( !Object.values(Steps).includes(stepName) ) {
            return
        }
        module.steps.push(stepName)
    });

    return module
}