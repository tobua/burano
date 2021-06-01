import React, { useRef, useState, useEffect } from 'react'
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
  const [currentColor, setCurrentColor] = useState(color)
  const [boardColor, setBoardColor] = useState(color)

  // Update color upon changes from outside.
  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  // Ref initially not available, but fallback values fine as initial calculation at 0.
  const width = boardRef.current?.offsetWidth ?? 100
  const height = boardRef.current?.offsetHeight ?? 100

  return (
    <div style={{ ...wrapperStyles, ...style }}>
      <Board
        boardRef={boardRef}
        lastPosition={lastPosition}
        setLastPosition={setLastPosition}
        boardColor={boardColor}
        setCurrentColor={setCurrentColor}
        onColor={onColor}
        width={width}
        height={height}
      />
      <Slider
        onColor={onColor}
        setCurrentColor={setCurrentColor}
        setBoardColor={setBoardColor}
        width={width}
        height={height}
        lastPosition={lastPosition}
      />
      {input && <Input color={currentColor} setBoardColor={setBoardColor} />}
      {palette && (
        <Palette
          onColor={onColor}
          setCurrentColor={setCurrentColor}
          setBoardColor={setBoardColor}
          width={width}
          height={height}
          lastPosition={lastPosition}
        />
      )}
    </div>
  )
}
