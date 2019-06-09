import * as path from 'path'
import fse from 'fs-extra'
import { FullMetadata } from 'package-json'
import packageJson = require('package-json')
import * as findUp from 'find-up'

const root = path.join(__dirname, '../')

export function readSelfPackageJson(): FullMetadata {
  const json = findUp.sync('package.json')
  if (!json) {
    throw new Error('Not found package.json.')
  }
  return fse.readJsonSync(json)
}

export async function fetchPackageJson(
  packageName: string,
  useCache: boolean = false
): Promise<FullMetadata> {
  const fetchPkg = (): Promise<FullMetadata> =>
    packageJson(packageName, { fullMetadata: true })

  if (!useCache) {
    return await fetchPkg()
  }

  const cache = path.join(root, '/.cache/fetched-package.json')
  fse.ensureFileSync(cache)

  let packages = fse.readJsonSync(cache, { throws: false })
  if (!packages) {
    packages = {}
  }

  if (packages[packageName]) {
    return packages[packageName]
  }

  packages[packageName] = await fetchPkg()
  fse.writeJsonSync(cache, packages)
  return packages[packageName]
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
  if (!fse.existsSync(file)) {
    throw new Error(`Not found template: ${file}`)
  }
  return fse
    .readFileSync(file)
    .toString()
    .trim()
}
