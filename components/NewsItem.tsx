import React, { memo, VFC } from 'react'
import { useDispatch } from 'react-redux'
import { setEditedNews } from '../slices/uiSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useAppMutation } from '../hooks/useAppMutate'
import { News } from '../types/types'
import { useSession } from 'next-auth/react'

interface Props {
  news: News
}

const NewsItem: VFC<Props> = ({ news }) => {
  const dispatch = useDispatch()
  const { deleteNewsMutation } = useAppMutation()
  const { data: session } = useSession()

  // delete中
  if (deleteNewsMutation.isLoading) {
    return <p>Deleting...</p>
  }
  if (deleteNewsMutation.error) return <div>Error</div>

  return (
    <li className="my-3">
      <span className="font-bold">{news.content}</span>
      <div className="float-right ml-20">
        {news.user_id == session?.user?.name && session ? (
          <div className="flex">
            {/* この状態をreduxにセット、別のUPDATEをするファイルで扱う */}
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
        ) : (
          <div className="text-[17px]">{news.user_id ?? 'Unknown'}</div>
        )}
      </div>
    </li>
  )
}

// これでmemoになる
export const NewsItemMemo = memo(NewsItem)
