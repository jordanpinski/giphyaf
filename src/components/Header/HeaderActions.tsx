import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
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

  const handleLogin = async () => {
    if (!mySky) return;

    const status = await mySky.requestLoginAccess();
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  }

  return (
    <div className="actions">
      <Button
        href="#"
        type="primary"
        title="Create GIF"
        disabled={true}
      >
        <object className="fade-up" type="image/svg+xml" data={plusRegular} width="20" height="18">Create Icon</object> Create
      </Button>
      <Button
        href="/upload"
        type="primary"
        title="Upload GIF"
      >
        <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object> Upload
      </Button>

      {loggedIn ?
      <HeaderProfile /> :
      <Button type="secondary" title="Login To MySKy" onClick={handleLogin}>Login To MySky</Button>}

    </div>  
  )
}

export default HeaderActions;