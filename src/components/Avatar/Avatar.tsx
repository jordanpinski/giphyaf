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
  type?: AvatarType
}

const Avatar: React.FC<Props> = ({
  width,
  height,
  text,
  src = userRegular,
  type = AvatarType.object
}) => {

  let temp;

  switch (type) {
    case AvatarType.object:
      temp = (
        <div className="avatar" style={{
          width: width,
          height: height
        }}>
          <object className="fade-up" type="image/svg+xml" data={src}>{text}</object>
        </div>
      )
      break;

    case AvatarType.img:
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