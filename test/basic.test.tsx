import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ColorPicker } from '../index'

const getAllByTag = (tag: string, rendered: any) =>
  rendered.findAllByText(
    (_, element: HTMLElement) => element.tagName.toLowerCase() === tag
  )

test('Renders input and updates data on input change.', async () => {
  const onChangeMock = jest.fn()
  const Component = <ColorPicker color="#FF00FF" onColor={onChangeMock} />

  const rendered = render(Component)

  expect(onChangeMock.mock.calls.length).toBe(0)

  const inputs = (await getAllByTag('input', rendered)) as HTMLInputElement[]

  const colorInput = inputs[1]

  expect(colorInput.tagName.toLowerCase()).toEqual('input')
  expect(colorInput.value).toEqual('#FF00FF')
})
