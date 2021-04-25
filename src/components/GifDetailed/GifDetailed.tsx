import React from 'react';
import { useStoreState } from 'easy-peasy';
import './GifDetailed.css';

interface Props {

}

const GifDetailed: React.FC<Props> = () => {

  // Global state
  const selectedGIF = useStoreState((state: any) => state.selectedGIF);

  return selectedGIF ? (
    <div className="gif-detailed">
      <div className="container">
        <div className="row">
          <div className="column column-12">
            <div className="image">
              <img src={selectedGIF.skylinkUrl} alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  ) : <p>Failed to load selected GIF</p>
}

export default GifDetailed;