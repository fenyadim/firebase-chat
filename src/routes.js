import { ActiveChat, Chat, CompletedChat, ForgotPassword, Login, Registration, SavedChat, WorkChat } from './pages/'

export const publicRoutes = [
  {path: '/login', component: Login},
  {path: '/registration', component: Registration},
  {path: '/forgot', component: ForgotPassword}
]

export const privateRoutes = [
  {path: '/chat', component: Chat},
  {path: '/active-chat', component: ActiveChat},
  {path: '/work-chat', component: WorkChat},
  {path: '/saved-chat', component: SavedChat},
  {path: '/completed-chat', component: CompletedChat},
]