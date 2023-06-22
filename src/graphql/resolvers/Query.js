const Query = {
    // USER
    users: (_,__,{db}) => db.users,
    user: (_, args,{db}) =>
    db.users.find((user) => user.id == parseInt(args.id)),

    // EVENT
    events: (_,__,{db}) => db.events,
    event: (_, args,{db}) =>
    db.events.find((event) => event.id == parseInt(args.id)),

    // LOCATİON
    locations: (_,__,{db}) => db.locations,
    location: (_, args,{db}) =>
    db.locations.find((location) => location.id == parseInt(args.id)),

    // PARTİCİPANT
    participants: (_,__,{db}) => db.participants,
    participant: (_, args,{db}) =>
    db.participants.find((participant) => participant.id == parseInt(args.id))
}

module.exports.Query = Query;