interface Schema {
	firestorePersistenceData: {
		[queryID: string]: number // spawned at
	}
	isDarkMode: boolean
}
export default Schema
