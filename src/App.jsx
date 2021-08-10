import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Chat from "./pages/Chat/Chat";
import { FETCH_AUTHORIZED_USER } from "./redux/slices/dataSlice";

function App() {
  const state = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const {isAuthorized, isLoading} = state

  React.useEffect(() => {
    dispatch(FETCH_AUTHORIZED_USER())
  }, [dispatch])

  const PrivateRoute = ({children, ...rest}) => {
    return (
      <Route {...rest} render={() => {
        return isAuthorized ? (children) : (<Redirect to='/login'/>)
      }}/>
    )
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  // <Switch>
  //   <Route path='/login' exact>
  //     <Login/>
  //   </Route>
  //   <PrivateRoute path='/chat'>
  //     <Chat/>
  //   </PrivateRoute>
  //   <Redirect from='/' to='chat'/>
  // </Switch>

  console.log(isAuthorized)

  return (
    <Layout>
      {!isAuthorized ? (
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Redirect to='login'/>
        </Switch>
      ) : (
        <Switch>
          <Route path='/chat' component={Chat} exact/>
          <Redirect to='chat'/>
        </Switch>
      )}
    </Layout>
  );
}

export default App
