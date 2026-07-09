import { type Card } from "../types/card";

type Props = {
    cards: Card[];
    onPick: (card: Card) => void;
    pickedCards: string[];
    disabled?: boolean;
};


export default function CardGrid({
    cards,
    onPick,
    pickedCards,
    disabled
}: Props) {



    return (
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">
                🃏 Pick a Card
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-center">
                {cards.map((card) => {

                    const isPicked = pickedCards.includes(card.id);
                    const isDisabled = disabled || isPicked;

                    return (
                        <button
                            key={card.id}
                            disabled={disabled || isPicked}
                            onClick={() => onPick(card)}
                            className={`
                relative h-24 rounded-xl border font-bold
                transition-all duration-300
                flex items-center justify-center
                shadow-md
                bg-slate-800/70 backdrop-blur-md
                border-slate-600
                ${isPicked
                                    ? "opacity-20 scale-95 cursor-not-allowed"
                                    : "hover:scale-110 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
                                }
                ${isDisabled
                                    ? "opacity-20 scale-95 cursor-not-allowed"
                                    : "hover:scale-110 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
                                }
            `}
                        >
                            <span className="text-2xl text-white">
                                🂠
                            </span>

                            {!isPicked && (
                                <div className="absolute inset-0 rounded-xl hover:bg-white/5 transition" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}