import React, { memo, VFC } from 'react'
import { useDispatch } from 'react-redux'
import { setEditedNews } from '../slices/uiSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useAppMutation } from '../hooks/useAppMutate'
import { News } from '../types/types'

interface Props {
  news: News
}

const NewsItem: VFC<Props> = ({ news }) => {
  const dispatch = useDispatch()
  const { deleteNewsMutation } = useAppMutation()

  // delete中
  if (deleteNewsMutation.isLoading) {
    return <p>Deleting...</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{news.content}</span>
      <div className="flex float-right ml-20">
        {/* 作成？ */}
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() =>
            dispatch(setEditedNews({ id: news.id, content: news.content }))
          }
        />
        {/* 削除 */}
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => deleteNewsMutation.mutate(news.id)}
        />
      </div>
    </li>
  )
}

// これでmemoになる
export const NewsItemMemo = memo(NewsItem)
