import { BaseGameLogic } from './GameLogic';

export class TimedChallengeGameLogic extends BaseGameLogic {
    private timer: ReturnType<typeof setInterval> | null = null;
    private timeLeft: number;

    constructor(private onTimeUpdate: (timeLeft: number) => void, totalTime: number) {
        super(totalTime);
        this.timeLeft = totalTime;
    }

    start() {
        super.start();
        this.startTimer();
    }

    cleanup() {
        if (this.timer) {
            clearInterval(this.timer);
        }
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

    isSessionEnded(): boolean {
        return this.timeLeft <= 0;
    }
}
