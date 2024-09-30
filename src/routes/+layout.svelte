<script lang="ts">
    import '../app.css';
    import '$lib/styles/hover-effects.css';
    import { darkMode } from '$lib/stores/themeStore';
    import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { navigating } from '$app/stores';
    import { fade } from 'svelte/transition';
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    $: spinnerColor = $darkMode ? '#FFFFFF' : '#4285F4'; // Google Blue
</script>

<div class={$darkMode ? 'dark' : ''}>
    <div class="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
        <nav class="p-4 flex justify-end">
            <DarkModeToggle />
        </nav>
        {#key data.url}
            <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
                <slot></slot>
            </div>
        {/key}
    </div>
</div>

{#if $navigating}
    <LoadingSpinner size={50} maxSegmentPercentage={75} />
{/if}
