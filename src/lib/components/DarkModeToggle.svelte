<script lang="ts">
    import { darkMode } from '$lib/stores/themeStore';
    import { fly } from 'svelte/transition';

    function toggleDarkMode() {
        darkMode.update((mode) => !mode);
    }
</script>

<button
    on:click={toggleDarkMode}
    class="relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    class:bg-indigo-600={$darkMode}
    class:bg-gray-200={!$darkMode}
>
    <span
        class="absolute left-0 inline-flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 transform"
        class:translate-x-6={$darkMode}
        class:bg-white={$darkMode}
        class:bg-indigo-600={!$darkMode}
    >
        {#if $darkMode}
            <span in:fly={{ y: 10, duration: 300 }}>🌙</span>
        {:else}
            <span in:fly={{ y: -10, duration: 300 }}>☀️</span>
        {/if}
    </span>
</button>
