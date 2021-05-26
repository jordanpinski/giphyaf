import React, { useContext } from 'react';
import { SkynetContext } from '../../state/SkynetContext';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
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

  // Global State
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const { uploadFile } = useStoreActions((actions: any) => actions.mySky);
  const { createGif } = useStoreActions((actions: any) => actions.gifs);

  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // React router
  const history = useHistory();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { title, tags } = data;
    const uploadData = {
      file,
      title,
      tags: tags.split(',').map((tag: string) => tag.trim())
    }

    const { skylinkUrl } = await uploadFile({ mySky, file });
    await createGif({ mySky, skylinkUrl, uploadData: uploadData });
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
            pattern: /^(?=.*[A-Z0-9])[\w.,!"'$ ]+$/i
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