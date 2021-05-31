import React, { CSSProperties, useState } from 'react'
import { calculateHandleColor } from './helper'

const rangeWrapper = {
  marginTop: 10,
  marginBottom: 10,
  position: 'relative' as 'relative',
  height: 10,
}

const rangeBackgroundWrapper = {
  display: 'flex',
  flexDirection: 'row' as 'row',
}

const rangeBackground = (
  from: string,
  to: string,
  first: boolean,
  last: boolean
) => {
  const styles: CSSProperties = {
    width: 'calc(100% / 6)',
    height: 10,
    backgroundImage: `linear-gradient(to right, ${from} 0%, ${to} 100%)`,
  }

  if (first) {
    styles.borderBottomLeftRadius = 5
    styles.borderTopLeftRadius = 5
  }

  if (last) {
    styles.borderBottomRightRadius = 5
    styles.borderTopRightRadius = 5
  }

  return styles
}

const rangeInput = {
  position: 'absolute' as 'absolute',
  width: '100%',
  top: -5,
  left: -2,
  appearance: 'none' as 'none',
  outline: 'none',
  background: 'none',
}

const rangeThumbCrossBrowserStyles = (color: string) => `
  border: 2px solid #FFFFFF;
  box-shadow: 1px 1px 3px gray;
  border-radius: 32px;
  cursor: pointer;
  background: ${color};
  height: 16px;
  width: 16px;
  `

const rangeThumbStyles = (className: string, color: string) => `
  .${className} {
    -webkit-appearance: none;
  }
  
  /* combining below selectors will not work. */
  .${className}::-webkit-slider-thumb {
  ${rangeThumbCrossBrowserStyles(color)}
    -webkit-appearance: none; /* Required for Safari */
    appearance: none;
  }
  
  .${className}::-moz-range-thumb {
  ${rangeThumbCrossBrowserStyles(color)}
    height: 14px;
    width: 14px;
  }
  
  .${className}::-ms-thumb {
  ${rangeThumbCrossBrowserStyles(color)}
  }
  `

const rgbSlider = [
  [255, 0, 0], // Red
  [255, 255, 0], // Yellow
  [0, 255, 0], // Green
  [0, 255, 255], // Cyan
  [0, 0, 255], // Blue
  [255, 0, 255], // Magenta
  [255, 0, 0], // Red
]

const rgbSliderHex = [
  '#FF0000',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#0000FF',
  '#FF00FF',
  '#FF0000',
]

const indexToChange = (slideIndex: number) => {
  const modulo = slideIndex % 3

  if (modulo === 1) {
    return 0
  }

  if (modulo === 0) {
    return 1
  }

  return 2
}

const operationByIndex = (slideIndex: number) =>
  slideIndex % 2 === 0
    ? (a: number, b: number) => a + b
    : (a: number, b: number) => a - b

const toHex = (value: number) => {
  const result = value.toString(16).toUpperCase()

  if (result.length === 1) {
    return `0${result}`
  }

  return result
}

const sliderValueToRGB = (value: number) => {
  const index = Math.floor(value / 255)
  const remainder = value % 255
  const slide = [...rgbSlider[index]]

  const changeIndex = indexToChange(index)
  const changeValue = slide[indexToChange(index)]
  slide[changeIndex] = operationByIndex(index)(changeValue, remainder)

  return `#${toHex(slide[0])}${toHex(slide[1])}${toHex(slide[2])}`
}

interface ISlider {
  onColor: (value: string) => void
  setCurrentColor: (value: string) => void
  setBoardColor: (value: string) => void
  lastPosition: { x: number; y: number }
  width: number
  height: number
}

export const Slider = ({
  onColor,
  setCurrentColor,
  setBoardColor,
  lastPosition,
  width,
  height,
}: ISlider) => {
  const [sliderValue, setSliderValue] = useState(0)
  // Random ID as classname to allow multiple pickers on the page.
  const [rangeClassName] = useState(
    `b_${Math.random().toString(36).substring(5)}`
  )

  return (
    <>
      <style>
        {rangeThumbStyles(rangeClassName, sliderValueToRGB(sliderValue))}
      </style>
      <div style={rangeWrapper}>
        <div style={rangeBackgroundWrapper}>
          {rgbSliderHex.slice(0, -1).map((current, index) => (
            <div
              key={index}
              style={rangeBackground(
                current,
                rgbSliderHex[index + 1],
                index === 0,
                index === rgbSliderHex.length - 2
              )}
            />
          ))}
        </div>
        <input
          className={rangeClassName}
          style={rangeInput}
          type="range"
          value={sliderValue}
          min="0"
          max="1530"
          onChange={(event) => {
            const targetValue = Number(event.target.value)
            const sliderColor = sliderValueToRGB(targetValue)
            const boardMatchedColor = calculateHandleColor(
              sliderColor,
              lastPosition.x,
              lastPosition.y,
              width,
              height
            )

            setSliderValue(targetValue)
            setCurrentColor(boardMatchedColor)
            setBoardColor(sliderColor)
            onColor(boardMatchedColor)
          }}
        />
      </div>
    </>
  )
}
