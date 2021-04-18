import React, { useState, useEffect } from 'react';
import { useStore, useStoreState } from 'easy-peasy';
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
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  // Store state
  const mySky = useStoreState((state: any) => state.mySky);
  const contentRecordDAC = useStoreState((state: any) => state.contentRecordDAC);
  const skynetClient = useStoreState((state: any) => state.skynetClient);
  const userFilepath = useStoreState((state: any) => state.userFilepath);

  // Get existing data
  useEffect(() => {
    if (!mySky) return;

    mySky.getJSON(userFilepath).then((tempData: any) => {
      const { data } = tempData;
      if (!data) {
        setDataLoading(false);
        return;
      };

      setData(data);
      setDataLoading(false);
    }).catch((error: any) => console.error(error) );

  }, [userFilepath])

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const { gifUpload: file, title } = values;

    // Upload the file.
    const { skylink } = await skynetClient.uploadFile(file);

    // Get the file's URL.
    const skylinkUrl = await skynetClient.getSkylinkUrl(skylink);

    const json = [{
      title,
      skylink,
      skylinkUrl,
      tags,
      date: Date.now()
    }, ...data ];

    // Write JSON data to MySky
    try {
      const { data, skylink } = await mySky.setJSON(userFilepath, json);

      console.log({contentRecordDAC, skylinkUrl})

      if (data.length === 1) {

        console.log('NEW CONTENT RECORD');

        // Record new content in the DAC
        await contentRecordDAC.recordNewContent({
          skylink: skylinkUrl
        });

      } else {

        console.log('UPDATE CONTENT RECORD');

        // Update content in the DAC.
        await contentRecordDAC.updateContentRecord({
          skylink: skylinkUrl,
          metaData: { action: 'updatedGifs' }
        });

      }


    } catch (error) {
      console.error('Error uploading JSON', error)
    }

    setLoading(false);

    window.location.href = '/my-uploads';
  }

  return (
    <>
      <h1>Upload GIF</h1>
      <p>Use this form to upload your awesome GIF ✌❤😎. When you're ready just hit submit.</p>

      {dataLoading ? 
        <object className="fade-up" type="image/svg+xml" data={loader} width="80px">Loading</object>
        :
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
      }

    </>
  )
}

export default FormUploadTest;
