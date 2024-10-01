<script lang="ts">
    import { onDestroy } from 'svelte';
    import BaseGame from '$lib/components/BaseGame.svelte';
    import GameInterface from '$lib/components/GameInterface.svelte';
    import { TimedChallengeGameLogic } from '$lib/TimedChallengeGameLogic';
    import PageLayout from '$lib/components/PageLayout.svelte';
	import type { GameLogic } from '$lib/GameLogic';

    let timeLeft = 0;
    let gameLogic: GameLogic;
    const sessionLengthOptions = [30, 60, 90, 120];
    const defaultSessionLength = 60;

    function handleStart(event: CustomEvent<{ sessionLength: number }>) {
        const { sessionLength } = event.detail;
        gameLogic = new TimedChallengeGameLogic((time) => timeLeft = time, sessionLength);
        gameLogic.start();
    }

    onDestroy(() => {
        gameLogic.cleanup?.();
    });
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
            <div class="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4 text-center">Time Left: {timeLeft}s</div>
            <GameInterface {gameLogic} />
        </div>
    </BaseGame>
</PageLayout>
