const User = {
    events: (parent, _,{db}) => db.events.filter((event) => event.user_id === parent.id),
    participants: (parent, _,{db}) => db.participants.filter((participant) => participant.user_id === parent.id),
}

module.exports = User;