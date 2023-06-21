const { createYoga, createPubSub,createSchema, pipe, map, filter  } = require('graphql-yoga')
const { createServer } = require('node:http')
const db = require('./data.json')
const { join } = require('node:path')
const {importSchema} = require('graphql-import')

const {makeExecutableSchema} = require('@graphql-tools/schema')

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/types');

// const typeDefs = importSchema(join(__dirname, './graphql/types/schema.graphql'))

const pubSub = createPubSub();

const executableSchema  = makeExecutableSchema({
    typeDefs,
    resolvers
})

const yoga = createYoga({
    schema:executableSchema,
    context: {
        db,
        pubSub
    }
} );

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
