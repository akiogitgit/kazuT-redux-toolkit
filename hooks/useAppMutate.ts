import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import {
  CREATE_TASKS,
  DELETE_TASKS,
  UPDATE_TASKS,
  CREATE_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS,
} from '../queries/queries'
import { Task, EditTask, News, EditNews } from '../types/types'
import { resetEditedTask, resetEditedNews } from '../slices/uiSlice'
import { useDispatch } from 'react-redux'
import { fetchTasks } from './useQueryNews'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

// カスタムフック
export const useAppMutation = () => {
  const dispatch = useDispatch()
  // createとかした後に、既存のキャッシュも変更する必要がある。
  const queryClient = useQueryClient()

  // tokenが変更する度、graphQLClient生成
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      // jwt tokenをcookieから取得して、headerに格納
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])
  // }, [])

  // taskを新規で作成する
  const createTaskMutaion = useMutation(
    //                                      第一にクエリ　　　　第二に引数
    (title: string) => graphQLClient.request(CREATE_TASKS, { title: title }),
    {
      // クエリ成功
      onSuccess: (res) => {
        // クエリでDBに追加するのに加えて、キャッシュにも追加する
        // 既存のキャッシュを取得                         取得データ型  key
        const previousTodos = queryClient.getQueriesData<Task[]>('tasks')
        // キャッシュあるなら、追加
        if (previousTodos) {
          // 既存のキャッシュをスプレッドして、後部に追加
          queryClient.setQueriesData('tasks', [
            ...previousTodos,
            res.insert_tasks_one,
          ])
        }
        // reduxのstateを初期化
        dispatch(resetEditedTask())
      },
    }
  )

  // update task
  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASKS, task),
    {
      // Update成功
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        // tasksキャッシュあり
        if (previousTodos) {
          // tasksのkeyのキャッシュで、updateしたtaskのidが同じのを変更
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  // delete task
  const deleteTaskMutaion = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASKS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          // キャッシュから削除
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  // create News
  const createNewsMutation = useMutation(
    (content: string) =>
      graphQLClient.request(CREATE_NEWS, { content: content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData('news', [
            ...previousNews,
            res.insert_news_one,
          ])
        }
        dispatch(resetEditedNews())
      },
    }
  )

  // update News
  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          )
        }
        dispatch(resetEditedNews())
      },
    }
  )

  // delete News
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.filter((news) => news.id !== variables)
          )
        }
        dispatch(resetEditedNews())
      },
    }
  )

  // カスタムフックだから、returnで使えるように
  return {
    createTaskMutaion,
    updateTaskMutation,
    deleteTaskMutaion,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  }
}
