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
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import CodeMirror from 'svelte-codemirror-editor';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	// import { findPathToPos, calcCrumbbar } from '$lib/utilities';
	import { parse } from 'yaml';
	import {} from '$lib/utils';

	$: activeUrl = $page.url.pathname;

	let parsedText: string;
	let parseTreeText: string;
	let crumbs: string[][] = [['toto', 'titi', 'tata'], ['caca']];
	let parseTreeText1: string;
	let parseTree: object;
	let parsedFileNm = '/data/2stmts.nqp';
	let parsetreeFileNm = '/data/2stmts.parsetree';
	let error: string = 'no error';
	let path: string[];

	async function doFetch(filenm: string): Promise<string> {
		const response = await fetch(filenm);
		const data = await response.text();
		return data;
	}

	onMount(() => {
		async function fetchData() {
			[parsedText, parseTreeText] = await Promise.all([
				doFetch(parsedFileNm),
				doFetch(parsetreeFileNm)
			]);
		}
		fetchData();
		// parseTreeText1 = "- 43\n- 44\n";

		parseTreeText = `TOP/statementlist.0.9:
  statement/EXPR/value/number.1.3:
    integer/decint.1.3: null
  statement/EXPR/value/number.4.7:
    integer/VALUE.4.7: null`;

		// parseTreeText = "- 43\n- 44\n"
		try {
			parseTree = parse(parseTreeText);
		} catch (e) {
			console.log(e);
			error = JSON.stringify(e);
			// error = e.message;
		}
		// parseTree = parse(parseTreeText);
		// crumbBar = calcCrumbbar(parseTree, 0);

		// path =	findPathToPos(parseTree, 1);
	});
</script>

<hr />

<Navbar>
	{#each crumbs as crumb}
		<NavUl>
			<NavLi>{crumb[0]}<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
			</NavLi>
		</NavUl>
		<Dropdown>
			{#each crumb.splice(1) as subcrumb}
				<DropdownItem>{subcrumb}</DropdownItem>
			{/each}
		</Dropdown>
	{/each}
</Navbar>

<div class="full-height">
	<Splitpanes horizontal={false}>
		<Pane minSize={15}><CodeMirror bind:value={parsedText} /></Pane>
		<Pane><CodeMirror bind:value={parseTreeText} /></Pane>
	</Splitpanes>
</div>
