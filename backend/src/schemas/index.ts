export default `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Person" type defines the queryable fields for every person in our data source.
type Person {
    id: Int!
    name: String!
    age: Int!
    partner: Person
}

# The "Query" type is special: it lists all of the available queries that clients can execute, along with the return type of each. 
# In this case, the "people" query return an array of zero or more Person (defined above).
type Query {
    hello: String
    people: [Person]
    person(id: Int!): Person
}
`;