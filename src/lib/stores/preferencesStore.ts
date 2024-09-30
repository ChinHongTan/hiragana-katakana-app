import { writable } from 'svelte/store';

interface Preferences {
	script: 'hiragana' | 'katakana' | 'both';
	groups: string[];
}

const defaultPreferences: Preferences = {
	script: 'both',
	groups: [
		'vowels',
		'k',
		'g',
		's',
		'z',
		't',
		'd',
		'n',
		'h',
		'b',
		'p',
		'm',
		'y',
		'r',
		'w',
		'k-compounds',
		'g-compounds',
		's-compounds',
		'j-compounds',
		't-compounds',
		'n-compounds',
		'h-compounds',
		'b-compounds',
		'p-compounds',
		'm-compounds',
		'r-compounds'
	]
};

export const preferences = writable(defaultPreferences);
