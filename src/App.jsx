import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";

import { FETCH_AUTHORIZED_USER } from "./redux/slices/dataSlice";
import { Layout } from "./components";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const state = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const {isAuthorized, isLoading} = state

  React.useEffect(() => {
    dispatch(FETCH_AUTHORIZED_USER())
  }, [dispatch])

  if (isLoading) {
    return <Layout><Spinner color='primary' style={{ width: '3rem', height: '3rem' }} /></Layout>
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
          <Redirect to='chat'/>
        </Switch>
      )}
    </Layout>
  );
}

export default App
