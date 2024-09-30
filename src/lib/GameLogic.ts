import type { Character } from './data/characters';

export interface GameLogic {
    start: () => void;
    getNextQuestion: () => void;
    checkAnswer: (answer: string) => void;
    getCurrentCharacter: () => Character | null;
    getOptions?: () => string[];
    cleanup?: () => void;
    getConsistentDisplayCharacter: (char: Character) => string;
}
