import React from 'react'
import './Button.css';

interface Props {
  href?: string
  type?: string
  htmlType?: string
  title?: string
  loading?: boolean
  onClick?: any
  children?: any
}

const Button: React.FC<Props> = ({
  href = '#',
  type,
  htmlType,
  title,
  loading = false,
  onClick = () => {},
  children
}) => {

  let temp;

  switch (htmlType) {
    case 'submit':
      temp = (
        <button
        type="submit"
        className={type !== '' ? `button button--${type}` : 'button'}
        title={title}
        onClick={onClick}
      >
        {children}
        {loading ? 'loading..' : ''}
      </button>
      )
      break;

    default:
      temp = (
        <a
        href={href}
        className={type !== '' ? `button button--${type}` : 'button'}
        title={title}
        onClick={onClick}
      >
        {children}
        {loading ? 'loading..' : ''}
      </a>
      )
      break;
  }

  return temp;
}

export default Button;