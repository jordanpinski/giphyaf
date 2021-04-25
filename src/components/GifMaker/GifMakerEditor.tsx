import React from 'react';
import GifMakerCanvas from './GifMakerCanvas';
import { arrowLeftSolid, loader } from '../../assets/icons';
import 'gifler';

interface Props {
  file: any
  filePreview: string
  handleCancel: any
}

const GifMakerEditor: React.FC<Props> = ({ file, filePreview, handleCancel }) => {

  return (
    <>
      <div className="hero hero--small hero--inline gradient-two fade-up mb-4">
        <span className="cancel fade-up" onClick={handleCancel}><object className="fade-up" type="image/svg+xml" data={arrowLeftSolid} width="20" height="18">CANCEL</object></span>
        <h1>GIF Editor</h1>
      </div>

      <div className="gif-maker-editor">
        <div className="image">
          <GifMakerCanvas file={file} filePreview={filePreview} />
        </div>
      </div>
    </>
  )
}

export default GifMakerEditor;