import Home from './pages/Home'
import Posts from './pages/Posts'
import Todos from './pages/Todos'
import Comments from './pages/Comments'
import Users from './pages/Users'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    exact: false
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
    exact: false
  },
  {
    path: '/comments',
    name: 'Comments',
    component: Comments,
    exact: false
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    exact: false
  }
]

export default routes