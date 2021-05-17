import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import { getUserEntries } from '../skynet';
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
  const [entries, setEntries] = useState<any>([]);

  // Global State
  const mySky = useStoreState((state: any) => state.mySky);
  const loggedIn = useStoreState((state: any) => state.loggedIn);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);
  const setUserID = useStoreActions((actions: any) => actions.setUserID);
  const setGlobalLoading = useStoreActions((actions: any) => actions.setGlobalLoading);

  useEffect(() => {
    document.title = 'Home - giphyaf';
    let promiseActive = true; // Needed for cleanup.
    if (!loggedIn) return;

    getUserEntries().then((data: any) => {
      if (promiseActive) {
        if (!data) {
          console.error('No data to load');
          setLoading(false);
          return;
        };
        setEntries(data);
        setLoading(false);
      }

    });

    return () => {
      promiseActive = false
    }

  }, [loggedIn, mySky])

  const handleLogin = async (event: any) => {
    event?.preventDefault();
    if (!mySky) return;

    try {
      const status = await mySky.requestLoginAccess();

      setLoggedIn(status);
  
      if (status) {
        setGlobalLoading(true);
        setUserID(await mySky.userID());
        NotificationManager.success('You\'ve successfully logged in', 'Logged In', 2500);
      }
    } catch (error) {
      console.error(error);
      NotificationManager.error('There\'s been an error logging in. Please try again.', 'Error');
    }
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
                      entries.length > 0 ? entries.map((entry: any, index: number) => {
                        return (
                          <>
                            <div className="column column-6 column-lg-3 column-md-4" key={index}>
                              <Gif
                                skylinkUrl={entry.content.media.image.url}
                                title={entry.content.title}
                                tags={entry.content.topics}
                              />
                            </div>
                            {index === entries.length - 1 ? (
                              <div className="column column-12 column-lg-3 column-md-4 fade-up" key={index + 1}>
                                <Card type={CardType.actionCTA}>
                                  <Link to="/upload" title="Upload GIF"><Button type="secondary" htmlType="button"> <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="20" height="18">Upload Icon</object>Upload GIF</Button></Link>
                                </Card>
                              </div>
                            ) : null}
                          </>
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