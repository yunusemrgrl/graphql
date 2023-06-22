const Participant = {
    user: (parent,_,{db}) => {
        return db.users.find((user) => user.id == parent.user_id)
    },
    event: (parent,_,{db}) => {
        return db.events.find((event) => event.id == parent.event_id)
    }
}

module.exports.Participant = Participant;