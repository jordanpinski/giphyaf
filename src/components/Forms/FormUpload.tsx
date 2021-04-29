import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { createEntry, UploadType } from '../../skynet';
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

  // React Hook Form
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // React router
  const history = useHistory();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { title, tags } = data;
    const uploadData: UploadType = {
      file,
      title,
      tags: tags.split(',').map((tag: string) => tag.trim())
    }

    await createEntry(uploadData);
    setLoading(false);
    history.push('/');
  }

  return (
    <form name="form-upload" className="gradient-one" onSubmit={handleSubmit(onSubmit)}>

      <div className="input-wrapper">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          placeholder="title"
          {...register("title", {
            required: true,
            pattern: /^[a-z\d\-_\s]+$/i
          })}
        />
        {errors.title?.type === 'required' ? <p className="input-error">Title is required.</p> : null}
        {errors.title?.type === 'pattern' ? <p className="input-error">Alphanumeric only.</p> : null}

      </div>
      
      <div className="input-wrapper">
        <label htmlFor="tags">Tags *</label>
        <input
          id="tags"
          type="text"
          placeholder="tag 1, tag 2, tag 3"
          {...register("tags", {
            required: true,
            pattern: /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/i
          })}
        />
        {errors.tags?.type === 'required' && <p className="input-error">At least 1 tag is required.</p>}
        {errors.tags?.type === 'pattern' && <p className="input-error">Alphanumeric only.</p>}
      </div>

      <div className="input-wrapper">
        <Button type="secondary" title="Submit" htmlType="submit" disabled={loading ? true : false}>
          {/* {loading ? <object className="fade-up" type="image/svg+xml" data={loader} width="20px" height="16px">Loading</object> : 'Submit'} */}
          Upload To giphyaf
        </Button>
      </div>

    </form>
  )
}

export default FormUpload;