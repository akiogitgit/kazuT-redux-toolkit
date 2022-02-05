import React, { useContext, VFC } from 'react'
import { TopContext } from '../../pages/Context'

const ComponentC: VFC = () => {
  // useContextの中に、取得したいものを入れる
  const ctx = useContext(TopContext)
  const { num, setNum, isTrue, setIsTrue } = useContext(TopContext)
  return (
    <div className="p-2 border border-blue-400">
      componentC
      {/* <p>{ctx.num}</p> */}
      <div className="my-4 text-black">
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>up　</button>
        <button onClick={() => ctx.setNum(ctx.num - 1)}>down</button>
      </div>
      <div className="text-black">
        <p>{isTrue ? 'true' : 'false'}</p>
        <button onClick={() => setIsTrue(!isTrue)}>change</button>
      </div>
    </div>
  )
}

export default ComponentC
