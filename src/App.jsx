import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { FETCH_AUTHORIZED_USER } from "./redux/slices/usersSlice";
import { Layout, Loader } from "./components";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const users = useSelector((state) => state.users)
  const isAuthorized = users?.isAuthorized
  const isLoading = users?.isLoading
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(FETCH_AUTHORIZED_USER())
  }, [dispatch])

  if (isLoading) {
    return (
      <Layout>
        <Loader/>
      </Layout>
    )
  }

  return (
    <Layout>
      {!isAuthorized ? (
        <Switch>
          {publicRoutes.map(({path, component}, index) => <Route key={index} path={path} component={component} exact/>)}
          <Redirect to='login'/>
        </Switch>
      ) : (
        <Switch>
          {privateRoutes.map(({path, component}, index) => <Route key={index} path={path} component={component}
                                                                  exact/>)}
          <Redirect to='active-dialogs'/>
        </Switch>
      )}
    </Layout>
  );
}

export default App
