import React from 'react';
import Avatar from '../Avatar';
import './Gif.css';

interface Props {

}

const Gif: React.FC<Props> = () => {
  return (
    <div className="gif">
      <a href="/" title="">
        <div className="image">

        </div>
      </a>
      <div className="meta">
        <Avatar text="User" width={34} height={34} />
        <div className="right">
          <p className="title">Title here</p>
          <ul className="tags">
            <li>#tag1</li>
            <li>#tag2</li>
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Gif;