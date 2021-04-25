import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import './Logo.css';

interface Props {
  noLink?: boolean
}

const Logo: React.FC<Props> = ({ noLink }) => {

  // Global state
  const appVersion = useStoreState((state: any) => state.appVersion);

  return noLink ? (
    <div className="logo">
      <a href="/" title="giphyaf">giphyaf</a>
      <span className="version" title={`v${appVersion} - View Changelog`}>v1</span>
    </div>
  ) : (
    <div className="logo">
      <Link to="/">
        giphyaf
      </Link> 
      <span className="version" title={`v${appVersion} - View Changelog`}>v1</span>
    </div>
  )
}

export default Logo;