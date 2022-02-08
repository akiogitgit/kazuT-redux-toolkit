import type { NextPage } from 'next'
import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/solid'

import { Layout } from '../components/Layout'
import { useQueryRockets } from '../hooks/useQueryRockets'
import { RocketItem } from '../components/Roketitem'

const Rocket: NextPage = () => {
  // react-queryの標準でクエリの状態が分かる
  const { status, data } = useQueryRockets()
  // console.log(process.env.NEXT_PUBLIC_GITHUB_ID)
  if (status === 'loading')
    return <Layout title="rocket">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="rocket">{'Error'}</Layout>

  return (
    <Layout title="home">
      <p className="my-5 text-blue-500 text-xl font-bold">
        Fetching by useQuery
      </p>
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
        ))}
      </ul>

      <Link href="/read-cache" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
          cache
          <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
        </div>
      </Link>
      <Link href="/" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
          home
        </div>
      </Link>
    </Layout>
  )
}

export default Rocket
