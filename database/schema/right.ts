import { firestore } from 'firebase-admin'

import { Package } from './package'

export interface Right {
	downloads: {
		daily: number
		monthly: number
		weekly: number

		total: number

		updated: Date
	}
	contributors: string[]
	owner: string

	// TODO:
	snapshot: firestore.DocumentReference<Package>
}
