import { ApolloServer, gql } from 'apollo-server-express'

import types from './types.component'
import Package from '../db/models/package'

export default new ApolloServer({
	resolvers: {
		Query: {
			package(parent, args, context, info) {
				Package.find({ name: args.name })
			},
			version(parent, args, context, info) {
				
			},
			latest(parent, args, context, info) {},
		},
	},
	typeDefs: types,
})
