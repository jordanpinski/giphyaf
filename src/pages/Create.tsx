import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import GifMaker from '../components/GifMaker';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {

}

const Upload: React.FC<Props> = () => {

  // Global state
  const mySky = useStoreState((state: any) => state.mySky);
  const loggedIn = useStoreState((state: any) => state.loggedIn);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);

  useEffect(() => {
    document.title = 'Create GIF - giphyaf';
  })

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (!mySky) return;

    const status = await mySky.requestLoginAccess();
    setLoggedIn(status);
  }

  return (
    <>
      <Header />
      <div className="page page--create fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">
              {loggedIn ? 
                <GifMaker />
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