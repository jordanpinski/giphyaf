import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { aspectRatio, getAspectRatio } from '../../utils';
import GifCreatorCanvasGif from './GifCreatorCanvasGif';
import GifCreatorCanvasImage from './GifCreatorCanvasImage';
import GifCreatorCanvasText from './GifCreatorCanvasText';

interface Props {
  file: any
  filePreview: string
  canvasContainerRef: any
  imageRef: any
  text: string
  selectedFont: string
  color: string
  borderColor: string
  borderWidth: number
}

const GifCanvas: React.FC<Props> = ({
  file,
  filePreview,
  canvasContainerRef,
  imageRef,
  color,
  borderColor,
  borderWidth,
  text,
  selectedFont,
}) => {

  // Local state
  const [gifAnimation, setGifAnimation] = useState<any>();
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();
  const [transformSelected, setTransformSelected] = useState<boolean>(false);

  // Refs
  const stageRef = useRef<any>();

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const image = imageRef.current;

    const aspectRatio = getAspectRatio(canvasContainer, image);

    const newWidth = image.width / aspectRatio;
    const newHeight = image.height / aspectRatio;
    
    setWidth(newWidth);
    setHeight(newHeight);
  }, [canvasContainerRef, imageRef])

  const handleMouseEnter = () => {
    setTransformSelected(true)
  }

  const handleMouseLeave = () => {
    setTransformSelected(false)
  }

  return (
    <>
      <Stage ref={stageRef} width={width} height={height} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Layer>

          {file.type === 'image/gif' ? (
            <GifCreatorCanvasGif
              filePreview={filePreview}
              setGifAnimation={setGifAnimation}
            />
          ) : (
            <GifCreatorCanvasImage
              filePreview={filePreview}
              width={width}
              height={height}
            />
          )}

          <GifCreatorCanvasText
            width={width}
            height={height}
            selectedFont={selectedFont}
            text={text}
            color={color}
            borderColor={borderColor}
            borderWidth={borderWidth}
            transformSelected={transformSelected}
          />
        
        </Layer>
      </Stage>
    </>
  )
}

export default GifCanvas;