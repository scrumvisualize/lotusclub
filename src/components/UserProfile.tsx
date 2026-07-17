import { useState, useRef, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

type Props = {
    name: string;
    membershipNo: string;
    role: string;
    onLogout: () => void;
};

export default function UserProfileChip({
    name,
    membershipNo,
    role,
    onLogout
}: Props) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const loggedUser =
        JSON.parse(
            localStorage.getItem("user") || "null"
        );

    const isAdmin =
        loggedUser?.role === "admin";


    // Close popup when clicking outside
    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);


    return (

        <div
            ref={menuRef}
            className="
                relative
            "
        >

            {/* Profile Chip */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2
                    rounded-xl
                    bg-white
                    dark:bg-slate-800
                    border
                    border-slate-200
                    dark:border-slate-700
                    shadow-sm
                    hover:shadow-lg
                    transition
                    cursor-pointer
                "
            >

                <div
                    className="
                        w-9
                        h-9
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                    "
                >
                    <User size={18} />
                </div>


                <div className="text-left">
                    <span className="text-xs">Welcome</span>
                    <div className="font-semibold text-xs">
                        {name}
                    </div>


                    <div className="
                        text-xs
                        text-gray-500
                    ">
                        {/* 🏷 {membershipNo} • {role} */}
                    </div>

                </div>

            </button>


            {/* Popup */}
            {open && (

                <div
                    className="
                        absolute
                        right-0
                        mt-2
                        w-56
                        bg-white
                        dark:bg-slate-800
                        border
                        border-slate-200
                        dark:border-slate-700
                        rounded-xl
                        shadow-xl
                        z-50
                        p-4
                    "
                >

                    <div className="mb-3">

                        <div className="font-bold">
                            {name}
                        </div>

                        <div className="text-sm text-gray-500">
                            Membership: {membershipNo}
                        </div>

                        <div className="text-sm text-gray-500 capitalize">
                            Role: {role}
                        </div>

                    </div>

                    {isAdmin === true && (
                        <button
                            onClick={() => navigate("/requests")}
                            className="
                            mt-2
                            px-4
                            py-2
                            mb-2
                            rounded-lg
                            text-blue-600
                            dark:text-blue-400
                            font-medium
                            text-sm
                            hover:bg-blue-50
                            dark:hover:bg-slate-800
                            hover:text-blue-700
                            transition-all
                            duration-200
                            inline-flex
                            items-center
                            gap-2
                            "
                        >
                            📋 View Requests
                        </button>
                    )}


                    <button
                        onClick={onLogout}
                        className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-3
                            py-2
                            rounded-lg
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            transition
                        "
                    >

                        <LogOut size={16} />

                        Logout

                    </button>


                </div>

            )}

        </div>

    );
}