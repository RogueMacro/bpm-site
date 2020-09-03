import { gql } from 'apollo-server-express'

export default gql`
	enum VersionControl {
		GIT
	}

	type Version {
		versionRepoURL: String!
		version: String!

		repoType: VersionControl!

		changes: String

		parentName: String!

		id: ID

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

		tags: [String]!
		lts: Bool

		versions: [Version!]!
	}

	type Query {
		package(name: String!): Package
		version(package: String!, version: String!): Version
		latest(name: String!): Version
	}

	# type Mutation {

	# }
`
