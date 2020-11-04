/** @format */

import chalk from 'chalk'

export const block = {
  preparing: chalk.bgYellow.black,
  success: chalk.bgGreen.black,
  error: chalk.bgRed.white,
  done: chalk.bgGreenBright.black,
}

export const text = {
  success: chalk.green,
  error: chalk.red,
}

export function startBuilding() {
  console.log(`${block.preparing('  BUILDING  ')}\n`)
}

export function finishiBuilding() {
  console.log(`\n${block.done('  COMPLETED  ')}`)
}

export function completeBuildPhase(name, file, format) {
  console.log(
    `${block.success('  COMPILED  ')} ${format} - ${text.success(
      name
    )}: ${file}`
  )
}

export function failBuildPhase(err, file) {
  console.log(`${block.error('  FAILED  ')} ${text.error(err)}: ${file}`)
}
