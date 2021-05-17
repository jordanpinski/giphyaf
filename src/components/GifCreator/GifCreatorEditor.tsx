import React, { useRef, useState } from 'react';
import GifCreatorCanvas from './GifCreatorCanvas';
import GifCreatorEditorSidebar from './GifCreatorEditorSidebar';
import GifUploaderPreview from '../GifUploader/GifUploaderPreview';
import { arrowLeftSolid } from '../../assets/icons';
import { Button } from '../Button';
import 'gifler';

interface Props {
  file: any
  filePreview: string
  handleCancel: any
}

const GifMakerEditor: React.FC<Props> = ({ file, filePreview, handleCancel }) => {

  // Local state
  const [text, setText] = useState<string>('');
  const [selectedFont, setSelectedFont] = useState<string>('alfa-slab-one');
  const [color, setColor] = useState<string>('#fff');
  const [borderColor, setBorderColor] = useState<string>('#000');
  const [borderWidth, setBorderWidth] = useState<number>(1.5);
  const [loading, setLoading] = useState<boolean>(false);
  const [gif, setGif] = useState<any>();
  const [blobGif, setBlobGif] = useState<any>();

  // Refs
  const canvasContainerRef = useRef<any>();
  const imageRef = useRef<any>();

  const handleNext = () => {
    const canvas = canvasContainerRef.current.querySelector('canvas');
    canvas.toBlob((blob: any) => {
      setBlobGif(new File([blob], 'image/gif'));
      setGif(canvas)
    }, 'image/gif', 1);
  }

  return (
    <>
      {gif ? (
        <GifUploaderPreview file={blobGif} filePreview={gif.toDataURL()} loading={loading} handleCancel={handleCancel} setLoading={setLoading} />
      ) : (
        <>
          <div className="hero hero--small hero--inline gradient-three fade-up mb-4">
            <span className="cancel fade-up" onClick={handleCancel}><object className="fade-up" type="image/svg+xml" data={arrowLeftSolid} width="20" height="18">CANCEL</object></span>
            <h1>GIF Editor</h1>
          </div>

          <p className="notification">Please note - this editor is a proof of concept &amp; will be improved.</p>

          <div className="gif-creator-editor">

            <div ref={canvasContainerRef} className="left image">
              <GifCreatorCanvas
                file={file}
                filePreview={filePreview}
                canvasContainerRef={canvasContainerRef}
                imageRef={imageRef}
                text={text}
                selectedFont={selectedFont}
                color={color}
                borderColor={borderColor}
                borderWidth={borderWidth}
              />
              <img ref={imageRef} className="hidden-image" src={filePreview} alt="" />
            </div>

            <div className="right editor-sidebar">
              <GifCreatorEditorSidebar
                setText={setText}
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
                color={color}
                setColor={setColor}
                borderColor={borderColor}
                setBorderColor={setBorderColor}
                borderWidth={borderWidth}
                setBorderWidth={setBorderWidth}
              />
              <Button htmlType="button" type="secondary" onClick={handleNext}>Next</Button>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default GifMakerEditor;