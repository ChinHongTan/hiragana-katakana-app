<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import BaseGame from '$lib/components/BaseGame.svelte';
	import { TimedChallengeGameLogic } from '$lib/TimedChallengeGameLogic';
	import { gameState } from '$lib/stores/gameStore';
	import CharacterDisplay from '$lib/components/CharacterDisplay.svelte';
	import { fade } from 'svelte/transition';
	import { darkMode } from '$lib/stores/themeStore';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import type { Character } from '$lib/data/characters';

	let timeLeft = 0;
	const gameLogic = new TimedChallengeGameLogic((time) => (timeLeft = time));
	let userAnswer = '';
	let currentCharacter: Character | null = null;
	let canSubmit = true;

	const sessionLengthOptions = [30, 60, 90, 120];
	const defaultSessionLength = 60;

	function handleSubmit() {
		if (!canSubmit) return;
		console.log('handleSubmit called');
		const correct = gameLogic.checkAnswer(userAnswer);
		userAnswer = '';
		canSubmit = false;

		setTimeout(
			() => {
				updateCurrentCharacter();
				canSubmit = true;
			},
			correct ? 500 : 1500
		);
	}

	function handleStart() {
		console.log('handleStart called');
		gameLogic.start();
		updateCurrentCharacter();
	}

	function updateCurrentCharacter() {
		currentCharacter = gameLogic.getCurrentCharacter();
		console.log('Updated currentCharacter:', currentCharacter);
	}

	onMount(() => {
		console.log('Timed Challenge component mounted');
	});

	onDestroy(() => {
		gameLogic.cleanup();
	});

	$: console.log('Current character in component:', currentCharacter);
	$: console.log('Current game state:', $gameState);
</script>

<PageLayout title="時間制チャレンジ" subtitle="Timed Challenge">
	<BaseGame
		title="時間制チャレンジ"
		subtitle="Timed Challenge"
		{sessionLengthOptions}
		{defaultSessionLength}
		{gameLogic}
		on:start={handleStart}
	>
		<div slot="game-content">
			<div class="mb-4 text-center text-2xl font-semibold text-red-600 dark:text-red-400">
				Time Left: {timeLeft}s
			</div>

			{#if currentCharacter && !$gameState.sessionEnded}
				<div class="mb-8 text-center" in:fade>
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
						Submit
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
