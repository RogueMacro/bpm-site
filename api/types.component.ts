import { gql } from 'apollo-server-express'

export default gql`

type Version {
    versionRepoURL: String!
    version: String!

    changes: String

    parentName: String!

    id:ID

    lastVersion: Version

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

type QueryV1 {
    package( name:String! ): Package
    version( id:ID! ): Version
}

type Query {
    v1: QueryV1
}

# type Mutation {

# }
`
