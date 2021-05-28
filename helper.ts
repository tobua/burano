import hexToRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'

const whitenByPercentage = (
  red: number,
  green: number,
  blue: number,
  percentage: number
) => ({
  red: red + (255 - red) * percentage,
  green: green + (255 - green) * percentage,
  blue: blue + (255 - blue) * percentage,
})

const blackenByPercentage = (
  red: number,
  green: number,
  blue: number,
  percentage: number
) => ({
  red: red - red * percentage,
  green: green - green * percentage,
  blue: blue - blue * percentage,
})

export const calculateHandleColor = (
  color: string,
  handleX: number,
  handleY: number,
  width: number,
  height: number
) => {
  let rgbColor: { red: number; green: number; blue: number } = hexToRgb(color)
  // Fully to the right will add 100% white.
  const whitePercentage = handleX / width
  // Fully at the bottom will add (or remove) 100% black.
  const blackPercentage = handleY / height

  rgbColor = whitenByPercentage(
    rgbColor.red,
    rgbColor.green,
    rgbColor.blue,
    whitePercentage
  )

  rgbColor = blackenByPercentage(
    rgbColor.red,
    rgbColor.green,
    rgbColor.blue,
    blackPercentage
  )

  return `#${rgbHex(rgbColor.red, rgbColor.green, rgbColor.blue).toUpperCase()}`
}

export const popularColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#9E9E9E', // Gray
  '#795548', // Brown
  '#F44336', // Red
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#03A9F4', // Light Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#8BC34A', // Light Green
  '#CDDC39', // Lime
  '#FFEB3B', // Yellow
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
]

// Return x and y between 0 and max values provided.
export const ensureInBounds = (
  x: number,
  y: number,
  maxX: number,
  maxY: number
) => {
  let resultX = x
  let resultY = y

  if (x > maxX) {
    resultX = maxX
  }

  if (x < 0) {
    resultX = 0
  }

  if (y > maxY) {
    resultY = maxY
  }

  if (y < 0) {
    resultY = 0
  }

  return [resultX, resultY]
}
