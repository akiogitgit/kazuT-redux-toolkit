import { useState, VFC } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { resetEditedNews, resetEditedTask } from '../slices/uiSlice'

const LogInOut: VFC = () => {
  const { data: session } = useSession()
  const cookie = new Cookie()
  const dispatch = useDispatch()

  const [cookieData, setCookieData] = useState('')

  const SignIn = () => {
    signIn()
    // set(cokkie名、内容)
    cookie.set('login', 'session内容')
  }

  const SignOut = () => {
    signOut()
    cookie.remove('login')
    dispatch(resetEditedNews)
    dispatch(resetEditedTask)
  }

  const getSession = () => {
    console.log(cookie.get('login'))
    setCookieData(cookie.get('login'))
  }
  return (
    <div>
      <div onClick={() => getSession()}>cookie{cookieData}</div>
      {session ? (
        <button className="danger-btn" onClick={() => SignOut()}>
          LogOut
        </button>
      ) : (
        <button className="primary-btn" onClick={() => SignIn()}>
          LogIn
        </button>
      )}
    </div>
  )
}

export default LogInOut
