<script lang="ts">
    import { achievements } from '$lib/achievements';
    import { progress } from '$lib/stores/progressStore';
    import { darkMode } from '$lib/stores/themeStore';
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';

    $: unlockedAchievements = achievements.filter((achievement) => achievement.condition($progress));
</script>

<div class="mt-4 w-full">
    <h2 class="mb-4 text-2xl font-bold transition-colors duration-300"
        class:text-indigo-800={!$darkMode}
        class:text-indigo-300={$darkMode}>
        Achievements
    </h2>
    {#if unlockedAchievements.length > 0}
        <div class="space-y-4">
            {#each unlockedAchievements as achievement (achievement.id)}
                <div
                    class="card-hover rounded-xl p-4 transition-all duration-300"
                    class:bg-yellow-100={!$darkMode}
                    class:border-yellow-300={!$darkMode}
                    class:bg-yellow-900={$darkMode}
                    class:border-yellow-700={$darkMode}
                    class:text-yellow-900={!$darkMode}
                    class:text-yellow-100={$darkMode}
                    animate:flip={{ duration: 300 }}
                    in:fly={{ y: 20, duration: 300 }}
                    out:fade={{ duration: 300 }}
                >
                    <h3 class="font-bold text-lg mb-2">{achievement.name}</h3>
                    <p class="text-sm opacity-80">{achievement.description}</p>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center italic transition-colors duration-300"
           class:text-gray-600={!$darkMode}
           class:text-gray-400={$darkMode}>
            No achievements unlocked yet. Keep practicing!
        </p>
    {/if}
</div>
