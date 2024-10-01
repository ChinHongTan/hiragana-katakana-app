import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';
import type { OptionsGameLogic } from './GameLogic';
import { shuffleArray } from './utils';

export class WritingGameLogic extends BaseGameLogic implements OptionsGameLogic {
    private options: string[] = [];

    constructor(totalSteps: number) {
        super(totalSteps);
    }

    getNextQuestion() {
        super.getNextQuestion();
        this.generateOptions();
    }

    checkAnswer(selectedOption: string): boolean {
        return super.checkAnswer(selectedOption);
    }

    protected getCorrectAnswerDisplay(): string {
        if (!this.currentCharacter) return '';
        return this.getConsistentDisplayCharacter(this.currentCharacter);
    }

    getOptions(): string[] {
        return this.options;
    }

    getQuestionDisplay(): string {
        if (!this.currentCharacter) return '';
        return this.getConsistentDisplayCharacter(this.currentCharacter, true);
    }

    getEndScreenCharacterDisplay(char: Character): string {
        return char.romaji;
    }

    private generateOptions() {
        if (!this.currentCharacter) return;
    
        const correctOption = this.getConsistentDisplayCharacter(this.currentCharacter);
        const otherOptions = shuffleArray(this.availableCharacters
            .filter(char => char !== this.currentCharacter)
            .map(char => this.getConsistentDisplayCharacter(char))
        ).slice(0, 3);
    
        this.options = shuffleArray([correctOption, ...otherOptions]);
    }    

    moveToNextQuestion(): Character | null {
        return super.moveToNextQuestion();
    }
}
