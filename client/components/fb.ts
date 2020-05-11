import Schema from "../typings/storage.type"

import { auth, firestore } from "firebase"

import _StorageHandler from "./storageHandler"

const storageHandler = new _StorageHandler<Schema>()

export function getSmartCache<T>(
	query: firestore.Query<T>,
	queryID: string,
	timeout: number
): Promise<firestore.QuerySnapshot<T>> {
	return new Promise((res, rej) => {
		const fbcData = () =>
			storageHandler.getItem("firestorePersistenceData") || {}

		const updateTime = () =>
			storageHandler.setItem("firestorePersistenceData", {
				...(fbcData() || {}),
				[queryID]: Date.now(),
			})

		const getFromServer = () =>
			query.get({ source: "server" }).then((data) => {
				updateTime()
				res(data)
			}, rej)

		if (!fbcData()[queryID]) updateTime()

		if (Date.now() - fbcData()[queryID] < timeout)
			query.get({ source: "cache" }).then((data) => {
				if (data.empty) getFromServer()
				else res(data)
			}, rej)
		else {
			getFromServer()
		}
	})
}
