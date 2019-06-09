import Mustache = require('mustache')
import { readSelfPackageJson, readTemplate } from './util'
import Package from './Package'

export default class Template {
  public static async readme(purpose: string): Promise<string> {
    const selfFull = readSelfPackageJson()
    const pkg = Package.parsePackageJson(selfFull)
    const dependencies = (await Package.fetchDependencies(selfFull)).sort()

    const template = readTemplate('README.md')
    const partials = {
      packageLinksLine: readTemplate('packageLinksLine.md')
    }
    const vars = {
      packageName: pkg.name,
      purpose,
      link: pkg.link,
      dev: true,
      dependencies
    }
    return Mustache.render(template, vars, partials).trim()
  }
}
