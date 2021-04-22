import React, { useEffect, useState } from 'react'
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
  MyUploads,
  Gif
} from './pages';
import { loader } from './assets/icons';

const App = () => {

  // Local state
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false);

    }).catch((error) => {
      console.log(error);
    })
  });

  return loading ? (
    <div className="loading-overlay">
      <object className="fade-up" type="image/svg+xml" data={loader} width="80px">Loading</object>
    </div>
  ) : (
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

      <Route exact path="/gif">
        <Gif />
      </Route>

    </Switch>
  </Router>
  )
}

export default App;