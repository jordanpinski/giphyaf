import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SkynetContext } from '../state/SkynetContext';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gif from '../components/Gif';
import { Card, CardType } from '../components/Card';
import { Button } from '../components/Button';
import { uploadRegular, loader } from '../assets/icons';

interface Props {

}

const Home: React.FC<Props> = () => {

  // Local state
  const [loading, setLoading] = useState<boolean>(true);

  // Global State
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { userID, loggedIn } = useStoreState((state: any) => state.mySky);
  const { gifs } = useStoreState((state: any) => state.gifs);
  const { login } = useStoreActions((state: any) => state.mySky);
  const { fetchGifs } = useStoreActions((state: any) => state.gifs);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  useEffect(() => {
    document.title = 'Home - giphyaf';
    if (!loggedIn) return;
    setLoading(true);

    new Promise(async (resolve, reject) => {
      await fetchGifs({ mySky, userID, pageNumber: 0 });
      setLoading(false);
      resolve(true);
    })

  }, [mySky])

  const handleLogin = async (event: any) => {
    event?.preventDefault();
    if (!mySky) return;
    setGlobalLoading(true);

    try {
      await login({ mySky })
      NotificationManager.success('You\'ve successfully logged in', 'Logged In', 2500);
    } catch (error) {
      console.error(error);
      NotificationManager.error('There\'s been an error logging in. Please try again.', 'Error');
    }

    setGlobalLoading(false);
  }

  return (
    <>
      <Header />
      <div className="page page--home fade-up">
        <div className="container">
          <div className="row">
            
              {loggedIn ?
                (
                  <>
                    <div className="column column-12 mb-4">
                      <div className="hero hero--small gradient-two">
                        <h1>My GIFs</h1>
                      </div>
                    </div>
                    
                    {loading ? (
                      <div className="loading-overlay-section">
                        <object className="fade-up" type="image/svg+xml" data={loader} width="80px">Loading</object>
                      </div>
                    ) : (
                      gifs.length > 0 ? gifs.map((gif: any, index: number) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="column column-6 column-lg-3 column-md-4">
                              <Gif
                                skylinkUrl={gif.content.media.image.url}
                                title={gif.content.title}
                                tags={gif.content.topics}
                              />
                            </div>
                            {index === gifs.length - 1 ? (
                              <div className="column column-12 column-lg-3 column-md-4 fade-up">
                                <Card type={CardType.actionCTA}>
                                  <Link to="/upload" title="Upload GIF"><Button type="secondary" htmlType="button"> <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object>Upload GIF</Button></Link>
                                </Card>
                              </div>
                            ) : null }
                          </React.Fragment>
                      )}) : (
                        <>
                          <div className="column column-12">
                            <p>Nothing to show. Try <Link to="/upload" title="Uploading">uploading</Link> a GIF!</p>
                          </div>
                          <div className="column column-12 column-lg-3 column-md-4 fade-up">
                            <Card type={CardType.actionCTA}>
                              <Link to="/upload" title="Upload GIF"><Button type="secondary" htmlType="button"> <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object>Upload GIF</Button></Link>
                            </Card>
                          </div>
                        </>
                      )
                    )}
                  </>
                )
              :
              <div className="column column-12">
                <div className="hero gradient-two">
                  <h1>A Decentralized Home For Your GIFS</h1>
                  <p>giphyaf is a decentralized home to create, upload, and share your GIFs with the world.</p>
                  <div className="buttons">
                    <a href="/" className="button button--secondary" onClick={handleLogin} title="Login To MySky">Login To MySky</a>
                  </div>
                </div>
              </div>
              }

          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home;