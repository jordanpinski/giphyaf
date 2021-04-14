import React from 'react'
import './Menu.css';

interface Props {
  visible?: boolean
  children?: any
}

const Menu: React.FC<Props> = ({
  visible = false,
  children
}) => {

  // const menuRef = useRef<any>();

  // useEffect(() => {
  //   const menu = menuRef.current;
  //   const boundingBox = menu.getBoundingClientRect();

  //   // Reposition menu if it's overflowing the window
  //   if (boundingBox.right > window.innerWidth) {
  //     menu.classList.add('overflow-right');
  //   }
  // })

  return (
    <div
      // ref={menuRef}
      className={`menu ${visible ? 'visible' : ''}`}
    >
      {children}
    </div>
  )
}

export default Menu;