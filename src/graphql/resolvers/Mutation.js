const {v4: uuidv4} = require("uuid");
const Mutation = {
    // USER
    createUser: (parent, { data },{db,pubSub}) => {
        const newUser = { id: uuidv4(), ...data }
        db.users.push(newUser)
        pubSub.publish('userCreated', { newUser })
        return newUser
    },
    updateUser: (parent, { id, data },{db,pubSub}) => {
        const userIndex = db.users.findIndex((user) => user.id == parseInt(id))
        if (userIndex === -1) {
            throw new Error('User not found.')
        }
        const updateUser = (db.users[userIndex] = {
            ...db.users[userIndex],
            ...data
        })
        return updateUser
    },
    deleteUser: (parent, { id },{db}) => {
        const userIndex = db.users.findIndex((user) => user.id == parseInt(id))
        if (userIndex === -1) {
            throw new Error('User not found.')
        }
        const deletedUser = db.users[userIndex]
        db.users.splice(userIndex, 1)
        return deletedUser
    },
    deleteAllUser: (_,__,{db}) => {
        const userLength = db.users.length
        db.users.splice(0, userLength)
        return {
            count: userLength
        }
    },

    // EVENT
    createEvent: (parent, { data },{db,pubSub}) => {
        const newEvent = { id: uuidv4(), ...data }
        db.events.push(newEvent)
        pubSub.publish('eventCreated', { newEvent })
        return newEvent
    },
    updateEvent: (parent, { id, data },{db}) => {
        const eventIndex = db.events.findIndex(
            (event) => event.id == parseInt(id)
        )
        if (eventIndex === -1) {
            throw new Error('Event not found.')
        }
        const updateEvent = (db.events[eventIndex] = {
            ...db.events[eventIndex],
            ...data
        })
        return updateEvent
    },
    deleteEvent: (parent, { id },{db}) => {
        const eventIndex = db.events.findIndex(
            (event) => event.id == parseInt(id)
        )
        if (eventIndex === -1) {
            throw new Error('Event not found.')
        }
        const deletedEvent = db.events[eventIndex]
        db.events.splice(eventIndex, 1)
        return deletedEvent
    },
    deleteAllEvent: (_,__,{db}) => {
        const eventLength = db.events.length
        db.events.splice(0, eventLength)
        return {
            count: eventLength
        }
    },

    // LOCATİON
    createLocation: (parent, { data },{db}) => {
        const newLocation = { id: uuidv4(), ...data }
        db.locations.push(newLocation)
        return newLocation
    },
    updateLocation: (parent, { id, data },{db}) => {
        const locationIndex = db.locations.findIndex(
            (location) => location.id == parseInt(id)
        )

        if (locationIndex === -1) {
            throw new Error('Location not found.')
        }

        const updateLocation = (db.locations[locationIndex] = {
            ...db.locations[locationIndex],
            ...data
        })

        return updateLocation
    },
    deleteLocation: (parent, { id },{db}) => {
        const locationIndex = db.locations.findIndex(
            (location) => location.id == parseInt(id)
        )

        if (locationIndex === -1) {
            throw new Error('Location not found')
        }

        const deletedLocation = db.locations[locationIndex]
        db.locations.splice(locationIndex, 1)

        return deletedLocation
    },
    deleteAllLocation: (_,__,{db}) => {
        const locationLength = db.locations.length
        db.locations.splice(0, locationLength)
        return {
            count: locationLength
        }
    },

    // PARTİCİPANT
    createParticipant: (parent, { data },{db,pubSub}) => {
        const newParticipant = { id: uuidv4(), ...data }
        db.participants.push(newParticipant)
        pubSub.publish('participantCreated', { newParticipant })
        return newParticipant
    },
    updateParticipant: (parent, { id, data },{db,pubSub}) => {
        const participantIndex = db.participants.findIndex(
            (participant) => participant.id == parseInt(id)
        )
        if (participantIndex === -1) {
            throw new Error('Participant not found.')
        }
        const updateParticipant = (db.participants[participantIndex] = {
            ...db.participants[participantIndex],
            ...data
        })
        pubSub.publish('updateParticipant', { updateParticipant })

        return updateParticipant
    },
    deleteParticipant: (parent, { id },{db}) => {
        const participantIndex = db.participants.findIndex(
            (participant) => participant.id == parseInt(id)
        )
        if (participantIndex === -1) {
            throw new Error('Participant not found.')
        }
        const deletedParticipant = db.participants[participantIndex]
        db.participants.splice(participantIndex, 1)
        return deletedParticipant
    },
    deleteAllParticipant: (_,__,{db}) => {
        const participantLength = db.participants.length
        db.participants.splice(0, participantLength)
        return {
            count: participantLength
        }
    }
}

module.exports.Mutation = Mutation;