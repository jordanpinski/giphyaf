import React from 'react'
import { userRegular } from '../../assets/icons';
import './Avatar.css';

enum AvatarType {
  'object',
  'img'
}

interface Props {
  width: number
  height: number
  text: string
  src?: string
  type?: string
}

const Avatar: React.FC<Props> = ({
  width,
  height,
  text,
  src = userRegular,
  type = 'object'
}) => {

  let temp = null;

  switch (type) {
    case 'object':
      temp = (
        <div className="avatar" style={{
          width: width,
          height: height
        }}>
          <object className="fade-up" type="image/svg+xml" data={src ? src : userRegular}>{text}</object>
        </div>
      )
      break;

    case 'string':
      temp = (
        <div className="avatar" style={{
          width: width,
          height: height
        }}>
          <img src={src} alt={text} title={text}></img>
        </div>
      )
      break;
  }

  return temp;
}

export default Avatar;