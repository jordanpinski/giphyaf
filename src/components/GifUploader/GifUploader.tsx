import React, { useState, useEffect } from 'react';
import FilePicker from '../Forms/FilePicker';
import FormUpload from '../Forms/FormUpload';
import { arrowLeftSolid, loader } from '../../assets/icons';
import './GifUploader.css';

interface Props {

}

const GifUploader: React.FC<Props> = ({}) => {

  // Local state
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [filePreview, setFilePreview] = useState<string>();

  const handleCancel = () => {
    window.location.href = '/upload';
  }

  return file ?
    <>
      <div className="gif-uploader-header fade-up">
        <span className="cancel" onClick={handleCancel}><object className="fade-up" type="image/svg+xml" data={arrowLeftSolid} width="20" height="18">CANCEL</object></span>
        <h1>Preview GIF</h1>
      </div>
      <div className="gif-uploader gif-selected fade-up">
        {loading ? <div className="gif-uploader-loading-overlay"><object className="fade-up" type="image/svg+xml" data={loader} width="80px">Loading</object></div> : null }
        <div className="left">
          <div className="selected-file">
            <img src={filePreview} />
          </div>
        </div>

        <div className="right">
          <FormUpload file={file} loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </>
  : (
    <div className="gif-uploader gradient-one">
      <h1>Upload A GIF</h1>
      <p>Choose one of the options below.</p>
      <div className="upload-methods">
        <div className="item">
          <FilePicker
            allowedFormats="image/gif"
            allowedFormatsText="Allowed Formats: GIF"
            setFile={setFile}
            setFilePreview={setFilePreview}
          />
        </div>
      </div>
    </div>
  )
}

export default GifUploader;