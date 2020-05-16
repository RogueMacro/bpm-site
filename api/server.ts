import { ApolloServer } from 'apollo-server-express'

import types from './types.component'

export default new ApolloServer({
	resolvers: {
		Query: {
			v1: {},
		},
	},
	typeDefs: types,
})
