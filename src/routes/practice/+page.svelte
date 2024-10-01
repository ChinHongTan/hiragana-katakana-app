<script lang="ts">
    import BaseGame from '$lib/components/BaseGame.svelte';
    import GameInterface from '$lib/components/GameInterface.svelte';
    import { PracticeGameLogic } from '$lib/PracticeGameLogic';
    import PageLayout from '$lib/components/PageLayout.svelte';
	import type { GameLogic } from '$lib/GameLogic';

    const sessionLengthOptions = [10, 20, 30, 50];
    const defaultSessionLength = 20;

    let sessionLength = defaultSessionLength;
    let gameLogic: GameLogic;

    function handleStart(event: CustomEvent<{ sessionLength: number }>) {
        const { sessionLength } = event.detail;
        gameLogic = new PracticeGameLogic(sessionLength);
        gameLogic.start();
    }
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
            <GameInterface {gameLogic} />
        </div>
    </BaseGame>
</PageLayout>
