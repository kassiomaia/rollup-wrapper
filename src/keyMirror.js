/** @format */

export default function keyMirror(object) {
  return Object.freeze(
    Object.keys(object).reduce((acc, key) => {
      acc[key] = key
      return acc
    }, {})
  )
}
