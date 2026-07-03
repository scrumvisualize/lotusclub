import { useEffect, useState } from "react";

import PlayerSelector from "../components/PlayerSelector";
import CardGrid from "../components/CardGrid";
import ResultTable from "../components/ResultTable";

import { type Card, type PlayerCard } from "../types/card";
import { getTableCards } from "../utils/deck";

export default function BookRummyTable() {
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [results, setResults] = useState<PlayerCard[]>([]);
    const [started, setStarted] = useState(false);

    const [activePlayer, setActivePlayer] = useState<string | null>(null);
    const [initialPlayerCount, setInitialPlayerCount] = useState(0);

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
            localStorage.setItem(
                "rummy-results",
                JSON.stringify(results)
            );
        }
    }, [results]);

    const startGame = () => {
        const deck = getTableCards(selectedPlayers.length);

        setCards(deck);
        setStarted(true);
        setResults([]);
        setActivePlayer(null);
        setInitialPlayerCount(selectedPlayers.length); // Add this 
    };

    const handlePick = (card: Card) => {
        if (!activePlayer) return;

        const newResult: PlayerCard = {
            player: activePlayer,
            card,
            order: results.length + 1,
        };

        setResults((prev) => [...prev, newResult]);

        setCards((prev) =>
            prev.map((c) =>
                c.id === card.id ? { ...c, picked: true } : c
            )
        );

        // remove player after selection
        setSelectedPlayers((prev) =>
            prev.filter((p) => p !== activePlayer)
        );

        setActivePlayer(null);
    };

    const resetGame = () => {
        setSelectedPlayers([]);
        setCards([]);
        setResults([]);
        setStarted(false);
        setActivePlayer(null);

        localStorage.removeItem("rummy-results");
    };

    const isBookingOpen = () => {
        const now = new Date();

        const day = now.getDay();
        // Sunday = 0, Monday = 1, ..., Saturday = 6

        const hour = now.getHours();

        const minute = now.getMinutes();

        const currentTimeInMinutes = hour * 60 + minute;

        const start = 11 * 60; // 11:00 AM
        const end = 12 * 60;   // 12:00 PM

        const isMonday = day === 5;

        const isWithinTime =
            currentTimeInMinutes >= start &&
            currentTimeInMinutes < end;

        return isMonday && isWithinTime;
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                🃏 Book A Rummy Table
            </h1>

            {/* STEP 1: PLAYER SELECTION */}
            {!started && (
                <>
                    <PlayerSelector
                        selected={selectedPlayers}
                        setSelected={setSelectedPlayers}
                    />

                    <button
                        // disabled={selectedPlayers.length !== 11}
                        disabled={selectedPlayers.length !== 11 || !isBookingOpen()}
                        onClick={startGame}
                        className={`mt-4 px-4 py-2 rounded-lg text-white ${selectedPlayers.length === 11
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Book Table
                    </button>
                </>
            )}

            {/* STEP 2: GAME PLAY */}
            {started && (
                <>
                    {/* PLAYER SELECT BAR */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Select Player to Pick Card
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {selectedPlayers.map((player) => (
                                <button
                                    key={player}
                                    onClick={() => setActivePlayer(player)}
                                    className={`
                                        px-3 py-1 rounded-full border text-sm transition
                                        ${activePlayer === player
                                            ? "bg-blue-600 text-white"
                                            : "bg-white dark:bg-slate-800"
                                        }
                                    `}
                                >
                                    {player}
                                </button>
                            ))}
                        </div>

                        {activePlayer && (
                            <p className="mt-2 text-sm text-gray-500">
                                👉 {activePlayer}, pick your card
                            </p>
                        )}
                    </div>

                    {/* CARD GRID */}
                    <CardGrid
                        cards={cards}
                        onPick={handlePick}
                        disabled={!activePlayer}
                    />
                </>
            )}

            {/* STEP 3: RESULT */}
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