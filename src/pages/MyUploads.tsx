import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loader } from '../assets/icons';
// import Gif from '../components/Gif';

interface Props {

}

const MyUploads: React.FC<Props> = () => {

  // Local state
  const [loading, setLoading] = useState<boolean>(true);
  // const [data, setData] = useState<any>([]);

  // Global state
  const mySky = useStoreState((state: any) => state.mySky);
  const loggedIn = useStoreState((state: any) => state.loggedIn);

  useEffect(() => {
    document.title = 'My Uploads - giphyaf';
    if (!mySky) return;
    const filepath = `${mySky.hostDomain}/posts/data.json`;
    mySky.getJSON(filepath).then((data: any) => {
      // setData(data.data);
      setLoading(false);
      console.log(data);
    });
  }, [mySky])

  return loggedIn ? (
    <>
      <Header />
      <div className="page page--my-uploads fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-12">
              <h1>My Uploads</h1>
            </div>

            {loading ?
              (
                <div className="column column-12">
                  <object className="fade-up" type="image/svg+xml" data={loader} width="80px">Loading</object>
                </div>
              )
              :
              null
              // data ? data.map((gif: any, index: number) => {
              //   console.log(gif);
              //   return (
              //     <div className="column column-6 column-lg-3 column-md-4" key={index}>
              //       <Gif
              //         title={gif.title}
              //         skyLinkUrl={gif.skylinkUrl}
              //         tags={gif.tags}
              //       />
              //     </div>
              //   )
              // }) : (
              //   <div className="column column-12">
              //     <p>Oh no! It looks like you haven't uploaded any GIFs yet. When you're ready try <a href="/upload" title="Uploading">uploading</a> one!</p>
              //   </div>
              // )
            }

          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Header />

      <Footer />
    </>
  )
}

export default MyUploads;