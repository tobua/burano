import React from 'react'
import useMouse from '@react-hook/mouse-position'
import { calculateHandleColor, ensureInBounds } from './helper'

const board = (selectedColor: string, mouseDown: boolean) => ({
  display: 'flex',
  position: 'relative' as 'relative',
  cursor: mouseDown ? 'none' : 'inherit',
  height: 100,
  backgroundColor: selectedColor,
  backgroundImage: `linear-gradient(to right, transparent 0%, #FFFFFF 100%)`,
  outline: 'none',
  borderRadius: 5,
})

const boardOverlay = {
  position: 'absolute' as 'absolute',
  backgroundImage: `linear-gradient(to top, #000000 0%, transparent 100%)`,
  width: '100%',
  height: '100%',
  borderRadius: 5,
}

const boardHandle = (background: string, x: number, y: number, mouseDown: boolean) => ({
  position: 'absolute' as 'absolute',
  cursor: mouseDown ? 'none' : 'pointer',
  top: y - 6,
  left: x - 6,
  width: 8,
  height: 8,
  border: '2px solid white',
  boxShadow: '1px 1px 2px gray',
  borderRadius: 14,
  background,
})

// Store last mouse position on every render, in case the mouse leaves the tracked window this is
// used as a fallback.
const lastMousePosition = new Map<HTMLElement, { x: number; y: number }>()
// let lastMousePosition: {[key: HTMLElement]: { x: number, y: number }} = {}

interface BoardProps {
  boardRef: React.MutableRefObject<HTMLDivElement>
  lastPosition: { x: number; y: number }
  setLastPosition: React.Dispatch<any>
  boardColor: string
  onColor: (color: string) => void
  setCurrentColor: (value: string) => void
  width: number
  height: number
}

export function Board({
  boardRef,
  lastPosition,
  setLastPosition,
  boardColor,
  onColor,
  setCurrentColor,
  width,
  height,
}: BoardProps) {
  const mouse = useMouse(boardRef)

  if (!lastMousePosition.has(boardRef.current)) {
    lastMousePosition.set(boardRef.current, { x: 0, y: 0 })
  }

  let handleX = lastPosition.x
  let handleY = lastPosition.y

  if (mouse.isDown && mouse.x && mouse.y) {
    // User leaves window while mouse is pressed down.
    // Let mouse outside, but still match cursor position inside the board.
    ;[handleX, handleY] = ensureInBounds(mouse.x, mouse.y, width, height)

    lastMousePosition.set(boardRef.current, { x: handleX, y: handleY })
  } else {
    const currentLastMousePosition = lastMousePosition.get(boardRef.current)
    handleX = currentLastMousePosition.x
    handleY = currentLastMousePosition.y
  }

  const handleColor = calculateHandleColor(boardColor, handleX, handleY, width, height)

  return (
    <div
      ref={boardRef}
      title="board"
      role="button"
      tabIndex={0}
      onMouseUp={() => {
        const [nextHandleX, nextHandleY] = ensureInBounds(mouse.x, mouse.y, width, height)

        setLastPosition({ x: nextHandleX, y: nextHandleY })
        setCurrentColor(handleColor)
        onColor(handleColor)
      }}
      style={board(boardColor, mouse.isDown)}
    >
      <div style={boardOverlay} />
      <div style={boardHandle(handleColor, handleX, handleY, mouse.isDown)} />
    </div>
  )
}
