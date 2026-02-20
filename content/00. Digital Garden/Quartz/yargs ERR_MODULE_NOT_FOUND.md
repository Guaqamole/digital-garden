---
title: yargs ERR_MODULE_NOT_FOUND
date: 2025-09-01
draft: false
tags:
  - Quartz
link:
---
*Parent* : [[00. Digital Garden]]

```sh
❯ ./run.sh
node:internal/modules/package_json_reader:267
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'yargs' imported from /Users/john/digital-garden/quartz/bootstrap-cli.mjs
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:267:9)
    at packageResolve (node:internal/modules/esm/resolve:768:81)
    at moduleResolve (node:internal/modules/esm/resolve:854:18)
    at defaultResolve (node:internal/modules/esm/resolve:984:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:780:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:704:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:687:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:305:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:137:49) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v23.11.0
```

### Solution
```sh
nvm use 22 # use Node.js 22
cd quartz 
npm i
npx install yargs
```