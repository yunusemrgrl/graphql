const Event = {
    user: (parent,_,{db}) => {
        return db.users.find((user) => user.id == parent.user_id)
    },
    location: (parent,_,{db}) => {
        return db.locations.find((location) => location.id == parent.location_id)
    }
}

module.exports.Event = Event;