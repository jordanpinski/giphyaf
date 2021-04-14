import React from 'react'
import './Gif.css';

interface Props {

}

const Gif: React.FC<Props> = () => {
  return (
    <div className="gif">
      <div className="image"></div>
      <div className="meta">
        <p>Title here</p>
      </div>
    </div>
  )
}

export default Gif;