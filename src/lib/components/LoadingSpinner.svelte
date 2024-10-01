<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let size = 40;
	export let maxSegmentPercentage = 75; // Max width of the segment as a percentage of the circle

	let color: string;
	let colorIndex = 0;

	const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google colors

	function nextColor() {
		colorIndex = (colorIndex + 1) % colors.length;
		color = colors[colorIndex];
	}

	onMount(() => {
		color = colors[0];
	});

	$: maxDash = (maxSegmentPercentage / 100) * 283;
	$: minDash = 283 - maxDash;

	let rotations = 0;
	function handleRotation() {
		rotations++;
		if (rotations % 4 === 0) {
			nextColor();
		}
	}
</script>

<div
	class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75"
	transition:fade={{ duration: 200 }}
>
	<div
		class="google-spinner"
		style="--spinner-size: {size}px; --spinner-color: {color}; --max-dash: {maxDash}; --min-dash: {minDash};"
	>
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<circle cx="50" cy="50" r="45" />
		</svg>
	</div>
</div>

<svelte:window on:animationiteration={handleRotation} />

<style>
	.google-spinner {
		width: var(--spinner-size);
		height: var(--spinner-size);
		animation: rotate 0.8s linear infinite;
	}

	.google-spinner svg {
		width: 100%;
		height: 100%;
	}

	.google-spinner circle {
		fill: none;
		stroke: var(--spinner-color);
		stroke-width: 10;
		stroke-linecap: round;
		animation: dash 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1 283;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: var(--max-dash) var(--min-dash);
			stroke-dashoffset: -70.75;
		}
		100% {
			stroke-dasharray: 1 283;
			stroke-dashoffset: -283;
		}
	}
</style>
