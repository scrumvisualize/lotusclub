import { useEffect, useState } from "react";

import {
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    collection
} from "firebase/firestore";

import { db } from "../firebase";

import type { UserRequest } from "../types/request";
import { Phone } from "lucide-react";


type Props = {
    setIsLoading: (value: boolean) => void;
};


const Requests = ({ setIsLoading }: Props) => {

    const [requests, setRequests] = useState<UserRequest[]>([]);
    const [search, setSearch] = useState("");
    const [selectedRequest, setSelectedRequest] =
        useState<UserRequest | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);



    useEffect(() => {

        const q = query(
            collection(db, "requests"),
            orderBy("createdAt", "desc")
        );

        setIsLoading(true);
        const unsubscribe = onSnapshot(q, (snapshot) => {

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserRequest[];


            setRequests(data);
            // Stop loader after Firebase data arrives
            setIsLoading(false);

        });


        return () => unsubscribe();


    }, [setIsLoading]);



    const deleteRequest = async () => {

        if (!deleteId) return;


        try {

            await deleteDoc(
                doc(db, "requests", deleteId)
            );


            setDeleteId(null);


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

        }

    };



    const filteredRequests = requests.filter(item =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
        ||
        item.mobile.includes(search)
        ||
        item.message
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const visibleRequests = filteredRequests.slice(
        0,
        visibleCount
    );



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

                <h1
                    className="
                        text-4xl
                        font-bold
                        text-center
                        text-slate-800
                        dark:text-white
                        "
                >
                    Joining Requests
                </h1>


                <input
                    type="text"
                    placeholder="Search by name, mobile..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        mt-6
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        dark:bg-slate-900
                        dark:text-white
                    "
                />

                <div className="mt-6 space-y-4">

                    {

                        visibleRequests.length === 0 ? (

                            <div
                                className="
                                mt-10
                                bg-white
                                dark:bg-slate-900
                                rounded-3xl
                                shadow-md
                                border
                                border-gray-100
                                dark:border-slate-800
                                p-8
                                text-center
                                "
                            >

                                <div
                                    className="
                                w-14
                                h-14
                                mx-auto
                                rounded-full
                                bg-blue-100
                                dark:bg-blue-900
                                flex
                                items-center
                                justify-center
                                text-2xl
                                "
                                >
                                    📭
                                </div>


                                <h3
                                    className="
                                    mt-4
                                    text-xl
                                    font-semibold
                                    text-slate-800
                                    dark:text-white
                                    "
                                >
                                    No Requests Available
                                </h3>


                                <p
                                    className="
                                mt-2
                                text-gray-500
                                dark:text-gray-400
                                "
                                >
                                    There are currently no requests to display.
                                </p>

                            </div>

                        ) : (

                            visibleRequests.map(request => (

                                <div
                                    key={request.id}
                                    onClick={() =>
                                        setSelectedRequest(request)
                                    }
                                    className="
                                    bg-white
                                    dark:bg-slate-900
                                    rounded-2xl
                                    shadow-md
                                    p-5
                                    cursor-pointer
                                    border
                                    border-gray-100
                                    dark:border-slate-800
                                    hover:shadow-xl
                                    transition-all
                                    duration-300
                                   "
                                >

                                    <div
                                        className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    "
                                    >

                                        {/* Name + Mobile */}
                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-4
                                            min-w-0
                                            "
                                        >

                                            <div
                                                className="
                                            w-11
                                            h-11
                                            rounded-full
                                            bg-blue-100
                                            dark:bg-blue-900
                                            flex
                                            items-center
                                            justify-center
                                            text-blue-600
                                            dark:text-blue-300
                                            font-bold
                                            "
                                            >
                                                {request.name.charAt(0).toUpperCase()}
                                            </div>


                                            <div>

                                                <h3
                                                    className="
                                                font-semibold
                                                text-lg
                                                text-slate-800
                                                dark:text-white
                                                "
                                                >
                                                    {request.name}
                                                </h3>


                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-gray-500
                                                    dark:text-gray-400
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
                                                        {request.mobile}
                                                    </span>

                                                    <div
                                                        className="
                                                    text-xs
                                                    text-gray-400
                                                    dark:text-gray-500
                                                    mt-1
                                                    mx-4
                                                    "
                                                    >
                                                        {request.createdAt?.toDate
                                                            ? request.createdAt.toDate().toLocaleString()
                                                            : ""
                                                        }
                                                    </div>
                                                </div>



                                            </div>

                                        </div>


                                        {/* Delete */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteId(request.id);
                                            }}
                                            className="
                                            px-3
                                            py-1.5
                                            rounded-full
                                            text-sm
                                            text-red-500
                                            hover:bg-red-50
                                            dark:hover:bg-red-900/30
                                            transition
                                            "
                                        >
                                            🗑 Delete
                                        </button>


                                    </div>


                                </div>

                            ))

                        )
                    }


                </div>

                {
                    visibleCount < filteredRequests.length && (

                        <div
                            className="
                            flex
                            justify-center
                            mt-6
                           "
                        >

                            <button
                                onClick={() =>
                                    setVisibleCount(
                                        prev => prev + 5
                                    )
                                }
                                className="
                                px-6
                                py-3
                                rounded-full
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-semibold
                                shadow-md
                                transition
                            "
                            >
                                Show More
                            </button>

                        </div>

                    )
                }


            </div>



            {
                selectedRequest && (

                    <div
                        className="
                            fixed
                            inset-0
                            bg-black/50
                            flex
                            items-center
                            justify-center
                            p-5
                        "
                    >

                        <div
                            className="
                                bg-white
                                dark:bg-slate-900
                                rounded-3xl
                                p-6
                                max-w-md
                                w-full
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    dark:text-white
                                "
                            >
                                {selectedRequest.name}
                            </h2>


                            <p className="mt-2">
                                📱 {selectedRequest.mobile}
                            </p>


                            <p
                                className="
                                    mt-4
                                    dark:text-gray-300
                                "
                            >
                                {selectedRequest.message}
                            </p>


                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="
                                    mt-6
                                    px-5
                                    py-2
                                    rounded-full
                                    bg-blue-600
                                    text-white
                                "
                            >
                                Close
                            </button>

                        </div>

                    </div>

                )
            }

            {
                deleteId && (

                    <div
                        className="
                        fixed
                        inset-0
                        z-50
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        p-5
                    "
                    >

                        <div
                            className="
                            bg-white
                            dark:bg-slate-900
                            rounded-3xl
                            shadow-2xl
                            p-6
                            w-full
                            max-w-sm
                            text-center
                        "
                        >

                            <h2
                                className="
                                text-xl
                                font-bold
                                text-slate-800
                                dark:text-white
                               "
                            >
                                Delete Request?
                            </h2>


                            <p
                                className="
                                mt-3
                                text-gray-500
                                dark:text-gray-400
                                "
                            >
                                Are you sure you want to remove this request?
                            </p>


                            <div
                                className="
                                mt-6
                                flex
                                justify-center
                                gap-4
                                "
                            >

                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border
                                    border-gray-300
                                    dark:border-slate-600
                                   "
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={deleteRequest}
                                    className="
                                    px-5
                                    py-2
                                    rounded-full
                                    bg-red-600
                                    text-white
                                    hover:bg-red-700
                                   "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
        </div>

    );

};


export default Requests;


