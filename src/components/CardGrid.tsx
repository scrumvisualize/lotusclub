import { type Card } from "../types/card";

type Props = {
    cards: Card[];
    onPick: (card: Card) => void;
    disabled?: boolean;
};

export default function CardGrid({ cards, onPick, disabled = false }: Props) {
    return (


        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center">
                🃏 Pick a Card
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-center">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        disabled={disabled || card.picked}
                        onClick={() => onPick(card)}
                        className={`
                    relative
                    h-24
                    rounded-xl
                    border
                    font-bold
                    transition-all duration-300

                    flex items-center justify-center

                    shadow-md

                    bg-slate-800/70
                    backdrop-blur-md

                    border-slate-600

                    ${card.picked
                                ? "opacity-20 scale-95 cursor-not-allowed"
                                : "hover:scale-110 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
                            }
                `}
                    >
                        {/* CARD CONTENT */}
                        <span
                            className={`text-2xl ${card.color === "red"
                                ? "text-red-500"
                                : "text-white"
                                }`}
                        >
                            🂠
                        </span>

                        {/* subtle glow on hover */}
                        {!card.picked && (
                            <div className="absolute inset-0 rounded-xl hover:bg-white/5 transition" />
                        )}
                    </button>
                ))}
            </div>
        </div>

    );
}