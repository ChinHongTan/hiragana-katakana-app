<script lang="ts">
	import { darkMode } from '$lib/stores/themeStore';
	export let title: string;
	export let subtitle: string;
</script>

<div
	class="min-h-screen px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8"
	class:bg-gradient-to-br={!$darkMode}
	class:from-indigo-100={!$darkMode}
	class:to-purple-100={!$darkMode}
	class:bg-gray-900={$darkMode}
>
	<div class="mx-auto max-w-4xl">
		<h1
			class="mb-12 text-center text-6xl font-extrabold transition-colors duration-300"
			class:text-indigo-800={!$darkMode}
			class:text-indigo-300={$darkMode}
		>
			{title}
			<span
				class="mt-2 block text-2xl font-normal transition-colors duration-300"
				class:text-indigo-600={!$darkMode}
				class:text-indigo-400={$darkMode}
			>
				{subtitle}
			</span>
		</h1>

		<slot></slot>
	</div>
</div>
