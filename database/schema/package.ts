export interface Dependencies {
	[key: string]: string // qualname : version
}

export interface Package {
	creator: string
	contributors: string[]

	dependencies?: Dependencies
	peerDependencies?: Dependencies

	name: string
	repo: string
	version: string

}