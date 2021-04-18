import React, { useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gif from '../components/Gif';

interface Props {

}

const Home: React.FC<Props> = () => {
  
  useEffect(() => {
    document.title = 'Home - giphyaf';
  })

  return (
    <>
      <Header />
      <div className="page page--home fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-3">
              <Gif />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home;