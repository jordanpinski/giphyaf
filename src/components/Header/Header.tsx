import React from 'react'
import HeaderActions from './HeaderActions';
import './Header.css';

interface Props {

}

const Header: React.FC<Props> = () => {

  return (
    <header className="app-header">
      <div className="container">
        <div className="row">
            
          {/* Logo */}
          <div className="column column-6">
            <div className="logo">
              <a href="/" title="giphyaf">giphyaf</a>
            </div>
          </div>


          {/* Navigation */}

          {/* Actions */}
          <div className="column column-6">
            <HeaderActions />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;