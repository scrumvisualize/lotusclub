import { type PlayerCard } from "../types/card";


type Props = {
    results: PlayerCard[];
    selectedPlayers: {
        uid: string;
        name: string;
    }[];
    onReset: () => void;
    userRole: "admin" | "member";
};


const isRedSuit = (suit: string) =>
    suit === "♥" || suit === "♦";


export default function ResultTable({
    results,
    onReset,
    userRole
}: Props) {

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

        // First compare card value
        const valueDiff =
            valueRank[b.card.value] -
            valueRank[a.card.value];


        if (valueDiff !== 0) {
            return valueDiff;
        }


        // Same value, compare suit
        return (
            suitRank[b.card.suit] -
            suitRank[a.card.suit]
        );

    });

    return (

        <div className="p-4 mt-6">

            <h3 className="text-lg font-bold mb-3">
                🪑 Players Seating Order
            </h3>


            <div className="space-y-2">


                {
                    sortedResults.map(
                        (player, index) => {


                            // Find card picked by this player

                            const playerResult = player;


                            return (

                                <div
                                    key={player.uid}
                                    className="
                                    flex
                                    justify-between
                                    items-center
                                    p-3
                                    rounded-lg
                                    bg-slate-100
                                    dark:bg-slate-800
                                    "
                                >


                                    {/* Player order */}

                                    <div className="font-semibold">
                                        {index + 1}. {player.player}
                                    </div>



                                    {/* Card */}

                                    {
                                        playerResult ? (

                                            <div
                                                className="
                                                text-xl
                                                font-bold
                                                flex
                                                gap-2
                                                "
                                            >

                                                <span>
                                                    {
                                                        playerResult.card.value
                                                    }
                                                </span>


                                                <span
                                                    className={
                                                        isRedSuit(
                                                            playerResult.card.suit
                                                        )
                                                            ?
                                                            "text-red-500"
                                                            :
                                                            "text-slate-700 dark:text-slate-300"
                                                    }
                                                >

                                                    {
                                                        playerResult.card.suit
                                                    }

                                                </span>


                                            </div>

                                        )
                                            :
                                            (

                                                <span
                                                    className="
                                                text-gray-400
                                                text-sm
                                                "
                                                >
                                                    Waiting...
                                                </span>

                                            )

                                    }


                                </div>

                            );

                        }

                    )

                }


            </div>



            {
                userRole === "admin" && (

                    <button
                        onClick={onReset}
                        className="
                        mt-4
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "
                    >
                        New Game
                    </button>

                )
            }


        </div>

    );

}

