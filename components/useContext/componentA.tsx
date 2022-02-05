import React, { useContext, VFC } from 'react'
import ComponentB from './componentB'

const ComponentA: VFC = () => {
  return (
    <div className="p-4 border border-red-400">
      componentA
      <ComponentB />
    </div>
  )
}

export default ComponentA
