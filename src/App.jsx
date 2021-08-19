import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Row, Spinner } from "reactstrap";
import 'firebase/database'

import { FETCH_AUTHORIZED_USER } from "./redux/slices/dataSlice";
import { Layout } from "./components";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const {isAuthorized, isLoading} = useSelector((state) => state.users)
  const dispatch = useDispatch()
  //
  // firebase.database().ref('/messages/' + 3).set({
  //   writtenBy: 'client',
  //   content: "Всем привет, всем привет",
  //   timestamp: 123123123123
  // })

  React.useEffect(() => {
    dispatch(FETCH_AUTHORIZED_USER())
    // firebase.database().ref('/messages').once('value').then(r => console.log(r.val()))
  }, [dispatch])

  if (isLoading) {
    return (
      <Layout>
        <Row className='d-flex align-items-center justify-content-center vh-100'>
          <Spinner color='primary'
                   style={{width: '3rem', height: '3rem'}}/>
        </Row>
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
          <Redirect to='chat'/>
        </Switch>
      )}
    </Layout>
  );
}

export default App
