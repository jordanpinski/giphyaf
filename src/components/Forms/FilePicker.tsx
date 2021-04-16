import React, { useState, useRef } from 'react';
import { useStoreState } from 'easy-peasy';
import Form from 'react-formal';
import { uploadRegular, loader } from '../../assets/icons';
import './FilePicker.css';

interface Props {
  loading: boolean
  setLoading: any
}

const FilePicker: React.FC<Props> = ({
  loading,
  setLoading
}) => {

  // Local state
  const [gifSelected, setGifSelected] = useState<boolean>(false);

  // Refs
  const gifRef = useRef(null);

  const handleGifChange = (event: any) => {
    setLoading(true);
    setGifSelected(false);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {

      // Simulate loading
      setTimeout(() => {
        // @ts-ignore
        const src = event?.target.result;
        // @ts-ignore
        gifRef.current.src = src;
        setGifSelected(true);
        setLoading(false);
      }, 500);

    }
  }

  return (
    <>
      <Form.Field
        type="file"
        name="gifUpload"
        id="gifUpload"
        className="file-picker"
        onChange={handleGifChange}
        accept="image/gif,video/mp4,video/mov,video/quicktime,youtube,vimeo"
        required
      />
      <label htmlFor="gifUpload" className={gifSelected ? 'gif-selected' : ''} title="Select GIF">
        <img ref={gifRef} className="preview" src="" />
        <div className="content">
          <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="34" height="32">Select GIF</object>
          Select GIF
          <p className="types">Upload a GIF, MP4, or MOV</p>
          {loading ? <div className="loading-overlay"><object className="fade-up" type="image/svg+xml" data={loader} width="60px">Loading</object></div> : null}
        </div>
      </label>
    </>
  )
}

export default FilePicker;