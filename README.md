# burano

Color Picker for React.

## Installation & Usage

```
npm install burano
```

```tsx
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
