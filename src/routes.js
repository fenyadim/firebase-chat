import {
  ActiveDialogs,
  Chat,
  CompletedDialogs,
  ForgotPassword,
  Login,
  QueueDialogs,
  Registration,
  SavedDialogs,
  UpdatePassword,
} from './pages/'

export const publicRoutes = [
  {path: '/login', component: Login},
  {path: '/registration', component: Registration},
  {path: '/forgot', component: ForgotPassword},
  {path: '/update-password', component: UpdatePassword}
]

export const privateRoutes = [
  {path: '/active-dialogs', component: ActiveDialogs},
  {path: '/queue-dialogs', component: QueueDialogs},
  {path: '/saved-dialogs', component: SavedDialogs},
  {path: '/completed-dialogs', component: CompletedDialogs},
  {path: '/chat', component: Chat}
]