import React, { VFC } from 'react'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { NewsListMemo } from '../components/NewsList'

const ReactQueryNews: VFC = () => {
  return (
    <Layout title="react query">
      <h1 className="my-5 text-blue-500 text-xl font-bold">News</h1>

      <NewsListMemo />

      <Link href="/" passHref>
        <div className="mt-10 cursor-pointer">home</div>
      </Link>
    </Layout>
  )
}

export default ReactQueryNews
