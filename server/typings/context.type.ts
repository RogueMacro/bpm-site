import FDB from './fdb.type'
import { User, Package } from '../../database/schema'
import Server from '../../node_modules/next/dist/next-server/server/next-server'
import GQLClient from 'apollo-boost'

interface Context {
	next: Server
	packages: FDB<Partial<Package>>
	users: FDB<Partial<User>>
	github: GQLClient<any>
}
export default Context
