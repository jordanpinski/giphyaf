import React, { useRef, useState } from 'react';
import GifMakerCanvas from './GifMakerCanvas';
import GifMakerEditorSidebar from './GifMakerEditorSidebar';
import GifUploaderPreview from '../GifUploader/GifUploaderPreview';
import { arrowLeftSolid, loader } from '../../assets/icons';
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
  const [selectedFont, setSelectedFont] = useState<string>('spartan');
  const [color, setColor] = useState<string>('#ffffff');
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

          <div className="gif-maker-editor">

            <div ref={canvasContainerRef} className="left image">
              <GifMakerCanvas
                file={file}
                filePreview={filePreview}
                canvasContainerRef={canvasContainerRef}
                imageRef={imageRef}
                color={color}
                text={text}
                selectedFont={selectedFont}
              />
              <img ref={imageRef} className="hidden-image" src={filePreview} />
            </div>

            <div className="right editor-sidebar">
              <GifMakerEditorSidebar
                setText={setText}
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
                color={color}
                setColor={setColor}
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