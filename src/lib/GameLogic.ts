import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import { progress } from './stores/progressStore';
import { statistics } from './stores/statisticsStore';
import { updateScore, addIncorrectAnswer, setFeedback, endSession } from './stores/gameStore';

export interface GameLogic {
	start: () => void;
	getNextQuestion: () => void;
	checkAnswer: (answer: string) => boolean;
	getCurrentCharacter: () => Character | null;
	getConsistentDisplayCharacter: (char: Character, forQuestion?: boolean) => string;
	cleanup?: () => void;
	isSessionEnded: () => boolean;
	isCorrectAnswer: (input: string, character: Character) => boolean;
	getQuestionDisplay: () => string;
	getEndScreenCharacterDisplay: (char: Character) => string;
}

export interface OptionsGameLogic extends GameLogic {
	getOptions: () => string[];
}

export abstract class BaseGameLogic implements GameLogic {
	protected currentCharacter: Character | null = null;
	protected questionDisplayCharacters: Map<Character, string> = new Map();
	protected availableCharacters: Character[] = [];
	protected currentStep: number = 0;
	protected totalSteps: number;

	constructor(totalSteps: number) {
		this.totalSteps = totalSteps;
		this.initializeAvailableCharacters();
	}

	start(): void {
		this.currentStep = 0;
		this.initializeAvailableCharacters();
		this.getNextQuestion();
	}

	getNextQuestion() {
		const randomIndex = Math.floor(Math.random() * this.availableCharacters.length);
		this.currentCharacter = this.availableCharacters[randomIndex];
	}

	checkAnswer(answer: string): boolean {
		if (!this.currentCharacter) return false;
		const correct = this.isCorrectAnswer(answer, this.currentCharacter);
		this.handleAnswer(answer, correct);

		this.currentStep++;

		if (this.isSessionEnded()) {
			setTimeout(
				() => {
					endSession();
				},
				correct ? 500 : 1500
			);
		} else {
			this.getNextQuestion();
		}

		return correct;
	}

	isCorrectAnswer(input: string, character: Character): boolean {
		const lowercaseInput = input.toLowerCase();
		return (
			lowercaseInput === character.romaji.toLowerCase() ||
			lowercaseInput === character.hiragana ||
			lowercaseInput === character.katakana
		);
	}

	getCurrentCharacter(): Character | null {
		return this.currentCharacter;
	}

	getConsistentDisplayCharacter(char: Character, forQuestion: boolean = false): string {
		if (!this.questionDisplayCharacters.has(char)) {
			this.questionDisplayCharacters.set(char, this.getDisplayCharacter(char));
		}
		return forQuestion
			? this.getWritingDisplayCharacter(char)
			: this.questionDisplayCharacters.get(char)!;
	}

	getEndScreenCharacterDisplay(char: Character): string {
		return this.getConsistentDisplayCharacter(char);
	}

	protected getDisplayCharacter(char: Character): string {
		const prefs = get(preferences);
		if (prefs.script === 'katakana') {
			return char.katakana;
		} else if (prefs.script === 'hiragana') {
			return char.hiragana;
		} else {
			return Math.random() < 0.5 ? char.hiragana : char.katakana;
		}
	}

	getQuestionDisplay(): string {
		if (!this.currentCharacter) return '';
		return this.getConsistentDisplayCharacter(this.currentCharacter);
	}

	protected getWritingDisplayCharacter(char: Character): string {
		// For writing mode questions, always return romaji
		return char.romaji;
	}

	protected initializeAvailableCharacters(): void {
		this.availableCharacters = characters.filter((char) => {
			const prefs = get(preferences);
			return (
				prefs.groups.includes(char.group) &&
				(prefs.script === 'both' ||
					(prefs.script === 'hiragana' && char.hiragana) ||
					(prefs.script === 'katakana' && char.katakana))
			);
		});
	}

	protected handleAnswer(answer: string, correct: boolean): void {
		updateScore(correct);
		if (correct) {
			setFeedback('Correct!');
			this.updateProgress(true);
		} else {
			const correctAnswer = this.getCorrectAnswerDisplay();
			setFeedback(`Incorrect. The correct answer is ${correctAnswer}`);
			addIncorrectAnswer(this.currentCharacter!, answer, correctAnswer);
			this.updateProgress(false);
		}
		this.updateStatistics(correct);
	}

	private updateProgress(correct: boolean) {
		progress.update((p) => {
			const newProgress = {
				...p,
				score: p.score + (correct ? 1 : 0),
				streak: correct ? p.streak + 1 : 0,
				longestStreak: Math.max(p.longestStreak, correct ? p.streak + 1 : p.streak),
				learned: p.learned + (correct ? 1 : 0)
			};
			console.log('Progress updated:', newProgress);
			return newProgress;
		});
	}

	private updateStatistics(correct: boolean) {
		statistics.update((s) => {
			const charStats = s.characterStats[this.currentCharacter!.romaji] || {
				attempts: 0,
				correct: 0,
				averageResponseTime: 0
			};
			const newStats = {
				...s,
				totalAttempts: s.totalAttempts + 1,
				correctAttempts: s.correctAttempts + (correct ? 1 : 0),
				incorrectAttempts: s.incorrectAttempts + (correct ? 0 : 1),
				characterStats: {
					...s.characterStats,
					[this.currentCharacter!.romaji]: {
						attempts: charStats.attempts + 1,
						correct: charStats.correct + (correct ? 1 : 0),
						averageResponseTime: charStats.averageResponseTime
					}
				}
			};
			console.log('Statistics updated:', newStats);
			return newStats;
		});
	}

	protected getCorrectAnswerDisplay(): string {
		if (!this.currentCharacter) return '';
		return this.currentCharacter.romaji;
	}

	protected moveToNextQuestion(): Character | null {
		if (this.isSessionEnded()) {
			endSession();
			return null;
		}
		this.getNextQuestion();
		return this.currentCharacter;
	}

	cleanup(): void {
		// Default implementation
	}

	isSessionEnded(): boolean {
		return this.currentStep >= this.totalSteps;
	}
}
