import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditNews, EditTask } from '../types/types'
import { RootState } from '../app/store'

// reduxで管理する型
export interface uiState {
  editedTask: EditTask
  editedNews: EditNews
}

// 必須。editedTask, editedNewsの初期値を定義
const initialState: uiState = {
  editedTask: {
    id: '',
    title: '',
  },
  editedNews: {
    id: '',
    content: '',
  },
}

// sliceを作成 (ReducerおよびActionCreatorを定義)
export const uiSlice = createSlice({
  name: 'ui', // sliceの名前
  initialState,
  // reducerを定義
  reducers: {
    // actionは第二引数(string)で、action.payloadで使えるようにする。
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
    setEditedNews: (state, action: PayloadAction<EditNews>) => {
      state.editedNews = action.payload
    },
    resetEditedNews: (state) => {
      state.editedNews = initialState.editedNews
    },
  },
})

// uiSliceはReducer・actionsだから、それぞれexport
export const {
  setEditedTask,
  setEditedNews,
  resetEditedTask,
  resetEditedNews,
} = uiSlice.actions

// Reactから取得できるように、editedTaskを返す関数
export const selectTask = (state: RootState) => state.ui.editedTask
export const selectNews = (state: RootState) => state.ui.editedNews

export default uiSlice.reducer

// このsliceをstore.tsに登録する
