import React, { useEffect, useState } from 'react'

const getCleanStringAndHexNum = (input: string) => {
  const cleanRegex = input.replace(/(#|\s)/gi, '')
  if (cleanRegex.length !== 3 && cleanRegex.length !== 6) return false
  return cleanRegex
}

// Taken from: https://github.com/russoedu/font-color-contrast (MIT)
export const contrast = (input: string, threshold = 0.5) => {
  const color = getCleanStringAndHexNum(input)

  if (!color) {
    console.warn(`Invalid color "${input}" supplied to contrast().`)
    return '#000000'
  }

  const rgb = { red: 0, green: 0, blue: 0 }

  switch (color.length) {
    case 3:
      rgb.red = parseInt(color[0].repeat(2), 16)
      rgb.green = parseInt(color[1].repeat(2), 16)
      rgb.blue = parseInt(color[2].repeat(2), 16)
      break
    default:
      rgb.red = parseInt(color.substring(0, 2), 16)
      rgb.green = parseInt(color.substring(2, 4), 16)
      rgb.blue = parseInt(color.substring(4, 6), 16)
      break
  }

  const result = Math.sqrt(
    0.299 * (rgb.red / 255) ** 2 + 0.587 * (rgb.green / 255) ** 2 + 0.114 * (rgb.blue / 255) ** 2
  )

  return result > threshold ? '#000000' : '#ffffff'
}

const inputStyles = ({ hasError }: { hasError: boolean }) => ({
  borderRadius: 5,
  paddingTop: hasError ? 1 : 2,
  paddingRight: hasError ? 1 : 2,
  paddingBottom: hasError ? 1 : 2,
  paddingLeft: hasError ? 4 : 5,
  borderWidth: hasError ? 2 : 1,
  borderColor: hasError ? 'red' : 'black',
  borderStyle: 'solid',
  color: hasError ? 'red' : 'black',
  outline: 'none'
})

const isColorValid = (value: string) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value)

export function Input({
  color,
  setBoardColor,
  onColor
}: {
  color: string
  setBoardColor: (value: string) => void
  onColor: (value: string) => void
}) {
  
  const [valid, setValid] = useState(isColorValid(color))
  const [currentColor, setCurrentColor] = useState(color)

  useEffect(() => {
    setCurrentColor(color)
    setValid(isColorValid(color))
  }, [color]);

  return (
    <input
      style={{
        ...inputStyles({ hasError: !valid }),
        width: 'calc(100% - 10px)',
        background: color,
        color: contrast(color),
      }}
      type="string"
      value={currentColor}
      onChange={(event) => {
        const nextColor = event.target.value
        setCurrentColor(nextColor)
        if (isColorValid(nextColor)) {
          setValid(true)
          setBoardColor(nextColor)
          onColor(nextColor)
        } else {
          setValid(false)
        }
      }}
    />
  )
}
