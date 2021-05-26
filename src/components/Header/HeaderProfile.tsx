import React, { useState, useContext, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
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
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  // Global state
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { logout } = useStoreActions((actions: any) => actions.mySky);
  const { userProfile } = useStoreState((state: any) => state.mySky);

  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  // Other hooks
  const history = useHistory();

  useEffect(() => {
    if (!userProfile) return;
    if (!userProfile.avatar[0].url) return;
    
    try {
      mySky.connector.client.getSkylinkUrl(userProfile.avatar[0].url).then((result: any) => {
        setAvatarUrl(result);
      });
    } catch (error) {
      console.log(error);
    }

  }, [mySky, userProfile]);

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
      <Avatar
        text="Profile"
        width={50}
        height={50}
        src={avatarUrl}
        type={avatarUrl !== '' ? 'string' : 'object'}
      />
      <Menu visible={menuVisible}>
        <ul>
          {userProfile ? (<li className="username">Welcome {userProfile.username}!</li>) : null}
          <li><a href="https://skyprofile.hns.siasky.net/" target="_blank" rel="noreferrer" title="Profile">Profile</a></li>
          <li><Link to="/" title="My Uploads">My Uploads</Link></li>
          <li><a href="/" title="Log Out" onClick={logOut}>Log Out</a></li>
        </ul>
      </Menu>
    </div>
  )
}

export default HeaderProfile;