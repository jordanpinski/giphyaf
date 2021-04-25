import React, { useEffect, useState } from 'react'
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
  const setContentRecordDAC = useStoreActions((action: any) => action.setContentRecordDAC);
  const setSkynetClient = useStoreActions((action: any) => action.setSkynetClient);
  const setLoggedIn = useStoreActions((action: any) => action.setLoggedIn);
  const setUserID = useStoreActions((action: any) => action.setUserID);
  const setUserFilePath = useStoreActions((action: any) => action.setUserFilePath)
  const globalLoading = useStoreState((state: any) => state.globalLoading);
  const setGlobalLoading = useStoreActions((action: any) => action.setGlobalLoading);

  useEffect(() => {
    initMySky().then((data) => {
      const { mySky, contentRecordDAC, skynetClient, loggedIn, userID } = data;

      setMySky(mySky);
      setContentRecordDAC(contentRecordDAC);
      setSkynetClient(skynetClient);
      setLoggedIn(loggedIn);
      setUserID(userID);
      setUserFilePath(`${mySky.hostDomain}/`);
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