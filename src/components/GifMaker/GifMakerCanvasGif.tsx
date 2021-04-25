import React, { useRef, useMemo, useEffect } from 'react';
import { Image } from 'react-konva';
import 'gifler';

interface Props {
  filePreview: string
  setGifAnimation: any
}

const GifMakerCanvasGif: React.FC<Props> = ({ filePreview, setGifAnimation }) => {

  // Refs
  const imageRef = useRef(null);
  
  const canvas = useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  useEffect(() => {

    let animation: any;
    // @ts-ignore
    window.gifler(filePreview).get((a: any) => {
      animation = a;
      setGifAnimation(animation);
      animation.animateInCanvas(canvas);
      animation.onDrawFrame = (ctx: any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        // @ts-ignore
        imageRef.current.getLayer().draw();
      }
    })
    return () => animation.stop();
  }, [filePreview, canvas]);

  return <Image image={canvas} ref={imageRef} />
}

export default GifMakerCanvasGif;