import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Exmpl, Grid, Code } from 'exmpl'
import { ColorPicker } from 'burano'

const Basic = () => {
  const [color, setColor] = useState('#FF00FF')

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <ColorPicker color={color} onColor={setColor} />
      <p>Current: {color}</p>
    </div>
  )
}

createRoot(document.body).render(
  <Exmpl title="burano Demo" npm="burano" github="tobua/burano">
    <Basic />
    <Code>
      {`import { ColorPicker } from 'burano'

const MyPicker = <ColorPicker color="#FF00FF" onColor={(color) => alert(color)} />`}
    </Code>
    <h2>Options</h2>
    <h3>Wrapper Styles</h3>
    <ColorPicker
      style={{
        width: 400,
        background: 'lightgray',
        borderRadius: 10,
        padding: 10,
        border: '1px solid black',
      }}
      color="#00FF00"
      onColor={() => {}}
    />
    <Code>
      {`<ColorPicker
  style={{
    width: 400,
    background: 'lightgray',
    borderRadius: 10,
    padding: 10,
    border: '1px solid black',
  }}
  color="#FF00FF"
  onColor={(color) => alert(color)}
/>`}
    </Code>
    <h3>Hide elements</h3>
    <Grid>
      <ColorPicker input={false} color="#0000FF" onColor={() => {}} />
      <ColorPicker palette={false} color="#0000FF" onColor={() => {}} />
    </Grid>
    <Code>{`<ColorPicker input={false} palette={false} />`}</Code>
  </Exmpl>
)
