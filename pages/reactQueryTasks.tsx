import React, { VFC } from 'react'
import Link from 'next/link'

import { Layout } from '../components/Layout'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskListMemo } from '../components/TaskList'

const ReactQueryTasks: VFC = () => {
  const { status, data } = useQueryTasks()

  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>

  return (
    <Layout title="react query">
      <h1 className="my-5 text-blue-500 text-xl font-bold">Tasks</h1>

      <TaskListMemo />

      <Link href="/" passHref>
        home
      </Link>
    </Layout>
  )
}

export default ReactQueryTasks
