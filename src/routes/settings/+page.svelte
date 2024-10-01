<script lang="ts">
	import { preferences } from '$lib/stores/preferencesStore';
	import { characters } from '$lib/data/characters';
	import { fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { darkMode } from '$lib/stores/themeStore';
	import { getDisplayCharacter } from '$lib/utils';
	import PageLayout from '$lib/components/PageLayout.svelte';

	let groups = Array.from(new Set(characters.map((char) => char.group)));

	function toggleGroup(group: string) {
		$preferences.groups = $preferences.groups.includes(group)
			? $preferences.groups.filter((g) => g !== group)
			: [...$preferences.groups, group];
	}

	let hoverGroup = '';
	const groupSpring = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.7
		}
	);

	function handleMousemove(event: MouseEvent) {
		groupSpring.set({
			x: event.clientX,
			y: event.clientY
		});
	}

	function setScript(script: string) {
		if (script === 'hiragana' || script === 'katakana' || script === 'both') {
			$preferences.script = script;
		}
	}
</script>

<PageLayout title="学習設定" subtitle="Learning Settings">
	<div
		class="overflow-hidden rounded-3xl p-8 shadow-2xl transition-colors duration-300"
		class:bg-white={!$darkMode}
		class:bg-gray-800={$darkMode}
	>
		<!-- Script Selection -->
		<div class="mb-12" in:fade={{ duration: 800, delay: 200 }}>
			<h2
				class="mb-6 text-3xl font-bold transition-colors duration-300"
				class:text-indigo-800={!$darkMode}
				class:text-indigo-300={$darkMode}
			>
				Script Selection
			</h2>
			<div class="flex justify-center space-x-4">
				{#each ['hiragana', 'katakana', 'both'] as script}
					<button
						class="rounded-full px-6 py-3 text-xl font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2"
						class:bg-indigo-600={$preferences.script === script}
						class:text-white={$preferences.script === script}
						class:bg-gray-200={$preferences.script !== script && !$darkMode}
						class:bg-gray-700={$preferences.script !== script && $darkMode}
						class:text-gray-800={$preferences.script !== script && !$darkMode}
						class:text-gray-200={$preferences.script !== script && $darkMode}
						on:click={() => setScript(script)}
					>
						{script.charAt(0).toUpperCase() + script.slice(1)}
					</button>
				{/each}
			</div>
		</div>

		<!-- Character Groups -->
		<div in:fade={{ duration: 800, delay: 400 }}>
			<h2
				class="mb-6 text-3xl font-bold transition-colors duration-300"
				class:text-indigo-800={!$darkMode}
				class:text-indigo-300={$darkMode}
			>
				Character Groups
			</h2>
			<div
				class="grid grid-cols-2 gap-4 sm:grid-cols-3"
				on:mousemove={handleMousemove}
				role="presentation"
			>
				{#each groups as group}
					<button
						class="transform rounded-xl p-4 text-lg font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2"
						class:bg-indigo-600={$preferences.groups.includes(group)}
						class:text-white={$preferences.groups.includes(group)}
						class:bg-gray-200={!$preferences.groups.includes(group) && !$darkMode}
						class:bg-gray-700={!$preferences.groups.includes(group) && $darkMode}
						class:text-gray-800={!$preferences.groups.includes(group) && !$darkMode}
						class:text-gray-200={!$preferences.groups.includes(group) && $darkMode}
						on:click={() => toggleGroup(group)}
						on:mouseenter={() => (hoverGroup = group)}
						on:mouseleave={() => (hoverGroup = '')}
					>
						{group}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Floating Character -->
	{#if hoverGroup}
		<div
			class="pointer-events-none fixed text-6xl transition-colors duration-300"
			class:text-indigo-400={!$darkMode}
			class:text-indigo-300={$darkMode}
			style="left: {$groupSpring.x}px; top: {$groupSpring.y}px; transform: translate(-50%, -50%);"
		>
			{getDisplayCharacter(characters.find((char) => char.group === hoverGroup) || characters[0])}
		</div>
	{/if}
</PageLayout>
