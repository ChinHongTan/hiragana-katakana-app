import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';
import { get } from 'svelte/store';
import { gameState, updateCurrentStep } from './stores/gameStore';

export class TimedChallengeGameLogic extends BaseGameLogic {
	private timer: ReturnType<typeof setInterval> | null = null;
	private timeLeft: number;
	private availableCharacters: Character[] = [];

	constructor(private onTimeUpdate: (timeLeft: number) => void) {
		super();
		this.timeLeft = 0;
	}

	start() {
		this.timeLeft = get(gameState).totalSteps; // Using totalSteps as the time in seconds
		this.initializeAvailableCharacters();
		this.startTimer();
		this.getNextQuestion();
	}

	getNextQuestion() {
		if (this.availableCharacters.length === 0) {
			this.initializeAvailableCharacters();
		}
		const randomIndex = Math.floor(Math.random() * this.availableCharacters.length);
		this.currentCharacter = this.availableCharacters.splice(randomIndex, 1)[0];
	}

	checkAnswer(answer: string): boolean {
		if (!this.currentCharacter) return false;
		const correct = answer.toLowerCase() === this.currentCharacter.romaji.toLowerCase();
		this.handleAnswer(answer, correct);
		updateCurrentStep(get(gameState).currentStep);
		this.getNextQuestion();
		return correct;
	}

	cleanup() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	private initializeAvailableCharacters() {
		this.availableCharacters = this.getAvailableCharacters();
	}

	private startTimer() {
		this.timer = setInterval(() => {
			this.timeLeft -= 1;
			this.onTimeUpdate(this.timeLeft);
			if (this.timeLeft <= 0) {
				this.endChallenge();
			}
		}, 1000);
	}

	private endChallenge() {
		this.cleanup();
		super.moveToNextQuestion();
	}
}
