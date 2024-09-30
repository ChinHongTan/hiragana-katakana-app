export interface Achievement {
	id: string;
	name: string;
	description: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	condition: (progress: any) => boolean;
}

export const achievements: Achievement[] = [
	{
		id: 'first_correct',
		name: 'First Steps',
		description: 'Get your first correct answer',
		condition: (progress) => progress.score >= 10
	},
	{
		id: 'ten_streak',
		name: 'On a Roll',
		description: 'Achieve a 10 character streak',
		condition: (progress) => progress.longestStreak >= 10
	},
	{
		id: 'fifty_learned',
		name: 'Halfway There',
		description: 'Learn 50 characters',
		condition: (progress) => progress.learned >= 50
	},
	{
		id: 'hundred_learned',
		name: 'Almost There',
		description: 'Learn 100 characters',
		condition: (progress) => progress.learned >= 100
	},
	{
		id: 'all_learned',
		name: 'Master',
		description: 'Learn all characters',
		condition: (progress) => progress
	}
];
