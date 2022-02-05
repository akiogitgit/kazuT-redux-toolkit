import React, { createContext, useState } from 'react'
import { Layout } from '../components/Layout'
import ComponentA from '../components/useContext/componentA'
import Link from 'next/link'

// createContextで受け渡すpropsの型を定義する。
export const TopContext = createContext(
  {} as {
    num: number
    setNum: React.Dispatch<React.SetStateAction<number>>
    isTrue: boolean
    setIsTrue: React.Dispatch<React.SetStateAction<boolean>>
    // viewAlert: void
  }
)

const Context = () => {
  const [num, setNum] = useState(100)
  const [isTrue, setIsTrue] = useState(true)
  const viewAlert = () => {
    alert('hello!!!!!!!!')
  }

  const value = { num, setNum, isTrue, setIsTrue }

  return (
    <Layout title="useContext">
      <div className="p-10 border border-purple-600">
        <h1 className="block my-4">useContext page</h1>

        <div className="text-black">
          <p>{num}</p>
          <button onClick={() => setNum(num + 1)}>up　</button>
          <button onClick={() => setNum(num - 1)}>down</button>
        </div>
        <div className="my-4 text-black">
          <p>{isTrue ? 'true' : 'false'}</p>
          <button onClick={() => setIsTrue(!isTrue)}>change</button>
        </div>

        {/* TopContext.Providerで型を定義し、valueで値を送る */}
        {/* <TopContext.Provider value={{num, setNum}}> */}
        <TopContext.Provider value={value}>
          <ComponentA />
        </TopContext.Provider>

        <Link href="/" passHref>
          <p className="mt-10 cursor-pointer">home</p>
        </Link>
      </div>
    </Layout>
  )
}

export default Context
