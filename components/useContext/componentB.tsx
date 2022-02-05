import React, { VFC } from 'react'
import ComponentC from './componentC'

const ComponentB: VFC = () => {
  return (
    <div className="p-4 border border-gray-400">
      componentB
      <ComponentC />
    </div>
  )
}

export default ComponentB
