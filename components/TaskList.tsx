import { memo, VFC } from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItemMemo } from './TaskItem'
import { TaskEditMemo } from './TaskEdit'

const TaskList: VFC = () => {
  const { status, data } = useQueryTasks()

  // これとreturnの間に書くな！ ここで、処理が止まるからこれ以下のが読み込まれなくなる
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>🔺Error</p>
  return (
    <div>
      <TaskEditMemo />

      {data?.map((task) => (
        <ul key={task.id}>
          <TaskItemMemo task={task} />
        </ul>
      ))}
    </div>
  )
}

export const TaskListMemo = memo(TaskList)
