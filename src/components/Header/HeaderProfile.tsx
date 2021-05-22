import React, { useState, useContext } from 'react';
import { useStoreActions } from 'easy-peasy';
import { SkynetContext } from '../../state/SkynetContext';
import { Link, useHistory } from 'react-router-dom';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import Menu from '../Menu';
import Avatar from '../Avatar';

interface Props {

}

const HeaderProfile: React.FC<Props> = () => {

  // Local state
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  // Global state
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { logout } = useStoreActions((actions: any) => actions.mySky);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  // Other hooks
  const history = useHistory();

  const onClick = (event: any) => {
    setMenuVisible(!menuVisible);
  }

  const logOut = async (event: any) => {
    event.preventDefault();

    try {
      setGlobalLoading(true)
      await logout({ mySky });
      setGlobalLoading(false);
      NotificationManager.success('You\'ve successfully logged out.', 'Logged Out', 2500);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="profile" onClick={onClick}>
      <Avatar text="Profile" width={50} height={50} />
      <Menu visible={menuVisible}>
        <ul>
          <li><Link to="/" title="My Uploads">My Uploads</Link></li>
          <li><a href="/" title="Log Out" onClick={logOut}>Log Out</a></li>
        </ul>
      </Menu>
    </div>
  )
}

export default HeaderProfile;