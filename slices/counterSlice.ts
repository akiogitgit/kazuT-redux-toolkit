import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState, //初期値
  // メソッド
  reducers: {
    increase: (state) => {
      state.count += 1
    },
    decrease: (state) => {
      state.count -= 1
    },
  },
})

export const { increase, decrease } = counterSlice.actions

export default counterSlice.reducer
