import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';

export class PracticeGameLogic extends BaseGameLogic {
	private nextCharacter: Character | null = null;

	start() {
		this.getNextQuestion();
		this.currentCharacter = this.nextCharacter;
		this.getNextQuestion();
	}

	getNextQuestion() {
		const availableCharacters = this.getAvailableCharacters();
		this.nextCharacter =
			availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
	}

	checkAnswer(answer: string): boolean {
		if (!this.currentCharacter) return false;
		const correct = answer.toLowerCase() === this.currentCharacter.romaji.toLowerCase();
		this.handleAnswer(answer, correct);
		return correct;
	}

	moveToNextQuestion(): Character | null {
		this.currentCharacter = this.nextCharacter;
		return super.moveToNextQuestion();
	}
}
