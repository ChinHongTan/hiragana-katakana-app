import { characters, type Character } from './data/characters';
import { get } from 'svelte/store';
import { preferences } from './stores/preferencesStore';
import { gameState, updateScore, addIncorrectAnswer, setFeedback, endSession } from './stores/gameStore';
import type { GameLogic } from './GameLogic';
import { shuffleArray } from './utils';

export class WritingGameLogic implements GameLogic {
    private currentCharacter: Character | null = null;
    private options: string[] = [];
    private currentDisplayCharacter: string = '';
    private correctAnswer: string | null = null;
    private questionDisplayCharacters: Map<Character, string> = new Map();

    constructor() {
    }

    start() {
        this.getNextQuestion();
    }

    getNextQuestion() {
        const currentStep = get(gameState).currentStep;
        if (currentStep >= get(gameState).totalSteps) {
            console.log('End of session reached');
            endSession();
            return null;
        }
        const availableCharacters = characters.filter(
            (char) => {
                const prefs = get(preferences);
                return prefs.groups.includes(char.group) &&
                    (prefs.script === 'both' ||
                    (prefs.script === 'hiragana' && char.hiragana) ||
                    (prefs.script === 'katakana' && char.katakana));
            }
        );
        this.currentCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
        if (!this.questionDisplayCharacters.has(this.currentCharacter)) {
            this.questionDisplayCharacters.set(this.currentCharacter, this.getDisplayCharacter(this.currentCharacter));
        }
        this.currentDisplayCharacter = this.questionDisplayCharacters.get(this.currentCharacter)!;    
        this.generateOptions();
        return this.currentCharacter;
    }

    private getDisplayCharacter(char: Character | null): string {
        if (!char) return '';
        const prefs = get(preferences);
        if (prefs.script === 'katakana') {
            return char.katakana;
        } else if (prefs.script === 'hiragana') {
            return char.hiragana;
        } else {
            // When set to 'both', randomly choose between hiragana and katakana
            return Math.random() < 0.5 ? char.hiragana : char.katakana;
        }
    }

    private generateOptions() {
        if (!this.currentCharacter) return;

        const correctOption = this.currentDisplayCharacter;
        const otherOptions = shuffleArray(characters
            .filter((char) => char !== this.currentCharacter)
            .map((char) => this.getDisplayCharacter(char))
        ).slice(0, 3);

        this.options = shuffleArray([correctOption, ...otherOptions]);
    }

    checkAnswer(selectedOption: string) {
        if (!this.currentCharacter) return;
    
        const correct = selectedOption === this.currentDisplayCharacter;
        this.correctAnswer = this.currentDisplayCharacter;
        updateScore(correct);
    
        const feedback = correct ? 'Correct!' : `Incorrect. The correct answer is ${this.currentDisplayCharacter}`;
        setFeedback(feedback);
    
        if (!correct) {
            addIncorrectAnswer(this.currentCharacter, selectedOption, this.currentDisplayCharacter);
        }
        return correct;
    }

    getCorrectAnswer() {
        return this.correctAnswer;
    }

    moveToNextQuestion() {
        this.correctAnswer = null;
        return this.getNextQuestion();
    }

    getCurrentCharacter() {
        return this.currentCharacter;
    }

    getCurrentDisplayCharacter() {
        return this.currentDisplayCharacter;
    }

    getOptions() {
        return this.options;
    }

    getConsistentDisplayCharacter(char: Character): string {
        if (!this.questionDisplayCharacters.has(char)) {
            this.questionDisplayCharacters.set(char, this.getDisplayCharacter(char));
        }
        return this.questionDisplayCharacters.get(char)!;
    }    
}
