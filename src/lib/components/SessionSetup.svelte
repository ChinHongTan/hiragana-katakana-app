<script lang="ts">
	import { fade } from 'svelte/transition';
	import { darkMode } from '$lib/stores/themeStore';

	export let sessionLengthOptions: number[];
	export let selectedLength: number;
	export let onLengthSelect: (length: number) => void;
	export let onStart: () => void;
	export let title: string;
	export let description: string;
</script>

<div
	class="overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl transition-colors duration-300 dark:bg-gray-800"
	in:fade
>
	<h2
		class="mb-8 text-3xl font-semibold transition-colors duration-300"
		class:text-indigo-800={!$darkMode}
		class:text-indigo-300={$darkMode}
	>
		{title}
	</h2>
	<div class="mb-8 grid grid-cols-2 gap-6">
		{#each sessionLengthOptions as length}
			<button
				on:click={() => onLengthSelect(length)}
				class="transform rounded-xl py-6 text-2xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2"
				class:bg-indigo-600={selectedLength === length}
				class:text-white={selectedLength === length}
				class:bg-gray-200={selectedLength !== length && !$darkMode}
				class:bg-gray-700={selectedLength !== length && $darkMode}
				class:text-gray-800={selectedLength !== length && !$darkMode}
				class:text-gray-200={selectedLength !== length && $darkMode}
			>
				{length} Questions
			</button>
		{/each}
	</div>
	<button
		on:click={onStart}
		class="w-full rounded-xl bg-green-500 py-4 text-2xl font-semibold text-white transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
	>
		Start Session
	</button>
</div>
<div
	class="mt-6 text-center transition-colors duration-300"
	class:text-gray-600={!$darkMode}
	class:text-gray-400={$darkMode}
>
	<p>{description}</p>
</div>
