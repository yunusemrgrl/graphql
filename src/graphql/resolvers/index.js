// const Query = require('./Query');
// const Mutation = require('./Mutation');
// const Subscription = require('./Subscription');
// const Participant = require('./Participant');
// const Event = require('./Event');
// const User = require('./User');
// const Location = require('./Location');
//
// module.exports = {
//     Query,
//     Mutation,
//     Subscription,
//     Participant,
//     Event,
//     User,
//     Location
// }

const path = require('path')
const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const resolversArray = loadFilesSync(path.join(__dirname,))

module.exports = mergeResolvers(resolversArray)