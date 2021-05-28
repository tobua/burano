import React from 'react'
import contrast from 'font-color-contrast'

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

export const Input = ({
  color,
  setBoardColor,
}: {
  color: string
  setBoardColor: (value: string) => void
}) => (
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
