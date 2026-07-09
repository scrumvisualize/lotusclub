import { X } from "lucide-react";

type Props = {
    open: boolean;
    title: string;
    message: string;
    type?: "success" | "error" | "warning";
    onClose: () => void;
};


export default function CommonModal({
    open,
    title,
    message,
    type = "error",
    onClose
}: Props) {


    if (!open)
        return null;


    const icon =
        type === "success"
            ? "✅"
            :
            type === "warning"
                ? "⚠️"
                :
                "❌";


    return (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            "
        >

            <div
                className="
                bg-white
                dark:bg-slate-800
                rounded-2xl
                shadow-xl
                p-6
                w-80
                relative
                text-center
                "
            >

                <button
                    onClick={onClose}
                    className="
                    absolute
                    right-3
                    top-3
                    text-gray-500
                    "
                >
                    <X size={20}/>
                </button>


                <div className="text-4xl mb-3">
                    {icon}
                </div>


                <h2
                    className="
                    text-xl
                    font-bold
                    mb-3
                    "
                >
                    {title}
                </h2>


                <p
                    className="
                    text-gray-600
                    dark:text-gray-300
                    mb-5
                    "
                >
                    {message}
                </p>


                <button
                    onClick={onClose}
                    className="
                    px-5
                    py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    "
                >
                    OK
                </button>


            </div>


        </div>

    );
}