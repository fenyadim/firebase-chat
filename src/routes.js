import {
  ActiveChat,
  Chat,
  CompletedChat,
  ForgotPassword,
  Login,
  Registration,
  SavedChat,
  UpdatePassword,
  WorkChat
} from './pages/'

export const publicRoutes = [
  {path: '/login', component: Login},
  {path: '/registration', component: Registration},
  {path: '/forgot', component: ForgotPassword},
  {path: '/update-password', component: UpdatePassword}
]

export const privateRoutes = [
  {path: '/chat', component: Chat},
  {path: '/active-chat', component: ActiveChat},
  {path: '/work-chat', component: WorkChat},
  {path: '/saved-chat', component: SavedChat},
  {path: '/completed-chat', component: CompletedChat},
]