import type { Character } from '$lib/data/characters';
import { get } from 'svelte/store';
import { preferences } from '$lib/stores/preferencesStore';

export function getDisplayCharacter(char: Character | null): string {
    if (!char) return '';
    const prefs = get(preferences);
    if (prefs.script === 'katakana') {
        return char.katakana;
    } else if (prefs.script === 'hiragana') {
        return char.hiragana;
    } else {
        return Math.random() < 0.5 ? char.hiragana : char.katakana;
    }
}

export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
    