import React, { useContext } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SkynetContext } from '../../state/SkynetContext';
import { Link } from 'react-router-dom';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { Button } from '../Button';
import { uploadRegular, plusRegular } from '../../assets/icons';
import HeaderProfile from './HeaderProfile';
import { stat } from 'node:fs';

interface Props {

}

const HeaderActions: React.FC<Props> = () => {
  
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { login } = useStoreActions((state: any) => state.mySky);
  const { loggedIn } = useStoreState((state: any) => state.mySky);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  const handleLogin = async () => {
    if (!mySky) return;

    setGlobalLoading(true);
    try {
      await login({ mySky })
      NotificationManager.success('You\'ve successfully logged in', 'Logged In', 2500);
    } catch (error) {
      console.error(error);
      NotificationManager.error(error.message, 'Error');
    }
    setGlobalLoading(false);
  }

  return (
    <div className="actions">
      <Link to="/create">
        <Button
          type="primary"
          htmlType="button"
          title="Create GIF"
        >
          <object className="fade-up" type="image/svg+xml" data={plusRegular} width="20" height="18">Create Icon</object> Create
        </Button>
      </Link>

      <Link to="/upload">
        <Button
          type="primary"
          htmlType="button"
          title="Upload GIF"
        >
          <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object> Upload
        </Button>
      </Link>

      {loggedIn ?
      <HeaderProfile /> :
      <Button type="secondary" title="Login To MySKy" onClick={handleLogin}>Login To MySky</Button>}

    </div>  
  )
}

export default HeaderActions;