import { useEffect, useState } from "react";

import PlayerSelector from "../components/PlayerSelector";
import CardGrid from "../components/CardGrid";
import ResultTable from "../components/ResultTable";

import {
    type Card,
    type PlayerCard
} from "../types/card";

import {
    type BookingPlayer,
    type BankerNote
} from "../types/member";


import {
    createDeck
} from "../utils/deck";


import {
    collection,
    getDocs,
    doc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    serverTimestamp,
    arrayRemove
} from "firebase/firestore";


import { db } from "../firebase";

import InformationSlider from "../components/InformationSlider";


export default function BookRummyTable() {



    const loggedUser =
        JSON.parse(
            localStorage.getItem("user") || "null"
        );



    const isAdmin =
        loggedUser?.role === "admin";



    const MAX_PLAYERS = 11;

    // Fixed pool amount per player
    const RUMMY_POOL_AMOUNT = 10;



    /*
        MEMBERS
    */


    const [
        members,
        setMembers
    ] =
        useState<BookingPlayer[]>([]);





    /*
        CURRENT PLAYERS
    */


    const [
        selectedPlayers,
        setSelectedPlayers
    ] =
        useState<BookingPlayer[]>([]);





    /*
        PLAYERS WAITING AREA

        Players who are not currently playing

    */


    const [
        playersWaiting,
        setPlayersWaiting
    ] =
        useState<BookingPlayer[]>([]);





    /*
        FIFO QUEUE

        Allow Me clicked order

    */


    const [
        waitingQueue,
        setWaitingQueue
    ] =
        useState<BookingPlayer[]>([]);

    const [
        bankerNotes,
        setBankerNotes
    ] = useState<BankerNote[]>([]);


    const [
        newNote,
        setNewNote
    ] = useState("");



    /*
        GAME STATES
    */


    const [
        started,
        setStarted
    ] =
        useState(false);



    const [
        selectedColor,
        setSelectedColor
    ] =
        useState<
            "red" |
            "black" |
            null
        >(null);



    const [
        cards,
        setCards
    ] =
        useState<Card[]>([]);



    const [
        results,
        setResults
    ] =
        useState<PlayerCard[]>([]);



    const [
        activePlayer,
        setActivePlayer
    ] =
        useState<string | null>(null);



    const [
        pickedCards,
        setPickedCards
    ] =
        useState<string[]>([]);



    const [
        playerToRemove,
        setPlayerToRemove
    ] =
        useState<BookingPlayer | null>(null);



    const [
        clickedPlayer,
        setClickedPlayer
    ] =
        useState<string | null>(null);



    const [
        successMessage,
        setSuccessMessage
    ] =
        useState("");

    const [
        globalMessage,
        setGlobalMessage
    ] = useState("");

    const [
        globalMessageTime,
        setGlobalMessageTime
    ] = useState<number | null>(null);

    const [
        showGlobalMessage,
        setShowGlobalMessage
    ] = useState(false);

    const [
        globalMessageId,
        setGlobalMessageId
    ] = useState("");

    const [
        fadeGlobalMessage,
        setFadeGlobalMessage
    ] = useState(false);





    /*
        PREVENT DOUBLE PROMOTION

        Important because Firebase listener
        can fire multiple times

    */


    const [
        promotionRunning,
        setPromotionRunning
    ] =
        useState(false);

    const [
        rummyAmountPerPlayer,
        setRummyAmountPerPlayer
    ] = useState<number>(60);

    const [
        rummyAmountSavedMessage,
        setRummyAmountSavedMessage
    ] = useState("");

    const [
        showResultMode,
        setShowResultMode
    ] = useState(false);


    const hasAlreadyPicked =
        results.some(
            r =>
                r.uid === loggedUser?.uid
        );



    /*
        LOAD MEMBERS

    */


    useEffect(() => {


        const loadMembers =
            async () => {


                const snapshot =
                    await getDocs(
                        collection(
                            db,
                            "members"
                        )
                    );



                const list =
                    snapshot.docs
                        .filter(
                            doc =>
                                doc.data().active === true
                        )
                        .map(doc => {


                            const data =
                                doc.data();

                            //console.log("Load memebers" + JSON.stringify(data));

                            return {

                                uid:
                                    doc.id,


                                membershipNo:
                                    data.membershipNo,


                                name:
                                    data.name,

                                rummyAmount:
                                    data.rummyAmount || 0,

                                rummyPoolAmt:
                                    RUMMY_POOL_AMOUNT

                            };


                        });



                setMembers(list);


            };



        loadMembers();



    }, []);


    useEffect(() => {

        if (!globalMessage || !globalMessageId) {
            return;
        }


        // SHOW MESSAGE FIRST
        setShowGlobalMessage(true);

        setFadeGlobalMessage(false);



        const timer = setTimeout(() => {


            setFadeGlobalMessage(true);



            const hideTimer = setTimeout(() => {


                setShowGlobalMessage(false);


                // Mark as seen AFTER display finished
                localStorage.setItem(
                    "lastRummyMessageId",
                    globalMessageId
                );


            }, 1000);



            return () => clearTimeout(hideTimer);



        }, 3000);



        return () => clearTimeout(timer);



    }, [globalMessage, globalMessageId]);




    /*
        SINGLE BOOKING LISTENER

        Handles:

        selectedPlayers
        playersWaiting
        waitingQueue
        results

        ONLY PLACE WHERE PROMOTION
        IS TRIGGERED

    */


    useEffect(() => {


        const bookingRef =
            doc(
                db,
                "rummyBookings",
                "currentBooking"
            );



        const unsubscribe =
            onSnapshot(
                bookingRef,
                snapshot => {


                    if (!snapshot.exists()) {


                        setSelectedPlayers([]);

                        setPlayersWaiting([]);

                        setWaitingQueue([]);

                        setResults([]);

                        setGlobalMessage("");

                        setGlobalMessageTime(null);


                        return;

                    }


                    const data =
                        snapshot.data();

                    //console.log("Booking " + JSON.stringify(data));

                    // Load admin configured rummy amount
                    setRummyAmountPerPlayer(
                        data.rummyAmountPerPlayer || 60
                    );

                    const messageId =
                        data.globalMessageId;


                    if (
                        data.globalMessage &&
                        messageId &&
                        shouldShowGlobalMessage(messageId)
                    ) {

                        setGlobalMessage(
                            data.globalMessage
                        );

                        setGlobalMessageId(
                            messageId
                        );

                        setGlobalMessageTime(
                            data.globalMessageTime
                        );


                    }
                    else {

                        setGlobalMessage("");

                        setShowGlobalMessage(false);

                    }


                    const currentSelectedPlayers =
                        data.selectedPlayers || [];

                    setSelectedPlayers(currentSelectedPlayers);


                    const currentWaitingQueue =
                        data.waitingQueue || [];



                    const currentPlayersWaiting =
                        data.playersWaiting || [];





                    setSelectedPlayers(
                        currentSelectedPlayers
                    );



                    setPlayersWaiting(
                        currentPlayersWaiting
                    );



                    setWaitingQueue(
                        currentWaitingQueue
                    );



                    /*
                        Keep ResultTable working

                    */


                    setResults(
                        data.results || []
                    );

                    const currentResults =
                        data.results || [];


                    setResults(
                        currentResults
                    );


                    // Restore View Rummy Order after page refresh
                    if (loggedUser) {

                        const userHasResult =
                            currentResults.some(
                                (item: any) =>
                                    item.uid === loggedUser.uid
                            );


                        setShowResultMode(userHasResult);

                    }

                    setBankerNotes(
                        data.bankerNotes || []
                    );




                    /*
                        AUTO PROMOTION

                        Example:

                        Player leaves

                        11/12

                        Queue:
                        Jibi

                        Jibi joins automatically

                    */


                    promoteNextPlayer(
                        currentSelectedPlayers,
                        currentWaitingQueue,
                        currentPlayersWaiting
                    );


                }
            );




        return () =>
            unsubscribe();



    }, [members]);

    /*
    REMOVE DUPLICATES BY UID

*/


    const uniquePlayers =
        (
            players: BookingPlayer[]
        ) => {


            return [
                ...new Map(
                    players.map(
                        p => [
                            p.uid,
                            p
                        ]
                    )
                ).values()
            ];


        };



    /*
        PLAYER SELECTloggedUser 

        Add player
        or request leave

    */


    const handlePlayerSelect =
        async (
            player: BookingPlayer
        ) => {



            if (
                !isAdmin &&
                player.uid !== loggedUser?.uid
            ) {

                return;

            }




            const bookingRef =
                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                );





            const alreadySelected =
                selectedPlayers.some(
                    p =>
                        p.uid === player.uid
                );





            /*
                Leave request

            */


            if (alreadySelected) {


                setPlayerToRemove(player);


                return;


            }






            /*
                Available seat

            */


            if (
                selectedPlayers.length < MAX_PLAYERS
            ) {



                const updatedPlayers =
                    uniquePlayers(
                        [
                            ...selectedPlayers,
                            {
                                ...player,
                                // Use admin configured amount
                                rummyAmount:
                                    rummyAmountPerPlayer || 60,

                                rummyPoolAmt:
                                    RUMMY_POOL_AMOUNT
                            }
                        ]
                    );


                let updatedWaitingPlayers =
                    [
                        ...playersWaiting
                    ];




                /*
                    When table becomes full,
                    populate waiting area

                */


                if (
                    updatedPlayers.length >= MAX_PLAYERS
                ) {


                    updatedWaitingPlayers =
                        uniquePlayers(
                            [
                                ...playersWaiting,

                                ...members.filter(
                                    member =>
                                        !updatedPlayers.some(
                                            p => p.uid === member.uid
                                        )
                                        &&
                                        !waitingQueue.some(
                                            q => q.uid === member.uid
                                        )
                                        &&
                                        member.uid !== loggedUser?.uid
                                )
                            ]
                        );


                }

                // ADD THIS HERE

                updatedWaitingPlayers =
                    updatedWaitingPlayers.filter(
                        waiting =>
                            !updatedPlayers.some(
                                selected =>
                                    selected.uid === waiting.uid
                            )
                    );


                await updateDoc(
                    bookingRef,
                    {


                        selectedPlayers:
                            updatedPlayers,


                        playersWaiting:
                            updatedWaitingPlayers,


                        updatedAt:
                            serverTimestamp()


                    }
                );



                return;


            }



            /*
                Table full

                User must use Allow Me

            */


        };



    /*
        CONFIRM PLAYER LEAVE

        Remove player

        Promote queue automatically

    */


    const confirmRemovePlayer =
        async () => {



            if (!playerToRemove)
                return;




            const bookingRef =
                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                );


            let updatedPlayers =
                selectedPlayers.filter(
                    p =>
                        p.uid !== playerToRemove.uid
                );


            const updatedResults =
                results.filter(
                    r =>
                        r.uid !== playerToRemove.uid
                );



            let updatedWaiting =
                uniquePlayers(
                    [
                        ...playersWaiting,
                        playerToRemove
                    ]
                );



            let updatedQueue =
                [
                    ...waitingQueue
                ];




            /*
                If queue exists,
                immediately fill empty seat

            */


            if (
                updatedPlayers.length < MAX_PLAYERS
                &&
                updatedQueue.length > 0
            ) {



                const nextPlayer =
                    updatedQueue[0];




                updatedPlayers =
                    uniquePlayers(
                        [
                            ...updatedPlayers,
                            nextPlayer
                        ]
                    );





                updatedQueue =
                    updatedQueue.slice(1);





                updatedWaiting =
                    updatedWaiting.filter(
                        p =>
                            p.uid !== nextPlayer.uid
                    );


            }



            await updateDoc(
                bookingRef,
                {


                    selectedPlayers:
                        updatedPlayers,


                    playersWaiting:
                        updatedWaiting,


                    waitingQueue:
                        updatedQueue,


                    results:
                        updatedResults,


                    updatedAt:
                        serverTimestamp()


                }
            );



            setPlayerToRemove(null);



        };


    /*
        ALLOW ME

        Waiting Area

        -> Queue

        OR

        Direct Join if seat available

    */


    const handleAllowMe =
        async (
            player: BookingPlayer
        ) => {


            /*
                Security check
    
                Member:
                Can only allow himself
    
                Admin:
                Can allow anyone
    
            */

            if (
                !isAdmin &&
                player.uid !== loggedUser?.uid
            ) {

                return;

            }




            const bookingRef =
                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                );



            /*
                Prevent duplicate entry
    
            */

            const alreadyInQueue =
                waitingQueue.some(
                    p =>
                        p.uid === player.uid
                );



            const alreadyPlaying =
                selectedPlayers.some(
                    p =>
                        p.uid === player.uid
                );



            if (
                alreadyInQueue ||
                alreadyPlaying
            ) {

                return;

            }



            let updatedPlayers =
                [
                    ...selectedPlayers
                ];



            let updatedQueue =
                [
                    ...waitingQueue
                ];



            let updatedWaiting =
                playersWaiting.filter(
                    p =>
                        p.uid !== player.uid
                );



            /*
                Seat available
    
                Add directly to table
    
            */


            if (
                updatedPlayers.length < MAX_PLAYERS
            ) {



                updatedPlayers =
                    uniquePlayers(
                        [
                            ...updatedPlayers,
                            {
                                ...player,
                                rummyAmount:
                                    rummyAmountPerPlayer || 60,

                                rummyPoolAmt:
                                    RUMMY_POOL_AMOUNT
                            }
                        ]
                    );



            }

            else {


                /*
                    Table full
    
                    Add to FIFO queue
    
                */


                updatedQueue =
                    [
                        ...updatedQueue,
                        player
                    ];


            }


            /*
                FIX:
    
                Show confirmation first
    
                User sees:
    
                ✓ Added
    
    
                Then after 500ms,
                update Firebase
    
            */


            setClickedPlayer(
                player.uid
            );



            setSuccessMessage(
                updatedPlayers.some(
                    p =>
                        p.uid === player.uid
                )

                    ?

                    `✅ ${player.name} added`

                    :

                    `✅ ${player.name} added to waiting queue`

            );


            setTimeout(
                async () => {



                    await updateDoc(
                        bookingRef,
                        {


                            selectedPlayers:
                                updatedPlayers,


                            waitingQueue:
                                updatedQueue,


                            playersWaiting:
                                updatedWaiting,


                            updatedAt:
                                serverTimestamp()


                        }
                    );


                    setClickedPlayer(null);


                    setSuccessMessage("");



                },

                700

            );


        };


    /*
        PROMOTE FIRST QUEUE PLAYER

        FIFO

    */


    const promoteNextPlayer =
        async (
            currentSelectedPlayers: BookingPlayer[],
            currentWaitingQueue: BookingPlayer[],
            currentPlayersWaiting: BookingPlayer[]
        ) => {



            if (
                promotionRunning
            ) {

                return;

            }


            if (
                currentWaitingQueue.length === 0
            ) {

                return;

            }


            if (
                currentSelectedPlayers.length >= MAX_PLAYERS
            ) {

                return;

            }


            setPromotionRunning(true);




            try {



                const nextPlayer =
                    currentWaitingQueue[0];



                const updatedPlayers =
                    uniquePlayers(
                        [
                            ...currentSelectedPlayers,
                            nextPlayer
                        ]
                    );


                const updatedQueue =
                    currentWaitingQueue.slice(1);



                const updatedWaiting =
                    currentPlayersWaiting.filter(
                        p =>
                            p.uid !== nextPlayer.uid
                    );



                const bookingRef =
                    doc(
                        db,
                        "rummyBookings",
                        "currentBooking"
                    );



                await updateDoc(
                    bookingRef,
                    {


                        selectedPlayers:
                            updatedPlayers,


                        waitingQueue:
                            updatedQueue,


                        playersWaiting:
                            updatedWaiting,


                        updatedAt:
                            serverTimestamp()


                    }
                );



            }


            finally {


                setPromotionRunning(false);


            }


        };



    const addBankerNote = async () => {


        if (!newNote.trim())
            return;


        const bookingRef =
            doc(
                db,
                "rummyBookings",
                "currentBooking"
            );


        const note: BankerNote = {

            id:
                crypto.randomUUID(),

            text:
                newNote.trim(),

            createdBy:
                loggedUser?.name || "Unknown",

            createdAt:
                Date.now()

        };


        await updateDoc(
            bookingRef,
            {

                bankerNotes:
                    arrayUnion(note),


                updatedAt:
                    serverTimestamp()

            }
        );


        setNewNote("");

    };


    const removeBankerNote = async (
        note: BankerNote
    ) => {

        const canRemove =
            isAdmin ||
            note.createdBy === loggedUser?.name;


        if (!canRemove) {

            return;

        }


        const bookingRef =
            doc(
                db,
                "rummyBookings",
                "currentBooking"
            );


        await updateDoc(
            bookingRef,
            {

                bankerNotes:
                    arrayRemove(note),

                updatedAt:
                    serverTimestamp()

            }
        );


    };



    /*
START GAME

*/


    const startGame =
        async () => {


            if (
                selectedPlayers.length === 0
            )
                return;


            await updateDoc(

                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                ),

                {


                    selectedPlayers,


                    updatedAt:
                        serverTimestamp()


                }

            );



            const shuffledDeck =
                [
                    ...createDeck()
                ]
                    .sort(
                        () =>
                            Math.random() - 0.5
                    );


            setCards(
                shuffledDeck
            );


            setStarted(true);


            setSelectedColor(null);


            setActivePlayer(null);



        };



    /*
        BACK BUTTON

    */


    const goBack =
        () => {


            setStarted(false);


            setSelectedColor(null);


            setActivePlayer(null);

            if (isUserJoined) {
                setShowResultMode(true);
            }


        };



    /*
        PICK CARD

    */


    const handlePick =
        async (
            card: Card
        ) => {


            if (!activePlayer)
                return;


            const player =
                selectedPlayers.find(
                    p =>
                        p.name === activePlayer
                );




            if (!player)
                return;





            const alreadyPicked =
                results.some(
                    r =>
                        r.uid === player.uid
                );




            if (alreadyPicked) {


                alert(
                    "You have already selected a card"
                );


                setActivePlayer(null);


                return;


            }



            if (
                pickedCards.includes(card.id)
            ) {

                return;

            }



            const bookingRef =
                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                );



            await updateDoc(
                bookingRef,
                {


                    pickedCards:
                        arrayUnion(
                            card.id
                        ),



                    results:
                        arrayUnion(
                            {


                                uid:
                                    player.uid,


                                player:
                                    player.name,


                                card,



                                order:
                                    results.length + 1



                            }
                        ),



                    updatedAt:
                        serverTimestamp()


                }
            );


            setActivePlayer(null);


        };


    /*
        NEW GAME RESET

    */



    const handleNewGame =
        async () => {


            try {


                const bookingRef =
                    doc(
                        db,
                        "rummyBookings",
                        "currentBooking"
                    );




                await updateDoc(
                    bookingRef,
                    {


                        selectedPlayers: [],


                        playersWaiting: [],


                        waitingQueue: [],


                        pickedCards: [],


                        results: [],

                        bankerNotes: [],

                        globalMessage:
                            "🎉 New game started ! Book your rummy seat now and join the table.",

                        globalMessageId:
                            crypto.randomUUID(),

                        globalMessageTime:
                            Date.now(),

                        status:
                            "waiting",


                        updatedAt:
                            serverTimestamp()


                    }
                );




                setStarted(false);


                setCards([]);


                setResults([]);


                setPickedCards([]);

                setShowGlobalMessage(true);

                setShowResultMode(false);




            }


            catch (error) {


                console.error(
                    "Reset error",
                    error
                );


            }


        };

    const isUserJoined =
        selectedPlayers.some(
            player =>
                player.uid === loggedUser?.uid
        );


    const formatNoteTime = (timestamp: number) => {

        return new Date(timestamp)
            .toLocaleString(
                "en-AU",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    };

    const shouldShowGlobalMessage = (
        messageId: string
    ) => {

        const lastSeen =
            localStorage.getItem(
                "lastRummyMessageId"
            );


        return lastSeen !== messageId;

    };



    return (

        <div
            className="
            min-h-screen
            bg-gray-100
            dark:bg-slate-950
            py-6
            px-3
            transition-colors
            "
        >

            <div
                className="
            max-w-5xl
            mx-auto
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow-lg
            border
            border-gray-200
            dark:border-slate-700
            p-4
            sm:p-6
            transition-colors
        "
            >


                <h1 className="text-2xl font-bold mb-4 mx-4">

                    Rummy Table Booking

                </h1>


                <InformationSlider />

                {
                    globalMessage && showGlobalMessage && (

                        <div
                            className={`
                                relative
                                mx-4
                                mt-4
                                mb-4
                                rounded-xl
                                border
                                border-orange-300
                                bg-orange-50
                                dark:border-orange-700
                                dark:bg-orange-900
                                p-4
                                transition-opacity
                                duration-1000
                                ${fadeGlobalMessage
                                    ? "opacity-0"
                                    : "opacity-100"
                                }
                            `}
                        >

                            <button
                                onClick={() =>
                                    setShowGlobalMessage(false)
                                }
                                className="
                                absolute
                                top-2
                                right-3
                                text-xl
                                font-bold
                                text-gray-700
                                hover:text-black
                                z-10
                                "
                            >
                                ×
                            </button>

                            <div className="font-semibold pr-8">

                                {globalMessage}

                            </div>

                            {
                                globalMessageTime && (

                                    <div
                                        className="
                            text-xs
                            text-gray-600
                            mt-1
                        "
                                    >

                                        {
                                            new Date(
                                                globalMessageTime
                                            ).toLocaleString(
                                                "en-AU"
                                            )
                                        }

                                    </div>

                                )
                            }

                        </div>

                    )
                }

                {!started && (

                    <>


                        <PlayerSelector

                            selectedPlayers={
                                selectedPlayers
                            }


                            players={
                                members
                            }


                            onSelect={
                                handlePlayerSelect
                            }


                            loggedUser={
                                loggedUser
                            }


                            isAdmin={
                                isAdmin
                            }


                        />

                        {
                            isAdmin &&

                            <div
                                className="
                                mx-4
                                mt-4
                                p-4
                                border
                                rounded-lg
                                bg-blue-50
                                dark:bg-blue-900/20
                                "
                            >

                                <h3 className="font-bold mb-3">
                                    💰 Set Rummy Amount Per Player
                                </h3>


                                <div className="
                                flex
                                gap-3
                                items-center
                            ">

                                    <input

                                        type="number"

                                        value={rummyAmountPerPlayer}

                                        onChange={(e) =>
                                            setRummyAmountPerPlayer(
                                                Number(e.target.value)
                                            )
                                        }

                                        className="
                                        border
                                        rounded
                                        px-3
                                        py-2
                                        w-32
                                        dark:bg-slate-800
                                        "
                                    />


                                    <button

                                        onClick={async () => {

                                            await updateDoc(
                                                doc(
                                                    db,
                                                    "rummyBookings",
                                                    "currentBooking"
                                                ),
                                                {
                                                    rummyAmountPerPlayer,
                                                    updatedAt:
                                                        serverTimestamp()
                                                }
                                            );

                                            // Show confirmation message
                                            setRummyAmountSavedMessage(
                                                `✅ New amount set to $${rummyAmountPerPlayer} per player`
                                            );


                                            // Hide message after 3 seconds
                                            setTimeout(() => {

                                                setRummyAmountSavedMessage("");

                                            }, 3000);

                                        }}

                                        className="
                                        px-4
                                        py-2
                                        bg-green-600
                                        text-white
                                        rounded-lg
                                        "
                                    >
                                        Save

                                    </button>

                                    {
                                        rummyAmountSavedMessage &&

                                        <div
                                            className="
                                        mt-3
                                        text-green-700
                                        bg-green-100
                                        dark:bg-green-900/30
                                        dark:text-green-300
                                        px-3
                                        py-2
                                        rounded-lg
                                        "
                                        >

                                            {rummyAmountSavedMessage}

                                        </div>
                                    }


                                </div>


                            </div>
                        }


                        <button


                            disabled={
                                !showResultMode &&
                                selectedPlayers.length === 0
                            }

                            onClick={() => {

                                if (showResultMode) {

                                    setStarted(true);

                                    return;
                                }

                                startGame();

                            }}



                            className={`

                            mt-4
                            px-4
                            py-2
                            mx-4
                            rounded
                            text-white


                            ${selectedPlayers.length > 0

                                    ?

                                    "bg-green-600 hover:bg-green-700"

                                    :

                                    "bg-gray-400 cursor-not-allowed"

                                }


                        `}



                        >

                            {
                                showResultMode
                                    ? "View Rummy Order"
                                    : "Join Rummy Table"
                            }


                        </button>


                        {
                            successMessage &&


                            <div className="
                            mt-3
                            mx-4
                            bg-green-100
                            text-green-700
                            p-3
                            rounded
                        ">


                                {successMessage}


                            </div>

                        }



                        {
                            playersWaiting.length > 0 &&


                            <div className="
                            mt-5
                            mx-4
                            p-4
                            border
                            rounded-lg
                        ">



                                <h3 className="font-bold mb-3">


                                    Players waiting for a spot if someone leaves


                                </h3>


                                {
                                    playersWaiting.map(
                                        (player, index) => (


                                            <div
                                                key={
                                                    player.uid
                                                }

                                                className="
                                        flex
                                        justify-between
                                        items-center
                                        mb-2
                                        "
                                            >



                                                <span>


                                                    {index + 1}.
                                                    {" "}
                                                    {player.name}


                                                </span>


                                                <button

                                                    disabled={
                                                        !isAdmin &&
                                                        player.uid !== loggedUser?.uid
                                                    }

                                                    onClick={() =>
                                                        handleAllowMe(player)
                                                    }


                                                    className={`

                                                    px-3
                                                    py-1
                                                    rounded
                                                    transition


                                                    ${clickedPlayer === player.uid

                                                            ?

                                                            "bg-green-600 text-white"


                                                            :

                                                            (
                                                                !isAdmin &&
                                                                player.uid !== loggedUser?.uid
                                                            )

                                                                ?

                                                                "bg-gray-300 text-gray-500 cursor-not-allowed"


                                                                :

                                                                "bg-blue-600 hover:bg-blue-700 text-white"

                                                        }

                                                    `}

                                                >


                                                    {
                                                        clickedPlayer === player.uid

                                                            ?

                                                            "✓ Added"

                                                            :

                                                            "Allow Me"

                                                    }


                                                </button>



                                            </div>


                                        )
                                    )

                                }



                            </div>


                        }


                        {
                            waitingQueue.length > 0 &&


                            <div className="
                            mt-5
                            mx-4
                            p-4
                            bg-yellow-50
                            rounded-lg
                        ">


                                <b>

                                    Waiting Queue

                                </b>




                                {
                                    waitingQueue.map(
                                        (player, index) => (


                                            <div key={player.uid}>


                                                {index + 1}.
                                                {" "}
                                                {player.name}


                                            </div>


                                        )

                                    )

                                }



                            </div>

                        }

                        <div
                            className="
                            mt-5
                            mx-4
                            p-4
                            border
                            rounded-lg
                            bg-yellow-50
                            dark:bg-yellow-900/20
                            "
                        >


                            <h3 className="font-bold mb-3">
                                💰 Banker Notes
                            </h3>


                            <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            mb-3
                            ">

                                <input

                                    value={newNote}

                                    onChange={(e) =>
                                        setNewNote(e.target.value)
                                    }

                                    placeholder="Add note..."

                                    className="
                                    flex-1
                                    border
                                    rounded
                                    px-3
                                    py-2
                                    dark:bg-slate-800
                                    "

                                />


                                <button

                                    onClick={addBankerNote}

                                    className="
                                    w-full
                                    sm:w-auto
                                    px-5
                                    py-2
                                    bg-blue-600
                                    text-white
                                    rounded-lg
                                    "
                                >
                                    Add Note
                                </button>


                            </div>



                            {
                                bankerNotes.map(note => (


                                    <div

                                        key={note.id}

                                        className="
                                        flex
                                        justify-between
                                        items-center
                                        bg-white
                                        dark:bg-slate-800
                                        rounded
                                        p-3
                                        mb-2
                                        "
                                    >

                                        <div>

                                            <div>
                                                💵 {note.text}
                                            </div>


                                            <div className="
                                            text-xs
                                            text-gray-500
                                            italic
                                            ">

                                                Added by {note.createdBy}
                                                {" • "}

                                                {formatNoteTime(note.createdAt)}

                                            </div>


                                        </div>


                                        {
                                            (
                                                isAdmin ||
                                                note.createdBy === loggedUser?.name
                                            )
                                            &&

                                            <button

                                                onClick={() =>
                                                    removeBankerNote(note)
                                                }

                                                className="
                                                text-red-600
                                                "
                                            >
                                                ✕
                                            </button>

                                        }



                                    </div>


                                ))

                            }


                        </div>




                    </>


                )}



                {
                    started &&

                    <>


                        <button

                            onClick={
                                goBack
                            }


                            className="
                            mx-4
                            mb-4
                            px-4
                            py-2
                            bg-gray-600
                            text-white
                            rounded
                            "

                        >

                            ← Back


                        </button>





                        {
                            !selectedColor &&

                            <div className="
                                text-center
                                mb-6
                                ">

                                <h3 className="
                                text-xl
                                font-bold
                                mb-4
                                ">
                                    Choose Card Colour
                                </h3>


                                <div className="
                                flex
                                justify-center
                                gap-3
                                px-2
                                ">


                                    <button

                                        onClick={() =>
                                            setSelectedColor("red")
                                        }

                                        className="
                                        w-36
                                        sm:w-auto
                                        px-4
                                        py-3
                                        bg-red-600
                                        text-white
                                        rounded-lg
                                        text-sm
                                        sm:text-base
                                        "

                                    >
                                        🔴 Red Cards

                                    </button>



                                    <button

                                        onClick={() =>
                                            setSelectedColor("black")
                                        }

                                        className="
                                        w-36
                                        sm:w-auto
                                        px-4
                                        py-3
                                        bg-black
                                        text-white
                                        rounded-lg
                                        text-sm
                                        sm:text-base
                                        "
                                    >
                                        ⚫ Black Cards

                                    </button>

                                </div>


                            </div>
                        }


                        {
                            selectedColor &&


                            <>


                                <div>


                                    {
                                        selectedPlayers.map(
                                            player => (


                                                <button

                                                    key={
                                                        player.uid
                                                    }


                                                    onClick={() =>
                                                        setActivePlayer(
                                                            player.name
                                                        )
                                                    }


                                                    className="
                                                m-1
                                                px-3
                                                py-1
                                                border
                                                rounded
                                                "

                                                >

                                                    {player.name}


                                                </button>


                                            )

                                        )

                                    }


                                </div>




                                {
                                    activePlayer &&


                                    <div className="
                                text-center
                                text-blue-600
                                font-semibold
                                mb-4
                                ">


                                        👉 {activePlayer},
                                        click a card


                                    </div>


                                }


                                <CardGrid

                                    cards={
                                        cards
                                    }


                                    onPick={
                                        handlePick
                                    }


                                    pickedCards={
                                        pickedCards
                                    }


                                    disabled={
                                        hasAlreadyPicked
                                    }

                                />

                            </>


                        }



                    </>


                }


                {
                    started &&
                    results.length > 0 &&


                    <ResultTable

                        results={
                            results
                        }


                        selectedPlayers={
                            selectedPlayers
                        }


                        onReset={
                            handleNewGame
                        }


                        userRole={
                            isAdmin
                                ?
                                "admin"
                                :
                                "member"
                        }


                    />


                }


                {
                    playerToRemove &&

                    <div className="
                    fixed
                    inset-0
                    bg-black/40
                    flex
                    items-center
                    justify-center
                    z-50
                ">


                        <div className="
                        bg-white
                        dark:bg-slate-800
                        text-gray-900
                        dark:text-white
                        rounded-2xl
                        p-6
                        w-80
                        text-center
                    ">



                            <div className="text-4xl mb-3">

                                ⚠️

                            </div>



                            <h2 className="
                            font-bold
                            text-lg
                            mb-3
                            text-gray-900
                            dark:text-white
                            ">

                                Leave Rummy Table?

                            </h2>




                            <p className="mb-5 
                                text-gray-700
                                dark:text-gray-200">

                                Remove

                                <b className="
                                text-gray-900
                                dark:text-white
                            ">
                                    {" "}
                                    {playerToRemove.name}
                                </b>

                                {" "}
                                from table?

                            </p>




                            <div className="
                            flex
                            justify-center
                            gap-4
                            ">


                                <button

                                    onClick={() =>
                                        setPlayerToRemove(null)
                                    }

                                    className="
                                    px-4
                                    py-2
                                    rounded
                                    bg-gray-300
                                    dark:bg-slate-600
                                    dark:text-white
                                    hover:bg-gray-400
                                    dark:hover:bg-slate-500
                                    "
                                >

                                    Cancel


                                </button>




                                <button

                                    onClick={
                                        confirmRemovePlayer
                                    }

                                    className="
                                    px-4
                                    py-2
                                    rounded
                                    bg-red-600
                                    text-white
                                    hover:bg-red-700
                                    "
                                >

                                    Leave


                                </button>

                            </div>


                        </div>


                    </div>


                }

            </div>
        </div>
    );

}
