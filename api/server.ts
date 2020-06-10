import Context from '../server/typings/context.type'
import types, { Types } from './types.component'
import { User } from '../database/schema'

import { ApolloServer } from 'apollo-server-express'
import _getFirebaseUserObjectFromRequest, {
	GetFirebaseUserObjectFromRequest,
} from '../shared/components/cookie/server'

interface APIContext {
	user: Promise<GetFirebaseUserObjectFromRequest>
}

const snapshot: Types.Snapshot = {
	changes: '',
	id: '',
	parentName: '',
	version: '',
	versionRepoURL: '',
}
const pkg: Types.Package = {
	name: '',
	versions: [''],
	snapshot: snapshot,
}

export default (ctx: Context) =>
	new ApolloServer({
		resolvers: {
			Query: {
				package(
					parent,
					{ name }: { name: string },
					ctx: APIContext,
					info
				): Types.Package {
					return pkg
				},
				version(
					parent,
					{ id }: { id: string },
					ctx: APIContext,
					info
				): Types.Snapshot {
					return snapshot
				},
				latest(
					parent,
					{ name }: { name: string },
					ctx: APIContext,
					info
				): Types.Snapshot {
					return snapshot
				},
			},
		},
		typeDefs: types,
		context: ({ req, res, connection }): APIContext =>
			(function (): APIContext {
				const getFirebaseUserObjectFromRequest = _getFirebaseUserObjectFromRequest(
					ctx
				)

				return {
					user: getFirebaseUserObjectFromRequest(req),
				}
			})(),
	})
