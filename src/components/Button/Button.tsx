import React from 'react'
import './Button.css';

interface Props {
  href?: string
  type?: string
  htmlType?: string
  title?: string
  loading?: boolean
  onClick?: any
  disabled?: boolean
  children?: any
}

const Button: React.FC<Props> = ({
  href = '#',
  type,
  htmlType,
  title,
  loading = false,
  disabled = false,
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
          disabled={disabled}
        >
          {children}
          {loading ? 'loading..' : ''}
        </button>
      )
      break;

    case 'button':
      temp = (
        <button
          className={type !== '' ? `button button--${type}` : 'button'}
          title={title}
          onClick={onClick}
          disabled={disabled}
          data-disabled={disabled}
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
        data-disabled={disabled}
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