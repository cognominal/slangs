<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		ImagePlaceholder,
		Skeleton,
		TextPlaceholder,
		Dropdown
	} from 'flowbite-svelte';
	import { DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import CodeMirror from 'svelte-codemirror-editor';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	import { calcCrumbs, type Crumbs, type ParseTree } from '$lib/utils';
	import Literate from '$lib/Literate.svelte';
	import { Hr } from 'flowbite-svelte';
	import Toc from 'svelte-toc';

	$: activeUrl = $page.url.pathname;

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
		crumbs = calcCrumbs(parseTree as ParseTree, 3);
	});
</script>

<!-- <Toc /> -->

<main class="w-[100-rem]">
	<h1>Literate Widget</h1>
	The workhorse of this site is the Literate widget. It allows to interact with code, refactor it (TBD),
	and access the relevant documentation (TBD). Unexpanded, it looks like a regular code example :

	<CodeMirror bind:value={parseTreeText} />

	<h2>Expanded Literate</h2>

 The expanded literate will be used to explore the parse tree generated from
 the code. An expanded Literate Widget is generally full screen. But for sake
 of illustration it is not full screen here. On the left is the code. In the
 right one can choose between the parse tree generated from the code and a pane
 which displays the rules used to parse the code (TBD).

	<Literate {parsedText} {parseTreeText} />
	<Hr />

	<!-- <div style="height:  20rem; overflow: auto;">
		<Literate parsedText={parsedText1} parseTreeText={parseTreeText1} />
	</div>
	<div />

	{JSON.stringify(crumbs)}
	<p />
	{JSON.stringify(parseTree)}
	<p />
	{JSON.stringify(error)} -->
</main>
