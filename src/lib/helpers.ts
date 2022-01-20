import { Path } from './types'

export function makeObject(array: any[], arrayKey: string): any {
  return array.reduce((acc: any, item: any, index: number) => {
    if (arrayKey in item) {
      return {
        ...acc,
        [index]: {
          ...item,
          [arrayKey]: makeObject(item[arrayKey], arrayKey)
        },
      }
    }
    return { ...acc, [index]: item }
  }, {})
}

export function makeArray(object: any, objectKey: string): any[] {
  return Object.keys(object).reduce((acc: any[], key: string) => {
    if (objectKey in object[key]) {
      acc.push({ ...object[key], [objectKey]: makeArray(object[key][objectKey], objectKey) })
      return acc
    }
    acc.push(object[key])
    return acc
  }, [])
}

export function paths(object: any, prev: string = ''): Path[] {
  if (object) {
    return Object.keys(object).reduce((acc: any[], key: string) => {
      const path = `${prev}${prev ? `.${key}` : key}`
      const value = object[key]

      if (typeof value === 'object') {
        acc.push(...paths(value, path))
      } else {
        acc.push({ path, value, key })
      }

      return acc
    }, [])
  }

  return []
}