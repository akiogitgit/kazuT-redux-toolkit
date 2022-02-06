import { FormEvent, memo, VFC } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectNews, setEditedNews, resetEditedNews } from '../slices/uiSlice'
import { NewsEditMemo } from './NewsEdit'

const NewsList: VFC = () => {
  const dispatch = useDispatch()
  const { createNewsMutation, updateNewsMutation } = useAppMutation()
  const { status, data } = useQueryNews()

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

  // これとreturnの間に書くな！ ここで、処理が止まるからこれ以下のが読み込まれなくなる
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>🔺Error</p>
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

      <NewsEditMemo />

      {data?.map((news) => (
        <ul key={news.id}>
          <NewsItemMemo news={news} />
        </ul>
      ))}
    </div>
  )
}

export const NewsListMemo = memo(NewsList)
