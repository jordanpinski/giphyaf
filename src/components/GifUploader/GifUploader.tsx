import React, { useState } from 'react';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import FilePicker from '../Forms/FilePicker';
import GifUploaderPreview from './GifUploaderPreview';
import './GifUploader.css';

interface Props {

}

const GifUploader: React.FC<Props> = () => {

  // Local state
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [filePreview, setFilePreview] = useState<string>();

  const handleCancel = () => {
    setFile(null);
  }

  const handleSetFile = (file: any) => {
    
    // Validate file type
    if (file.type !== 'image/gif') {
      NotificationManager.error('Please choose a file with an allowed format.', 'Wrong Format', 0);
      setFile(null);
      return;
    }

    setFile(file);

  }

  return file ?
    <GifUploaderPreview
      loading={loading}
      file={file}
      filePreview={filePreview}
      handleCancel={handleCancel}
      setLoading={setLoading}
    />
  : (
    <div className="gif-uploader gradient-one fade-up">
      <h1>Upload A GIF</h1>
      <p>Choose one of the options below.</p>
      <div className="upload-methods">
        <div className="item">
          <FilePicker
            allowedFormats=".gif"
            allowedFormatsText="Allowed Formats: GIF"
            setFile={handleSetFile}
            setFilePreview={setFilePreview}
          />
        </div>
      </div>
    </div>
  )
}

export default GifUploader;