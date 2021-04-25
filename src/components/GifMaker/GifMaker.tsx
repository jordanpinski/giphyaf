import React, { useState } from 'react';
// @ts-ignore
import { NotificationManager } from 'react-notifications';
import FilePicker from '../Forms/FilePicker';
import GifMakerEditor from './GifMakerEditor';
import './GifMaker.css';

interface Props {

}

const GifMaker: React.FC<Props> = () => {

  const [file, setFile] = useState<any>();
  const [filePreview, setFilePreview] = useState<any>();

  const handleSetFile = (file: any) => {

    // Validate file type
    if (
      file.type !== 'image/gif' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png') {
      NotificationManager.error('Please choose a file with an allowed format.', 'Wrong Format', 0);
      setFile(null);
      return;
    }

    setFile(file);
  }

  const handleCancel = () => {
    setFile(null);
  }

  return file ? (
    <GifMakerEditor file={file} filePreview={filePreview} handleCancel={handleCancel} />
  ) : (
    <div className="gif-maker gradient-three">
      <h1>Create A GIF</h1>
      <p>Choose one of the options below.</p>
      <div className="upload-methods">
        <div className="item">
          <FilePicker
            allowedFormats=".jpg, .jpeg, .png, .gif"
            allowedFormatsText="Allowed Formats: JPG, PNG, GIF"
            setFile={handleSetFile}
            setFilePreview={setFilePreview}
          />
        </div>
      </div>
    </div>
  )
}

export default GifMaker;