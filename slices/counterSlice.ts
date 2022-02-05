import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

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

// 発火に使う
export const { increase, decrease } = counterSlice.actions

// Rootで定義した、store内のcouterで登録したやつを呼び出して格納
export const selectConter = (state: RootState) => state.counter.count

// storeで使う
export default counterSlice.reducer
