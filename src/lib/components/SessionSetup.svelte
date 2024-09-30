<script lang="ts">
    import { fade } from 'svelte/transition';
    import { darkMode } from '$lib/stores/themeStore';

    export let sessionLengthOptions: number[];
    export let selectedLength: number;
    export let onLengthSelect: (length: number) => void;
    export let onStart: () => void;
    export let title: string;
    export let description: string;
</script>

<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden p-8 text-center transition-colors duration-300" in:fade>
    <h2 class="text-3xl font-semibold mb-8 transition-colors duration-300"
        class:text-indigo-800={!$darkMode}
        class:text-indigo-300={$darkMode}>
        {title}
    </h2>
    <div class="grid grid-cols-2 gap-6 mb-8">
        {#each sessionLengthOptions as length}
            <button
                on:click={() => onLengthSelect(length)}
                class="py-6 rounded-xl text-2xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2"
                class:bg-indigo-600={selectedLength === length}
                class:text-white={selectedLength === length}
                class:bg-gray-200={selectedLength !== length && !$darkMode}
                class:bg-gray-700={selectedLength !== length && $darkMode}
                class:text-gray-800={selectedLength !== length && !$darkMode}
                class:text-gray-200={selectedLength !== length && $darkMode}
            >
                {length} Questions
            </button>
        {/each}
    </div>
    <button
        on:click={onStart}
        class="w-full py-4 bg-green-500 text-white rounded-xl text-2xl font-semibold hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
    >
        Start Session
    </button>
</div>
<div class="mt-6 text-center transition-colors duration-300"
     class:text-gray-600={!$darkMode}
     class:text-gray-400={$darkMode}>
    <p>{description}</p>
</div>
