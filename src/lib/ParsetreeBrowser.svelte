<script lang="ts">
import CodeMirror from 'svelte-codemirror-editor';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	import { parse } from 'yaml';
	import { calcCrumbs, type Crumbs, type ParseTree } from '$lib/utils';



	export let parsedText: string;
	export let parseTreeText: string;
	// your script goes here
</script>

<div class="full-height">
	<Splitpanes horizontal={false}>
		<Pane minSize={15}><CodeMirror bind:value={parsedText} /></Pane>
		<Pane><CodeMirror bind:value={parseTreeText} /></Pane>
	</Splitpanes>
</div>
