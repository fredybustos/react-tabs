import React from 'react'
import { isReactElement, cleanObject } from '../utils'

describe('isReactElement', () => {
  it('should return true for a valid React element', () => {
    const element = <div>Hello World</div>
    expect(isReactElement(element)).toBe(true)
  })

  it('should return true for React Fragment', () => {
    const element = <></>
    expect(isReactElement(element)).toBe(true)
  })

  it('should return true for React component element', () => {
    const Component = () => <div>Test</div>
    const element = <Component />
    expect(isReactElement(element)).toBe(true)
  })

  it('should return false for a string', () => {
    const element = 'Hello World'
    expect(isReactElement(element)).toBe(false)
  })

  it('should return false for a number', () => {
    expect(isReactElement(42)).toBe(false)
  })

  it('should return false for a boolean', () => {
    expect(isReactElement(true)).toBe(false)
    expect(isReactElement(false)).toBe(false)
  })

  it('should return false for a plain object', () => {
    expect(isReactElement({ key: 'value' })).toBe(false)
  })

  it('should return false for an array', () => {
    expect(isReactElement([1, 2, 3])).toBe(false)
  })

  it('should return false for a function', () => {
    const fn = () => <div>Test</div>
    expect(isReactElement(fn)).toBe(false)
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

  it('should keep truthy values including numbers greater than 0', () => {
    const obj = {
      a: 1,
      b: 100,
      c: 'text',
      d: true,
    }
    expect(cleanObject(obj)).toEqual(obj)
  })

  it('should handle objects with mixed truthy and falsy values', () => {
    const obj = {
      name: 'John',
      age: 0,
      active: true,
      deleted: false,
      email: '',
      phone: '555-1234',
    }
    expect(cleanObject(obj)).toEqual({
      name: 'John',
      active: true,
      phone: '555-1234',
    })
  })

  it('should handle objects with nested objects', () => {
    const obj = {
      user: { name: 'John' },
      settings: null,
      config: undefined,
    }
    expect(cleanObject(obj)).toEqual({
      user: { name: 'John' },
    })
  })

  it('should handle objects with arrays', () => {
    const obj = {
      items: [1, 2, 3],
      empty: [],
      nullValue: null,
    }
    expect(cleanObject(obj)).toEqual({
      items: [1, 2, 3],
      empty: [],
    })
  })

  it('should treat empty array as truthy', () => {
    const obj = {
      list: [],
      value: 'test',
    }
    expect(cleanObject(obj)).toEqual({
      list: [],
      value: 'test',
    })
  })

  it('should remove all values from an object with only falsy values', () => {
    const obj = {
      a: null,
      b: undefined,
      c: false,
      d: 0,
      e: '',
    }
    expect(cleanObject(obj)).toEqual({})
  })
})
