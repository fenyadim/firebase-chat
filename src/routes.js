import {
  ActiveDialogs,
  Chat,
  CompletedDialogs,
  ForgotPassword,
  Login,
  Registration,
  SavedDialogs,
  UpdatePassword,
  WorkDialogs,
} from './pages/'

export const publicRoutes = [
  {path: '/login', component: Login},
  {path: '/registration', component: Registration},
  {path: '/forgot', component: ForgotPassword},
  {path: '/update-password', component: UpdatePassword}
]

export const privateRoutes = [
  {path: '/active-chat', component: ActiveDialogs},
  {path: '/work-chat', component: WorkDialogs},
  {path: '/saved-chat', component: SavedDialogs},
  {path: '/completed-chat', component: CompletedDialogs},
  {path: '/dialog', component: Chat}
]