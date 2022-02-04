import { gql } from 'graphql-request'

// rocketsのid name ...を取得するクエリ
export const GET_ROCKETS = gql`
  query GetRockets {
    rockets {
      id
      name
      mass {
        kg
      }
      height {
        meters
      }
      diameter {
        meters
      }
    }
  }
`
