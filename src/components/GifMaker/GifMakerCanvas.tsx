import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import GifMakerCanvasGif from './GifMakerCanvasGif';

interface Props {
  file: any
  filePreview: string
}

const GifCanvas: React.FC<Props> = ({ file, filePreview }) => {

  // Local state
  const [tempImage, setTempImage] = useState();
  const [gifAnimation, setGifAnimation] = useState<any>();

  // Refs
  const stageRef = useRef<any>();
  
  const handleClick = () => {
    const stage = stageRef.current;
    console.log(gifAnimation);
  }

  return (
    <>
    <button onClick={handleClick}>Save Data URL</button>
      <Stage ref={stageRef} width={500} height={500} className="TESTING!">
        <Layer>
          {file.type === 'image/gif' ? (
            <GifMakerCanvasGif
              filePreview={filePreview}
              setGifAnimation={setGifAnimation}
            />
          ) : (
            null
          )}
          
          <Text text="hello!" />
        </Layer>
      </Stage>
      <img src={tempImage} />
    </>
  )
}

export default GifCanvas;