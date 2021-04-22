import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gif from '../components/Gif';
import { getUserEntries } from '../skynet';

interface Props {

}

const Home: React.FC<Props> = () => {

  // Local state
  const [entries, setEntries] = useState<any>();

  // Global State
  const mySky = useStoreState((state: any) => state.mySky);
  const loggedIn = useStoreState((state: any) => state.loggedIn);
  const setLoggedIn = useStoreActions((actions: any) => actions.setLoggedIn);
  const setUserID = useStoreActions((actions: any) => actions.setUserID);

  useEffect(() => {
    document.title = 'Home - giphyaf';
    
    getUserEntries(mySky).then((data: any) => {
      setEntries(data);
      console.log(typeof data);
    });

  }, [loggedIn, mySky])

  const handleLogin = async () => {
    if (!mySky) return;

    try {
      const status = await mySky.requestLoginAccess();
      setLoggedIn(status);
  
      if (status) {
        setUserID(await mySky.userID());
      }
    } catch (error) {
      console.error(error);
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
                    <div className="column column-12">
                      <h1>My GIFs</h1>
                    </div>
                    
                    {entries ? entries.map((entry: any, index: number) => {
                      console.log(entry)
                      return (
                        <div className="column column-6 column-lg-3 column-md-4" key={index}>
                          <Gif
                            skyLinkUrl={entry.json.image.url}
                            title={entry.json.title}
                            tags={entry.json.tags}
                          />
                        </div>
                    )}) : (
                      null
                    )}
                  </>
                )
              :
              <div className="column column-12">
                <div className="hero gradient-two">
                  <h1>A Decentralized Home For Your GIFS</h1>
                  <p>giphyaf is a decentralized home to create, upload, and share your GIFs with the world.</p>
                  <div className="buttons">
                    <a href="#" className="button button--secondary" onClick={handleLogin} title="Sign Up Now">Sign Up Now</a>
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