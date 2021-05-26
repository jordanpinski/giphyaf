import React, { useEffect, useContext } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SkynetContext } from '../state/SkynetContext';
import GifCreator from '../components/GifCreator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderActions from '../components/Header/HeaderActions';

interface Props {

}

const Upload: React.FC<Props> = () => {

  // Global state
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { loggedIn } = useStoreState((state: any) => state.mySky);
  const { login } = useStoreActions((actions: any) => actions.mySky);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  useEffect(() => {
    document.title = 'Create GIF - giphyaf';
  })

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (!mySky) return;
    setGlobalLoading(true);
    await login ({ mySky });
    setGlobalLoading(false);
  }

  return (
    <>
      <Header />
      <div className="page page--create fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">
              {loggedIn ? 
                <GifCreator />
              : (
                <>
                  <div className="hero gradient-two">
                    <h1>Create GIF</h1>
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

export default Upload;