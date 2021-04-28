import React from 'react';
import { FormUpload } from '../Forms';
import { arrowLeftSolid, loader } from '../../assets/icons';

interface Props {
  loading: boolean
  file: any
  filePreview: any
  handleCancel: any
  setLoading: any
}

const GifUploaderPreview: React.FC<Props> = ({
  loading,
  file,
  filePreview,
  handleCancel,
  setLoading
}) => {

  return (
    <>
      <div className="hero hero--small hero--inline gradient-two fade-up mb-4">
        <span className="cancel fade-up" onClick={handleCancel}><object className="fade-up" type="image/svg+xml" data={arrowLeftSolid} width="20" height="18">CANCEL</object></span>
        <h1>Preview GIF</h1>
      </div>

      <p className="notification">Please note - this uploader is a proof of concept &amp; will be improved.</p>

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
  )
}

export default GifUploaderPreview;