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

// news
export const GET_NEWS = gql`
  query GetNews {
    news {
      id
      content
      created_at
      user_id
    }
  }
`

export const CREATE_NEWS = gql`
  mutation MyMutation($content: String!, $user_id: String!) {
    insert_news_one(object: { content: $content, user_id: $user_id }) {
      id
      content
      created_at
      user_id
    }
  }
`
export const UPDATE_NEWS = gql`
  mutation UpdateNews($id: uuid!, $content: String!) {
    update_news_by_pk(pk_columns: { id: $id }, _set: { content: $content }) {
      id
      content
      created_at
      user_id
    }
  }
`
export const DELETE_NEWS = gql`
  mutation DeleteNews($id: uuid!) {
    delete_news_by_pk(id: $id) {
      id
      content
    }
  }
`

// Tasks
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      created_at
      user_id
    }
  }
`
export const GET_MY_TASKS = gql`
  query GetMyTasks($user_id: String!) {
    tasks(where: { user_id: { _eq: $user_id } }) {
      id
      title
      created_at
      user_id
    }
  }
`
export const CREATE_TASKS = gql`
  mutation CreateTasks($title: String!, $user_id: String!) {
    insert_tasks_one(object: { title: $title, user_id: $user_id }) {
      id
      title
      created_at
      user_id
    }
  }
`
export const UPDATE_TASKS = gql`
  mutation UpdateTasks($id: uuid!, $title: String!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
      created_at
      user_id
    }
  }
`
export const DELETE_TASKS = gql`
  mutation DeleteTasks($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
      title
    }
  }
`
