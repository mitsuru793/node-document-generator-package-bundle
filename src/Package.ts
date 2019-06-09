import { fetchPackageJson, log, packageLinks } from './util'
import { FullMetadata } from 'package-json'

export default class Package {
  public readonly name: string
  public readonly version: string
  public readonly description: string
  public readonly link: {
    npm: string
    github: string
    homepage: string
  }

  public constructor(props: Readonly<Package>) {
    this.name = props.name
    this.version = props.version
    this.description = props.description
    this.link = props.link
  }

  public static parsePackageJson(pkg: FullMetadata): Package {
    let github = ''
    if (pkg.repository && pkg.repository.url) {
      const m = pkg.repository.url.match(/https?:\/\/github\.com\/.+\/[^.]+/)
      if (m) {
        github = m[0]
      } else {
        log(`Not found a repository url in ${pkg.name}`)
      }
    }

    if (!pkg.homepage) {
      log(`Not found a homepage url in ${pkg.name}`)
    }

    return new Package({
      name: pkg.name,
      version: pkg.version as string,
      description: pkg.description || '',
      link: packageLinks(pkg.name, github, pkg.homepage || '')
    })
  }

  public static async fetchDependencies(pkg: FullMetadata): Promise<Package[]> {
    const packages = pkg.dependencies as {
      readonly [name: string]: string
    } | null
    if (!packages) {
      throw new Error('Not found dependencies in package.json of self')
    }

    const promises = Object.keys(packages).map(
      async (packageName): Promise<Package> => {
        const pkg = await fetchPackageJson(packageName)
        return Package.parsePackageJson(pkg)
      }
    )
    return Promise.all(promises)
  }
}
