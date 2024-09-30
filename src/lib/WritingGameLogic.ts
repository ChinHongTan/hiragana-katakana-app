import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';
import { shuffleArray } from './utils';

export class WritingGameLogic extends BaseGameLogic {
	private options: string[] = [];

	start() {
		this.getNextQuestion();
	}

	getNextQuestion() {
		const availableCharacters = this.getAvailableCharacters();
		this.currentCharacter =
			availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
		this.generateOptions();
	}

	checkAnswer(selectedOption: string): boolean {
		if (!this.currentCharacter) return false;
		const correct = selectedOption === this.getConsistentDisplayCharacter(this.currentCharacter);
		this.handleAnswer(selectedOption, correct);
		return correct;
	}

	getOptions(): string[] {
		return this.options;
	}

	private generateOptions() {
		if (!this.currentCharacter) return;

		const correctOption = this.getConsistentDisplayCharacter(this.currentCharacter);
		const otherOptions = shuffleArray(
			this.getAvailableCharacters()
				.filter((char) => char !== this.currentCharacter)
				.map((char) => this.getConsistentDisplayCharacter(char))
		).slice(0, 3);

		this.options = shuffleArray([correctOption, ...otherOptions]);
	}

	moveToNextQuestion(): Character | null {
		return super.moveToNextQuestion();
	}
}
