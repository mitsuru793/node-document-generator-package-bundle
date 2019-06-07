#!/usr/bin/env ts-node

import { log } from './util'
import Template from './Template'

async function main(): Promise<void> {
  log(await Template.readme('to play music'))
}

main()
