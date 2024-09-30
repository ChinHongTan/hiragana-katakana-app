import { writable } from 'svelte/store';

interface Statistics {
	totalAttempts: number;
	correctAttempts: number;
	incorrectAttempts: number;
	averageResponseTime: number;
	characterStats: Record<
		string,
		{
			attempts: number;
			correct: number;
			averageResponseTime: number;
		}
	>;
}

const defaultStats: Statistics = {
	totalAttempts: 0,
	correctAttempts: 0,
	incorrectAttempts: 0,
	averageResponseTime: 0,
	characterStats: {}
};

export const statistics = writable(defaultStats);
