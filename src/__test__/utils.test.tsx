import React from 'react'
import { isReactElement, cleanObject } from '../utils'

describe('isReactElement', () => {
  it('should return true for a valid React element', () => {
    const element = <div>Hello World</div>
    expect(isReactElement(element)).toBe(true)
  })

  it('should return false for a non-React element', () => {
    const element = 'Hello World'
    expect(isReactElement(element)).toBe(false)
  })

  it('should return false for null', () => {
    expect(isReactElement(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isReactElement(undefined)).toBe(false)
  })
})
describe('cleanObject', () => {
  it('should remove falsy values from the object', () => {
    const obj = {
      a: 'value',
      b: null,
      c: undefined,
      d: false,
      e: 0,
      f: '',
    }
    expect(cleanObject(obj)).toEqual({
      a: 'value',
    })
  })

  it('should return an empty object if input is empty', () => {
    expect(cleanObject({})).toEqual({})
  })

  it('should return the same object if it has no falsy values', () => {
    const obj = {
      a: 'value',
      b: 'another value',
    }
    expect(cleanObject(obj)).toEqual(obj)
  })
})
