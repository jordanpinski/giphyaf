import React from 'react';
import './FilePicker.css';

interface Props {
  allowedFormats: string
  allowedFormatsText: string
  setFile: any
  setFilePreview: any
}

const FilePicker: React.FC<Props> = ({
  allowedFormats,
  allowedFormatsText,
  setFile,
  setFilePreview
}) => {

  const handleOnChange = (event: any) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      // @ts-ignore
      setFilePreview(event?.target.result)
      setFile(file);
    }

    
  }

  return (
    <>
      <input
        type="file"
        name="gifUpload"
        id="gifUpload"
        className="file-picker"
        onChange={handleOnChange}
        //accept="image/gif,video/mp4,video/mov,video/quicktime,youtube,vimeo"
        accept={allowedFormats}
        required
      />
      <label htmlFor="gifUpload" title="Select GIF">
        <div className="content">
          <div className="icon">GIF</div>
          <p className="formats">{allowedFormatsText}</p>
        </div>
      </label>
    </>
  )
}

export default FilePicker;