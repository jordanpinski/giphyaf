import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import GifUploader from '../components/GifUploader';
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
    document.title = 'Upload GIF - giphyaf';
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
      <div className="page page--upload fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">
              {loggedIn ? 
                <GifUploader />
              : (
                <>
                  <h1>Upload GIF</h1>
                  <div className="notification">
                    <p>Hey there! You'll need to login to your <a href="/" onClick={handleLogin} title="MySky Account">MySky account</a> before adding your sweet GIFs. ✌🤷‍♀️😎</p>
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