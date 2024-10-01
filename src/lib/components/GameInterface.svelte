<script lang="ts">
    import { fade } from 'svelte/transition';
    import { darkMode } from '$lib/stores/themeStore';
    import { gameState } from '$lib/stores/gameStore';
    import type { Character } from '$lib/data/characters';
    import type { GameLogic, OptionsGameLogic } from '$lib/GameLogic';
    import type { WritingGameLogic } from '$lib/WritingGameLogic';

    export let gameLogic: GameLogic;
    export let inputType: 'text' | 'options' = 'text';
    export let options: string[] = [];

    let userAnswer = '';
    let currentCharacter: Character | null = null;
    let canSubmit = true;
    let selectedOption: string | null = null;
    let isCorrectAnswer: boolean | null = null;
    let correctAnswer: string | null = null;

    function handleSubmit() {
        if (!canSubmit) return;
        const correct = gameLogic.checkAnswer(userAnswer);
        userAnswer = '';
        canSubmit = false;

        setTimeout(() => {
            if (!$gameState.sessionEnded) {
                updateCurrentCharacter();
                canSubmit = true;
            }
        }, correct ? 500 : 1500);
    }

    function updateCurrentCharacter() {
        currentCharacter = gameLogic.getCurrentCharacter();
        if (inputType === 'options') {
            options = (gameLogic as OptionsGameLogic).getOptions();
        }
        if ('isWritingGameLogic' in gameLogic) {
            correctAnswer = (gameLogic as WritingGameLogic).getCorrectAnswer();
        }
    }

    function handleOptionSelect(option: string) {
        if (!canSubmit) return;
        selectedOption = option;
        
        if ('isWritingGameLogic' in gameLogic) {
            correctAnswer = (gameLogic as WritingGameLogic).getCorrectAnswer();
        }
        
        const correct = gameLogic.checkAnswer(option);
        isCorrectAnswer = correct;
        canSubmit = false;

        setTimeout(() => {
            canSubmit = true;
            updateCurrentCharacter();
            selectedOption = null;
            isCorrectAnswer = null;
            correctAnswer = null;
        }, correct ? 500 : 1500);
    }

    updateCurrentCharacter();

    $: questionText = currentCharacter ? gameLogic.getQuestionDisplay() : '';
    $: isSessionActive = currentCharacter && !$gameState.sessionEnded;
</script>

{#if isSessionActive}
    <div class="mb-8 text-center" in:fade>
        <p class="text-5xl font-bold transition-colors duration-300"
           class:text-indigo-600={!$darkMode}
           class:text-indigo-400={$darkMode}>
            {questionText}
        </p>
    </div>

    {#if inputType === 'text'}
        <div class="mb-6 flex justify-center">
            <input
                type="text"
                bind:value={userAnswer}
                placeholder="Enter romaji"
                on:keydown={(e) => e.key === 'Enter' && canSubmit && handleSubmit()}
                disabled={!canSubmit}
                class="w-64 px-4 py-2 text-xl text-center border-2 border-indigo-300 dark:border-indigo-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
                class:bg-white={!$darkMode}
                class:bg-gray-700={$darkMode}
                class:text-gray-800={!$darkMode}
                class:text-gray-200={$darkMode}
            />
            <button 
                on:click={handleSubmit}
                disabled={!canSubmit}
                class="px-6 py-2 bg-indigo-600 text-white text-xl font-semibold rounded-r-xl hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit
            </button>
        </div>
    {:else if inputType === 'options'}
        <div class="grid grid-cols-2 gap-6 mb-8">
            {#each options as option}
                <button
                    on:click={() => handleOptionSelect(option)}
                    class="py-6 rounded-xl text-4xl font-bold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 text-white"
                    class:bg-blue-500={selectedOption === null || (selectedOption !== option && correctAnswer !== option)}
                    class:bg-green-500={(selectedOption === option && isCorrectAnswer) || (correctAnswer === option && selectedOption !== null && !isCorrectAnswer)}
                    class:bg-red-500={selectedOption === option && !isCorrectAnswer}
                    disabled={!canSubmit}
                >
                    {option}
                </button>
            {/each}
        </div>
    {/if}

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
{:else}
    <p>Loading...</p>
{/if}
