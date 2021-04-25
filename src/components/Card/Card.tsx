import React from 'react';
import './Card.css';

enum CardType {
  actionCTA
}

interface Props {
  type: CardType
  children: any
}

const Card: React.FC<Props> = ({ type, children }) => {

  let classList: string = '';

  switch (type) {
    case CardType.actionCTA:
      classList = 'card--action-cta';
      break;

    default:
      break;
  }

  return (
    <div className={`card ${classList}`}>
      {children}
    </div>
  )
}

export {
  Card,
  CardType
}