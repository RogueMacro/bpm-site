import { gql } from 'apollo-server-express'

export default gql`
interface IVersion {
    versionRepoURL: String!
    version: String!

    changes: String

    parentName: String!

}

type Version implements IVersion {
    id:ID

    versionRepoURL: String!
    version: String!

    changes: String

    lastVersion: Version

    parentName: String!

    parent: Package
}

input Version implements IVersion {
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
    package( name:String ): Package
    version( id:ID! ): Version
}

type Query {
    v1: QueryV1
}

type Mutation {

}`
