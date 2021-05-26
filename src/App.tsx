import React, { useEffect, useContext } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SkynetContext } from './state/SkynetContext';

//import { initMySky } from './skynet';
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
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { setMySky, checkLogin } = useStoreActions((state: any) => state.mySky);
  const globalLoading = useStoreState((state: any) => state.globalLoading);
  const setGlobalLoading = useStoreActions((action: any) => action.setGlobalLoading);

  useEffect(() => {
    if (!mySky) return;
    
    const initMySky = async () => {
      await setMySky({ mySky });
      await checkLogin({ mySky });
      setGlobalLoading(false);
    };

    initMySky();
  }, [mySky, checkLogin, setGlobalLoading, setMySky]);

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