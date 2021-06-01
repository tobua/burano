<img align="right" src="https://github.com/tobua/burano/raw/main/logo.png" width="15%" alt="burano Color Picker" />

# burano

🎨 Color Picker for React.

## Installation & Usage

```
npm install burano
```

```tsx
import React, { useState } from 'react'
import { ColorPicker } from 'burano'

export const MyPicker = () => {
  const [color, setColor] = useState('#00FF00')

  return <ColorPicker color={color} onColor={setColor} />
}
```

## Options

```tsx
<ColorPicker
    color={string} // The initial color, default black.
    onColor={(color: string) => void} // Handle new color, required.
    style={CSSProperties} // Styles applied to wrapper div, optional.
    input={boolean} // Show input, default true.
    palette={boolean} // Show color palette, default true.
/>
```

<br />
<br />
<p align="center">
  <img src="https://github.com/tobua/burano/raw/main/burano.svg" alt="Burano island" width="100%">
</p>
