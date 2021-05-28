import React, { useState } from 'react'
import '@testing-library/jest-dom'
import { render, act, fireEvent } from '@testing-library/react'
import { ColorPicker } from '../index'

const getAllByTag = (tag: string, rendered: any) =>
  rendered.findAllByText(
    (_, element: HTMLElement) => element.tagName.toLowerCase() === tag
  )

const getAllByTitle = (title: string, rendered: any) =>
  rendered.findAllByText(
    (_, element: HTMLElement) => element.getAttribute('title') === title
  )

test('Initial color reflected in input.', async () => {
  const onChangeMock = jest.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const colorInput = (
    await getAllByTag('input', rendered)
  )[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')
})

test('Outside changes to color are reflected.', async () => {
  const onChangeMock = jest.fn()
  let setColor
  const Component = () => {
    const [color, setColorHandler] = useState('#FF00FF')

    setColor = setColorHandler

    return <ColorPicker color={color} onColor={onChangeMock} />
  }

  const rendered = render(<Component />)

  expect(onChangeMock.mock.calls.length).toBe(0)

  let colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')

  act(() => {
    setColor('#FFFF00')
  })

  colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

  expect(colorInput.value).toEqual('#FFFF00')

  expect(onChangeMock.mock.calls.length).toBe(0)
})

test('Black used if no color is set.', async () => {
  const rendered = render(<ColorPicker onColor={() => {}} />)

  const colorInput = (
    await getAllByTag('input', rendered)
  )[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#000000')
})

test('Color selection on the board is propagated outside.', async () => {
  const onChangeMock = jest.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const colorInput = (
    await getAllByTag('input', rendered)
  )[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')

  const board = (await getAllByTitle('board', rendered))[0] as HTMLDivElement

  act(() => {
    fireEvent.mouseUp(board, {
      screenX: 10,
      screenY: 10,
    })
  })

  expect(onChangeMock.mock.calls.length).toBe(1)

  // NOTE cannot test color change as mouse not available in jest.
})
