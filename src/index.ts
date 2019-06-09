import { Command } from 'commander'
import Template from './Template'
import { renderReadme } from './commands'

const env = process.env.NODE_ENV || 'dev'

const program: Command = new Command()

const desc = program.description
// @ts-ignore
program.description = (str: string): Command => desc(str.trim())

program.version('1.0.0')

program
  .command('render:readme <purpose>')
  .description(
    `
Render readme for npm package bundle.
<purpose> is for the bundle and will be injected to readme.
  `
  )
  .action(renderReadme)

async function run(): Promise<void> {
  program.parse(process.argv)
}

if (env === 'debug') {
  run()
}

export { Template, run }
