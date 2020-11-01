/** @format */

import bundleTypes from './bundleTypes.js'

const {
  UMD_DEVELOPMENT,
  UMD_PRODUCTION,
  UMD_PROFILING,
  NODE_DEVELOPMENT,
  NODE_PRODUCTION,
  NODE_PROFILING,
} = bundleTypes

export function getFormat(bundleType) {
  switch (bundleType) {
    case UMD_DEVELOPMENT:
      return 'umd'
    case UMD_PRODUCTION:
      return 'umd'
    case UMD_PROFILING:
      return 'umd'
    case NODE_DEVELOPMENT:
      return 'cjs'
    case NODE_PRODUCTION:
      return 'cjs'
    case NODE_PROFILING:
      return 'cjs'
    default:
      break
  }
}

export function getFilename(name, bundleType) {
  switch (bundleType) {
    case UMD_DEVELOPMENT:
      return `${name}.umd.js`
    case UMD_PRODUCTION:
      return `${name}.umd.min.js`
    case UMD_PROFILING:
      return `${name}.umd.profiling.js`
    case NODE_DEVELOPMENT:
      return `${name}.cjs.js`
    case NODE_PRODUCTION:
      return `${name}.cjs.min.js`
    case NODE_PROFILING:
      return `${name}.cjs.profiling.js`
    default:
      break
  }
}
