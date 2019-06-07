import * as fs from 'fs'
import * as path from 'path'
import { FullMetadata } from 'package-json'

const root = path.join(__dirname, '../')

export function readSelfPackageJson(): FullMetadata {
  const file = path.join(root, 'package.json')
  const raw = fs.readFileSync(file)
  return JSON.parse(raw.toString())
}

export function link(text: string, url: string): string {
  return `[${text}](${url})`
}

interface PackageLinks {
  npm: string
  github: string
  homepage: string
}

export function packageLinks(
  packageName: string,
  githubUrl: string,
  homepageUrl: string
): PackageLinks {
  const npmUrl = `https://www.npmjs.com/package/${packageName}`
  return {
    npm: link('Npm', npmUrl),
    github: link('Github', githubUrl),
    homepage: link('Homepage', homepageUrl)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(something: any): void {
  // eslint-disable-next-line no-console
  console.log(something)
}

export function readTemplate(templatePath: string): string {
  const file = path.join(__dirname, '/template/', `${templatePath}.mustache`)
  if (!fs.existsSync(file)) {
    throw new Error(`Not found template: ${file}`)
  }
  return fs
    .readFileSync(file)
    .toString()
    .trim()
}
