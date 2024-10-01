import { BaseGameLogic } from './GameLogic';
import type { Character } from './data/characters';

export class PracticeGameLogic extends BaseGameLogic {

    constructor(totalSteps: number) {
        super(totalSteps);
    }

    moveToNextQuestion(): Character | null {
        return super.moveToNextQuestion();
    }
}

