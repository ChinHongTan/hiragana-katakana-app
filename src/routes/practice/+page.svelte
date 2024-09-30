<script lang="ts">
	import BaseGame from '$lib/components/BaseGame.svelte';
	import CharacterDisplay from '$lib/components/CharacterDisplay.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import type { Character } from '$lib/data/characters';
	import { PracticeGameLogic } from '$lib/PracticeGameLogic';
	import { gameState } from '$lib/stores/gameStore';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { darkMode } from '$lib/stores/themeStore';

	const gameLogic = new PracticeGameLogic();
	let userAnswer = '';
	let currentCharacter: Character | null = null;
	let canSubmit = true;

	const sessionLengthOptions = [10, 20, 30, 50];
	const defaultSessionLength = 20;

	function handleSubmit() {
		if (!canSubmit) return;
		console.log('handleSubmit called');
		const correct = gameLogic.checkAnswer(userAnswer);
		userAnswer = '';
		canSubmit = false;

		setTimeout(
			() => {
				currentCharacter = gameLogic.moveToNextQuestion();
				console.log('Updated currentCharacter:', currentCharacter);
				canSubmit = true;
			},
			correct ? 500 : 1500
		);
	}

	function handleStart() {
		console.log('handleStart called');
		gameLogic.start();
		currentCharacter = gameLogic.getCurrentCharacter();
	}

	onMount(() => {
		console.log('practice/+page.svelte onMount');
	});

	$: console.log('Current gameState:', $gameState);
	$: console.log('Current character in component:', currentCharacter);
</script>

<PageLayout title="文字認識練習" subtitle="Recognition Practice">
	<BaseGame
		title="文字認識練習"
		subtitle="Recognition Practice"
		{sessionLengthOptions}
		{defaultSessionLength}
		{gameLogic}
		on:start={handleStart}
	>
		<div slot="game-content">
			{#if currentCharacter && !$gameState.sessionEnded}
				<div class="mb-8 text-center" in:fade={{ duration: 300 }}>
					<CharacterDisplay character={currentCharacter} showRomaji={false} />
				</div>

				<div class="mb-6 flex justify-center">
					<input
						type="text"
						bind:value={userAnswer}
						placeholder="Enter romaji"
						on:keydown={(e) => {
							if (e.key === 'Enter' && canSubmit) {
								handleSubmit();
							}
						}}
						disabled={!canSubmit}
						class="w-64 rounded-l-xl border-2 border-indigo-300 px-4 py-2 text-center text-xl transition-colors duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-indigo-600"
						class:bg-white={!$darkMode}
						class:bg-gray-700={$darkMode}
						class:text-gray-800={!$darkMode}
						class:text-gray-200={$darkMode}
					/>
					<button
						on:click={handleSubmit}
						disabled={!canSubmit}
						class="rounded-r-xl bg-indigo-600 px-6 py-2 text-xl font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Check
					</button>
				</div>

				{#if $gameState.feedback}
					<div
						class="mt-4 rounded-xl p-4 text-center text-xl font-semibold text-white"
						class:bg-green-500={$gameState.feedback === 'Correct!'}
						class:bg-red-500={$gameState.feedback !== 'Correct!'}
						transition:fade={{ duration: 300 }}
					>
						{$gameState.feedback}
					</div>
				{/if}
			{:else if $gameState.sessionEnded}
				<p>Session ended. Check your results!</p>
			{:else}
				<p>No current character</p>
			{/if}
		</div>
	</BaseGame>
</PageLayout>
