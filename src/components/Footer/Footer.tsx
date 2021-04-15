import React from 'react';
import { skynetLogo } from '../../assets/icons';
import './Footer.css';

interface Props {

}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row">
          <div className="column"><p>Powered by <a href="https://siasky.net/" target="_blank" rel="noreferrer" title="Powered By Skynet"><object type="image/svg+xml" data={skynetLogo} width="30" height="30">Skynet Logo</object></a></p></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;