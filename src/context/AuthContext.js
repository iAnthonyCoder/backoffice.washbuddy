// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { authService } from 'services/auth.service'
import { userService } from 'services/user.service'
import Cookies from 'js-cookie'
// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem('accessToken')
      if (storedToken) {
        setLoading(true)
        await userService
        .get_me()
          
          .then(async response => {
            
            setLoading(false)
            setUser({ ...response})
          })
          .catch((er) => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      authService.login(params)
      .then(async res => {
        console.log(res)
        await localStorage.setItem('accessToken', res.data.accessToken)
        await Cookies.set('accessToken', res.data.accessToken)
        
      })
      .then(() => {
  
        userService
          .get_me()
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({ ...response })
            await window.localStorage.setItem('userData', JSON.stringify(response))
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            router.replace(redirectURL)
          })
      })
      .catch(err => {
        console.log(err);
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
