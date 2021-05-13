import react from 'react';

export const aspectRatio = (width: number, height: number)  => {
  const divisor = gcd(width, height);

  return {
    x: width / divisor,
    y: height / divisor
  }
};

export const gcd = (a: number, b: number): any => {
  return a > b ? a : b;
}
