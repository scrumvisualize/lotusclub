// src/types/card.ts

export type Suit = "♥" | "♦" | "♣" | "♠";

export type CardValue =
    | "A"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";

export interface Card {
    id: string;
    suit: Suit;
    value: CardValue;
    picked: boolean;
}

export interface PlayerCard {
    uid: string;
    player: string;
    card: Card;
    order: number;
}