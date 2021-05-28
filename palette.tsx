import React from 'react'
import { calculateHandleColor, popularColors } from './helper'

const wrapperStyles = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  flexWrap: 'wrap' as 'wrap',
  marginTop: 10,
}

const paletteStyles = (background: string) => ({
  position: 'relative' as 'relative',
  width: '10%',
  height: 0,
  paddingBottom: '10%',
  backgroundColor: background,
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
})

export const Palette = ({
  onColor,
  setBoardColor,
  width,
  height,
  lastPosition,
}) => (
  <div style={wrapperStyles}>
    {popularColors.map((currentColor) => (
      <button
        key={currentColor}
        type="button"
        aria-label={`Select ${currentColor} color`}
        style={paletteStyles(currentColor)}
        onClick={() => {
          const boardMatchedColor = calculateHandleColor(
            currentColor,
            lastPosition.x,
            lastPosition.y,
            width,
            height
          )
          setBoardColor(currentColor)
          onColor(boardMatchedColor)
        }}
      />
    ))}
  </div>
)
