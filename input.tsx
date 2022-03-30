import React from 'react'
import fontColor from 'font-color-contrast'

// @ts-ignore Plugin missing proper ES Module support.
const contrast = typeof fontColor === 'function' ? fontColor : fontColor.default

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
