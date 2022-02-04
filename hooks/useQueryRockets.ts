import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Rocket } from '../types/types'
import { GET_ROCKETS } from '../queries/queries'

interface RocketsRes {
  rockets: Rocket[] // 取得するデータは配列オブジェクト
}

// 返ってくるデータの名前をdata  gqlにアクセス  返ってくるデータの型
export const fetchRockets = async () => {
  const { rockets: data } = await request<RocketsRes>(
    // 第一にURL 第二に実行するクエリ
    'https://api.spacex.land/graphql/',
    GET_ROCKETS
  )
  return data
}

// カスタムフック  useQueryの実行結果を返す
// 取得データはreactQueryのキャッシュに格納
export const useQueryRockets = () => {
  // react-queryの設定
  // RocketはuseQueryの型　Errorは標準
  return useQuery<Rocket[], Error>({
    queryKey: 'rockets', //useQuery 毎に違うkeyをつけて識別
    queryFn: fetchRockets, // fetchの関数
    staleTime: 10, // Infinity:取得したキャッシュのデータを常に最新とみなす 10で10ms毎に古いとみなす
    refetchOnWindowFocus: false, // ブラウザの中をクリックで再fetch
    // refetchInterval: 1000, // この秒数毎にrefetch
  })
}

// akioHasuraFirebase01
