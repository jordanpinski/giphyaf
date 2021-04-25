import React, { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import { transform } from 'typescript';

interface Props {
  width: number
  height: number
  color: string
  text: string
  selectedFont: string
  transformSelected: boolean
}

const GifMakerCanvasText: React.FC<Props> = ({ color, text, selectedFont, width, height, transformSelected }) => {

  // Refs
  const textRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {

    console.log(transformSelected)

    if (transformSelected && transformerRef && transformerRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
      transformerRef.current.zIndex(transformerRef.current.getLayer().children.length - 1);
    } else {
      transformerRef.current.nodes([]);
    }
  }, [transformSelected]);

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={width/2}
        y={height/2}
        fontSize={40}
        fontFamily={`${selectedFont}`}
        fontStyle="bold"
        fill={color}
        draggable={true}
      />
      <Transformer
        ref={transformerRef}
        resizeEnabled={true}
        rotateEnabled={false}
        anchorSize={7}
        keepRatio={true}
      />
    </>
  )
}

export default GifMakerCanvasText;