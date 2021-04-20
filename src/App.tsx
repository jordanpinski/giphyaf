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

  // Global state
  const setMySky = useStoreActions((action: any) => action.setMySky);
  const setContentRecordDAC = useStoreActions((action: any) => action.setContentRecordDAC);
  const setSkynetClient = useStoreActions((action: any) => action.setSkynetClient);
  const setLoggedIn = useStoreActions((action: any) => action.setLoggedIn);
  const setUserID = useStoreActions((action: any) => action.setUserID);
  const setUserFilePath = useStoreActions((action: any) => action.setUserFilePath)

  useEffect(() => {
    initMySky().then((data) => {
      const { mySky, contentRecordDAC, skynetClient, loggedIn, userID } = data;

      setMySky(mySky);
      setContentRecordDAC(contentRecordDAC);
      setSkynetClient(skynetClient);
      setLoggedIn(loggedIn);
      setUserID(userID);
      setUserFilePath(`${mySky.hostDomain}/`);

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