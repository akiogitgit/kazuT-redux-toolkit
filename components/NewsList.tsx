import { FormEvent, memo, VFC } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectNews, setEditedNews, resetEditedNews } from '../slices/uiSlice'

const NewsList: VFC = () => {
  const { status, data } = useQueryNews()
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>🔺Error🚫</p>

  const { createNewsMutation } = useAppMutation()
  const dispatch = useDispatch()
  const news = useSelector(selectNews)

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNewsMutation.mutate(news.content)
  }

  if (createNewsMutation.isLoading) {
    return <p>Creating...</p>
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          className="border-2"
          required
          value={news?.content}
          onChange={(e) =>
            dispatch(setEditedNews({ id: '2', content: e.target.value }))
          }
        />
        <button type="submit">Submit</button>
      </form>

      {data?.map((news) => (
        <ul key={news.id}>
          <NewsItemMemo news={news} />
        </ul>
      ))}
    </div>
  )
}

export const NewsListMemo = memo(NewsList)
