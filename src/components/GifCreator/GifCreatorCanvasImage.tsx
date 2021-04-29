import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

interface Props {
  filePreview: string
  width: number
  height: number
}

const GifCreatorCanvasImage: React.FC<Props> = ({ filePreview, width, height }) => {

  // Local state
  const [image, setImage] = useState<any>();

  // Refs
  const imageRef = useRef<any>();

  useEffect(() => {
    const image = new window.Image();
    image.src = filePreview;
    setImage(image);
  }, [filePreview])

  return <Image
    ref={imageRef}
    image={image}
    width={width}
    height={height}
  />
}

export default GifCreatorCanvasImage;