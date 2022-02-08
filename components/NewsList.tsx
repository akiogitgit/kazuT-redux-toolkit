import { FormEvent, memo, VFC } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'
import { NewsEditMemo } from './NewsEdit'

const NewsList: VFC = () => {
  const { status, data } = useQueryNews()

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
