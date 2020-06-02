import Server from '../../node_modules/next/dist/next-server/server/next-server'
import { firestore } from 'firebase-admin'

interface Context {
	next: Server
	packages: firestore.CollectionReference<firestore.DocumentData>
}
export default Context
