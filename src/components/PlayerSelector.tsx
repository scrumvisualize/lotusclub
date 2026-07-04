import { players } from "../data/players";

type Props = {
    selected: string[];
    setSelected: (players: string[]) => void;
    maxSelection?: number;
};

export default function PlayerSelector({
    selected,
    setSelected,
    maxSelection = 11,
}: Props) {
    const togglePlayer = (name: string) => {
        const isSelected = selected.includes(name);

        if (isSelected) {
            // remove player
            setSelected(selected.filter((p) => p !== name));
        } else {
            // prevent selecting more than max
            if (selected.length >= maxSelection) return;

            setSelected([...selected, name]);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">
                Select Players ({selected.length}/{maxSelection})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {players.map((name) => {
                    const isChecked = selected.includes(name);
                    const isDisabled =
                        !isChecked && selected.length >= maxSelection;

                    return (
                        <label
                            key={name}
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${isChecked
                                ? "bg-green-100 border-green-500 dark:bg-green-900/30"
                                : "bg-white dark:bg-slate-800"
                                } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                disabled={isDisabled}
                                onChange={() => togglePlayer(name)}
                            />

                            <span className="text-sm">{name}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}