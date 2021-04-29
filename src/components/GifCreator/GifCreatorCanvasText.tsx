import React, { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import { transform } from 'typescript';

interface Props {
  width: number
  height: number
  text: string
  selectedFont: string
  color: string
  borderColor: string
  borderWidth: number
  transformSelected: boolean
}

const GifCreatorCanvasText: React.FC<Props> = ({
  text,
  selectedFont,
  color,
  borderColor,
  borderWidth,
  width,
  height,
  transformSelected
}) => {

  // Refs
  const textRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {

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
        fontSize={60}
        fontFamily={`${selectedFont.split('-').map((font) => {
          return font[0].toUpperCase() + font.slice(1, font.length);
        }).join(' ')}`}
        fontStyle="bold"
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeEnabled={borderWidth > 0 ? true : false}
        draggable={true}
      />
      <Transformer
        ref={transformerRef}
        resizeEnabled={true}
        rotateEnabled={false}
        padding={10}
        anchorSize={10}
        keepRatio={false}
      />
    </>
  )
}

export default GifCreatorCanvasText;