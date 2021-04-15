import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import Form from 'react-formal';
import { Button } from '../Button';
import { uploadRegular } from '../../assets/icons';
import './Form.css';

interface Props {

}

const formSchema  = yup.object({
  title: yup.string().required('Title is required')
});

const FormUpload: React.FC<Props> = ({}) => {

  const [tags, setTags] = useState<string[]>([]);
  const [gifSelected, setGifSelected] = useState<boolean>();
  const gifRef = useRef(null);

  /**
   * Formats the tags.
   * @param event 
   */
  // const handleTags = (event: any) => {
  //   const value = event.target.value;
  //   const tempTags: string[] = value.split(' ');

  //   tempTags.forEach((tag: string, index: number) => {

  //     // Empty string
  //     if (tag === '') {
  //       tempTags.pop();
  //       setTags([...tags, `#${tempTags[index - 1]}`]);
  //       return;
  //     }

  //   });

  // }

  const handleGifChange = (event: any) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      // @ts-ignore
      const src = event?.target.result;
      console.log(src);
      console.log(gifRef);
      // @ts-ignore
      gifRef.current.src = src;
      setGifSelected(true);
    }
  }

  const handleSubmit = (values: any) => {
    console.log(values);
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
          <label>GIF</label>
          <Form.Field
            type="file"
            name="gifUpload"
            id="gifUpload"
            onChange={handleGifChange}
            accept="image/gif,video/mp4,video/mov,video/quicktime,youtube,vimeo"
            required
          />
          <label htmlFor="gifUpload" className={gifSelected ? 'gif-selected' : ''}>
            <img ref={gifRef} className="preview" src="" />
            <div className="content">
              <object className="fade-up" type="image/svg+xml" data={uploadRegular} width="34" height="32">Select GIF</object>
              Select GIF
              <p className="types">Upload a GIF, MP4, or MOV</p>
            </div>
          </label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <Form.Field name='title' placeholder="Title" />
          <Form.Message for='title'/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="tags">Tags</label>
          <Form.Field type="text" name="tags" id="tags" placeholder="Tags" required />
        </div>

        <hr />

        <div className="input-wrapper">
          <Button type="secondary" title="Submit" htmlType="submit">Submit</Button>
        </div>
        
      </Form>
    </>
  )
}

export default FormUpload;
