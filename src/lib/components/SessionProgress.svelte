<script lang="ts">
    import { darkMode } from '$lib/stores/themeStore';

    export let currentStep: number;
    export let totalSteps: number;
    export let score: number;
    export let streak: number;
</script>

<div class="mb-6 flex justify-between items-center">
    <span class="text-2xl font-semibold transition-colors duration-300"
          class:text-indigo-800={!$darkMode}
          class:text-indigo-300={$darkMode}>
        Score: {score} / {currentStep}
    </span>
    <span class="text-2xl font-semibold text-green-600 dark:text-green-400">Streak: {streak}</span>
    <span class="text-2xl font-semibold transition-colors duration-300"
          class:text-purple-600={!$darkMode}
          class:text-purple-400={$darkMode}>
        Progress: {currentStep} / {totalSteps}
    </span>
</div>

<div class="mb-8 h-3 rounded-full bg-gray-200 dark:bg-gray-700">
    <div
        class="h-3 rounded-full bg-indigo-600 transition-all duration-300 ease-in-out"
        style="width: {(currentStep / totalSteps) * 100}%"
    ></div>
</div>
