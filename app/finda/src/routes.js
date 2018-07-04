import Ads from './components/Ads/Ads'
import RegisterLoginForm from './components/RegisterLoginForm/RegisterLoginForm'
import ItemsListPage from './components/ItemsListPage/ItemsListPage'
import Home from './components/Home/Home'
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
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
  },
  {
    path: "/user/:username/wants",
    component: ItemsListPage,
    params: {
      isMe: false,
      isForWant: true,
    }
  },
  {
    path: "/user/:username/offers",
    component: ItemsListPage,
    params: {
      isMe: false,
      isForWant: false,
    }
  },
  {
    path: "/user/:username/group",
    component: ItemsListPage,
    params: {
      isMe: false,
      isForWant: false,
      isForGroup: true
    }
  }


]
