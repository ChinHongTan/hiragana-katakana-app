import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import {
	updateScore,
	addIncorrectAnswer,
	setFeedback,
	gameState,
	endSession
} from './stores/gameStore';

export interface GameLogic {
	start: () => void;
	getNextQuestion: () => void;
	checkAnswer: (answer: string) => boolean;
	getCurrentCharacter: () => Character | null;
	getOptions?: () => string[];
	cleanup?: () => void;
	getConsistentDisplayCharacter: (char: Character) => string;
}

export abstract class BaseGameLogic implements GameLogic {
	protected currentCharacter: Character | null = null;
	protected questionDisplayCharacters: Map<Character, string> = new Map();

	abstract start(): void;
	abstract getNextQuestion(): void;
	abstract checkAnswer(answer: string): boolean;

	getCurrentCharacter(): Character | null {
		return this.currentCharacter;
	}

	getConsistentDisplayCharacter(char: Character): string {
		if (!this.questionDisplayCharacters.has(char)) {
			this.questionDisplayCharacters.set(char, this.getDisplayCharacter(char));
		}
		return this.questionDisplayCharacters.get(char)!;
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

	protected getAvailableCharacters(): Character[] {
		return characters.filter((char) => {
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
		} else {
			setFeedback(`Incorrect. The correct answer is ${this.currentCharacter!.romaji}`);
			addIncorrectAnswer(this.currentCharacter!, answer, this.currentCharacter!.romaji);
		}
	}

	getOptions(): string[] {
		// Default implementation
		return [];
	}

	cleanup(): void {
		// Default implementation
	}

	protected moveToNextQuestion(): Character | null {
		const gameStateValue = get(gameState);
		if (gameStateValue.currentStep >= gameStateValue.totalSteps) {
			endSession();
			return null;
		}
		this.getNextQuestion();
		return this.currentCharacter;
	}
}
