import request from 'graphql-request' //RESTはaxiosで、gqlはrequest
import { useQuery } from 'react-query'
import { News, Task } from '../types/types' // 型
import { GET_NEWS, GET_TASKS } from '../queries/queries' // query

interface NewsRes {
  news: News[]
}

// gql-requestで fetchする         返ってくるデータの型
export const fetchNews = async () => {
  const { news: data } = await request<NewsRes>(
    // 'https://kazut-firebase.hasura.app/v1/graphql',
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_NEWS
  ) // 第一にhasuraのエンドポイント、第二にクエリ
  return data
}
// カスタムフック
export const useQueryNews = () => {
  return useQuery<News[], Error>({
    queryKey: 'news',
    queryFn: fetchNews,
    staleTime: Infinity, // 追加のfetchを防ぐ
  })
}

// Tasks
// export const fetchTasks = async () => {
//   const { tasks: data } = await request<TasksRes>(
//     // 'https://kazut-firebase.hasura.app/v1/graphql',
//     process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
//     GET_TASKS
//   ) // 第一にhasuraのエンドポイント、第二にクエリ
//   return data
// }
// // カスタムフック
// export const useQueryTasks = () => {
//   return useQuery<Task[], Error>({
//     queryKey: 'tasks',
//     queryFn: fetchTasks,
//     staleTime: Infinity, // 追加のfetchを防ぐ
//   })
// }
