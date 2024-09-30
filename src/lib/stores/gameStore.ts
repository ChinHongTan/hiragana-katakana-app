import { writable } from 'svelte/store';
import type { Character } from '$lib/data/characters';

export interface GameState {
    isSessionStarted: boolean;
    currentStep: number;
    totalSteps: number;
    score: number;
    streak: number;
    sessionEnded: boolean;
    feedback: string;
    incorrectAnswers: Array<{
        char: Character;
        userAnswer: string;
        correctAnswer: string;
    }>;
}

const initialState: GameState = {
    isSessionStarted: false,
    currentStep: 0,
    totalSteps: 0,
    score: 0,
    streak: 0,
    sessionEnded: false,
    feedback: '',
    incorrectAnswers: []
};

export const gameState = writable<GameState>(initialState);

export function startSession(totalSteps: number) {
    gameState.update(() => ({
        ...initialState,
        isSessionStarted: true,
        totalSteps
    }));
}

export function endSession() {
    gameState.update(state => ({
        ...state,
        sessionEnded: true
    }));
}

export function updateScore(correct: boolean) {
    gameState.update(state => ({
        ...state,
        score: state.score + (correct ? 1 : 0),
        streak: correct ? state.streak + 1 : 0,
        currentStep: state.currentStep + 1
    }));
}

export function addIncorrectAnswer(char: Character, userAnswer: string, correctAnswer: string) {
    gameState.update(state => ({
        ...state,
        incorrectAnswers: [...state.incorrectAnswers, { char, userAnswer, correctAnswer }]
    }));
}

export function updateCurrentStep(step: number) {
    console.log('Updating current step to:', step);
    gameState.update(state => ({ ...state, currentStep: step }));
}

export function setFeedback(feedback: string) {
    gameState.update(state => ({ ...state, feedback }));
}

export function resetGameState() {
    gameState.set(initialState);
}
