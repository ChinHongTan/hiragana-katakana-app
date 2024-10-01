<script lang="ts">
    import BaseGame from '$lib/components/BaseGame.svelte';
    import GameInterface from '$lib/components/GameInterface.svelte';
    import { WritingGameLogic } from '$lib/WritingGameLogic';
    import PageLayout from '$lib/components/PageLayout.svelte';
    import type { OptionsGameLogic } from '$lib/GameLogic';

    let gameLogic: OptionsGameLogic;
    const sessionLengthOptions = [10, 20, 30, 50];
    const defaultSessionLength = 20;

    $: options = gameLogic ? gameLogic.getOptions() : [];

    function handleStart(event: CustomEvent<{ sessionLength: number }>) {
        const { sessionLength } = event.detail;
        gameLogic = new WritingGameLogic(sessionLength);
        gameLogic.start();
    }

    let gameInterface: GameInterface;
</script>

<PageLayout title="書き取り練習" subtitle="Writing Practice">
    <BaseGame
        title="書き取り練習"
        subtitle="Writing Practice"
        {sessionLengthOptions}
        {defaultSessionLength}
        {gameLogic}
        on:start={handleStart}
    >
        <div slot="game-content">
            <GameInterface bind:this={gameInterface} {gameLogic} inputType="options" {options} />
        </div>
    </BaseGame>
</PageLayout>
