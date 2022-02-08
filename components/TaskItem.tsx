import React, { memo, VFC } from 'react'
import { useDispatch } from 'react-redux'
import { setEditedTask } from '../slices/uiSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useAppMutation } from '../hooks/useAppMutate'
import { Task } from '../types/types'
import { useSession } from 'next-auth/react'

interface Props {
  task: Task
}

const TaskItem: VFC<Props> = ({ task }) => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useAppMutation()

  // delete中
  if (deleteTaskMutation.isLoading) return <p>Deleting...</p>

  return (
    <div>
      {task.user_id == session?.user?.email && session && (
        <li className="my-3">
          <span className="font-bold">{task.title}</span>
          <div className="float-right ml-20">
            {/* この状態をreduxにセット、別のUPDATEをするファイルで扱う */}
            <div className="flex">
              <PencilAltIcon
                className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
                onClick={() =>
                  dispatch(setEditedTask({ id: task.id, title: task.title }))
                }
              />
              {/* 削除 */}
              <TrashIcon
                className="h-5 w-5 text-blue-500 cursor-pointer"
                onClick={() => deleteTaskMutation.mutate(task.id)}
              />
            </div>
          </div>
        </li>
      )}
    </div>
  )
}

// これでmemoになる
export const TaskItemMemo = memo(TaskItem)
