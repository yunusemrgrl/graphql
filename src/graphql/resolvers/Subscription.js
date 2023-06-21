const {pipe, filter} = require("graphql-yoga");
const Subscription = {
    userCreated: {
        subscribe:(_,__,{pubSub}) => pubSub.subscribe('userCreated'),
        resolve: (payload) => payload.newUser
    },
    participantCreated: {
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('participantCreated'),
        resolve: (payload) => payload.newParticipant
    },
    updatedParticipant: {
        subscribe: (payload, args,{pubSub}) =>{
            return pipe(
                pubSub.subscribe('updateParticipant'),
                filter((payload) =>payload.updateParticipant.event_id == args.event_id)
            )
        },
        resolve: (payload) => payload.updateParticipant
    },
    eventCreated: {
        subscribe: (_,__,{pubSub}) => pubSub.subscribe('eventCreated'),
        resolve: (payload) => payload.newEvent
    }
}

module.exports = Subscription;