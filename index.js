const {createYoga, createPubSub}  =  require("graphql-yoga");
const {createServer }  =  require("node:http");
const { createSchema } = require('graphql-yoga');

const { v4: uuidv4 } = require("uuid");

const { events, users, participants, locations } = require("./data.json");
const pubSub = createPubSub();

const schema = createSchema({
    typeDefs:`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
    }

    input UpdateUserInput {
        username: String
        email: String
    }

    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: Int!
        user_id: ID!
    }

    input CreateEventInput {
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: Int!
        user_id: ID!
    }

    input UpdateEventInput {
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: Int
        user_id: ID
    }

    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input CreateLocationInput {
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input UpdateLocationInput {
        name: String
        desc: String
        lat: Float
        lng: Float
    }

    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }

    input CreateParticipantInput {
        user_id: ID!
        event_id: ID!
    }

    input UpdateParticipantInput {
        user_id: ID
        event_id: ID
    }

    type DeleteAllOutput {
        count: Int!
    }

    type Query {
        # USER
        users: [User!]!
        user(id: ID!): User!

        # EVENT
        events: [Event!]!
        event(id: ID!): Event!

        # LOCATİON
        locations: [Location!]!
        location(id: ID!): Location!

        # PARTİCİPANT
        participants: [Participant!]!
        participant(id: ID!): Participant!
    }

    type Mutation {
        # USER
        createUser(data: CreateUserInput!): User!
        updateUser(id: ID!, data: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
        deleteAllUser: DeleteAllOutput!

        # EVENT
        createEvent(data: CreateEventInput!): Event!
        updateEvent(id: ID!, data: UpdateEventInput!): Event!
        deleteEvent(id: ID!): Event!
        deleteAllEvent: DeleteAllOutput!

        # LOCATİON
        createLocation(data: CreateLocationInput!): Location!
        updateLocation(id: ID!, data: UpdateLocationInput!): Location!
        deleteLocation(id: ID!): Location!
        deleteAllLocation: DeleteAllOutput!

        # PARTİCİPANT
        createParticipant(data: CreateParticipantInput!): Participant!
        updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
        deleteParticipant(id: ID!): Participant!
        deleteAllParticipant: DeleteAllOutput!
    }
    
     type Subscription {
        userCreated: User!
     }
`,
    resolvers:{
        Query: {
            // USER
            users: () => users,
            user: (parent, args) => users.find((user) => user.id === parseInt(args.id)),

            // EVENT
            events: () => events,
            event: (parent, args) =>
                events.find((event) => event.id === parseInt(args.id)),

            // LOCATİON
            locations: () => locations,
            location: (parent, args) =>
                locations.find((location) => location.id === parseInt(args.id)),

            // PARTİCİPANT
            participants: () => participants,
            participant: (parent, args) =>
                participants.find((participant) => participant.id === parseInt(args.id)),
        },
        Mutation: {
            // USER
            createUser: (parent, { data }) => {
                const newUser = { id: uuidv4(), ...data };
                users.push(newUser);
                pubSub.publish('userCreated',{newUser})
                return newUser;
            },
            updateUser: (parent, { id, data }) => {
                const userIndex = users.findIndex((user) => user.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error("User not found.");
                }
                const updateUser = (users[userIndex] = {
                    ...users[userIndex],
                    ...data,
                });
                return updateUser;
            },
            deleteUser: (parent, { id }) => {
                const userIndex = users.findIndex((user) => user.id === parseInt(id));
                if (userIndex === -1) {
                    throw new Error("User not found.");
                }
                const deletedUser = users[userIndex];
                users.splice(userIndex, 1);
                return deletedUser;
            },
            deleteAllUser: () => {
                const userLength = users.length;
                users.splice(0, userLength);
                return {
                    count: userLength,
                };
            },

            // EVENT
            createEvent: (parent, { data }) => {
                const newEvent = { id: uuidv4(), ...data };
                events.push(newEvent);
                return newEvent;
            },
            updateEvent: (parent, { id, data }) => {
                const eventIndex = events.findIndex((event) => event.id === parseInt(id));
                if (eventIndex === -1) {
                    throw new Error("Event not found.");
                }
                const updateEvent = (events[eventIndex] = {
                    ...events[eventIndex],
                    ...data,
                });
                return updateEvent;
            },
            deleteEvent: (parent, { id }) => {
                const eventIndex = events.findIndex((event) => event.id === parseInt(id));
                if (eventIndex === -1) {
                    throw new Error("Event not found.");
                }
                const deletedEvent = events[eventIndex];
                events.splice(eventIndex, 1);
                return deletedEvent;
            },
            deleteAllEvent: () => {
                const eventLength = events.length;
                events.splice(0, eventLength);
                return {
                    count: eventLength,
                };
            },

            // LOCATİON
            createLocation: (parent, { data }) => {
                const newLocation = { id: uuidv4(), ...data };
                locations.push(newLocation);
                return newLocation;
            },
            updateLocation: (parent, { id, data }) => {
                const locationIndex = locations.findIndex(
                    (location) => location.id === parseInt(id)
                );

                if (locationIndex === -1) {
                    throw new Error("Location not found.");
                }

                const updateLocation = (locations[locationIndex] = {
                    ...locations[locationIndex],
                    ...data,
                });

                return updateLocation;
            },
            deleteLocation: (parent, { id }) => {
                const locationIndex = locations.findIndex(
                    (location) => location.id === parseInt(id)
                );

                if (locationIndex === -1) {
                    throw new Error("Location not found");
                }

                const deletedLocation = locations[locationIndex];
                locations.splice(locationIndex, 1);

                return deletedLocation;
            },
            deleteAllLocation: () => {
                const locationLength = locations.length;
                locations.splice(0, locationLength);
                return {
                    count: locationLength,
                };
            },

            // PARTİCİPANT
            createParticipant: (parent, { data }) => {
                const newParticipant = { id: uuidv4(), ...data };
                participants.push(newParticipant);
                return newParticipant;
            },
            updateParticipant: (parent, { id, data }) => {
                const participantIndex = participants.findIndex(
                    (participant) => participant.id === parseInt(id)
                );
                if (participantIndex === -1) {
                    throw new Error("Participant not found.");
                }
                const updateParticipant = (participants[participantIndex] = {
                    ...participants[participantIndex],
                    ...data,
                });
                return updateParticipant;
            },
            deleteParticipant: (parent, { id }) => {
                const participantIndex = participants.findIndex(
                    (participant) => participant.id === parseInt(id)
                );
                if (participantIndex === -1) {
                    throw new Error("Participant not found.");
                }
                const deletedParticipant = participants[participantIndex];
                participants.splice(participantIndex, 1);
                return deletedParticipant;
            },
            deleteAllParticipant: () => {
                const participantLength = participants.length;
                participants.splice(0, participantLength);
                return {
                    count: participantLength,
                };
            },
        },
        Subscription:{
            userCreated:{
                subscribe: ()=>pubSub.subscribe('userCreated'),
                resolve: (payload) => payload.newUser
            }
        }
    }

})


const yoga = createYoga({schema})

const server = createServer(yoga)

server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
})