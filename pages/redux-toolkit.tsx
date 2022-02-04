import React, { VFC } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../components/Layout'
import { decrease, increase } from '../slices/counterSlice'

const ReduxToolkit: VFC = () => {
  // useSelectorで値を取得できる
  const count = useSelector((state) => state.counter.count)
  // dispatchでメソッドを呼べる
  const dispatch = useDispatch()

  return (
    <Layout title="redux toolkit">
      <div className="text-xl">
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increase())}>↑add　</button>
        <button onClick={() => dispatch(decrease())}>↓down</button>
        <br />
        <Link href="/">
          <div className="mt-20">home</div>
        </Link>
      </div>
    </Layout>
  )
}

export default ReduxToolkit
