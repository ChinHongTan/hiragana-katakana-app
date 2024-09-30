<script lang="ts">
	import { goto } from '$app/navigation';
	import Achievements from '$lib/components/Achievements.svelte';
	import { buttonPop } from '$lib/actions/buttonPop';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { darkMode } from '$lib/stores/themeStore';

	const navigationItems = [
		{ title: 'Recognition Practice', route: '/practice', color: 'blue' },
		{ title: 'Writing Practice', route: '/writing', color: 'green' },
		{ title: 'Timed Challenge', route: '/timed-challenge', color: 'yellow' },
		{ title: 'Take a Quiz', route: '/quiz', color: 'pink' },
		{ title: 'Dashboard', route: '/dashboard', color: 'indigo' },
		{ title: 'Settings', route: '/settings', color: 'purple' }
	];
</script>

<div
	class="min-h-screen px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8"
	class:bg-gradient-to-br={!$darkMode}
	class:from-indigo-100={!$darkMode}
	class:to-purple-100={!$darkMode}
	class:bg-gray-900={$darkMode}
>
	<main class="mx-auto max-w-4xl text-center">
		<h1
			class="mb-8 text-6xl font-extrabold transition-colors duration-300"
			class:text-indigo-800={!$darkMode}
			class:text-indigo-300={$darkMode}
			in:fly={{ y: -50, duration: 1000, easing: quintOut }}
		>
			ひらがな＆カタカナ
			<span
				class="mt-2 block text-3xl font-normal transition-colors duration-300"
				class:text-indigo-600={!$darkMode}
				class:text-indigo-400={$darkMode}
			>
				Hiragana & Katakana Learning App
			</span>
		</h1>

		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each navigationItems as { title, route, color }, index}
				<button
					on:click={() => goto(route)}
					class="transform rounded-2xl p-6 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2"
					class:bg-blue-500={color === 'blue' && !$darkMode}
					class:bg-green-500={color === 'green' && !$darkMode}
					class:bg-yellow-500={color === 'yellow' && !$darkMode}
					class:bg-pink-500={color === 'pink' && !$darkMode}
					class:bg-indigo-500={color === 'indigo' && !$darkMode}
					class:bg-purple-500={color === 'purple' && !$darkMode}
					class:bg-blue-700={color === 'blue' && $darkMode}
					class:bg-green-700={color === 'green' && $darkMode}
					class:bg-yellow-700={color === 'yellow' && $darkMode}
					class:bg-pink-700={color === 'pink' && $darkMode}
					class:bg-indigo-700={color === 'indigo' && $darkMode}
					class:bg-purple-700={color === 'purple' && $darkMode}
					class:hover:bg-blue-600={color === 'blue' && !$darkMode}
					class:hover:bg-green-600={color === 'green' && !$darkMode}
					class:hover:bg-yellow-600={color === 'yellow' && !$darkMode}
					class:hover:bg-pink-600={color === 'pink' && !$darkMode}
					class:hover:bg-indigo-600={color === 'indigo' && !$darkMode}
					class:hover:bg-purple-600={color === 'purple' && !$darkMode}
					class:hover:bg-blue-800={color === 'blue' && $darkMode}
					class:hover:bg-green-800={color === 'green' && $darkMode}
					class:hover:bg-yellow-800={color === 'yellow' && $darkMode}
					class:hover:bg-pink-800={color === 'pink' && $darkMode}
					class:hover:bg-indigo-800={color === 'indigo' && $darkMode}
					class:hover:bg-purple-800={color === 'purple' && $darkMode}
					use:buttonPop
					in:fade={{ duration: 300, delay: index * 100 }}
				>
					{title}
				</button>
			{/each}
		</div>

		<div
			class="w-full rounded-3xl p-8 shadow-2xl transition-colors duration-300"
			class:bg-white={!$darkMode}
			class:bg-gray-800={$darkMode}
			in:scale={{ duration: 500, delay: 600 }}
		>
			<Achievements />
		</div>
	</main>
</div>

<style>
	:global(.animated-bg) {
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
