import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { HexColorPicker } from 'react-colorful';
import 'react-tabs/style/react-tabs.css';

interface Props {
  setText: any
  selectedFont: string
  setSelectedFont: any
  color: string
  setColor: any
  borderColor: string
  setBorderColor: any
  borderWidth: number
  setBorderWidth: any
}

const GifMakerEditorSidebar: React.FC<Props> = ({
  setText,
  setSelectedFont,
  selectedFont,
  color,
  setColor,
  borderColor,
  setBorderColor,
  borderWidth,
  setBorderWidth
}) => {

  const handleFontChoice = (event: any) => {
    setSelectedFont(event.target.value);
  }

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  }

  const handleColorChange = (color: string) => {
    setColor(color);
  }

  const handleBorderColorChange = (color: string) => {
    setBorderColor(color);
  }

  const handleBorderWidthChange = (event: any) => {
    setBorderWidth(event.target.valueAsNumber)
  }


  return (
    <div className="gif-creator-editor-sidebar gradient-three">
      <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&family=Bungee&family=Coda+Caption:wght@800&family=Courier+Prime:wght@700&family=Dancing+Script:wght@700&family=Lato:wght@700&family=Monoton&family=Permanent+Marker&family=Press+Start+2P&family=Sigmar+One&family=Source+Code+Pro:wght@700&display=swap" rel="stylesheet" />

      <Tabs>
        <TabList>
          <Tab>Caption</Tab>
        </TabList>

        <TabPanel>
          <h2>Font</h2>
          <div className="input-wrapper">
            <label htmlFor="text">Text</label>
            <textarea id="text" name="text" placeholder="Enter your caption here" onChange={handleTextChange}></textarea>
          </div>

          <div className="input-wrapper">
            <label htmlFor="font-choice">Family</label>
            <select name="font-choice" className={selectedFont} onChange={handleFontChoice}>
              <option value="alfa-slab-one">Alfa Slab One</option>
              <option value="anton">Anton</option>
              <option value="bungee">Bungee</option>
              <option value="coda-caption">Coda Caption</option>
              <option value="courier-prime">Courier Prime</option>
              <option value="dancing-script">Dancing Script</option>
              <option value="lato">Lato</option>
              <option value="monoton">Monoton</option>
              <option value="permanent-marker">Permanent Marker</option>
              <option value="press-start-2p">Press Start 2P</option>
              <option value="sigmar-one">Sigmar One</option>
              <option value="source-code-pro">Source Code Pro</option>
              
            </select>
          </div>

          <div className="input-wrapper">
            <label htmlFor="color">Color</label>
            <HexColorPicker id="color" color={color} onChange={handleColorChange} />
          </div>

          <h2>Border</h2>
          <div className="input-wrapper">
            <label htmlFor="border-width">Width</label>
            <input id="border-width" type="number" onChange={handleBorderWidthChange} value={borderWidth}></input>
          </div>

          <div className="input-wrapper">
            <label htmlFor="color">Color</label>
            <HexColorPicker id="color" color={borderColor} onChange={handleBorderColorChange} />
          </div>

        </TabPanel>
      </Tabs>
    </div>
  )
}

export default GifMakerEditorSidebar;