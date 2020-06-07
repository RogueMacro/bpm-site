import FDB from './fdb.type'
import { User, Package } from '../../database/schema'
import Server from '../../node_modules/next/dist/next-server/server/next-server'

interface Context {
	next: Server
	packages: FDB<Partial<Package>>
	users: FDB<Partial<User>>
}
export default Context
