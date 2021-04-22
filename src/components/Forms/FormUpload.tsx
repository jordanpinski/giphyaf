import React, { useState } from 'react';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { upload, UploadType } from '../../skynet';
import './Form.css';

interface Props {
  file: any
  loading: boolean
  setLoading: any
}

const FormUpload: React.FC<Props> = ({
  file,
  loading,
  setLoading
}) => {

  // Local state
  //const [loading, setLoading] = useState<boolean>(false);

  // React Hook Form
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { title, tags } = data;
    const uploadData: UploadType = {
      file,
      title,
      tags: tags.split(',').map((tag: string) => tag.trim())
    }

    await upload(uploadData);
    setLoading(false);
    window.location.href = '/';
  }

  return (
    <form name="form-upload" className="gradient-one" onSubmit={handleSubmit(onSubmit)}>

      <div className="input-wrapper">
        <label htmlFor="tags">Title</label>
        <input id="tags" type="text" placeholder="title" {...register("title")} />
      </div>
      
      <div className="input-wrapper">
        <label htmlFor="tags">Tags</label>
        <input id="tags" type="text" placeholder="tag 1, tag 2, tag 3" {...register("tags")} />
        <p className="input-description">When global feeds/search are implemented, tags will help users find your GIFs.</p>
      </div>

      <Button type="secondary" title="Submit" htmlType="submit" disabled={loading ? true : false}>
        {/* {loading ? <object className="fade-up" type="image/svg+xml" data={loader} width="20px" height="16px">Loading</object> : 'Submit'} */}
        Upload To giphyaf
      </Button>

    </form>
  )
}

export default FormUpload;