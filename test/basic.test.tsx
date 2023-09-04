// @vitest-environment happy-dom

import React, { useState } from 'react'
import { test, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, act, fireEvent } from '@testing-library/react'
import { ColorPicker, contrast } from '../index'

const getAllByTag = (tag: string, rendered: any) =>
  rendered.findAllByText((_, element: HTMLElement) => element.tagName.toLowerCase() === tag)

const getAllByTitle = (title: string, rendered: any) =>
  rendered.findAllByText((_, element: HTMLElement) => element.getAttribute('title') === title)

test('Initial color reflected in input.', async () => {
  const onChangeMock = vi.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')
})

test('Outside changes to color are reflected.', async () => {
  const onChangeMock = vi.fn()
  let setColor
  function Component() {
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

  const colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#000000')
})

test('Color selection on the board is propagated outside.', async () => {
  const onChangeMock = vi.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

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

  // NOTE cannot test color change as mouse not available in testing environment.
})

test('contrast is separately exported and can be used for standalone usage.', () => {
  expect(contrast('#111111')).toEqual('#ffffff')
  expect(contrast('#ebebeb')).toEqual('#000000')
  expect(contrast('#FFFFFF')).toEqual('#000000')
  expect(contrast('#000000')).toEqual('#ffffff')
  expect(contrast('#7f96fc')).toEqual('#000000')
  expect(contrast('#10257f')).toEqual('#ffffff')
  // Shortcut colors.
  expect(contrast('#AAA')).toEqual('#000000')
  expect(contrast('#00A')).toEqual('#ffffff')
  expect(contrast('#FFA')).toEqual('#000000')
})

test('Invalid inputs entered into the input field will not be passed out.', async () => {
  const onChangeMock = vi.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const colorInput = (await getAllByTag('input', rendered))[1] as HTMLInputElement

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')
  expect(colorInput.style.borderColor).toBe('black')

  act(() => {
    fireEvent.change(colorInput, { target: { value: '#FF00F' } })  
  })

  // NOTE for some reason does not call onChange on the input and therefore not update state.
  expect(colorInput.value).toEqual('#FF00F')
})