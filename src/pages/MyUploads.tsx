import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gif from '../components/Gif';

interface Props {

}

const MyUploads: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <div className="page page--user-gifs fade-up">
        <div className="container">
          <div className="row">
            <div className="column column-3">
              <h1>My Uploads</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default MyUploads;