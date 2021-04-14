import React, { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy';
import { initMySky } from './skynet';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  Home,
  Upload
} from './pages';

const App = () => {

  const setMySky = useStoreActions((action: any) => action.setMySky);
  const setLoggedIn = useStoreActions((action: any) => action.setLoggedIn);

  useEffect(() => {
    initMySky().then((mySky) => {
      setMySky(mySky)
      console.log(mySky);
      //setLoggedIn(mySky)
    });
  });

  return (
    <Router>
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/upload">
        <Upload />
      </Route>

    </Switch>
  </Router>
  )
}

export default App;