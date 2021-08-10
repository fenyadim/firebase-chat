import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { FETCH_AUTHORIZED_USER } from "./redux/slices/dataSlice";
import { Chat, Login, Registration } from "./pages";
import { Layout } from "./components";

function App() {
  const state = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const {isAuthorized, isLoading} = state

  React.useEffect(() => {
    dispatch(FETCH_AUTHORIZED_USER())
  }, [dispatch])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <Layout>
      {!isAuthorized ? (
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Route path='/registration' component={Registration} exact/>
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
