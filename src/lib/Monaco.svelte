<script lang="ts">
	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	export let value: string;
	let divElt: HTMLDivElement | null = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	$: calcHeight = value?.split('\n').length || 1.5;

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			// getWorker: function (_moduleId: any, label: string) {
			//     if (label === 'json') {
			//         return new jsonWorker();
			//     }
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divElt, {
			value,
			// automaticLayout: true,
			trimAutoWhitespace: true,
			scrollBeyondLastLine: false,
			minimap: { enabled: false }
		});
		// Watch for changes in the editor's content
		editor.onDidChangeModelContent(() => {
			value = editor.getValue();
		});

		return () => {
			editor.dispose();
		};
	});

	// Watch for changes in the bound variable
	$: if (editor && value !== editor.getValue()) {
		editor.setValue(value);
	}
</script>

<div
	bind:this={divElt}
	class="h-auto border-2 border-gray-300 hover:border-gray-400"
	style="min-height: {calcHeight}em"
/>
