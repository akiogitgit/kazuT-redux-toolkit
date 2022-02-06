import type { NextPage } from 'next'
import Link from 'next/link'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

import { Layout } from '../components/Layout'
import { useQueryRockets } from '../hooks/useQueryRockets'
import { RocketItem } from '../components/Roketitem'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  // react-queryの標準でクエリの状態が分かる
  const { status, data } = useQueryRockets()
  const { data: session } = useSession()
  // console.log(process.env.NEXT_PUBLIC_GITHUB_ID)
  if (status === 'loading') return <Layout title="home">{'Loading...'}</Layout>
  if (status === 'error') return <Layout title="home">{'Error'}</Layout>

  return (
    <Layout title="home">
      <p className="my-5 text-blue-500 text-xl font-bold">
        Fetching by useQuery
      </p>
      {session ? (
        <button className="danger-btn" onClick={() => signOut()}>
          LogOut
        </button>
      ) : (
        <button className="primary-btn" onClick={() => signIn()}>
          LogIn
        </button>
      )}
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
        ))}
      </ul>

      <Link href="/read-cache" passHref>
        <div className="mt-10 flex items-center cursor-pointer">
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

export default Home
