import React, { memo, VFC } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'

const NewsList: VFC = () => {
  const { status, data } = useQueryNews()
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>🔺Error🚫</p>
  return (
    <div>
      {data?.map((news) => (
        <ul key={news.id}>
          <NewsItemMemo news={news} />
        </ul>
      ))}
    </div>
  )
}

export const NewsListMemo = memo(NewsList)
