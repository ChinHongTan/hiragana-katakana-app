import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import { gameState, updateScore, addIncorrectAnswer, setFeedback, endSession, updateCurrentStep } from './stores/gameStore';
import type { GameLogic } from './GameLogic';

export class TimedChallengeGameLogic implements GameLogic {
    private currentCharacter: Character | null = null;
    private timer: ReturnType<typeof setInterval> | null = null;
    private timeLeft: number;
    private questionDisplayCharacters: Map<Character, string> = new Map();
    private availableCharacters: Character[] = [];

    constructor(private onTimeUpdate: (timeLeft: number) => void) {
        this.timeLeft = 0;
    }

    start() {
        console.log('TimedChallengeGameLogic start called');
        this.timeLeft = get(gameState).totalSteps; // Using totalSteps as the time in seconds
        this.initializeAvailableCharacters();
        this.startTimer();
        this.getNextQuestion();
    }

    private initializeAvailableCharacters() {
        const prefs = get(preferences);
        this.availableCharacters = characters.filter(
            (char) => prefs.groups.includes(char.group) &&
                (prefs.script === 'both' ||
                (prefs.script === 'hiragana' && char.hiragana) ||
                (prefs.script === 'katakana' && char.katakana))
        );
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

    getNextQuestion() {
        console.log('getNextQuestion called');
        if (this.availableCharacters.length === 0) {
            this.initializeAvailableCharacters();
        }
        const randomIndex = Math.floor(Math.random() * this.availableCharacters.length);
        this.currentCharacter = this.availableCharacters.splice(randomIndex, 1)[0];
        
        if (!this.questionDisplayCharacters.has(this.currentCharacter)) {
            this.questionDisplayCharacters.set(this.currentCharacter, this.getDisplayCharacter(this.currentCharacter));
        }
        
        console.log('New currentCharacter:', this.currentCharacter);
    }

    checkAnswer(answer: string) {
        console.log('checkAnswer called with:', answer);
        if (!this.currentCharacter) {
            console.log('No current character');
            return false;
        }

        const correct = answer.toLowerCase() === this.currentCharacter.romaji.toLowerCase();
        console.log('Answer correct:', correct);
        updateScore(correct);

        if (correct) {
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect. The correct answer is ${this.currentCharacter.romaji}`);
            addIncorrectAnswer(this.currentCharacter, answer, this.currentCharacter.romaji);
        }
        updateCurrentStep(get(gameState).currentStep);

        this.getNextQuestion(); // Move to the next question after checking the answer
        return correct;
    }

    getCurrentCharacter() {
        console.log('getCurrentCharacter called, returning:', this.currentCharacter);
        return this.currentCharacter;
    }

    private getDisplayCharacter(char: Character): string {
        const prefs = get(preferences);
        if (prefs.script === 'katakana') {
            return char.katakana;
        } else if (prefs.script === 'hiragana') {
            return char.hiragana;
        } else {
            return Math.random() < 0.5 ? char.hiragana : char.katakana;
        }
    }

    getConsistentDisplayCharacter(char: Character): string {
        if (!this.questionDisplayCharacters.has(char)) {
            this.questionDisplayCharacters.set(char, this.getDisplayCharacter(char));
        }
        return this.questionDisplayCharacters.get(char)!;
    }

    private endChallenge() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        endSession();
    }

    cleanup() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
