import Ads from './components/Ads/Ads'
import RegisterLoginForm from './components/RegisterLoginForm/RegisterLoginForm'
import ItemsListPage from './components/ItemsListPage/ItemsListPage'
import ItemList from './components/ItemList'

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
  },
  {
    path: "/me/wants",
    component: ItemsListPage,
    params: {
      isMe: true,
      isForWant: true,
      isForGroup: false,
    }
  },
  {
    path: "/me/offers",
    component: ItemsListPage,
    params: {
      isMe: true,
      isForWant: false,
      isForGroup: false,
    }
  },
  {
    path: "/me/groups",
    component: ItemsListPage,
    params: {
      isMe: true,
      isForWant: false,
      isForGroup: true,
    }
  },
  {
    path:"/listtest",
    component: ItemList,
  }
]
