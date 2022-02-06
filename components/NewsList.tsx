import { FormEvent, memo, VFC } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'
import { useAppMutation } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { selectNews, setEditedNews, resetEditedNews } from '../slices/uiSlice'
import { NewsEditMemo } from './NewsEdit'

const NewsList: VFC = () => {
  const { status, data } = useQueryNews()
  const news = useSelector(selectNews)

  // これとreturnの間に書くな！ ここで、処理が止まるからこれ以下のが読み込まれなくなる
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>🔺Error</p>
  return (
    <div>
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
