import { useEffect, useState } from "react";

import {
    collection,
    doc,
    onSnapshot,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

import {
    ShieldCheck,
    UserRound,
    UserCog,
    Phone
} from "lucide-react";


type Member = {
    uid: string;
    name: string;
    mobile: string;
    membershipNo?: string;
    role?: string;
};

type Props = {
    setIsLoading: (value: boolean) => void;
};



const ManageUsers = ({ setIsLoading }: Props) => {

    const [users, setUsers] = useState<Member[]>([]);


    const currentUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    useEffect(() => {

        setIsLoading(true);

        const unsubscribe = onSnapshot(
            collection(db, "members"),
            (snapshot) => {

                const data = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data()
                })) as Member[];


                setUsers(data);
                setIsLoading(false);

            }
        );


        return () => unsubscribe();


    }, [setIsLoading]);



    const updateUserRole = async (
        user: Member
    ) => {


        // Prevent removing your own admin access
        if (user.uid === currentUser?.uid) {

            alert(
                "You cannot change your own admin role."
            );

            return;
        }


        const newRole =
            user.role === "admin"
                ? "member"
                : "admin";


        await updateDoc(
            doc(
                db,
                "members",
                user.uid
            ),
            {
                role: newRole
            }
        );


    };



    return (

        <div
            className="
                min-h-screen
                bg-gray-100
                dark:bg-slate-950
                p-5
            "
        >

            <div
                className="
                    max-w-3xl
                    mx-auto
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                >

                    <UserCog
                        size={32}
                        className="
                            text-blue-600
                        "
                    />


                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-800
                            dark:text-white
                        "
                    >
                        Manage Users
                    </h1>

                </div>



                <p
                    className="
                        text-center
                        mt-2
                        text-gray-500
                        dark:text-gray-400
                    "
                >
                    Promote members to admin or remove admin access
                </p>



                <div
                    className="
                        mt-8
                        space-y-4
                    "
                >

                    {
                        users.map(user => (

                            <div
                                key={user.uid}
                                className="
                                    bg-white
                                    dark:bg-slate-900
                                    rounded-2xl
                                    shadow-md
                                    p-5
                                    border
                                    border-gray-100
                                    dark:border-slate-800
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        {
                                            user.role === "admin"
                                                ?
                                                <ShieldCheck
                                                    size={22}
                                                    className="
                                                    text-green-600
                                                "
                                                />
                                                :
                                                <UserRound
                                                    size={22}
                                                    className="
                                                    text-gray-500
                                                "
                                                />
                                        }


                                        <h3
                                            className="
                                                font-semibold
                                                text-lg
                                                dark:text-white
                                            "
                                        >
                                            {user.name}
                                        </h3>


                                    </div>


                                    <div
                                        className="
                                        flex
                                        items-center
                                        px-2
                                        gap-2
                                        text-sm
                                        text-gray-500
                                        dark:text-gray-400
                                        mt-1
                                        "
                                    >
                                        <Phone
                                            size={16}
                                            className="
                                        text-blue-600
                                        dark:text-blue-400
                                        "
                                        />

                                        <span>
                                            {user.mobile}
                                        </span>

                                    </div>

                                    <span
                                        className={`
                                            inline-block
                                            mt-2
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${user.role === "admin"
                                                ?
                                                "bg-green-100 text-green-700"
                                                :
                                                "bg-gray-100 text-gray-700"
                                            }
                                        `}
                                    >

                                        {
                                            user.role === "admin"
                                                ? "Admin"
                                                : "Member"
                                        }

                                    </span>


                                </div>



                                <button
                                    disabled={
                                        user.uid === currentUser?.uid
                                    }
                                    onClick={() =>
                                        updateUserRole(user)
                                    }
                                    className={`
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        transition

                                        ${user.uid === currentUser?.uid
                                            ?
                                            "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            :
                                            user.role === "admin"
                                                ?
                                                "bg-red-600 text-white hover:bg-red-700"
                                                :
                                                "bg-blue-600 text-white hover:bg-blue-700"
                                        }
                                    `}
                                >

                                    {
                                        user.role === "admin"
                                            ?
                                            "Remove Admin"
                                            :
                                            "Make Admin"
                                    }

                                </button>


                            </div>

                        ))
                    }


                </div>


            </div>


        </div>

    );

};


export default ManageUsers;