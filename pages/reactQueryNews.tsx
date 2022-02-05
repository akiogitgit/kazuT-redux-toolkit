import React, { VFC } from 'react'
import Link from 'next/link'

import { Layout } from '../components/Layout'
import { useQueryNews } from '../hooks/useQueryNews'

const ReactQueryNews: VFC = () => {
  const { status, data } = useQueryNews()

  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>

  return (
    <Layout title="react query">
      <ul className="mb-10">
        <li className="flex flex-col gap-5">
          {data?.map((news) => (
            <div key={news.id}>
              <p>{news.content}</p>
              <p>{news.id}</p>
              <p>{news.created_at}</p>
            </div>
          ))}
        </li>
      </ul>

      <Link href="/" passHref>
        home
      </Link>
    </Layout>
  )
}

export default ReactQueryNews
