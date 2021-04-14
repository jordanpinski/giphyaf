import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Button } from '../Button';
import { uploadRegular } from '../../assets/icons';
import HeaderProfile from './HeaderProfile';


interface Props {

}

const HeaderActions: React.FC<Props> = () => {
  
  const mySky = useStoreState((state: any) => state.mySky);
  // const mySkyLoading = useStoreState((state: any) => state.mySkyloading);
  // const setMySkyLoading = useStoreActions((action: any) => action.setMySkyLoading);
  const loggedIn = useStoreState((state: any) => state.loggedIn);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);

  // useEffect(() => {
  //   setMySkyLoading(false);
  // }, [mySky])

  const handleLogin = async () => {
    if (!mySky) return;

    const status = await mySky.requestLoginAccess();
    setLoggedIn(status);
  }

  return (
    <div className="actions">
      <Button
        href="/upload"
        type="primary"
        title="Upload GIF"
      >
        <object type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object> Upload GIF
      </Button>

      {loggedIn ?
      <HeaderProfile /> :
      <Button type="secondary" title="Login To MySKy" onClick={handleLogin}>Login To MySky</Button>}

    </div>  
  )
}

export default HeaderActions;