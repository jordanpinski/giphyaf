import react from 'react';

export const getAspectRatio = (canvas: any, image: any) => {
  const ratioWidth = image.width / canvas.offsetWidth;
  const ratioHeight = image.height / canvas.offsetHeight;
  return ratioWidth > 1 ? ratioWidth : ratioHeight > 1 ? ratioHeight : 1;
}

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
