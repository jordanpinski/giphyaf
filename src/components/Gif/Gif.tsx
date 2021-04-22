import React from 'react';
import Avatar from '../Avatar';
import { LazyImage } from "react-lazy-images";
import './Gif.css';

interface Props {
  skyLinkUrl?: string
  tags?: string[]
  title?: string
}

const Gif: React.FC<Props> = ({
  skyLinkUrl = '',
  tags = [],
  title = ''
}) => {

  return (
    <div className="gif fade-up">
      <a href="/gif" title={title}>
        <div className="image">
          <LazyImage
            src={skyLinkUrl}
            placeholder={({ imageProps, ref }) => (
              <img ref={ref} src="/" alt={imageProps.alt} />
            )}
            actual={({ imageProps }) => <img {...imageProps} />}
          />
        </div>
      </a>
      <div className="meta">
        <Avatar text="User" width={34} height={34} />
        <div className="right">
          <p className="title">{title ? title : 'Title Here'}</p>
          <ul className="tags">
              {tags.map((tag: any, index: number) => {
                return <li key={index}>tag</li>
              })}
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Gif;