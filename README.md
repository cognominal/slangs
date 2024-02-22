# slangs

This the repo for a [site](https://slangs.vercel.app/) and tools promoting raku slangs. It is in very early stage.

The site is written in [svelte 4](https://svelte.dev/) using [sveltekit](https://kit.svelte.dev/), tailwindcss [\[1\]](https://tailwindcss.com/docs/guides/sveltekit)
[\[2\]](https://tailwind-workshop.vercel.app/introduction), [flowbite](https://flowbite-svelte.com/), [codemirror](https://codemirror.net/), yaml [\[1\]](https://eemeli.org/yaml/#yaml)[\[2\]](https://yaml.org/spec/1.2.2/), [mdsvex](https://mdsvex.pngwn.io/).
Below are instructions given when scaffolding the application.

## work in progress

I have reached a stage where I knnow what tools to used.
This not a SMOP (Simple mantter of programming) but my progress should be visible from now on.
A MVP will be better than any explanation of waht I aim to.
This repo will probably evolve into a [monorepo](https://monorepo.tools/).

## focus

The list of areas I am currently working on with their tags on commit

- [content] site content and various notes
- [focus] change of focus
- [cleaning] ditto, and various stuff
- [factorize] code that will refactorize code
- [Literate] Literate widget as a whole. Was [PTB]
  - [crumbs] logic to generate the crumbs and interact with them. Currently broken and commented out.
  - [rules pane] logic to bring content to the rules pane of a PTB
  - [TOC] styling of the tOC
  - [styling] ditto
- [calendar] /Calendar is a non public page. I hope it will help me to organize my work

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
