import React, { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import Menu from '../Menu';
import { userRegular } from '../../assets/icons';

interface Props {

}

const HeaderProfile: React.FC<Props> = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const mySky = useStoreState((state: any) => state.mySky);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);

  const onClick = (event: any) => {
    event.preventDefault();
    setMenuVisible(!menuVisible);
  }

  const logOut = async (event: any) => {
    event.preventDefault();
    await mySky.logout();
    setLoggedIn(false);
  }

  return (
    <div className="profile" onClick={onClick}>
      <a href="/" title="Profile">
        <object type="image/svg+xml" data={userRegular} width="20" height="18">User Icon</object>
      </a>
      <Menu visible={menuVisible}>
        <ul>
          <li><a href="/mygifs" title="My GIFs">My GIFs</a></li>
          <li><a href="/" title="Log Out" onClick={logOut}>Log Out</a></li>
        </ul>
      </Menu>
    </div>
  )
}

export default HeaderProfile;