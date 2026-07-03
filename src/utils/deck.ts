// src/utils/deck.ts
import { type Card, type Suit, type CardValue } from "../types/card";

const suits: Suit[] = ["♥", "♦", "♣", "♠"];

const values: CardValue[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

// Create full 52-card deck
export const createDeck = (): Card[] => {
    const deck: Card[] = [];

    suits.forEach((suit) => {
        values.forEach((value) => {
            const isRed = suit === "♥" || suit === "♦";

            deck.push({
                id: `${value}-${suit}`,
                suit,
                value,
                color: isRed ? "red" : "black",
                picked: false,
            });
        });
    });

    return deck;
};

// Fisher–Yates Shuffle (fair random)
export const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

// Get only first N cards (for 11 players)
export const getTableCards = (count: number = 11): Card[] => {
    const deck = shuffleDeck(createDeck());
    return deck.slice(0, count);
};