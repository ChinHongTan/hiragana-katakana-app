import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';
import { shuffleArray } from './utils';
import { get } from 'svelte/store';
import { gameState, updateCurrentStep } from './stores/gameStore';

export class QuizGameLogic extends BaseGameLogic {
	private quizCharacters: Character[] = [];
	private currentStep = 0;

	start() {
		const availableCharacters = this.getAvailableCharacters();
		this.quizCharacters = shuffleArray(availableCharacters).slice(0, get(gameState).totalSteps);
		this.currentStep = 0;
		this.getNextQuestion();
	}

	getNextQuestion() {
		if (this.currentStep < this.quizCharacters.length) {
			this.currentCharacter = this.quizCharacters[this.currentStep];
			updateCurrentStep(this.currentStep);
			this.currentStep++;
		} else {
			this.currentCharacter = null;
		}
	}

	checkAnswer(answer: string): boolean {
		if (!this.currentCharacter) return false;
		const correct = answer.toLowerCase() === this.currentCharacter.romaji.toLowerCase();
		this.handleAnswer(answer, correct);
		setTimeout(() => this.getNextQuestion(), 1500);
		return correct;
	}
}
