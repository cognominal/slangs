<script lang="ts">
	import Monaco from '$lib/Monaco.svelte';
	import type { Crumbs, Parsetree } from './types';
	// import * as T from '$lib/types.js';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	import { calcCrumbs, doFetch } from '$lib/utils';
	import { Tabs, TabItem, Hr } from 'flowbite-svelte';
	export let parsedText: string;
	export let parseTreeText: string;
	// export let LiterateName;
	// export let rulesYaml = '';
	export let crumbs: Crumbs;
	let parseTree: object;
	let error = 'no error';
	let rulesTxt = 'will display the code of matched rules';
	try {
		parseTree = parse(parseTreeText);
		crumbs = calcCrumbs(parseTree as Parsetree, 3);
	} catch (e) {
		console.log(e);
		error = JSON.stringify(e);
	}
</script>

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

<div class="border border-gray-400 hover:border-gray-900">
	<Splitpanes horizontal={false}>
		<Pane minSize={15}><Monaco bind:value={parsedText} /></Pane>
		<Pane>
			<Tabs contentClass="bg-gray-50  dark:bg-gray-800">
				<TabItem open title="parsetree">
					<div class="h-full">
						<Monaco bind:value={parseTreeText} />
					</div>
				</TabItem>
				<TabItem title="rules">
					<Monaco bind:value={rulesTxt} />
				</TabItem>
			</Tabs>
		</Pane>
	</Splitpanes>
</div>
