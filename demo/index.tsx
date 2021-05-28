import { useState } from 'react'
import { render } from 'react-dom'
import { Exmpl, Grid } from 'exmpl'
import { ColorPicker } from 'burano'

const Basic = () => {
  const [color, setColor] = useState('#FF00FF')

  return <ColorPicker color={color} onColor={setColor} />
}

render(
  <Exmpl title="burano Demo" npm="burano" github="tobua/burano">
    <Basic />
    <h2>Test Cases</h2>
    <h3>Wrapper Styles</h3>
    <ColorPicker
      style={{
        width: 400,
        background: 'lightgray',
        borderRadius: 10,
        padding: 10,
        border: '1px solid black',
      }}
      color={'#00FF00'}
      onColor={() => {}}
    />
    <h3>Hide elements</h3>
    <Grid>
      <ColorPicker input={false} color="#0000FF" onColor={() => {}} />
      <ColorPicker palette={false} color="#0000FF" onColor={() => {}} />
    </Grid>
  </Exmpl>,
  document.body
)
