import { FormEvent, memo, VFC } from 'react'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectTask, setEditedTask } from '../slices/uiSlice'

const TaskEdit: VFC = () => {
  const dispatch = useDispatch()
  const { createTaskMutation, updateTaskMutation } = useAppMutation()

  const task = useSelector(selectTask)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (task.id == '') {
      createTaskMutation.mutate(task.title)
    } else {
      updateTaskMutation.mutate({ id: task.id, title: task.title })
    }
  }

  if (createTaskMutation.isLoading) return <p>Creating...</p>
  if (updateTaskMutation.isLoading) return <p>Updating...</p>

  return (
    <div>
      {/* <p>news.id: {news?.id}</p> */}
      <form onSubmit={handleSubmit} className="mb-10 text-center">
        <input
          type="text"
          className="border-2 mr-2"
          required
          autoFocus
          value={task?.title}
          // idが""かcreateならcreate。選択されたらそのidに変更
          onChange={(e) =>
            dispatch(
              setEditedTask({
                id: task?.id ? task.id : '',
                title: e.target.value,
              })
            )
          }
        />
        <button
          type="submit"
          className="py-1 px-2 disabled:opacity-40 bg-gray-500 text-white rounded"
          disabled={!task?.title}
        >
          {task?.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
