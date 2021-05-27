import { useState } from 'react'
import { render } from 'react-dom'
import { Exmpl } from 'exmpl'
import { ColorPicker } from 'burano'

const Basic = () => {
  const [color, setColor] = useState('#FF00FF')

  return <ColorPicker color={color} onColor={setColor} />
}

render(
  <Exmpl title="burano Demo" npm="burano" github="tobua/burano">
    <Basic />
  </Exmpl>,
  document.body
)
