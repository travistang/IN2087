import Ads from './components/Ads/Ads'
import RegisterLoginForm from './components/RegisterLoginForm/RegisterLoginForm'

export default [
  {
    path: "/register",
    component: RegisterLoginForm,
    params: {
      isRegister: true,
    }
  },
  {
    path: "/login",
    component: RegisterLoginForm,
    params: {
      isRegister: false,
    }
  }
]
