<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	import { calcCrumbs, type Crumbs, type ParseTree } from '$lib/utils';
	import { Tabs, TabItem, Timeline, TimelineItem, Button, Hr } from 'flowbite-svelte';
	export let parsedText: string;
	export let parseTreeText: string;
	let parseTree: object;
	let error = 'no error';
	let rulesTxt = 'will display the code of matched rules';
	let crumbs: Crumbs;
	try {
		parseTree = parse(parseTreeText);
		crumbs: Crumbs = calcCrumbs(parseTree as ParseTree, 3);
	} catch (e) {
		console.log(e);
		error = JSON.stringify(e);
		// error = e.message;
	}

	// your script goes here
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

<Hr />
<div class="border border-gray-400 hover:border-gray-900">
	<Splitpanes horizontal={false}>
		<Pane minSize={15}><CodeMirror bind:value={parsedText} /></Pane>
		<Pane>
			<Tabs contentClass="bg-gray-50  dark:bg-gray-800">
				<TabItem open title="parsetree">
					<CodeMirror bind:value={parseTreeText} />
				</TabItem>
				<TabItem title="rules">
					<CodeMirror bind:value={rulesTxt} />
				</TabItem>
			</Tabs>
		</Pane>
	</Splitpanes>
</div>
<!-- <div class="full-height">
	<Splitpanes horizontal={false}>
		<Pane minSize={15}><CodeMirror bind:value={parsedText} /></Pane>
		<Tabs>
			<TabItem open>
				<span slot="title">Rules</span>
				<Pane><CodeMirror bind:value={parseTreeText} /></Pane>
			</TabItem>
			<TabItem>
				<span slot="title">Parsetree</span>

				<Pane><CodeMirror bind:value={parseTreeText} /></Pane>
			</TabItem>
		</Tabs>
	</Splitpanes>
</div> -->
