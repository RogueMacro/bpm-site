import Context from '../../../server/typings/context.type'
import { Request } from 'express'
import { User } from '../../../database/schema'

import { auth } from 'firebase-admin'
import { parseCookieString } from './codec'


export type GetFirebaseUserObjectFromRequest = FirebaseFirestore.DocumentSnapshot<Partial<User>> | undefined

export const getFirebaseUserObjectFromRequest = ({ users }: Context) => async (
	req: Request
): Promise<GetFirebaseUserObjectFromRequest> => {
	const user = parseCookieString(req).user

	if (typeof user === 'string')
		try {
			return await users
				.doc((await auth().verifyIdToken(user, true)).uid)
				.get()
		} catch (err) {
			console.error(err, 'in token parsing')
			return undefined
		}
	else return undefined
}
export default getFirebaseUserObjectFromRequest
