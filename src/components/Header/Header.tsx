import React from 'react';
import HeaderActions from './HeaderActions';
import Logo from '../Logo';
import './Header.css';

interface Props {

}

const Header: React.FC<Props> = () => {

  return (
    <header className="app-header">
      <div className="container">
        <div className="row">
            
          {/* Logo */}
          <div className="column column-sm-3">
            <Logo />
          </div>


          {/* Navigation */}

          {/* Actions */}
          <div className="column column-sm-9">
            <HeaderActions />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;