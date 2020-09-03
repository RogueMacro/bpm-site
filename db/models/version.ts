import {
	prop,
	index,
	modelOptions,
	getModelForClass,
} from '@typegoose/typegoose'
import { Package } from './package'

@modelOptions({ schemaOptions: { collection: 'Versions_V0_1' } })
@index({})
export class Version {
	@prop()
	public versionRepoURL: string

	@prop()
	public version: string

	@prop()
	public repoType: 'git'

	@prop()
	public changes?: string

	@prop()
	public parentName: string

	@prop()
	public parentID: any
}

export default getModelForClass(Version)
