import React from 'react'
import './Button.css';

interface Props {
  href?: string
  type?: string
  title?: string
  loading?: boolean
  onClick?: any
  children?: any
}

const Button: React.FC<Props> = ({
  href = '#',
  type,
  title,
  loading = false,
  onClick = () => {},
  children
}) => {
  return (
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
}

export default Button;