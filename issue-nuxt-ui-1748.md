### Environment

Global:

- Operating System: Linux (Ubuntu v23.10)
- Node v20.11.1
- pnpm v9.0.1
- (npm v10.2.4)
- (npx v10.2.4)

Project:

- Nuxt Version:     3.11.2
- CLI Version:      3.11.1
- Nitro Version:    2.9.6
- Builder:          -
- User Config:      devtools, modules, ui
- Runtime Modules:  @nuxt/ui@2.15.2, @tresjs/nuxt@2.1.1
- Build Modules:    -

### Version

v2.15.2

### Reproduction

Reproduction with a prepared demo repository:

1. pull the following repo: https://github.com/toddeTV/issue-report-nuxt-ui-1748-tresjs-cientos-404
1. go inside the pulled repo folder
1. `pnpm i`
1. `pnpm build` -> will now break with the provided error

Reproduction without my linked demo repo, own example reproduction:

1. `pnpm dlx nuxi@latest init issue-report-nuxt-ui-1748-tresjs-cientos-404 -t ui` with `pnpm` as package manager
  (see [NuxtUI starter project in installation guide](https://ui.nuxt.com/getting-started/installation#use-nuxt-starter) for more information)
1. cd `issue-report-nuxt-ui-1748-tresjs-cientos-404`
1. `pnpm i` (just to be sure)
1. `pnpm build` -> should work (just to test and be sure)
1. Now lets add a small code that leads to the build error:
  1. `pnpm i -D @tresjs/nuxt @tresjs/cientos`
  1. In `nuxt.config.ts`: Add `@tresjs/nuxt` to the modules & set `global` to `true` in the NuxtUI settings.  
    The nuxt config should then look something like this:

         export default defineNuxtConfig({
           devtools: { enabled: true },
           modules: [
             '@nuxt/ui',
             '@tresjs/nuxt',
           ],
           ui: {
             global: true, // this will break on `pnpm build` -> if set to `false` | `undefined` the build will work
           },
         })

1. `pnpm build` -> will now break with the provided error

### Description

If the following criteria are met in the project, the build command `pnpm build` will fail with the error below.

*Criteria:*

* The nuxt module `@tresjs/nuxt` is enabled in the project and present as dependency
* The dependency `@tresjs/cientos` is present (enabling in TresJS nuxt module config is not needed)
* The nuxt module `@nuxt/ui` is enabled in the project and present as dependency
* The NuxtUI module config `global` is set to `true`

*Error:*

Cannot use `pnpm build` bc the build fails with the following error:

```shell-script
$ pnpm build

> nuxt-app@ build /issue-report-nuxt-ui-1748-tresjs-cientos-404
> nuxt build

Nuxt 3.11.2 with Nitro 2.9.6                                                                                                                                                11:03:36 AM

[nuxt:tailwindcss 11:03:39 AM]  WARN  You have provided functional plugins in tailwindcss.config in your Nuxt configuration that cannot be serialized for Tailwind Config. Please use tailwind.config or a separate file (specifying in tailwindcss.configPath) to enable it with additional support for IntelliSense and HMR.

ℹ Using default Tailwind CSS file                                                                                                                         nuxt:tailwindcss 11:03:39 AM
ℹ Building client...                                                                                                                                                       11:03:41 AM
ℹ vite v5.2.11 building for production...                                                                                                                                  11:03:41 AM
node_modules/.pnpm/@nuxt+ui@2.15.2_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_@_cqvxtylvfpkverkt5obk5rowla/node_modules/@nuxt/ui/dist/runtime/components/forms/Radio.vue (128:68): Error when using sourcemap for reporting an error: Can't resolve original location of error.
ℹ ✓ 135 modules transformed.                                                                                                                                               11:03:50 AM

 ERROR  x Build failed in 8.84s                                                                                                                                             11:03:50 AM


[11:03:50 AM]  ERROR  Nuxt Build Error: node_modules/.pnpm/@nuxt+ui@2.15.2_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_@_cqvxtylvfpkverkt5obk5rowla/node_modules/@nuxt/ui/dist/runtime/components/forms/Radio.vue (128:68): The left-hand side of an assignment expression must be a variable or a property access. (Note that you need plugins to import files that are not JavaScript)
file: /issue-report-nuxt-ui-1748-tresjs-cientos-404/node_modules/.pnpm/@nuxt+ui@2.15.2_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_@_cqvxtylvfpkverkt5obk5rowla/node_modules/@nuxt/ui/dist/runtime/components/forms/Radio.vue:128:68
126:       _withDirectives(_createElementVNode("input", _mergeProps({
127:         id: _ctx.inputId,
128:         "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((("pick" in _ctx ? _ctx.pick : __unimport_unref_(...
                                                                         ^
129:         name: _ctx.name,
130:         required: _ctx.required,

  at getRollupError (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/parseAst.js:394:41)
  at ParseError.initialise (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/node-entry.js:11332:28)
  at convertNode (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/node-entry.js:13082:10)
  at convertProgram (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/node-entry.js:12399:12)
  at Module.setSource (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/node-entry.js:14243:24)
  at async ModuleLoader.addModuleSource (node_modules/.pnpm/rollup@4.17.2/node_modules/rollup/dist/es/shared/node-entry.js:18896:13)

 ELIFECYCLE  Command failed with exit code 1.
```

### Additional context

To get the build working again, one of two things can be done:

* Either setting the NuxtUI module config `global` to `undefined` or `false`, or removing it so that the default `undefined` will be used in the background.
* Or remove the dependency `@tresjs/cientos` (e.g. `pnpm remove @tresjs/cientos`)

But the combination I want in my project setup with build upon code cannot be built.

### Logs

*see above*

### Cross bug report

Because I am not sure whether this is a `@nuxt/ui` or `@tresjs/cientos` issue and what falls under which jurisdiction, I reported this bug twice:

- [issue #1748 in @nuxt/ui](https://github.com/nuxt/ui/issues/1748)
- [issue #404 in @tresjs/cientos](https://github.com/Tresjs/cientos/issues/404)