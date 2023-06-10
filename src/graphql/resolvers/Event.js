const Event = {
    user: (parent) => {
        return users.find((user) => user.id == parent.user_id)
    },
    location: (parent) => {
        return locations.find((location) => location.id == parent.location_id)
    }
}

module.exports = Event;