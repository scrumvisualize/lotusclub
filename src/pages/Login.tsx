import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { auth, db } from "../firebase";


export default function Login() {

    const [membershipNo, setMembershipNo] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async () => {

        try {

            setError("");
            setLoading(true);


            const membership =
                membershipNo.trim().toUpperCase();


            /*
              Find member using membership number
              Example:
              LC0029
            */

            const memberQuery = query(
                collection(db, "members"),
                where(
                    "membershipNo",
                    "==",
                    membership
                )
            );


            const memberSnapshot =
                await getDocs(memberQuery);


            if (memberSnapshot.empty) {

                throw new Error(
                    "Membership number not found"
                );

            }


            const memberDoc =
                memberSnapshot.docs[0];


            const memberData =
                memberDoc.data();



            if (!memberData.active) {

                throw new Error(
                    "Account is inactive"
                );

            }


            const email =
                memberData.email;


            /*
              Firebase Authentication
              using real Gmail
            */

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const uid =
                result.user.uid;


            /*
              Store logged user details
              Later we will move this
              to AuthContext
            */

            localStorage.setItem(
                "user",
                JSON.stringify({
                    uid,
                    ...memberData
                })
            );

            // First login?
            if (memberData.mustChangePassword === true) {

                navigate("/change-password");

                return;

            }


            /*
              Temporary navigation

              Replace later with
              react-router navigate()
            */

            window.location.href =
                "/bookrummytable";


        }
        catch (err: any) {

            console.error(err);

            setError(
                err.message ||
                "Login failed"
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="
        w-full
        max-w-sm
        sm:max-w-md
        lg:max-w-lg
        mx-auto
        mt-10
        sm:mt-16
        px-4
        sm:px-6
        lg:px-8
    "
        >
            <div
                className="
            bg-white
            dark:bg-slate-800
            shadow-md
            rounded-lg
            p-5
            sm:p-6
            lg:p-8
        "
            >

                <h1
                    className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                mb-5
                text-center
            "
                >
                    Lotus Club Login
                </h1>


                <input
                    className="
                border
                rounded
                p-3
                w-full
                mb-4
                text-sm
                sm:text-base

                bg-white
                text-gray-900
                placeholder-gray-500

                dark:bg-slate-700
                dark:text-white
                dark:placeholder-gray-300

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
            "
                    placeholder="Enter membership no (Ex: LC0029)"
                    value={membershipNo}
                    onChange={
                        e =>
                            setMembershipNo(
                                e.target.value.toUpperCase()
                            )
                    }
                />


                <input
                    className="
                    border
                    rounded
                    p-3
                    w-full
                    mb-4
                    text-sm
                    sm:text-base

                    bg-white
                    text-gray-900
                    placeholder-gray-500

                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder-gray-300

                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
            "
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        e =>
                            setPassword(
                                e.target.value
                            )
                    }
                />


                {
                    error &&
                    <div
                        className="
                    text-red-600
                    text-sm
                    mb-4
                    text-center
                "
                    >
                        {error}
                    </div>
                }


                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                py-3
                rounded
                transition
                disabled:bg-gray-400
            "
                >
                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }
                </button>

            </div>
        </div>

    );

}

