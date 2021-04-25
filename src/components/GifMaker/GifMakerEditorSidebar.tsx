import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface Props {
  setText: any
  setSelectedFont: any
  setColor: any
  color: string
  selectedFont: string
}

const GifMakerEditorSidebar: React.FC<Props> = ({ setText, setSelectedFont, selectedFont, color, setColor }) => {

  const handleFontChoice = (event: any) => {
    setSelectedFont(event.target.value);
  }

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  }

  const handleColorChange = (event: any) => {
    setColor(event.target.value);
  }

  return (
    <div className="gif-maker-editor-sidebar gradient-three">
      <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@700&family=Roboto:wght@700&family=Spartan:wght@700&display=swap" rel="stylesheet" />

      <Tabs>
        <TabList>
          <Tab>Caption</Tab>
        </TabList>

        <TabPanel>
          <div className="input-wrapper">
            <input name="text" type="text" placeholder="Enter your caption here" onChange={handleTextChange} />
          </div>

          <div className="input-wrapper">
            <select name="font-choice" className={selectedFont} onChange={handleFontChoice}>
              <option value="spartan">Spartan</option>
              <option value="roboto">Roboto</option>
              <option value="antonio">Antonio</option>
            </select>
          </div>

          <div className="input-wrapper">
            <input name="color" type="color" onChangeCapture={handleColorChange} defaultValue={color} />
          </div>

        </TabPanel>
      </Tabs>
    </div>
  )
}

export default GifMakerEditorSidebar;