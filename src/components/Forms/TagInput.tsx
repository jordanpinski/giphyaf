import React from 'react';
import TagsInput from 'react-tagsinput';
import './TagInput.css';

interface Props {
  tags: string[]
  setTags: any
  loading: boolean
}

const TagInput: React.FC<Props> = ({
  tags,
  setTags,
  loading
}) => {

  const handleTags = (tags: any) => {
    const tempTags = tags.map((tag: string) => {
      let tempTag = tag.replace(/[^a-z-A-Z ]/g, "").replace(/ +/, " ")
      return tempTag.charAt(0) !== '#' ? `#${tempTag.toLowerCase()}` : tempTag.toLowerCase();
    });

    setTags(tempTags);
  }

  const renderInput = (props: any) => {
    const { onChange, value, addTag, ...other} = props;
    return (
      <input
        type='text'
        name='tags'
        id='tags'
        onChange={onChange}
        value={value}
        {...other}
      />
    )
  }

  const renderLayout = (tagComponents: any, inputComponent: any) => {
    return (
      <span>
        <div className="tag-wrapper">
          {tagComponents}
        </div>
        {inputComponent}
      </span>
    )
  }

  return (
    <TagsInput
      renderInput={renderInput}
      renderLayout={renderLayout}
      value={tags}
      onChange={handleTags}
      disabled={loading}
      maxTags={3}
    />
  )
}

export default TagInput;