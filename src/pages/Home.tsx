import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { getGlobalPosts } from '../skynet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gif from '../components/Gif';

interface Props {

}

const Home: React.FC<Props> = () => {
  
  const skynetClient = useStoreState((state: any) => state.skynetClient);
  const loggedIn = useStoreState((state: any) => state.loggedIn);

  useEffect(() => {
    if (!skynetClient) return;

    const test = async () => {
      const posts = await getGlobalPosts(skynetClient);
      console.log({posts});
    }

    test();

    document.title = 'Home - giphyaf';
  }, [skynetClient])

  return (
    <>
      <Header />
      <div className="page page--home fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">

              {loggedIn ?
              <div>LOGGED IN!</div>
              : 
              <div className="hero">
                <h1>A Decentralized Home For Your GIFS</h1>
                <p>giphyaf is a decentralized home to create, upload, and share your GIFs with the world.</p>
                <div className="buttons">
                  <a href="/" className="button button--secondary" title="Sign Up Now">Sign Up Now</a>
                </div>
              </div>
              }

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home;