import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import { gameState, updateScore, addIncorrectAnswer, setFeedback, endSession, updateCurrentStep } from './stores/gameStore';
import type { GameLogic } from './GameLogic';
import { shuffleArray } from './utils';

export class QuizGameLogic implements GameLogic {
    private quizCharacters: Character[] = [];
    private currentCharacter: Character | null = null;
    private currentStep = 0;
    private questionDisplayCharacters: Map<Character, string> = new Map();

    constructor() {}

    start() {
        const availableCharacters = characters.filter(
            (char) => {
                const prefs = get(preferences);
                return prefs.groups.includes(char.group) &&
                    (prefs.script === 'both' ||
                    (prefs.script === 'hiragana' && char.hiragana) ||
                    (prefs.script === 'katakana' && char.katakana));
            }
        );
        this.quizCharacters = shuffleArray(availableCharacters).slice(0, get(gameState).totalSteps);
        this.currentStep = 0;
        this.getNextQuestion();
    }

    getNextQuestion() {
        if (this.currentStep < this.quizCharacters.length) {
            this.currentCharacter = this.quizCharacters[this.currentStep];
            if (!this.questionDisplayCharacters.has(this.currentCharacter)) {
                this.questionDisplayCharacters.set(this.currentCharacter, this.getDisplayCharacter(this.currentCharacter));
            }
            updateCurrentStep(this.currentStep);
            this.currentStep++;
        } else {
            endSession();
        }
    }

    checkAnswer(answer: string) {
        if (!this.currentCharacter) return false;

        const correct = answer.toLowerCase() === this.currentCharacter.romaji.toLowerCase();
        updateScore(correct);

        if (correct) {
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect. The correct answer is ${this.currentCharacter.romaji}`);
            addIncorrectAnswer(this.currentCharacter, answer, this.currentCharacter.romaji);
        }

        setTimeout(() => {
            this.getNextQuestion();
        }, 1500);

        return correct;
    }

    getCurrentCharacter() {
        return this.currentCharacter;
    }

    getConsistentDisplayCharacter(char: Character): string {
        if (!this.questionDisplayCharacters.has(char)) {
            this.questionDisplayCharacters.set(char, this.getDisplayCharacter(char));
        }
        return this.questionDisplayCharacters.get(char)!;
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
}
