<script lang="ts">
    import { getDisplayCharacter } from '$lib/utils';
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { gameState, startSession, endSession, resetGameState } from '$lib/stores/gameStore';
    import SessionSetup from './SessionSetup.svelte';
    import SessionProgress from './SessionProgress.svelte';
    import SessionResults from './SessionResults.svelte';
    import { goto } from '$app/navigation';
    import type { GameLogic } from '$lib/GameLogic';

    export let title: string;
    export let subtitle: string;
    export let sessionLengthOptions: number[];
    export let defaultSessionLength: number;
    export let gameLogic: GameLogic;

    let sessionLength = defaultSessionLength;
    let currentCharacter: ReturnType<typeof gameLogic.getCurrentCharacter> = null;

    const dispatch = createEventDispatcher();

    function startNewSession() {
        console.log('startNewSession called');
        resetGameState();
        startSession(sessionLength);
        dispatch('start');
        console.log('Game state after starting new session:', $gameState);
    }

    function goToHome() {
        goto('/');
    }

    function setSessionLength(length: number) {
        sessionLength = length;
    }

    function updateCurrentCharacter() {
        currentCharacter = gameLogic.getCurrentCharacter();
    }

    onMount(() => {
        console.log('BaseGame component mounted');
        return () => {
            console.log('BaseGame component unmounted');
            resetGameState();
        };
    });

    onDestroy(() => {
        if (typeof gameLogic.cleanup === 'function') {
            gameLogic.cleanup();
        }
    });

    $: console.log('Current game state in BaseGame:', $gameState);
</script>

<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden p-8 transition-colors duration-300">
    {#if !$gameState.isSessionStarted}
        <SessionSetup 
            sessionLengthOptions={sessionLengthOptions}
            selectedLength={sessionLength}
            onLengthSelect={setSessionLength}
            onStart={startNewSession}
            {title}
            description={subtitle}
        />
    {:else if !$gameState.sessionEnded}
        <SessionProgress 
            currentStep={$gameState.currentStep}
            totalSteps={$gameState.totalSteps}
            score={$gameState.score}
            streak={$gameState.streak}
        />
        <slot name="game-content" {currentCharacter} {updateCurrentCharacter}></slot>
    {:else}
        <SessionResults 
            score={$gameState.score}
            totalQuestions={$gameState.totalSteps}
            incorrectAnswers={$gameState.incorrectAnswers}
            onNewSession={() => resetGameState()}
            onGoHome={goToHome}
            getDisplayCharacter={(char) => gameLogic.getConsistentDisplayCharacter(char)}
        />
    {/if}
</div>
