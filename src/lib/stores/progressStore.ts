import { writable } from 'svelte/store';

export const progress = writable({
	learned: 0,
	total: 0,
	score: 0,
	streak: 0,
	longestStreak: 0
});
