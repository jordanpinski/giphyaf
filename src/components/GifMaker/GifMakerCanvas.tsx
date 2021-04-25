import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import GifMakerCanvasGif from './GifMakerCanvasGif';
import GifMakerCanvasImage from './GifMakerCanvasImage';
import GifMakerCanvasText from './GifMakerCanvasText';

interface Props {
  file: any
  filePreview: string
  canvasContainerRef: any
  imageRef: any
  color: string
  text: string
  selectedFont: string
}

const GifCanvas: React.FC<Props> = ({
  file,
  filePreview,
  canvasContainerRef,
  imageRef,
  color,
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
    setWidth(canvasContainer.offsetWidth)
    setHeight(image.offsetHeight)
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
            <GifMakerCanvasGif
              filePreview={filePreview}
              setGifAnimation={setGifAnimation}
            />
          ) : (
            <GifMakerCanvasImage
              filePreview={filePreview}
              width={width}
              height={height}
            />
          )}

          <GifMakerCanvasText
            width={width}
            height={height}
            color={color}
            text={text}
            selectedFont={selectedFont}
            transformSelected={transformSelected}
          />
        
        </Layer>
      </Stage>
    </>
  )
}

export default GifCanvas;