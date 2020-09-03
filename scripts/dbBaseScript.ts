import dbConnect from '../db/network'

import { config } from 'dotenv'
config()

dbConnect()
export default ()=>{}