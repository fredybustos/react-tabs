import React from 'react'

export const isReactElement = (element: unknown) => React.isValidElement(element)

export const cleanObject = (object: Record<string, unknown>) => {
  const obj = {} as Record<string, unknown>
  for (const key in object) {
    if (object[key]) {
      obj[key] = object[key]
    }
  }
  return obj
}
