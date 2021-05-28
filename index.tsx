import React, { useRef, useState } from 'react'
import { Input } from './input'
import { Palette } from './palette'
import { Board } from './board'
import { Slider } from './slider'

const wrapperStyles = {
  width: 200,
}

interface Props {
  color?: string
  onColor: (color: string) => void
  style?: React.CSSProperties
  input?: boolean
  palette?: boolean
}

export const ColorPicker = ({
  color = '#000000',
  onColor,
  style = {},
  input = true,
  palette = true,
}: Props) => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [boardColor, setBoardColor] = useState(color)

  const width = boardRef.current?.offsetWidth
  const height = boardRef.current?.offsetHeight

  return (
    <div style={{ ...wrapperStyles, ...style }}>
      <Board
        boardRef={boardRef}
        lastPosition={lastPosition}
        setLastPosition={setLastPosition}
        boardColor={boardColor}
        setColor={onColor}
        width={width}
        height={height}
      />
      <Slider setBoardColor={setBoardColor} />
      {input && <Input color={color} setBoardColor={setBoardColor} />}
      {palette && (
        <Palette
          onColor={onColor}
          setBoardColor={setBoardColor}
          width={width}
          height={height}
          lastPosition={lastPosition}
        />
      )}
    </div>
  )
}
