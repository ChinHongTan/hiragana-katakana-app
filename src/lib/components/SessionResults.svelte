<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { darkMode } from '$lib/stores/themeStore';
	import type { Character } from '$lib/data/characters';

	export let score: number;
	export let totalQuestions: number;
	export let incorrectAnswers: { char: Character; userAnswer: string; correctAnswer: string }[];
	export let onNewSession: () => void;
	export let onGoHome: () => void;
	export let getDisplayCharacter: (char: Character) => string;

	let showIncorrectAnswers = false;
</script>

<div class="text-center" in:slide={{ duration: 300 }}>
	<h2
		class="mb-4 text-3xl font-bold transition-colors duration-300"
		class:text-indigo-800={!$darkMode}
		class:text-indigo-300={$darkMode}
	>
		Session Completed!
	</h2>
	<p class="mb-8 text-2xl">
		Your score: <span class="font-bold text-indigo-600 dark:text-indigo-400">{score}</span>
		out of <span class="font-bold text-indigo-600 dark:text-indigo-400">{totalQuestions}</span>
	</p>

	<div class="mb-8 flex justify-center space-x-4">
		{#if incorrectAnswers.length > 0}
			<button
				on:click={() => (showIncorrectAnswers = !showIncorrectAnswers)}
				class="rounded-xl bg-yellow-500 px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
			>
				{showIncorrectAnswers ? 'Hide' : 'Show'} Incorrect Answers
			</button>
		{/if}

		<button
			on:click={onNewSession}
			class="rounded-xl bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			New Session
		</button>

		<button
			on:click={onGoHome}
			class="rounded-xl bg-green-500 px-6 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
		>
			Return to Home
		</button>
	</div>

	{#if showIncorrectAnswers}
		<div class="mt-8 text-left" transition:slide={{ duration: 300 }}>
			<h3
				class="mb-4 text-2xl font-semibold transition-colors duration-300"
				class:text-indigo-800={!$darkMode}
				class:text-indigo-300={$darkMode}
			>
				Incorrect Answers:
			</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each incorrectAnswers as item}
					<div
						class="rounded-xl border-l-4 border-red-500 bg-white p-4 shadow-md transition-colors duration-300 dark:bg-gray-700"
						transition:fade={{ duration: 200 }}
					>
						<div
							class="mb-2 text-3xl transition-colors duration-300"
							class:text-gray-800={!$darkMode}
							class:text-gray-200={$darkMode}
						>
							{getDisplayCharacter(item.char)}
						</div>
						<div
							class="text-sm transition-colors duration-300"
							class:text-gray-600={!$darkMode}
							class:text-gray-400={$darkMode}
						>
							Correct: <span class="font-semibold text-green-500 dark:text-green-400"
								>{item.correctAnswer}</span
							>
						</div>
						<div
							class="text-sm transition-colors duration-300"
							class:text-gray-600={!$darkMode}
							class:text-gray-400={$darkMode}
						>
							You answered: <span class="font-semibold text-red-500 dark:text-red-400"
								>{item.userAnswer}</span
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
