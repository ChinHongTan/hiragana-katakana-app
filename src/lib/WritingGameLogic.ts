import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';
import type { OptionsGameLogic } from './GameLogic';
import { shuffleArray } from './utils';

export class WritingGameLogic extends BaseGameLogic implements OptionsGameLogic {
    readonly isWritingGameLogic = true;
    private options: string[] = [];
    private correctAnswer: string = '';
    private userSelection: string | null = null;

    constructor(totalSteps: number) {
        super(totalSteps);
    }

    getNextQuestion() {
        super.getNextQuestion();
        this.generateOptions();
        this.correctAnswer = this.getConsistentDisplayCharacter(this.currentCharacter!);
        this.userSelection = null;
    }

    checkAnswer(selectedOption: string): boolean {
        this.userSelection = selectedOption;
        return super.checkAnswer(selectedOption);
    }

    protected getCorrectAnswerDisplay(): string {
        if (!this.currentCharacter) return '';
        return this.getConsistentDisplayCharacter(this.currentCharacter);
    }

    getOptions(): string[] {
        return this.options;
    }

    getCorrectAnswer(): string {
        return this.correctAnswer;
    }

    getUserSelection(): string | null {
        return this.userSelection;
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
