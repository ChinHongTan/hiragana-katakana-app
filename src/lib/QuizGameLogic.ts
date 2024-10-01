import { BaseGameLogic } from './GameLogic';

export class QuizGameLogic extends BaseGameLogic {
    protected currentStep = 0;

    constructor(totalSteps: number) {
        super(totalSteps);
    }
}

