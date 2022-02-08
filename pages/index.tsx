import type { NextPage } from 'next'
import Link from 'next/link'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'

import { GetStaticProps } from 'next'
import { dehydrate } from 'react-query'
import { fetchNews } from '../hooks/useQueryNews'
import { News } from '../types/types'
import { QueryClient, useQueryClient } from 'react-query'

const Home: NextPage = () => {
  const queryClient = useQueryClient()
  // hydrateで注入されたデータを取得
  const data = queryClient.getQueryData<News[]>('news')
  return (
    <Layout title="home">
      <p className="my-5 text-blue-500 text-xl font-bold">News List by SSG</p>
      {data?.map((news) => (
        <p className="font-bold" key={news.id}>
          {news.content}
        </p>
      ))}

      <Link href="/Rocket" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
          Rocket
          <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
        </div>
      </Link>
      <Link href="/redux-toolkit" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
          Redux toolkit
        </div>
      </Link>
      <Link href="/Context" passHref>
        <div className="my-4 flex items-center cursor-pointer">useContext</div>
      </Link>
      <Link href="/reactQueryNews" passHref>
        <div className="my-4 flex items-center cursor-pointer">
          reactQueryNews
        </div>
      </Link>
      <Link href="/reactQueryTasks" passHref>
        <div className="my-4 flex items-center cursor-pointer">
          reactQueryTasks
        </div>
      </Link>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  // Hasuraのnewsを取得してキャッシュに格納
  await queryClient.prefetchQuery('news', fetchNews)
  return {
    props: {
      // prefetchしたとき取得する
      dehydrateState: dehydrate(queryClient),
    },
  }
}

export default Home
