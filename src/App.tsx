import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { initMySky } from './skynet';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  Home,
  Create,
  Upload,
  MyUploads,
  GifPage
} from './pages';
import { loader } from './assets/icons';
import Logo from './components/Logo';

const App = () => {

  // Global state
  const setMySky = useStoreActions((action: any) => action.setMySky);
  const setSkynetClient = useStoreActions((action: any) => action.setSkynetClient);
  const setLoggedIn = useStoreActions((action: any) => action.setLoggedIn);
  const setUserID = useStoreActions((action: any) => action.setUserID);
  // const setUserProfile = useStoreActions((action: any) => action.setUserProfile);
  const globalLoading = useStoreState((state: any) => state.globalLoading);
  const setGlobalLoading = useStoreActions((action: any) => action.setGlobalLoading);

  useEffect(() => {
    initMySky().then((data) => {
      // const { mySky, skynetClient, loggedIn, userID, userProfile } = data;
      const { mySky, skynetClient, loggedIn, userID } = data;

      setMySky(mySky);
      setSkynetClient(skynetClient);
      setLoggedIn(loggedIn);
      setUserID(userID);
      //setUserProfile(userProfile);
      setGlobalLoading(false);

    }).catch((error) => {
      console.log(error);
    })
  });

  return globalLoading ? (
    <div className="loading-overlay">
      <Logo noLink={true} />
      <object className="fade-up" type="image/svg+xml" data={loader} width="80px" height="200px">Loading</object>
    </div>
  ) : (
    <Router>
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/create">
        <Create />
      </Route>

      <Route exact path="/upload">
        <Upload />
      </Route>

      <Route exact path="/my-uploads">
        <MyUploads />
      </Route>

      <Route exact path="/gif">
        <GifPage />
      </Route>

    </Switch>
  </Router>
  )
}

export default App;