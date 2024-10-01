<script lang="ts">
	import { onMount } from 'svelte';
	import { progress } from '$lib/stores/progressStore';
	import { statistics } from '$lib/stores/statisticsStore';
	import { characters } from '$lib/data/characters';
	import { preferences } from '$lib/stores/preferencesStore';
	import ProgressChart from '$lib/components/ProgressChart.svelte';
	import { fade, fly, scale, draw } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';
	import { darkMode } from '$lib/stores/themeStore';
	import { getDisplayCharacter } from '$lib/utils';
	import PageLayout from '$lib/components/PageLayout.svelte';

	let mostDifficultCharacters: { romaji: string; accuracy: number }[] = [];
	let mostPracticedCharacters: { romaji: string; attempts: number }[] = [];
	let overallAccuracy = 0;

	const progressScore = spring(0);

	function calculateMostDifficultCharacters() {
		const charStats = Object.entries($statistics.characterStats)
			.map(([romaji, stats]) => ({
				romaji,
				accuracy: stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 100
			}))
			.sort((a, b) => a.accuracy - b.accuracy)
			.slice(0, 5);

		mostDifficultCharacters = charStats;
	}

	function calculateMostPracticedCharacters() {
		const charStats = Object.entries($statistics.characterStats)
			.map(([romaji, stats]) => ({
				romaji,
				attempts: stats.attempts
			}))
			.sort((a, b) => b.attempts - a.attempts)
			.slice(0, 5);

		mostPracticedCharacters = charStats;
	}

	let progressData: number[] = [];
	let progressLabels: string[] = [];

	function generateProgressData() {
		const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		progressData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50));
		progressLabels = daysOfWeek;
	}

	onMount(() => {
		const unsubscribeProgress = progress.subscribe((p) => {
			console.log('Progress subscription updated:', p);
			progressScore.set(p.score);
		});

		const unsubscribeStatistics = statistics.subscribe((s) => {
			console.log('Statistics subscription updated:', s);
			calculateMostDifficultCharacters();
			calculateMostPracticedCharacters();
			overallAccuracy = s.totalAttempts > 0 ? (s.correctAttempts / s.totalAttempts) * 100 : 0;
		});

		generateProgressData();

		return () => {
			unsubscribeProgress();
			unsubscribeStatistics();
		};
	});

	$: progressScore.set($progress.score);
	$: overallAccuracy =
		$statistics.totalAttempts > 0
			? ($statistics.correctAttempts / $statistics.totalAttempts) * 100
			: 0;
</script>

