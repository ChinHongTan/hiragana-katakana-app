<script lang="ts">
    import { preferences } from '$lib/stores/preferencesStore';
    import { characters } from '$lib/data/characters';
    import { fade, fly } from 'svelte/transition';
    import { spring } from 'svelte/motion';
    import { quintOut } from 'svelte/easing';
    import { darkMode } from '$lib/stores/themeStore';
    import { getDisplayCharacter } from '$lib/utils';
	import PageLayout from '$lib/components/PageLayout.svelte';

    let groups = Array.from(new Set(characters.map((char) => char.group)));

    function toggleGroup(group: string) {
        $preferences.groups = $preferences.groups.includes(group)
            ? $preferences.groups.filter((g) => g !== group)
            : [...$preferences.groups, group];
    }

    let hoverGroup = '';
    const groupSpring = spring({ x: 0, y: 0 }, {
        stiffness: 0.1,
        damping: 0.7
    });

    function handleMousemove(event: MouseEvent) {
        groupSpring.set({
            x: event.clientX,
            y: event.clientY
        });
    }

    function setScript(script: string) {
        if (script === 'hiragana' || script === 'katakana' || script === 'both') {
            $preferences.script = script;
        }
    }
</script>

<PageLayout title="学習設定" subtitle="Learning Settings">
        <div class="rounded-3xl shadow-2xl overflow-hidden p-8 transition-colors duration-300"
             class:bg-white={!$darkMode}
             class:bg-gray-800={$darkMode}>
            <!-- Script Selection -->
            <div class="mb-12" in:fade={{ duration: 800, delay: 200 }}>
                <h2 class="text-3xl font-bold mb-6 transition-colors duration-300"
                    class:text-indigo-800={!$darkMode}
                    class:text-indigo-300={$darkMode}>
                    Script Selection
                </h2>
                <div class="flex justify-center space-x-4">
                    {#each ['hiragana', 'katakana', 'both'] as script}
                        <button
                            class="px-6 py-3 rounded-full text-xl font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2"
                            class:bg-indigo-600={$preferences.script === script}
                            class:text-white={$preferences.script === script}
                            class:bg-gray-200={$preferences.script !== script && !$darkMode}
                            class:bg-gray-700={$preferences.script !== script && $darkMode}
                            class:text-gray-800={$preferences.script !== script && !$darkMode}
                            class:text-gray-200={$preferences.script !== script && $darkMode}
                            on:click={() => setScript(script)}
                        >
                            {script.charAt(0).toUpperCase() + script.slice(1)}
                        </button>
                    {/each}
                </div>                
            </div>

            <!-- Character Groups -->
            <div in:fade={{ duration: 800, delay: 400 }}>
                <h2 class="text-3xl font-bold mb-6 transition-colors duration-300"
                    class:text-indigo-800={!$darkMode}
                    class:text-indigo-300={$darkMode}>
                    Character Groups
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4" on:mousemove={handleMousemove} role="presentation">
                    {#each groups as group}
                        <button
                            class="p-4 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105"
                            class:bg-indigo-600={$preferences.groups.includes(group)}
                            class:text-white={$preferences.groups.includes(group)}
                            class:bg-gray-200={!$preferences.groups.includes(group) && !$darkMode}
                            class:bg-gray-700={!$preferences.groups.includes(group) && $darkMode}
                            class:text-gray-800={!$preferences.groups.includes(group) && !$darkMode}
                            class:text-gray-200={!$preferences.groups.includes(group) && $darkMode}
                            on:click={() => toggleGroup(group)}
                            on:mouseenter={() => hoverGroup = group}
                            on:mouseleave={() => hoverGroup = ''}
                        >
                            {group}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Floating Character -->
        {#if hoverGroup}
            <div
                class="fixed text-6xl pointer-events-none transition-colors duration-300"
                class:text-indigo-400={!$darkMode}
                class:text-indigo-300={$darkMode}
                style="left: {$groupSpring.x}px; top: {$groupSpring.y}px; transform: translate(-50%, -50%);"
            >
                {getDisplayCharacter(characters.find(char => char.group === hoverGroup) || characters[0])}
            </div>
        {/if}
    </PageLayout>