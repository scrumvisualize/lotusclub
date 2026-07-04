// src/utils/deck.ts
import { type Card, type Suit, type CardValue } from "../types/card";

const suits: Suit[] = ["♥", "♦", "♣", "♠"];

const values: CardValue[] = [
    "A","2","3","4","5","6","7","8","9","10","J","Q","K",
];

// Create full 52-card deck
export const createDeck = (): Card[] => {
    const deck: Card[] = [];

    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({
                id: `${value}-${suit}`, // stable unique ID
                suit,
                value,
                picked: false,
            });
        });
    });

    return deck // ❗ NO SHUFFLE for debugging stability
};

// Fisher–Yates Shuffle (pure function)
export const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

/**
 * IMPORTANT FIX:
 * Do NOT recreate deck on every call.
 * Instead, create once per game/session.
 */
let cachedDeck: Card[] | null = null;

export function getTableCards(count?: number): Card[] {
    if (!cachedDeck) {
        cachedDeck = createDeck();
    }

    return count ? cachedDeck.slice(0, count) : cachedDeck;
}

/**
 * Call this when starting a new game
 */
export function resetDeck(): Card[] {
    cachedDeck = createDeck();
    return cachedDeck;
}