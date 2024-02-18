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
	import ParsetreeBrowser from '$lib/ParsetreeBrowser.svelte';

	$: activeUrl = $page.url.pathname;

	let parsedText: string;
	let parseTreeText: string;
	let crumbs: Crumbs;
	let parseTreeText1: string;
	let parseTree: object;
	let parsedFileNm = '/data/t';
	let parsetreeFileNm = '/data/t.parsetree';
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

<hr />

<ParsetreeBrowser {parsedText} {parseTreeText} />
<div />
<ParsetreeBrowser {parsedText} {parseTreeText} />

{JSON.stringify(crumbs)}
<p />
{JSON.stringify(parseTree)}
<p />
{JSON.stringify(error)}

<!-- <Navbar>
	{#each crumbs.components as crumb}
		<NavUl>
			<NavLi
				>{crumb[0]}<ChevronDownOutline
					class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline"
				/>
			</NavLi>
		</NavUl>
		<Dropdown>
			{#each crumb.splice(1) as subcrumb}
				<DropdownItem>{subcrumb}</DropdownItem>
			{/each}
		</Dropdown>
	{/each}
</Navbar> -->
