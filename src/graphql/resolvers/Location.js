const Location = {
    user: (parent) => {
        return users.find((user) => user.id == parent.user_id)
    },
    event: (parent) => {
        return events.find((location) => location.id == parent.event_id)
    }
}

module.exports = Location;