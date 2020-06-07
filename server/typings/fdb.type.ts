import { firestore } from 'firebase-admin'

type FDB<T = firestore.DocumentData> = firestore.CollectionReference<T>
export default FDB
