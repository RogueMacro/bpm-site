import { Request, Response } from 'express'
import context from '../../../server/typings/context.type'

const render = ({ next }: context) => {
	return async (
		req: Request,
		res: Response,
		page: string,
		ssgData: any,
		query?: NodeJS.Dict<string | string[]>
	) =>
		await next.render(req, res, page, {
			...query,
			payload: JSON.stringify(ssgData),
		})
}

export default render
