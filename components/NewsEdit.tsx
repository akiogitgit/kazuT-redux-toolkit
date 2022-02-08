import { FormEvent, memo, VFC } from 'react'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectNews, setEditedNews, resetEditedNews } from '../slices/uiSlice'
import { useSession } from 'next-auth/react'

const NewsEdit: VFC = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const { createNewsMutation, updateNewsMutation } = useAppMutation()

  const news = useSelector(selectNews)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (news.id == '') {
      const createNews = {
        content: news.content,
        user_id: session ? String(session.user?.email) : 'guest',
      }
      createNewsMutation.mutate(createNews)
    } else {
      updateNewsMutation.mutate({ id: news.id, content: news.content })
    }
  }

  if (createNewsMutation.isLoading) return <p>Creating...</p>
  if (updateNewsMutation.isLoading) return <p>Updating...</p>
  if (createNewsMutation.error || updateNewsMutation.error) return <p>Error</p>

  return (
    <div>
      {/* <p>news.id: {news?.id}</p> */}
      <form onSubmit={handleSubmit} className="mb-10 text-center">
        <input
          type="text"
          className="border-2 mr-2"
          required
          autoFocus
          value={news?.content}
          // idが""かcreateならcreate。選択されたらそのidに変更
          onChange={(e) =>
            dispatch(
              setEditedNews({
                id: news?.id ? news.id : '',
                content: e.target.value,
              })
            )
          }
        />
        <button
          type="submit"
          className="py-1 px-2 disabled:opacity-40 bg-gray-500 text-white rounded"
          disabled={!news?.content}
        >
          {news?.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const NewsEditMemo = memo(NewsEdit)
