import Link from 'next/link'
import { useQueryClient } from 'react-query'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

import { Layout } from '../components/Layout'
import { Rocket } from '../types/types'
import { RocketItem } from '../components/Roketitem'

const ReadCache = () => {
  // keyがrocketsの既存のキャッシュデータを取得
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Rocket[]>('rockets')
  return (
    <Layout title="read-chache">
      <p className="my-5 text-blue-500 text-xl font-bold">
        Read out cache data
      </p>
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
        ))}
      </ul>

      <Link href="/" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
          <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
        </div>
      </Link>
    </Layout>
  )
}

export default ReadCache
