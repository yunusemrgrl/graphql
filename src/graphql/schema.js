const typeDefs = `type User {
id: ID!
username: String!
email: String!
events: [Event!]!
participants: [Participant!]!
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
location: Location!
user_id: ID!
user: User!
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
user: User!
event_id: ID!
event: Event!
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
updatedParticipant(event_id: ID): Participant!
participantCreated: Participant!
eventCreated: Event!
}
schema {
query: Query
mutation: Mutation
subscription: Subscription
}`

module.exports = typeDefs;