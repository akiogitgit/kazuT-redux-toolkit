import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../slices/uiSlice'
import counterReducer from '../slices/counterSlice'

// 複数のreducerを一まとめにしてstoreを作成
export const store = configureStore({
  // この中に入れれると、登録になる
  reducer: {
    ui: uiReducer, //uiという名前で登録
    counter: counterReducer,
  },
})
// storeの中の全てのstateの型を
export type RootState = ReturnType<typeof store.getState>
