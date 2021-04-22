import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {

}

const Gif: React.FC<Props> = ({}) => {
  return (
    <>
      <Header />
      <div className="page page--gif">
        <div className="container">
          <div className="row">

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Gif;