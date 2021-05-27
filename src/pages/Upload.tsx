import React, { useEffect, useContext } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SkynetContext } from '../state/SkynetContext';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import GifUploader from '../components/GifUploader';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {

}

const Create: React.FC<Props> = () => {

  // Global state
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { loggedIn } = useStoreState((state: any) => state.mySky);
  const { login } = useStoreActions((actions: any) => actions.mySky);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);
  
  useEffect(() => {
    document.title = 'Upload GIF - giphyaf';
  })

  const handleLogin = async (event: any) => {
    event.preventDefault();
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
    <>
      <Header />
      <div className="page page--upload fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">
              {loggedIn ? 
                <GifUploader />
              : (
                <>
                  <div className="hero gradient-two">
                    <h1>Upload a GIF</h1>
                    <p>Hey there! You'll need to login to your <a href="/" onClick={handleLogin} title="MySky Account">MySky account</a> before adding any sweet GIFs. ✌🤷‍♀️😎</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Create;