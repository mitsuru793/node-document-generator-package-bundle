# Document Generator Package Bundle

This generates document for my bundle of npm packages.
I don't have to write a `README.md` for the bundle.

# Installation

```
$ yarn add -D @mitsuru793/document-generator-package-bundle
```

# Write template

```javascript
import Template from './Template'

async function main(): Promise<void> {
  // Pass a purpose of bundle as 1st argument.
  // "to play music" is injected to readme.
  
  // Fetch npm package of dependencies internal.
  // So you have to use await.
  const text = await Template.readme('to play music')
  console.loglog(text)
}

main()
```
