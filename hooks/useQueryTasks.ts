import { useEffect } from 'react'
import request, { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import { Task } from '../types/types'
import { GET_TASKS } from '../queries/queries'
import Cookie from 'universal-cookie'

interface TasksRes {
  tasks: Task[]
}
const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

// const fetchTasks1 = async () => {
//   const { tasks: data } = await graphQLClient.request<TasksRes>(GET_TASKS)
//   return data
// }
// export const useQueryTasks1 = () => {
//   useEffect(() => {
//     graphQLClient = new GraphQLClient(endpoint, {
//       headers: {
//         Authorization: `Bearer ${cookie.get('token')}`,
//       },
//     })
//   }, [cookie.get('token')])

//   return useQuery<Task[], Error>({
//     queryKey: 'tasks1',
//     queryFn: fetchTasks1,
//     staleTime: 0,
//   })
// }

//

interface TasksRes {
  tasks: Task[]
}

// akioHasuraReactQuery01
export const fetchTasks = async () => {
  const { tasks: data } = await request<TasksRes>(
    // 'https://kazut-firebase.hasura.app/v1/graphql',
    <string>process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_TASKS
  ) // 第一にhasuraのエンドポイント、第二にクエリ
  return data
}
// カスタムフック
export const useQueryTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: 0, // 追加のfetchを防ぐ
  })
}
