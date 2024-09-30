import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import { updateScore, addIncorrectAnswer, setFeedback, gameState, endSession } from './stores/gameStore';
import type { GameLogic } from './GameLogic';

export class PracticeGameLogic implements GameLogic {
    private currentCharacter: Character | null = null;
    private nextCharacter: Character | null = null;
    private questionDisplayCharacters: Map<Character, string> = new Map();

    constructor() {
        console.log('PracticeGameLogic constructor called');
    }

    start() {
        console.log('PracticeGameLogic start called');
        this.getNextQuestion();
        this.currentCharacter = this.nextCharacter;
        this.getNextQuestion();
    }

    getNextQuestion() {
        console.log('getNextQuestion called');
        const availableCharacters = characters.filter(
            (char) => {
                const prefs = get(preferences);
                return prefs.groups.includes(char.group) &&
                    (prefs.script === 'both' ||
                    (prefs.script === 'hiragana' && char.hiragana) ||
                    (prefs.script === 'katakana' && char.katakana));
            }
        );
        this.nextCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
        if (!this.questionDisplayCharacters.has(this.nextCharacter)) {
            this.questionDisplayCharacters.set(this.nextCharacter, this.getDisplayCharacter(this.nextCharacter));
        }
        console.log('New nextCharacter:', this.nextCharacter);
    }

    getDisplayCharacter(char: Character): string {
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

        return correct;
    }

    moveToNextQuestion() {
        const gameStateValue = get(gameState);
        if (gameStateValue.currentStep >= gameStateValue.totalSteps) {
            console.log('Game ended');
            endSession();
            return null;
        }
        this.currentCharacter = this.nextCharacter;
        this.getNextQuestion();
        return this.currentCharacter;
    }

    getCurrentCharacter() {
        console.log('getCurrentCharacter called, returning:', this.currentCharacter);
        return this.currentCharacter;
    }
}
