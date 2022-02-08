import { ReactNode, VFC } from 'react'
import HEAD from 'next/head'
import Image from 'next/image'
import LogInOut from './LogInOut'

interface Props {
  children: ReactNode
  title: string
}

export const Layout: VFC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 font-mono text-lg">
      <HEAD>
        <title>{title}</title>
      </HEAD>

      <header className="mt-10">
        <LogInOut />
      </header>

      <main className="flex flex-1 flex-col justify-center items-center border-t">
        {children}
      </main>

      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a className="flex items-center">
          Powered by akio
          <Image src="/vercel.svg" width={72} height={16} alt="vercel"></Image>
        </a>
      </footer>
    </div>
  )
}
