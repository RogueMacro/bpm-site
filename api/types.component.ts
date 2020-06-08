import { gql } from 'apollo-server-express'

export default gql`
	type Snapshot {
		versionRepoURL: String!
		version: String!

		changes: String

		parentName: String!

		id: ID

		lastVersion: Snapshot

		parent: Package
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
