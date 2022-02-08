import React, { VFC } from 'react'
import Link from 'next/link'

import { Layout } from '../components/Layout'
import { TaskListMemo } from '../components/TaskList'
import { useSession } from 'next-auth/react'

const ReactQueryTasks: VFC = () => {
  const { data: session } = useSession()
  return (
    <Layout title="react query">
      <h1 className="my-5 text-blue-500 text-xl font-bold">Tasks</h1>
      {session ? <TaskListMemo /> : <div className="mb-4">LogInしてくれ</div>}
      <Link href="/" passHref>
        home
      </Link>
    </Layout>
  )
}

export default ReactQueryTasks
