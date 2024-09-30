<script lang="ts">
    import BaseGame from '$lib/components/BaseGame.svelte';
    import { WritingGameLogic } from '$lib/WritingGameLogic';
    import { gameState } from '$lib/stores/gameStore';
    import { fade } from 'svelte/transition';
    import { darkMode } from '$lib/stores/themeStore';
    import { preferences } from '$lib/stores/preferencesStore';
    import PageLayout from '$lib/components/PageLayout.svelte';
    import { onMount } from 'svelte';
    import { getDisplayCharacter } from '$lib/utils';
	import type { Character } from '$lib/data/characters';

    console.log('writing/+page.svelte script block executed');

    let gameLogic = new WritingGameLogic();
    let selected: string | null = null;
    let answerChecked = false;
    let currentCharacter: Character | null = null;
    let currentOptions: string[] = [];

    const sessionLengthOptions = [10, 20, 30, 50];
    const defaultSessionLength = 20;

    let correctAnswer: string | null = null;

    function handleSelection(option: string) {
        if (answerChecked) return;
        selected = option;
        answerChecked = true;
        const correct = gameLogic.checkAnswer(option);
        correctAnswer = gameLogic.getCorrectAnswer();
        
        setTimeout(() => {
            if (!$gameState.sessionEnded) {
                selected = null;
                answerChecked = false;
                correctAnswer = null;
                updateCurrentCharacterAndOptions();
            }
        }, correct ? 500 : 1500);
    }

    function handleStart() {
        console.log('handleStart called');
        gameLogic.start();
        updateCurrentCharacterAndOptions();
    }

    function updateCurrentCharacterAndOptions() {
        gameLogic.moveToNextQuestion();
        currentCharacter = gameLogic.getCurrentCharacter();
        currentOptions = gameLogic.getOptions() || [];
        console.log('Updated currentCharacter:', currentCharacter);
        console.log('Updated currentOptions:', currentOptions);
    }


    onMount(() => {
        console.log('Component mounted');
    });

    $: console.log('Current character in component:', currentCharacter);
    $: console.log('Current options in component:', currentOptions);
    $: console.log('Current game state:', $gameState);
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
        {#if currentCharacter && !$gameState.sessionEnded}
            <div class="mb-8 text-center" in:fade>
                <p class="text-2xl mb-4 transition-colors duration-300"
                class:text-indigo-800={!$darkMode}
                class:text-indigo-300={$darkMode}>
                    Select the correct {$preferences.script} character for:
                </p>
                <p class="text-5xl font-bold transition-colors duration-300"
                class:text-indigo-600={!$darkMode}
                class:text-indigo-400={$darkMode}>
                    {currentCharacter ? currentCharacter.romaji : ''}
                </p>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-8">
                {#each currentOptions as option}
                    <button
                        on:click={() => handleSelection(option)}
                        class="py-6 rounded-xl text-4xl font-bold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 text-white"
                        class:bg-blue-500={!answerChecked || (answerChecked && option !== selected && option !== correctAnswer)}
                        class:bg-green-500={answerChecked && option === correctAnswer}
                        class:bg-red-500={answerChecked && option === selected && option !== correctAnswer}
                        disabled={answerChecked}
                        transition:fade={{ duration: 200 }}
                    >
                        {option}
                    </button>
                {/each}
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
        {:else if $gameState.sessionEnded}
            <p>Session ended. Check your results!</p>
        {/if}
    </div>
</BaseGame>
</PageLayout>
