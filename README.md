# Document Generator Package Bundle

This generates document for my bundle of npm packages.
I don't have to write a `README.md` for the bundle.

# Installation

```
$ yarn add -D @mitsuru793/document-generator-package-bundle
```

# Write template

## Command

```
document-generator-package-bundle render:readme 'purpose for bundle'
```

## Script File

```javascript
import {Template} from '@mitsuru793/document-generator-package-bundle'

async function main(): Promise<void> {
  // Pass a purpose of bundle as 1st argument.
  // "to play music" is injected to readme.
  
  // Fetch npm package of dependencies internal.
  // So you have to use await.
  const text = await Template.readme('to play music')
  console.log(text)
}

main()
```
