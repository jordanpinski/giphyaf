import React, { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import Menu from '../Menu';
import Avatar from '../Avatar';

interface Props {

}

const HeaderProfile: React.FC<Props> = () => {

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const mySky = useStoreState((state: any) => state.mySky);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);
  const setUserID = useStoreActions((actions: any) => actions.setUserID);

  const onClick = (event: any) => {
    setMenuVisible(!menuVisible);
  }

  const logOut = async (event: any) => {
    event.preventDefault();
    try {
      await mySky.logout();
      setLoggedIn(false);
      setUserID('');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="profile" onClick={onClick}>
      <Avatar text="Profile" width={50} height={50} />
      <Menu visible={menuVisible}>
        <ul>
          <li><a href="/" title="My Uploads">My Uploads</a></li>
          <li><a href="/" title="Log Out" onClick={logOut}>Log Out</a></li>
        </ul>
      </Menu>
    </div>
  )
}

export default HeaderProfile;