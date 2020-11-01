/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.md', which is part of this source code package.
 */

/** @format */

import rollup from 'rollup'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import chalk from 'chalk'

import bundleTypes from './bundleTypes.js'
import { getFilename, getFormat } from './bundleUtils.js'
import * as Log from './log.js'

const LIB_DIR = process.env.ROLLUP_WRAPPER_BUILD_DIR || 'lib'

const {
  UMD_DEVELOPMENT,
  UMD_PRODUCTION,
  UMD_PROFILING,
  NODE_DEVELOPMENT,
  NODE_PRODUCTION,
  NODE_PROFILING,
} = bundleTypes

export function getInputPlugins(bundleType) {
  switch (bundleType) {
    case UMD_DEVELOPMENT:
    case NODE_DEVELOPMENT:
    case UMD_PRODUCTION:
    case NODE_PRODUCTION:
    case UMD_PROFILING:
    case NODE_PROFILING:
      return [babel()]
    default:
      break
  }
}

export function getOutputPlugins(bundleType) {
  switch (bundleType) {
    case UMD_DEVELOPMENT:
    case NODE_DEVELOPMENT:
    case UMD_PROFILING:
    case NODE_PROFILING:
      return []
    case UMD_PRODUCTION:
    case NODE_PRODUCTION:
      return [terser()]
    default:
      break
  }
}

export async function createBundle({
  entry,
  name,
  bundleTypes,
  external,
  globals,
}) {
  await Promise.all(
    bundleTypes.map(async bundleType => {
      const file = `${LIB_DIR}/${getFilename(name, bundleType)}`
      const format = getFormat(bundleType)

      try {
        const result = await rollup.rollup({
          input: entry,
          external,
          plugins: getInputPlugins(bundleType),
        })

        await result.write({
          file,
          name,
          format,
          globals,
          interop: false,
          plugins: getOutputPlugins(bundleType),
        })

        Log.completeBuildPhase(name, file, format)
      } catch (e) {
        Log.failBuildPhase(e, file)
      }
    })
  )
}

export async function build(bundles) {
  Log.startBuilding()

  await Promise.all(bundles.map(async bundle => createBundle(bundle)))

  Log.finishiBuilding()
}
