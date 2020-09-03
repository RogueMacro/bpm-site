import { connect, disconnect as mdc, connection, Connection } from 'mongoose'

let db: Connection

export default () => {
	if (db) return

	if (process.env.DB_URL) {
		connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		db = connection

		db.once('open', () => console.log('db online'))
		db.on('error', () => console.log('fuck you'))
	}
}

export const disconnect = () => mdc()
