import { useEffect, useState } from "react";

import PlayerSelector from "../components/PlayerSelector";
import CardGrid from "../components/CardGrid";
import ResultTable from "../components/ResultTable";

import { type Card, type PlayerCard } from "../types/card";
import { createDeck } from "../utils/deck";

export default function BookRummyTable() {
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<"red" | "black" | null>(null);
    const [lockColor, setLockColor] = useState(false);

    const [results, setResults] = useState<PlayerCard[]>([]);
    const [started, setStarted] = useState(false);

    const [cards, setCards] = useState<Card[]>([]);

    const [activePlayer, setActivePlayer] = useState<string | null>(null);
    const [initialPlayerCount, setInitialPlayerCount] = useState(0);
    const [showBookingMessage, setShowBookingMessage] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("rummy-results");
        if (saved) {
            setResults(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (results.length > 0) {
            localStorage.setItem("rummy-results", JSON.stringify(results));
        }
    }, [results]);

    const startGame = () => {
        if (selectedPlayers.length !== 11) {
            alert("Select 11 players first");
            return;
        }

        const fullDeck = createDeck();
        console.log("DECK SIZE:", fullDeck.length); // MUST = 52
        setCards(fullDeck);

        setStarted(true);
        setResults([]);
        setActivePlayer(null);
        setInitialPlayerCount(selectedPlayers.length);


        setStarted(true);
        setResults([]);
        setActivePlayer(null);
        setInitialPlayerCount(selectedPlayers.length);
    };


    const resetGame = () => {
        setSelectedPlayers([]);
        setCards([]);
        setResults([]);
        setStarted(false);
        setActivePlayer(null);
        setSelectedColor(null);
        setLockColor(false);

        localStorage.removeItem("rummy-results");
    };

    const isBookingOpen = () => {
        const now = new Date();

        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();

        const currentTimeInMinutes = hour * 60 + minute;

        const start = 7 * 60;
        const end = 11 * 60;

        const isMondayOrFriday = day === 1 || day === 6;

        return isMondayOrFriday &&
            currentTimeInMinutes >= start &&
            currentTimeInMinutes < end;
    };


    const handlePick = (card: Card) => {
        if (!activePlayer) return;

        const newResult: PlayerCard = {
            player: activePlayer,
            card, // ✅ USE CLICKED CARD DIRECTLY
            order: results.length + 1,
        };

        setResults((prev) => [...prev, newResult]);

        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id ? { ...c, picked: true } : c
            )
        );

        setSelectedPlayers((prev) =>
            prev.filter((p) => p !== activePlayer)
        );

        setActivePlayer(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                🃏 Reserve Your Rummy Table
            </h1>

            {/* STEP 1 */}
            {!started && (
                <>
                    <PlayerSelector
                        selected={selectedPlayers}
                        setSelected={setSelectedPlayers}
                    />

                    <button
                        disabled={selectedPlayers.length !== 11}
                        onClick={() => {
                            setShowBookingMessage(true);

                            if (selectedPlayers.length === 11 && isBookingOpen()) {
                                startGame();
                            }
                        }}
                        className={`mt-4 px-4 py-2 rounded-lg text-white ${selectedPlayers.length === 11
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Book Table
                    </button>

                    {showBookingMessage && !isBookingOpen() && (
                        <p className="mt-3 text-sm text-red-500 font-medium text-center">
                            🚫 Booking opens only on Monday or Friday from 2:00 PM to 4:00 PM
                        </p>
                    )}
                </>
            )}

            {/* STEP 2 */}
            {started && (
                <>
                    {/* COLOR SELECTION */}
                    {!selectedColor && (
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-2">
                                Choose Card Colour
                            </h3>

                            <div className="flex justify-center gap-5">
                                <button
                                    onClick={() => setSelectedColor("red")}
                                    className="px-6 py-3 rounded-xl bg-red-600 text-white"
                                >
                                    🔴 Red Cards
                                </button>

                                <button
                                    onClick={() => setSelectedColor("black")}
                                    className="px-6 py-3 rounded-xl bg-black text-white"
                                >
                                    ⚫ Black Cards
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PLAYER SELECTION */}
                    {selectedColor && (
                        <>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">
                                    Select Player to Pick a Card
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {selectedPlayers.map((player) => (
                                        <button
                                            key={player}
                                            onClick={() => setActivePlayer(player)}
                                            className={`px-4 py-2 rounded-full border ${activePlayer === player
                                                ? "bg-blue-600 text-white"
                                                : "bg-white dark:bg-slate-800"
                                                }`}
                                        >
                                            {player}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activePlayer && (
                                <div className="mb-4 text-center">
                                    <p className="text-lg font-semibold text-blue-600 animate-pulse">
                                        👉 {activePlayer}, click a card to pick
                                    </p>
                                </div>
                            )}

                            {/* CARD GRID */}
                            <CardGrid
                                cards={cards}
                                onPick={handlePick}
                            />
                        </>
                    )}
                </>
            )}

            {/* RESULT */}
            {results.length === initialPlayerCount &&
                initialPlayerCount > 0 && (
                    <ResultTable
                        results={results}
                        onReset={resetGame}
                    />
                )}
        </div>
    );
}