<PageLayout title="学習ダッシュボード" subtitle="Learning Dashboard">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Overall Progress Card -->
		<div
			class="hover:shadow-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800"
			in:fly={{ y: 50, duration: 800, easing: quintOut }}
		>
			<div class="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
				<h2 class="relative z-10 mb-4 text-3xl font-bold text-white">Overall Progress</h2>
				<div
					class="relative z-10 text-7xl font-extrabold text-white"
					in:scale={{ duration: 500, delay: 300 }}
				>
					{$progressScore.toFixed(0)}
				</div>
				<div class="relative z-10 mt-2 text-blue-200">Total Score</div>
				<div
					class="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-white opacity-10"
				></div>
			</div>
			<div class="space-y-6 p-8">
				{#each [{ label: 'Characters Learned', value: $progress.learned, color: 'blue' }, { label: 'Current Streak', value: $progress.streak, color: 'green' }, { label: 'Longest Streak', value: $progress.longestStreak, color: 'purple' }, { label: 'Overall Accuracy', value: `${overallAccuracy.toFixed(2)}%`, color: 'pink' }] as item}
					<div
						class="flex items-center justify-between rounded-xl p-4 shadow-md transition-colors duration-300 hover:shadow-lg"
						class:bg-gray-100={!$darkMode}
						class:hover:bg-gray-200={!$darkMode}
						class:bg-gray-700={$darkMode}
						class:hover:bg-gray-600={$darkMode}
					>
						<span
							class="text-lg font-semibold transition-colors duration-300"
							class:text-gray-700={!$darkMode}
							class:text-gray-300={$darkMode}
						>
							{item.label}
						</span>
						<span
							class="text-3xl font-bold"
							class:text-{item.color}-500={!$darkMode}
							class:text-{item.color}-400={$darkMode}
						>
							{item.value}
						</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Recent Performance Card -->
		<div
			class="hover:shadow-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800"
			in:fly={{ y: 50, duration: 800, delay: 300, easing: quintOut }}
		>
			<div class="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 p-8">
				<h2 class="relative z-10 mb-4 text-3xl font-bold text-white">Recent Performance</h2>
				<div
					class="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-white opacity-10"
				></div>
			</div>
			<div class="space-y-6 p-8">
				{#each [{ label: 'Total Attempts', value: $statistics.totalAttempts, color: 'blue' }, { label: 'Correct Answers', value: $statistics.correctAttempts, color: 'green' }, { label: 'Incorrect Answers', value: $statistics.incorrectAttempts, color: 'red' }, { label: 'Avg. Response Time', value: `${$statistics.averageResponseTime.toFixed(2)}s`, color: 'purple' }] as item}
					<div
						class="flex items-center justify-between rounded-xl p-4 shadow-md transition-colors duration-300 hover:shadow-lg"
						class:bg-gray-100={!$darkMode}
						class:hover:bg-gray-200={!$darkMode}
						class:bg-gray-700={$darkMode}
						class:hover:bg-gray-600={$darkMode}
					>
						<span
							class="text-lg font-semibold transition-colors duration-300"
							class:text-gray-700={!$darkMode}
							class:text-gray-300={$darkMode}
						>
							{item.label}
						</span>
						<span
							class="text-3xl font-bold"
							class:text-{item.color}-500={!$darkMode}
							class:text-{item.color}-400={$darkMode}
						>
							{item.value}
						</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Your Strengths Card -->
		<div
			class="hover:shadow-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800"
			in:fly={{ y: 50, duration: 800, delay: 200, easing: quintOut }}
		>
			<div class="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 p-8">
				<h2 class="relative z-10 mb-4 text-3xl font-bold text-white">Your Strengths</h2>
				<div
					class="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-white opacity-10"
				></div>
			</div>
			<div class="p-8">
				<ul class="space-y-4">
					{#each mostPracticedCharacters as char, index}
						{@const fullChar = characters.find((c) => c.romaji === char.romaji)}
						{#if fullChar}
							<li
								class="flex transform items-center justify-between rounded-xl p-4 shadow-md transition-all duration-300 hover:scale-105"
								class:bg-gray-100={!$darkMode}
								class:bg-gray-700={$darkMode}
								in:fade={{ duration: 300, delay: index * 100 }}
							>
								<div class="flex items-center">
									<span
										class="text-3xl font-bold transition-colors duration-300"
										class:text-gray-800={!$darkMode}
										class:text-gray-200={$darkMode}
									>
										[{getDisplayCharacter(fullChar)}] [{fullChar.romaji}]
									</span>
								</div>
								<span
									class="rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-800"
								>
									{char.attempts} attempts
								</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>

		<!-- Conquer These Card -->
		<div
			class="hover:shadow-3xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800"
			in:fly={{ y: 50, duration: 800, delay: 100, easing: quintOut }}
		>
			<div class="relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 p-8">
				<h2 class="relative z-10 mb-4 text-3xl font-bold text-white">Conquer These</h2>
				<div
					class="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-white opacity-10"
				></div>
			</div>
			<div class="p-8">
				<ul class="space-y-4">
					{#each mostDifficultCharacters as char, index}
						{@const fullChar = characters.find((c) => c.romaji === char.romaji)}
						{#if fullChar}
							<li
								class="flex transform items-center justify-between rounded-xl p-4 shadow-md transition-colors duration-300 hover:scale-105"
								class:bg-gray-100={!$darkMode}
								class:bg-gray-700={$darkMode}
								in:fade={{ duration: 300, delay: index * 100 }}
							>
								<div class="flex items-center">
									<span
										class="text-3xl font-bold transition-colors duration-300"
										class:text-gray-800={!$darkMode}
										class:text-gray-200={$darkMode}
									>
										[{getDisplayCharacter(fullChar)}] [{fullChar.romaji}]
									</span>
								</div>
								<div
									class="radial-progress text-red-400"
									style="--value:{char.accuracy}; --size:3rem; --thickness: 3px;"
								>
									<span class="text-sm font-medium">{char.accuracy.toFixed(0)}%</span>
								</div>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Learning Orbit Card -->
	<div
		class="hover:shadow-3xl mt-8 transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-105 dark:bg-gray-800"
		in:fly={{ y: 50, duration: 800, delay: 400, easing: quintOut }}
	>
		<div class="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 p-8">
			<h2 class="relative z-10 mb-4 text-3xl font-bold text-white">Your Learning Orbit</h2>
			<div
				class="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 transform rounded-full bg-white opacity-10"
			></div>
		</div>
		<div class="p-8">
			<ProgressChart data={progressData} labels={progressLabels} />
		</div>
	</div>
</PageLayout>

<style>
	.shadow-3xl {
		box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.5);
	}

	.radial-progress {
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		width: 3rem;
		height: 3rem;
	}

	.radial-progress::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: conic-gradient(currentColor calc(var(--value) * 1%), transparent 0);
		mask: radial-gradient(farthest-side, transparent calc(100% - var(--thickness)), #fff 0);
	}
</style>
