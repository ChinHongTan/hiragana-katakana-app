<script lang="ts">
    import { darkMode } from '$lib/stores/themeStore';
    export let title: string;
    export let subtitle: string;
</script>

<div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
     class:bg-gradient-to-br={!$darkMode} 
     class:from-indigo-100={!$darkMode} 
     class:to-purple-100={!$darkMode}
     class:bg-gray-900={$darkMode}>
    <div class="max-w-4xl mx-auto">
        <h1 class="text-6xl font-extrabold text-center mb-12 transition-colors duration-300" 
            class:text-indigo-800={!$darkMode}
            class:text-indigo-300={$darkMode}>
            {title}
            <span class="block text-2xl font-normal mt-2 transition-colors duration-300"
                  class:text-indigo-600={!$darkMode}
                  class:text-indigo-400={$darkMode}>
                {subtitle}
            </span>
        </h1>
        
        <slot></slot>
    </div>
</div>
