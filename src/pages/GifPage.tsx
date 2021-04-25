import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GifDetailed from '../components/GifDetailed';

interface Props {

}

const GifPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Header />
      <div className="page page--gif">
        <div className="container">
          <div className="row">
            <GifDetailed />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GifPage;