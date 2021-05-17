import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { Button } from '../Button';
import { uploadRegular, plusRegular } from '../../assets/icons';
import HeaderProfile from './HeaderProfile';

interface Props {

}

const HeaderActions: React.FC<Props> = () => {
  
  const mySky = useStoreState((state: any) => state.mySky);
  const loggedIn = useStoreState((state: any) => state.loggedIn);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);
  const setUserID = useStoreActions((actions: any) => actions.setUserID);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  const handleLogin = async () => {
    if (!mySky) return;

    try {
      const status = await mySky.requestLoginAccess();
      setLoggedIn(status);
  
      if (status) {
        setGlobalLoading(true);
        setUserID(await mySky.userID());
        NotificationManager.success('You\'ve successfully logged in', 'Logged In', 2500);
      }
    } catch (error) {
      console.error(error);
      NotificationManager.error('There\'s been an error logging in. Please try again.', 'Error');
    }
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