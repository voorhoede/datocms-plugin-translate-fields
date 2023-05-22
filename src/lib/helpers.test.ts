import { isJsonString } from './helpers'

describe('isJsonString', () => {
  it('should return false if not a json string', () => {
    expect(isJsonString('test')).toBeFalsy()
  })
  it('should return true if json string', () => {
    expect(isJsonString('{"test": "test"}')).toBeTruthy()
  })
})
