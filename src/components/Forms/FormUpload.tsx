import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import * as yup from 'yup';
import Form from 'react-formal';
import { Button } from '../Button';
import FilePicker from './FilePicker';
import TagInput from './TagInput';
import { loader } from '../../assets/icons';
import './Form.css';

const formSchema  = yup.object({
  title: yup.string().required('Title is required')
});

const FormUploadTest: React.FC = () => {

  // Local state
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Store state
  const mySky = useStoreState((state: any) => state.mySky);
  const skynetClient = useStoreState((state: any) => state.skynetClient);
  const userID = useStoreState((state: any) => state.userID);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const { gifUpload: file, title } = values;
    const filepath = `${mySky.hostDomain}/myfilename`;

    // Upload the file.
    const { skylink } = await skynetClient.uploadFile(file);

    // Get the file's URL.
    const skylinkUrl = await skynetClient.getSkylinkUrl(skylink);

    const json = {
      title,
      skylink,
      skylinkUrl,
      tags,
      date: Date.now()
    };
    
    
    // Write JSON data to MySky
    try {
      console.log(filepath, json);
      console.log({userID})
      const { data, skylink } = await mySky.setJSON(filepath, json);
      console.log({data, skylink});
    } catch (error) {
      console.error('Error uploading JSON', error)
    }

    setLoading(false);
  }

  return (
    <>
      <h1>Upload GIF</h1>
      <p>Use this form to upload your awesome GIF ✌❤😎. When you're ready just hit submit.</p>

      <Form
        shema={formSchema}
        onSubmit={handleSubmit}
      >

        <div className="input-wrapper">
          <label>GIF*</label>
          <FilePicker
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="title">Title*</label>
          <Form.Field name='title' placeholder="Title" disabled={loading ? true : false} required />
          <Form.Message for='title'/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="tags">Tags*</label>
          <TagInput tags={tags} setTags={setTags} loading={loading} />
        </div>

        <hr />

        <div className="input-wrapper">
          <Button type="secondary" title="Submit" htmlType="submit" disabled={loading ? true : false}>
            {loading ? <object className="fade-up" type="image/svg+xml" data={loader} width="20px" height="16px">Loading</object> : 'Submit'}
          </Button>
        </div>
        
      </Form>
    </>
  )
}

export default FormUploadTest;
