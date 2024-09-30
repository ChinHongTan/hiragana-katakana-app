<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Character } from '$lib/data/characters';
  import { preferences } from '$lib/stores/preferencesStore';

  export let character: Character | null | undefined;
  export let showRomaji = false;

  function getDisplayCharacter(char: Character) {
    if ($preferences.script === 'katakana') {
      return char.katakana;
    } else if ($preferences.script === 'hiragana') {
      return char.hiragana;
    } else {
      // When set to 'both', randomly choose between hiragana and katakana
      return Math.random() < 0.5 ? char.hiragana : char.katakana;
    }
  }

  $: displayChar = character ? getDisplayCharacter(character) : '';
</script>

<div class="text-center">
  {#if character}
      <span class="text-6xl" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
          {displayChar}
      </span>
      {#if showRomaji}
          <p class="mt-2" in:fade={{ duration: 300 }}>
              {character.romaji}
          </p>
      {/if}
  {:else}
      <span class="text-6xl">Loading...</span>
  {/if}
</div>
