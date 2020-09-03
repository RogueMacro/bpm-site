import {
	prop,
	index,
	modelOptions,
	getModelForClass,
} from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { collection: 'Packages_V0_1' } })
@index({ name: 1 })
export class Package {
	// @prop({})
	// public propName: type

	@prop({ unique: true })
	public name: string

	@prop()
	public url: string
}

export default getModelForClass(Package)
