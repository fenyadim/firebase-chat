import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Chat from "./pages/Chat/Chat";

function App() {
  const state = useSelector((state) => state.users)
  const {setAuthorized} = state
  // const [isAuthorized, setIsAuthorized] = React.useState(status)
  // React.useEffect(() => {
  //   setIsAuthorized(status)
  // }, [status]);
  // const isAuthorized = status === 'authorized' ? 'chat' : 'login'

  const PrivateRoute = ({children, ...rest}) => {
    return (
      <Route {...rest} render={() => {
        return setAuthorized ? (children) : (<Redirect to='/login'/>)
      }}/>
    )
  }

  console.log(setAuthorized)

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/login' exact>
            <Login/>
          </Route>
          <PrivateRoute path='/chat'>
            <Chat/>
          </PrivateRoute>
          <Redirect from='/' to='chat'/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
