import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Props {

}

const Upload: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <div className="page page--upload">
        <div className="container">
          <div className="row">
            <div className="column column-3">
              UPLOAD
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Upload;