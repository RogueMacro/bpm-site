import { gql } from 'apollo-server-express'

export namespace Types {
	type ID = string
	export interface InputVersion {
		versionRepoURL: string
		version: string

		changes: string

		parentName: string
	}

	export interface Package {
		name: string

		snapshot: Snapshot

		versions: ID[]
	}
	export interface Snapshot {
		versionRepoURL: string
		version: string

		changes: string

		parentName: string

		id: ID
	}
}

export default gql`
	type Snapshot {
		versionRepoURL: String!
		version: String!

		changes: String

		parentName: String!

		id: ID
	}

	input InputVersion {
		versionRepoURL: String!
		version: String!

		changes: String

		parentName: String!
	}

	type Package {
		name: String!

		versions: [ID!]!

		lastVersion: Snapshot
	}

	type Query {
		package(name: String!): Package
		version(id: ID!): Snapshot
		latest(name: String!): Snapshot
	}

	# type Query {
	# 	v1: QueryV1
	# }

	# type Mutation {

	# }
`
