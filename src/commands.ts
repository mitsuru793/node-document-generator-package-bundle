import Template from './Template'
import { log } from './util'

export async function renderReadme(purpose: string): Promise<void> {
  const text = await Template.readme(purpose)
  log(text)
}
