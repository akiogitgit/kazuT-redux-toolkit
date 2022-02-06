import { FormEvent, memo, VFC } from 'react'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectNews, setEditedNews, resetEditedNews } from '../slices/uiSlice'

const NewsEdit: VFC = () => {
  const dispatch = useDispatch()
  const { createNewsMutation, updateNewsMutation } = useAppMutation()

  const news = useSelector(selectNews)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (news.id == 'create') {
      createNewsMutation.mutate(news.content)
    } else {
      updateNewsMutation.mutate({ id: news.id, content: news.content })
    }
  }

  if (createNewsMutation.isLoading) return <p>Creating...</p>
  if (updateNewsMutation.isLoading) return <p>Updating...</p>

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
                id: news?.id ? news.id : 'create',
                content: e.target.value,
              })
            )
          }
        />
        <button
          type="submit"
          className="py-1 px-2 disabled:opacity-40 bg-gray-500 text-white"
          disabled={news?.content == ''}
        >
          {news?.id && news?.id !== 'create' ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export const NewsEditMemo = memo(NewsEdit)
