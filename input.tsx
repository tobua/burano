import React from 'react'

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
  paddingTop: 2,
  paddingRight: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  borderWidth: 1,
  borderColor: hasError ? 'red' : 'black',
  color: hasError ? 'red' : 'black',
})

export function Input({
  color,
  setBoardColor,
}: {
  color: string
  setBoardColor: (value: string) => void
}) {
  return (
    <input
      style={{
        ...inputStyles({ hasError: false }),
        width: 'calc(100% - 10px)',
        background: color,
        color: contrast(color),
      }}
      type="string"
      value={color}
      onChange={(event) => setBoardColor(event.target.value)}
    />
  )
}
