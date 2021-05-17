export const getAspectRatio = (canvas: any, image: any) => {
  const ratioWidth = image.width / canvas.offsetWidth;
  const ratioHeight = image.height / canvas.offsetHeight;
  return ratioWidth > 1 ? ratioWidth : ratioHeight > 1 ? ratioHeight : 1;
}