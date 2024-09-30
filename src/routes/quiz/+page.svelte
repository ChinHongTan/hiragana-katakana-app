<script lang="ts">
    import { onMount } from 'svelte';
    import BaseGame from '$lib/components/BaseGame.svelte';
    import { QuizGameLogic } from '$lib/QuizGameLogic';
    import { gameState } from '$lib/stores/gameStore';
    import { fade } from 'svelte/transition';
    import { darkMode } from '$lib/stores/themeStore';
    import PageLayout from '$lib/components/PageLayout.svelte';
    import type { Character } from '$lib/data/characters';

    const gameLogic = new QuizGameLogic();
    let userAnswer = '';
    let inputElement: HTMLInputElement;
    let currentCharacter: Character | null = null;
    let canSubmit = true;

    const sessionLengthOptions = [5, 10, 15, 20];
    const defaultSessionLength = 10;

    function handleSubmit() {
        if (!canSubmit) return;
        console.log('handleSubmit called');
        gameLogic.checkAnswer(userAnswer);
        userAnswer = '';
        canSubmit = false;

        setTimeout(() => {
            updateCurrentCharacter();
            canSubmit = true;
        }, 1500);
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
        console.log('Quiz component mounted');
        inputElement?.focus();
    });

    $: console.log('Current character in component:', currentCharacter);
    $: console.log('Current game state:', $gameState);
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
        {#if currentCharacter && !$gameState.sessionEnded}
            <div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
                <p class="mb-4 text-2xl text-center transition-colors duration-300"
                   class:text-gray-700={!$darkMode}
                   class:text-gray-300={$darkMode}>
                    What's the romaji for this character?
                </p>
                <p class="mb-8 text-8xl text-center font-bold transition-colors duration-300"
                   class:text-indigo-600={!$darkMode}
                   class:text-indigo-400={$darkMode}>
                   {gameLogic.getConsistentDisplayCharacter(currentCharacter)}
                </p>
                <form on:submit|preventDefault={handleSubmit} class="flex justify-center items-center mb-8">
                    <input
                        bind:this={inputElement}
                        type="text"
                        bind:value={userAnswer}
                        placeholder="Enter romaji"
                        disabled={!canSubmit}
                        class="w-64 px-4 text-xl text-center border-2 border-indigo-300 dark:border-indigo-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
                        class:bg-white={!$darkMode}
                        class:bg-gray-700={$darkMode}
                        class:text-gray-800={!$darkMode}
                        class:text-gray-200={$darkMode}
                        style="height: 48px;"
                    />
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        class="px-6 bg-indigo-600 text-white text-xl font-semibold rounded-r-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style="height: 48px;"
                    >
                        Submit
                    </button>
                </form>
                <div class="text-center transition-colors duration-300"
                     class:text-gray-600={!$darkMode}
                     class:text-gray-400={$darkMode}>
                    Question {$gameState.currentStep} of {$gameState.totalSteps}
                </div>
                
                {#if $gameState.feedback}
                    <div 
                        class="mt-4 rounded-xl p-4 text-white text-center text-xl font-semibold" 
                        class:bg-green-500={$gameState.feedback === 'Correct!'}
                        class:bg-red-500={$gameState.feedback !== 'Correct!'}
                        transition:fade={{ duration: 300 }}
                    >
                        {$gameState.feedback}
                    </div>
                {/if}
            </div>
        {:else if $gameState.sessionEnded}
            <p>Session ended. Check your results!</p>
        {:else}
            <p>No current character</p>
        {/if}
    </div>
</BaseGame>
</PageLayout>
