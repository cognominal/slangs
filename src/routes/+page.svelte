<script lang="ts">
	import type { Parsetree, Crumbs } from '$lib/types.js';
	import { calcCrumbs } from '$lib/utils';
	// import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	// import { Literate } from '$lib/Literate.svelte';
	import Literate from '$lib/Literate.svelte';
	import Monaco from '$lib/Monaco.svelte';
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
		<p>
			This site (in construction) will promote <a
				href="https://en.wikipedia.org/wiki/Raku_(programming_language">raku</a
			>
			language <a href="https://docs.raku.org/language/grammars">grammars</a>
			and slangs by providing tools to explore them and access documentation. For lack of tooling, slangs
			are not even an official feature of raku when it is the very thing that distinguish it from other
			languages. Raku fully supporting slangs will make in a principled way what Perl did very successfully
			as a hack. It was said that "Perl duct tape that holds the Internet together". in essence making
			more rigid tools cooperate with each other. That is in other word, being capable of process ther
			output and generate output suitable to them.
		</p>

		<h3>Tooling</h3>
		<p>
			This site wiil eventually make its tools available to languages other than raku by making them
			a
			<a href="https://en.wikipedia.org/wiki/WebAssembly">wasm</a>
			based engine. Rust code could be used as a starting point. Eventually having a a streamlined grammar
			for
			<a href="https://svelte-5-preview.vercel.app/docs/introduction">Svelte 5</a> would be nice.
		</p>
		<p>
			To do so, we create pedagogical tools to learn about <a
				href="https://en.wikipedia.org/wiki/Parsing">parsing</a
			>
			with grammars. We do so by using yaml
			<a href="https://en.wikipedia.org/wiki/Parse_tree">parsetrees</a>
			and maybe the
			<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">ASTs</a>. These tools are
			prototyped on this site but are intended to eventually be available in vscode. The original
			version of the site at slangs.vercel.app is static because it has no acces to the raku
			compiler.
		</p>
		<h2>Literate Widget</h2>
		<p>
			The workhorse of this site is the Literate widget. The literate Widget is intended to be used
			in blogs, article and documentation. It will support highlighting of code. But often the
			example is too advanced or the reader want to go on a tangent. But for now let us explore a
			simple case.
		</p>
		<p>The example shown here is a test case. The parsed text is:</p>

		<Monaco bind:value={parsedText} />
		<p>
			The grammar to parse it is below. It is the simples grammar intended to exercice most of the
			features of the parse tree browser :
		</p>

		<Monaco bind:value={parseGrammarText} />
		<p>The parse tree is :</p>
		<Monaco bind:value={parseTreeText} />
		<p>The unexpanded widget will show only the parsed text.</p>

		<h2>Expanded Literate</h2>
		<p>
			An expanded Literate Widget will be full screen. But for sake of illustration it is not full
			screen here. Think it as a playground but with some savvy which allows to display doc
			information.
		</p>

		<h3>Parse tree</h3>
		<p>
			The expanded literate widget will be used to explore the parse tree generated from the code.
			On the left is the code. In the right one can choose between the parse tree generated from the
			code and a pane which displays the rules used to parse the code (TBD).
		</p>
		<Literate {parsedText} {parseTreeText} />
		<p />

		<h2>Yaml slang</h2>
		<p>
			A yaml slang will be provided derived from <a href="https://github.com/Leont/yamlish"
				>yamlish</a
			>. It will be used to write code to drive test and refactoring. As a slang it will not be a
			simple raku string but an syntax highlighted parsed entity which parsetree can be explored
			with Literate widget.
		</p>
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

<style>
	p {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
