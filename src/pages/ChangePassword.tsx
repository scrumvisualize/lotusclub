import { useState } from "react";

import {
    getAuth,
    updatePassword
}
    from "firebase/auth";

import {
    doc,
    updateDoc
}
    from "firebase/firestore";

import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import CommonModal from "../components/CommonModal";

export default function ChangePassword() {

    const [modal, setModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "error" as "success" | "error" | "warning"
    });

    const [redirectAfterModal, setRedirectAfterModal] =
        useState(false);

    const auth =
        getAuth();

    const navigate =
        useNavigate();

    const [password, setPassword] =
        useState("");

    const [confirm, setConfirm] =
        useState("");

    const savePassword = async () => {

        if (password !== confirm) {

            setModal({
                open: true,
                title: "Password Error",
                message: "Passwords do not match.",
                type: "error"
            });

            return;
        }

        if (password.length < 6) {

            setModal({
                open: true,
                title: "Weak Password",
                message: "Password must be at least 6 characters.",
                type: "warning"
            });
            return;
        }

        if (!auth.currentUser) {
            alert("User not logged in.");
            return;
        }

        try {

            await updatePassword(
                auth.currentUser,
                password
            );

            await updateDoc(
                doc(db, "members", auth.currentUser.uid),
                {
                    mustChangePassword: false
                }
            );

            const user = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            user.mustChangePassword = false;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setRedirectAfterModal(true);

            setModal({
                open: true,
                title: "Success",
                message: "Password updated successfully.",
                type: "success"
            });


            setTimeout(() => {

                navigate("/bookrummytable");

            }, 2000)

        } catch (error: any) {

            console.error(error);

            setModal({
                open: true,
                title: "Error",
                message:
                    error.message ||
                    "Unable to update password.",
                type: "error"
            });


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
        mt-6
        sm:mt-10
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
                <h2
                    className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                mb-5
                text-center
            "
                >
                    Change Password
                </h2>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                border
                rounded
                p-3
                w-full
                mb-4
                text-sm
                sm:text-base
            "
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="
                border
                rounded
                p-3
                w-full
                mb-5
                text-sm
                sm:text-base
            "
                />

                <button
                    onClick={savePassword}
                    className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                py-3
                rounded
                transition
            "
                >
                    Change Password
                </button>
            </div>

            <CommonModal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={() => {
                    setModal({
                        ...modal,
                        open: false,
                    });

                    if (redirectAfterModal) {
                        navigate("/bookrummytable");
                    }
                }}
            />
        </div>

    );

}