import { type BookingPlayer } from "../types/member";

type Props = {
    selectedPlayers: BookingPlayer[];
    players: BookingPlayer[];
    maxSelection?: number;
    onSelect: (player: BookingPlayer) => void;
    loggedUser: BookingPlayer | null;
    isAdmin: boolean;
};


export default function PlayerSelector({
    selectedPlayers,
    players,
    maxSelection = 11,
    onSelect,
    loggedUser,
    isAdmin,
}: Props) {


    const togglePlayer = (player: BookingPlayer) => {
        onSelect(player);
    };

    const totalRummyAmount = selectedPlayers.reduce(
        (total, player) =>
            total + (Number(player.rummyAmount) || 0),
        0
    );

    const totalRummyPoolAmt = selectedPlayers.reduce(
        (total, player) =>
            total + (Number(player.rummyPoolAmt) || 0),
        0
    );

    return (
        <div className="p-4">

            <h2 className="text-xl font-bold mb-6">
                Player's Joined ({selectedPlayers.length}/{maxSelection})
            </h2>

            <div className="
                mt-4
                mb-4
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
                ">

                <div className="
                p-3
                rounded-lg
                border
                bg-yellow-100
                dark:bg-[#0ec9c9]
                ">
                    <h3 className="font-semibold">
                        Total Rummy Amount: ${totalRummyAmount ?? 0}
                    </h3>
                </div>


                <div className="
                p-3
                rounded-lg
                border
                bg-green-100
                dark:bg-[#0ec9c9]
                ">
                    <h3 className="font-semibold">
                        Total Rummy Pool Amount: ${totalRummyPoolAmt ?? 0}
                    </h3>
                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                {
                    players.map((player) => {


                        const isChecked =
                            selectedPlayers.some(
                                p => p.uid === player.uid
                            );


                        const isDisabled =
                            (
                                !isAdmin &&
                                player.uid !== loggedUser?.uid
                            )
                            ||
                            (
                                !isChecked &&
                                selectedPlayers.length >= maxSelection
                            );


                        return (

                            <label
                                key={player.uid}
                                className={`
                                    flex items-center gap-2
                                    p-2 rounded-lg border
                                    cursor-pointer transition

                                    ${isChecked
                                        ? "bg-green-100 border-green-500 dark:bg-green-900/30"
                                        : "bg-white dark:bg-slate-800"
                                    }

                                    ${isDisabled
                                        ? "opacity-40 cursor-not-allowed"
                                        : ""
                                    }
                                `}
                            >

                                <input

                                    type="checkbox"

                                    checked={isChecked}

                                    disabled={isDisabled}

                                    onChange={() =>
                                        togglePlayer(player)
                                    }

                                />


                                <span className="text-sm">

                                    {player.name}

                                </span>


                            </label>

                        );

                    })
                }

            </div>

        </div>
    );
}