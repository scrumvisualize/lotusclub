import { useEffect, useState } from "react";
import PlayerSelector from "../components/PlayerSelector";
import CardGrid from "../components/CardGrid";
import ResultTable from "../components/ResultTable";

import { type Card, type PlayerCard } from "../types/card";
import { createDeck } from "../utils/deck";
import { players as allPlayers } from "../data/players";

export default function BookRummyTable() {

    const MIN_PLAYERS = 5;
    const MAX_PLAYERS = 12;

    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [waitingQueue, setWaitingQueue] = useState<string[]>([]);
    const [mockRequests, setMockRequests] = useState<string[]>([]);

    const [snapshot, setSnapshot] = useState<{
        players: string[];
        queue: string[];
    } | null>(null);

    const [started, setStarted] = useState(false);
    const [selectedColor, setSelectedColor] = useState<"red" | "black" | null>(null);

    const [cards, setCards] = useState<Card[]>([]);
    const [results, setResults] = useState<PlayerCard[]>([]);
    const [activePlayer, setActivePlayer] = useState<string | null>(null);
    const [initialPlayerCount, setInitialPlayerCount] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");
    const [clickedPlayer, setClickedPlayer] = useState<string | null>(null);

    // -----------------------------
    // MOCK USERS (only when FULL)
    // -----------------------------
    useEffect(() => {
        if (selectedPlayers.length === MAX_PLAYERS) {
            const available = allPlayers.filter(p => !selectedPlayers.includes(p));
            const shuffled = [...available].sort(() => 0.5 - Math.random());
            setMockRequests(shuffled.slice(0, 5));
        } else {
            setMockRequests([]);
        }
    }, [selectedPlayers]);

    // -----------------------------
    // HANDLE SELECT
    // -----------------------------
    const handlePlayerSelect = (player: string) => {

        let selected = [...selectedPlayers];
        let queue = [...waitingQueue];

        const isSelected = selected.includes(player);

        // REMOVE
        if (isSelected) {
            selected = selected.filter(p => p !== player);

            // promote from queue
            if (queue.length > 0) {
                const next = queue.shift();
                if (next && selected.length < MAX_PLAYERS) {
                    selected.push(next);
                }
            }
        }

        // ADD
        else {
            if (selected.length < MAX_PLAYERS) {
                selected.push(player);
                queue = queue.filter(p => p !== player);
            } else {
                if (!queue.includes(player)) {
                    queue.push(player);
                }
            }
        }

        setSelectedPlayers(selected);
        setWaitingQueue(queue);
    };


    // -----------------------------
    // START GAME
    // -----------------------------
    const isValid =
        selectedPlayers.length >= MIN_PLAYERS &&
        selectedPlayers.length <= MAX_PLAYERS;

    const startGame = () => {
        if (!isValid) return;

        setSnapshot({
            players: [...selectedPlayers],
            queue: [...waitingQueue],
        });

        //setCards(createDeck());
        const shuffledDeck = [...createDeck()].sort(() => Math.random() - 0.5);
        setCards(shuffledDeck);
        setStarted(true);
        setResults([]);
        setInitialPlayerCount(selectedPlayers.length);
    };

    // -----------------------------
    // BACK
    // -----------------------------
    const goBack = () => {
        if (snapshot) {
            setSelectedPlayers(snapshot.players);
            setWaitingQueue(snapshot.queue);
        }

        setStarted(false);
        setSelectedColor(null);
        setActivePlayer(null);
    };

    // -----------------------------
    // CARD PICK
    // -----------------------------

    const handlePick = (card: Card) => {
        //if (!activePlayer || card.picked) return;
        if (!activePlayer) return;

        // Save result

        setResults(prev => {
            const alreadyExists = prev.some(
                r => r.card.id === card.id
            );

            if (alreadyExists) return prev;

            return [
                ...prev,
                {
                    player: activePlayer,
                    card,
                    order: prev.length + 1,
                }
            ];
        });

        // Mark the card as picked

        // prevent duplicate pick even in race conditions
        setCards(prev => {
            const exists = prev.find(c => c.id === card.id);
            if (!exists || exists.picked) return prev;

            return prev.map(c =>
                c.id === card.id ? { ...c, picked: true } : c
            );
        });

        // Remove player from remaining players
        setSelectedPlayers(prev =>
            prev.filter(p => p !== activePlayer)
        );

        setActivePlayer(null);
    };

    const allowMe = (player: string) => {

        if (waitingQueue.includes(player)) return;

        setWaitingQueue(prev => [...prev, player]);

        setClickedPlayer(player);
        setSuccessMessage(`✅ ${player} joined the waiting queue.`);

        setTimeout(() => {
            setSuccessMessage("");
            setClickedPlayer(null);
        }, 2000);
    };

    // -----------------------------
    // UI
    // -----------------------------
    return (
        <div className="max-w-4xl mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">
                🃏 Book a Rummy Seat
            </h1>

            {/* STEP 1 */}
            {!started && (
                <>
                    <PlayerSelector
                        selected={selectedPlayers}
                        onSelect={handlePlayerSelect}
                    />

                    <button
                        disabled={!isValid}
                        onClick={startGame}
                        className={`mt-4 px-4 py-2 rounded text-white transition
                            ${isValid
                                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed opacity-60"
                            }
                        `}
                    >
                        Book Seat
                    </button>

                    {successMessage && (
                        <div className="mt-3 rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-2 transition-all">
                            {successMessage}
                        </div>
                    )}

                    {/* MOCK USERS */}
                    {selectedPlayers.length === MAX_PLAYERS && (
                        <div className="mt-6 p-4 border rounded-lg shadow-sm">
                            <h3 className="font-bold mb-3">
                                Players waiting if someone drops out
                            </h3>

                            {mockRequests.map(player => (
                                <div key={player} className="flex justify-between mb-2">
                                    <span>{player}</span>
                                    <button
                                        onClick={() => allowMe(player)}
                                        disabled={clickedPlayer === player}
                                        className={`px-3 py-1 rounded text-white font-medium transition-all duration-300
                                        ${clickedPlayer === player
                                                ? "bg-green-600 scale-95 shadow-inner"
                                                : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                                            }`}
                                    >
                                        {clickedPlayer === player ? "✓ Added" : "Allow Me"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* QUEUE */}
                    {waitingQueue.length > 0 && (
                        <div className="mt-4 p-3 dark:bg-slate-900 rounded">
                            <div className="flex text-grey justify-between mb-2">
                                <b>Waiting Queue</b>
                                <span className="bg-yellow-300 px-2 rounded text-sm">
                                    {waitingQueue.length} waiting
                                </span>
                            </div>

                            {waitingQueue.map((p, i) => (
                                <div key={p} className="text-grey">
                                    {i + 1}. {p}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* STEP 2 */}
            {started && (
                <>
                    <button
                        onClick={goBack}
                        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
                    >
                        ← Back
                    </button>

                    {!selectedColor && (
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-4">
                                Choose Card Colour
                            </h3>

                            <div className="flex justify-center gap-5">
                                <button
                                    onClick={() => setSelectedColor("red")}
                                    className="px-6 py-3 bg-red-600 text-white rounded"
                                >
                                    🔴 Red Cards
                                </button>

                                <button
                                    onClick={() => setSelectedColor("black")}
                                    className="px-6 py-3 bg-black text-white rounded"
                                >
                                    ⚫ Black Cards
                                </button>
                            </div>
                        </div>
                    )}

                    {selectedColor && (
                        <>
                            <div className="mb-4">
                                {selectedPlayers.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setActivePlayer(p)}
                                        className="m-1 px-3 py-1 border rounded"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            {activePlayer && (
                                <div className="mb-4 text-center text-blue-600 font-semibold animate-pulse">
                                    👉 {activePlayer}, click a card to pick
                                </div>
                            )}

                            <CardGrid cards={cards} onPick={handlePick} />
                        </>
                    )}
                </>
            )}

            {/* RESULT */}
            {started && results.length === initialPlayerCount && (
                <ResultTable
                    results={results}
                    onReset={() => window.location.reload()}
                />
            )}
        </div>
    );
}