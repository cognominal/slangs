<script lang="ts">
	import type { Parsetree, Crumbs } from '$lib/types.js';
	import { calcCrumbs } from '$lib/utils';
	// import { page } from '$app/stores';
	import CodeMirror from 'svelte-codemirror-editor';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	// import { Literate } from '$lib/Literate.svelte';
	import Literate from '$lib/Literate.svelte';
	import { Hr } from 'flowbite-svelte';
	import Toc from 'svelte-toc';

	// $: activeUrl = $page.url.pathname;

	let parsedText: string;
	let parseTreeText: string;
	let parsedText1: string;
	let parseTreeText1: string;
	let crumbs: Crumbs;
	let parseTree: object;
	let parsedFileNm = '/data/t';
	let parsetreeFileNm = '/data/t.parsetree';

	let parsedFileNm1 = 'data/sample-grammar.nqp';
	let parsetreeFileNm1 = '/data/sample-grammar.parsetree';
	let error: string = 'no error';
	let path: string[];

	async function doFetch(filenm: string): Promise<string> {
		const response = await fetch(filenm);
		const data = await response.text();
		return data;
	}

	onMount(() => {
		async function fetchData() {
			[parsedText, parseTreeText, parsedText1, parseTreeText1] = await Promise.all([
				doFetch(parsedFileNm),
				doFetch(parsetreeFileNm),
				doFetch(parsedFileNm1),
				doFetch(parsetreeFileNm1)
			]);
		}
		fetchData();
		try {
			parseTree = parse(parseTreeText);
		} catch (e) {
			console.log(e);
			error = JSON.stringify(e);
			// error = e.message;
		}
		crumbs = calcCrumbs(parseTree as Parsetree, 3);
	});
</script>

<!-- Can I make this page a +page.svelte.md despite the onMount ? -->

<main class="flex">
	<section Class="flex-auto">
		<h2>Grammars and slangs</h2>
		This site (in construction) will promote raku grammars and slangs, and eventually make them available
		to languages other than raku by making them a wasm based engine. Eventually having a a streamlined
		grammar for Svelte 5 would be nice.
		<p>
			To do so, We create pedagogical tools to learn about parsing with grammars. We do so by using
			yaml parsetrees and maybe the ASTs. These tools are prototyped on this site but are intended
			to eventually be available in vscode. The original version of the site at slangs.vercel.app is
			static because it has no acces to the raku compiler.
		</p>
		<h2>Literate Widget</h2>
		The workhorse of this site is the Literate widget. It allows to interact with code, refactor it (TBD),
		and access the relevant documentation (TBD). Unexpanded, it looks like a regular code example :
		<CodeMirror bind:value={parseTreeText} />
		<h3>Expanded Literate</h3>
		The expanded literate widget will be used to explore the parse tree generated from the code. An expanded
		Literate Widget is generally full screen. But for sake of illustration it is not full screen here.
		On the left is the code. In the right one can choose between the parse tree generated from the code
		and a pane which displays the rules used to parse the code (TBD).
		<Literate {parsedText} {parseTreeText} />
		<Hr />
	</section>
	<Toc breakpoint={300} --toc-min-width="20em" />
</main>

<!-- <div style="height:  20rem; overflow: auto;">
		<Literate parsedText={parsedText1} parseTreeText={parseTreeText1} />
	</div>
	<div />
	
	{JSON.stringify(crumbs)}
	<p />
	{JSON.stringify(parseTree)}
	<p />
	{JSON.stringify(error)} -->
