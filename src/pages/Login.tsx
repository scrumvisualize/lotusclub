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

        <div className="max-w-md mx-auto mt-20 p-6">

            <h1 className="text-2xl font-bold mb-5">
                Lotus Club Login
            </h1>


            <input
                className="border p-2 w-full mb-3 rounded"
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
                className="border p-2 w-full mb-3 rounded"
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
                <div className="text-red-600 mb-3">
                    {error}
                </div>
            }


            <button
                onClick={handleLogin}
                disabled={loading}
                className="
                    bg-blue-600 
                    text-white 
                    px-4 
                    py-2 
                    rounded
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

    );

}

