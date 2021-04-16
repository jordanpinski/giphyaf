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
  Upload,
  MyUploads
} from './pages';

const App = () => {

  const setMySky = useStoreActions((action: any) => action.setMySky);
  const setSkynetClient = useStoreActions((action: any) => action.setSkynetClient);
  const setLoggedIn = useStoreActions((action: any) => action.setLoggedIn);
  const setUserID = useStoreActions((action: any) => action.setUserID);

  useEffect(() => {
    initMySky().then((data) => {
      const { mySky, skynetClient, loggedIn, userID } = data;

      setMySky(mySky);
      setSkynetClient(skynetClient);
      setLoggedIn(loggedIn);
      setUserID(userID);
      
    }).catch((error) => {
      console.log(error);
    })
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

      <Route exact path="/my-uploads">
        <MyUploads />
      </Route>

    </Switch>
  </Router>
  )
}

export default App;