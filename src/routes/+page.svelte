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
	let parseGrammarText: string;
	let parseTreeText1: string;
	let crumbs: Crumbs;
	let parseTree: object;
	let parsedFileNm = '/data/t';
	let parsetreeFileNm = '/data/t.parsetree';
	let parseGrammarFileNm = '/data/t.grammar';

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
			[parsedText, parseTreeText, parseGrammarText, parsedText1, parseTreeText1] =
				await Promise.all([
					doFetch(parsedFileNm),
					doFetch(parsetreeFileNm),
					doFetch(parseGrammarFileNm),
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
		This site (in construction) will promote raku grammars and slangs by providing tools to explore them
		and access documentation. It wiil eventually make them available to languages other than raku by
		making them a wasm based engine. Eventually having a a streamlined grammar for Svelte 5 would be
		nice.
		<p>
			To do so, We create pedagogical tools to learn about parsing with grammars. We do so by using
			yaml parsetrees and maybe the ASTs. These tools are prototyped on this site but are intended
			to eventually be available in vscode. The original version of the site at slangs.vercel.app is
			static because it has no acces to the raku compiler.
		</p>
		<h2>Literate Widget</h2>
		The workhorse of this site is the Literate widget. The literate Widget is intended to be use in blogs,
		article and documentation. It will support highlighting of code. But often the example is too advanced
		or the reader want to go on a tangent. But for now let us explore a simple case. The example shown
		here is a test case. The parsed text is:

		<CodeMirror bind:value={parsedText} />

		The grammar to parse it is below. It is the simples grammar intended to exercice most of the
		features of the parse tree browser :

		<CodeMirror bind:value={parseGrammarText} />

		The parse tree is :
		<CodeMirror bind:value={parseTreeText} />

		The unexpanded widget will show only the parsed text.

		<h2>Expanded Literate</h2>
		An expanded Literate Widget will be full screen. But for sake of illustration it is not full screen
		here. Think it as a playground but with some savvy which allows to display doc information.

		<h3>Parse tree</h3>
		The expanded literate widget will be used to explore the parse tree generated from the code. On the
		left is the code. In the right one can choose between the parse tree generated from the code and
		a pane which displays the rules used to parse the code (TBD).
		<Literate {parsedText} {parseTreeText} />
		<h2>Yaml slang</h2>
		A yaml slang will be provided derived from yamlish. It will be used to write code to drive test and
		refactoring. As a slang it will not be a simple raku string but an syntax highlighted parsed entity
		which parsetree can be explored with Literate widget.
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
