import React, { VFC } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../components/Layout'
import { decrease, increase, selectConter } from '../slices/counterSlice'
import {
  setEditedTask,
  setEditedNews,
  resetEditedTask,
  resetEditedNews,
  selectTask,
  selectNews,
} from '../slices/uiSlice'

const ReduxToolkit: VFC = () => {
  // dispatchでメソッドを呼べる
  const dispatch = useDispatch()

  // useSelectorで値を取得できる
  // 直接探しに行く
  const count = useSelector((state) => state.counter.count)
  // あらかじめ、counterSliceで使えるようにしたもの
  const Count = useSelector(selectConter)

  const Task = useSelector(selectTask)
  const News = useSelector(selectNews)

  const anpan = { id: 'id', title: 'anpan' }

  return (
    <Layout title="redux toolkit">
      <div className="text-xl">
        <h1>Count: {count}</h1>
        <h1>Count: {Count}</h1>
        <button onClick={() => dispatch(increase())}>↑add　</button>
        <button onClick={() => dispatch(decrease())}>↓down</button>

        <ul className="my-12">
          <li>Task.id:　{Task.id}</li>
          <li>News.id:　{News.id}</li>
          <li>Task.title:　{Task.title}</li>
          <li>News.conten:　{News.content}</li>
        </ul>

        <form
          onSubmit={(e) => {
            dispatch(setEditedTask(anpan))
          }}
        >
          <input
            className="border-2 block"
            type="text"
            value={Task.title}
            placeholder="Task"
            onChange={(e) =>
              dispatch(setEditedTask({ id: '1', title: e.target.value }))
            }
          />
          <input
            className="border-2"
            type="text"
            value={News.content}
            placeholder="News"
            onChange={(e) =>
              dispatch(setEditedNews({ id: '1', content: e.target.value }))
            }
          />
          <button type="submit">Submit</button>
        </form>

        <Link href="/">
          <div className="mt-20 cursor-pointer">home</div>
        </Link>
      </div>
    </Layout>
  )
}

export default ReduxToolkit
