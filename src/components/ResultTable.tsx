import { type PlayerCard } from "../types/card";

type Props = {
    results: PlayerCard[];
    onReset: () => void;
};

const isRedSuit = (suit: string) => suit === "♥" || suit === "♦";

export default function ResultTable({ results, onReset }: Props) {

    const valueRank: Record<string, number> = {
        "A": 13,
        "K": 12,
        "Q": 11,
        "J": 10,
        "10": 9,
        "9": 8,
        "8": 7,
        "7": 6,
        "6": 5,
        "5": 4,
        "4": 3,
        "3": 2,
        "2": 1,
    };

    const suitRank: Record<string, number> = {
        "♠": 4,
        "♥": 3,
        "♦": 2,
        "♣": 1,
    };

    const sortedResults = [...results].sort((a, b) => {
        const valueDiff =
            valueRank[b.card.value] - valueRank[a.card.value];

        if (valueDiff !== 0) return valueDiff;

        return suitRank[b.card.suit] - suitRank[a.card.suit];
    });

    return (
        <div className="p-4 mt-6">
            <h2 className="text-xl font-bold mb-4">
                🎴 Rummy Players Order Results
            </h2>

            <div className="space-y-2">
                {sortedResults.map((item) => (
                    <div
                        key={item.order}
                        className="flex justify-between items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                    >
                        <div className="font-semibold">
                            {item.order}. {item.player}
                        </div>

                        <div className="text-lg font-bold flex items-center gap-2">
                            <span className="text-slate-600">
                                {item.card.value}
                            </span>

                            <span
                                className={
                                    isRedSuit(item.card.suit)
                                        ? "text-red-500 text-xl"
                                        : "text-slate-600 text-xl"
                                }
                            >
                                {item.card.suit}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onReset}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
                🔄 New Game
            </button>
        </div>
    );
}