import React, { VFC } from 'react'
import Link from 'next/link'

import { Layout } from '../components/Layout'
// import { useQueryTasks } from '../hooks/useQueryNews'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskListMemo } from '../components/TaskList'

const ReactQueryTasks: VFC = () => {
  const { status, data } = useQueryTasks()

  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>

  return (
    <Layout title="react query">
      <TaskListMemo />
      <ul className="mb-10">
        <li className="flex flex-col gap-5">
          {data?.map((task) => (
            <div key={task?.id}>
              <p>{task?.title}</p>
              <p>{task?.id}</p>
              <p>{task?.created_at}</p>
            </div>
          ))}
        </li>
      </ul>

      <Link href="/" passHref>
        home
      </Link>
    </Layout>
  )
}

export default ReactQueryTasks
