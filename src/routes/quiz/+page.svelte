<script lang="ts">
	import BaseGame from '$lib/components/BaseGame.svelte';
	import GameInterface from '$lib/components/GameInterface.svelte';
	import { QuizGameLogic } from '$lib/QuizGameLogic';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import type { GameLogic } from '$lib/GameLogic';

	const sessionLengthOptions = [5, 10, 15, 20];
	const defaultSessionLength = 10;
	let gameLogic: GameLogic;

	function handleStart(event: CustomEvent<{ sessionLength: number }>) {
		const { sessionLength } = event.detail;
		gameLogic = new QuizGameLogic(sessionLength);
		gameLogic.start();
	}
</script>

<PageLayout title="文字クイズ" subtitle="Character Quiz">
	<BaseGame
		title="文字クイズ"
		subtitle="Character Quiz"
		{sessionLengthOptions}
		{defaultSessionLength}
		{gameLogic}
		on:start={handleStart}
	>
		<div slot="game-content">
			<GameInterface {gameLogic} />
		</div>
	</BaseGame>
</PageLayout>
