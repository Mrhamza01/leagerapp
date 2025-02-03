import { GraphQLClient } from "graphql-request"

const endpoint = `https://cloud.appwrite.io/v1/graphql`

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Appwrite-Project": "679b705a00204b03353e",
    // Add other necessary headers like authentication
  },
})

export const GET_LEDGER_ENTRIES = `
  query GetLedgerEntries($limit: Int, $offset: Int, $searchTerm: String, $username: String) {
    ledgerEntries(
      limit: $limit
      offset: $offset
      filter: {
        description: { contains: $searchTerm }
        username: { eq: $username }
      }
    ) {
      id
      type
      amount
      description
      email
      username
    }
  }
`

export const GET_ANALYTICS = `
  query GetAnalytics {
    ledgerEntries {
      type
      amount
      username
    }
  }
`

