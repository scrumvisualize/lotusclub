import { type PlayerCard } from "../types/card";

type Props = {
    results: PlayerCard[];
    onReset: () => void;
};

export default function ResultTable({ results, onReset }: Props) {
    return (
        <div className="p-4 mt-6">
            <h2 className="text-xl font-bold mb-4">
                🎴 Rummy Players Order Results
            </h2>

            <div className="space-y-2">
                {results.map((item) => (
                    <div
                        key={item.order}
                        className="flex justify-between items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                    >
                        <div className="font-semibold">
                            {item.order}. {item.player}
                        </div>

                        <div className="text-lg font-bold flex items-center gap-2">
                            <span className="text-slate-200">{item.card.value}</span>

                            <span
                                className={
                                    item.card.color === "red"
                                        ? "text-red-500 text-xl"
                                        : "text-slate-300 text-xl"
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