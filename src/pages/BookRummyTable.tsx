import { useEffect, useState } from "react";
import PlayerSelector from "../components/PlayerSelector";
import CardGrid from "../components/CardGrid";
import ResultTable from "../components/ResultTable";

import { type Card, type PlayerCard } from "../types/card";
import { type BookingPlayer } from "../types/member";

import { createDeck } from "../utils/deck";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    serverTimestamp,
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



    const MAX_PLAYERS = 12;

    const tableId = "currentTable";



    /*
        MEMBERS
    */

    const [members, setMembers] =
        useState<BookingPlayer[]>([]);




    /*
        CURRENT PLAYERS
    */

    const [selectedPlayers, setSelectedPlayers] =
        useState<BookingPlayer[]>([]);




    /*
        PLAYERS WHO LEFT

        Waiting for vacancy

    */

    const [playersWaiting, setPlayersWaiting] =
        useState<BookingPlayer[]>([]);




    /*
        FIFO QUEUE

        Players clicked Allow Me

    */

    const [waitingQueue, setWaitingQueue] =
        useState<BookingPlayer[]>([]);





    /*
        GAME STATES
    */


    const [started, setStarted] =
        useState(false);



    const [selectedColor, setSelectedColor] =
        useState<"red" | "black" | null>(null);



    const [cards, setCards] =
        useState<Card[]>([]);



    const [results, setResults] =
        useState<PlayerCard[]>([]);



    const [activePlayer, setActivePlayer] =
        useState<string | null>(null);



    const [pickedCards, setPickedCards] =
        useState<string[]>([]);



    const [playerToRemove, setPlayerToRemove] =
        useState<BookingPlayer | null>(null);



    const [clickedPlayer, setClickedPlayer] =
        useState<string | null>(null);



    const [successMessage, setSuccessMessage] =
        useState("");





    const hasAlreadyPicked =
        results.some(
            r =>
                r.uid === loggedUser?.uid
        );


    /*
        LOAD MEMBERS

    */


    useEffect(() => {


        const loadMembers = async () => {


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


                        return {

                            uid:
                                doc.id,


                            membershipNo:
                                data.membershipNo,


                            name:
                                data.name

                        };


                    });



            setMembers(list);


        };



        loadMembers();



    }, []);



    /*
        BOOKING LISTENER


        selectedPlayers

        playersWaiting

        waitingQueue

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


                    if (snapshot.exists()) {


                        const data =
                            snapshot.data();



                        setSelectedPlayers(
                            data.selectedPlayers || []
                        );



                        setPlayersWaiting(
                            data.playersWaiting || []
                        );



                        setWaitingQueue(
                            data.waitingQueue || []
                        );

                        /*
                            Check if seat available

                            If yes:
                            automatically promote
                            first queue player

                        */

                        setTimeout(() => {

                            promoteNextPlayer();

                        }, 300);


                    }
                    else {


                        setSelectedPlayers([]);

                        setPlayersWaiting([]);

                        setWaitingQueue([]);


                    }


                }
            );



        return () => unsubscribe();



    }, []);




    /*
        TABLE LISTENER


        Results

        Cards

    */


    useEffect(() => {


        const tableRef =
            doc(
                db,
                "rummyTables",
                tableId
            );



        const unsubscribe =
            onSnapshot(
                tableRef,
                snapshot => {


                    if (!snapshot.exists()) {

                        //setLoading(false);

                        return;

                    }



                    const data =
                        snapshot.data();




                    if (data.usedCards) {


                    }




                    if (data.results) {

                        setResults(
                            data.results
                        );

                    }
                    else {

                        setResults([]);

                    }



                }
            );



        return () => unsubscribe();



    }, []);






    /*
        REMOVE DUPLICATES BY UID

        Prevents:

        John
        John
        John

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
        PLAYER SELECT


        Add player to table

        or

        remove request

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
                User wants to leave

            */


            if (alreadySelected) {


                setPlayerToRemove(player);

                return;

            }








            /*
                Seat available

            */


            if (
                selectedPlayers.length < MAX_PLAYERS
            ) {



                const updatedPlayers =
                    uniquePlayers(
                        [
                            ...selectedPlayers,
                            player
                        ]
                    );


                /*
                Add player to Joined list

                Then calculate remaining
                players for Waiting area

                */


                /*
                Only create waiting area
                when maximum players reached

                Example:

                MAX_PLAYERS = 2

                Player 1 joins
                -> no waiting list


                Player 2 joins
                -> create waiting list

                */

                let updatedWaitingPlayers: BookingPlayer[] = [];


                if (updatedPlayers.length >= MAX_PLAYERS) {

                    updatedWaitingPlayers =
                        members.filter(
                            member =>
                                !updatedPlayers.some(
                                    p =>
                                        p.uid === member.uid
                                )
                        );

                }



                await updateDoc(
                    bookingRef,
                    {

                        selectedPlayers:
                            updatedPlayers,


                        /*
                            Players who are not playing
                
                            They see:
                            Allow Me button
                
                        */

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

                Add to queue

            */


        };





    /*
        CONFIRM PLAYER LEAVE


        Selected Players

                ↓

        Players Waiting

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




            const updatedPlayers =
                selectedPlayers.filter(
                    p =>
                        p.uid !== playerToRemove.uid
                );



            const updatedResults =
                results.filter(
                    r =>
                        r.uid !== playerToRemove.uid
                );




            const updatedWaiting =
                uniquePlayers(
                    [
                        ...playersWaiting,
                        playerToRemove
                    ]
                );

            /*
            Check waiting queue immediately
            after removing player

            If slot available:
            Promote first queue player

            */

            let finalPlayers = updatedPlayers;
            let finalQueue = waitingQueue;
            let finalWaiting = updatedWaiting;


            if (
                finalPlayers.length < MAX_PLAYERS &&
                finalQueue.length > 0
            ) {


                const nextPlayer =
                    finalQueue[0];


                // Add first queue player

                finalPlayers =
                    uniquePlayers(
                        [
                            ...finalPlayers,
                            nextPlayer
                        ]
                    );


                // Remove from queue

                finalQueue =
                    finalQueue.slice(1);


                // Remove from waiting area

                finalWaiting =
                    finalWaiting.filter(
                        p =>
                            p.uid !== nextPlayer.uid
                    );

            }


            await updateDoc(
                bookingRef,
                {

                    selectedPlayers:
                        finalPlayers,


                    playersWaiting:
                        finalWaiting,


                    waitingQueue:
                        finalQueue,


                    results:
                        updatedResults,


                    updatedAt:
                        serverTimestamp()

                }
            );


            setSelectedPlayers(
                finalPlayers
            );


            setPlayersWaiting(
                finalWaiting
            );


            setWaitingQueue(
                finalQueue
            );



            setResults(
                updatedResults
            );



            setPlayerToRemove(null);


        };







    /*
        ALLOW ME BUTTON


        Players Waiting

                ↓

        Waiting Queue

    */



    /*
        ALLOW ME BUTTON

        Player waiting area
                |
                |
                v
        FIFO Waiting Queue


        Order of click decides position

    */


    const handleAllowMe =
        async (player: BookingPlayer) => {


            const bookingRef =
                doc(
                    db,
                    "rummyBookings",
                    "currentBooking"
                );



            /*
                Prevent duplicate queue entry
        
            */

            const alreadyInQueue =
                waitingQueue.some(
                    p =>
                        p.uid === player.uid
                );


            if (alreadyInQueue)
                return;




            /*
                Add player to FIFO queue
        
                Example:
        
                Player 4 clicked first
        
                Queue:
                Player 4
        
        
                Player 3 clicked next
        
                Queue:
                Player 4
                Player 3
        
            */


            const updatedQueue =
                [
                    ...waitingQueue,
                    player
                ];




            /*
                Remove from waiting area
        
            */

            const updatedPlayersWaiting =
                playersWaiting.filter(
                    p =>
                        p.uid !== player.uid
                );





            await updateDoc(
                bookingRef,
                {

                    waitingQueue:
                        updatedQueue,


                    playersWaiting:
                        updatedPlayersWaiting,


                    updatedAt:
                        serverTimestamp()

                }
            );



            setWaitingQueue(
                updatedQueue
            );


            setPlayersWaiting(
                updatedPlayersWaiting
            );



            setClickedPlayer(
                player.uid
            );



            setSuccessMessage(
                `✅ ${player.name} added to waiting queue`
            );



            setTimeout(
                () => {

                    setClickedPlayer(null);

                    setSuccessMessage("");

                },
                2000
            );


        };






    /*
        PROMOTE FIRST QUEUE PLAYER


        FIFO

        Queue[0]

    */


    const promoteNextPlayer =
        async () => {


            if (
                waitingQueue.length === 0
            )
                return;



            if (
                selectedPlayers.length >= MAX_PLAYERS
            )
                return;



            const nextPlayer =
                waitingQueue[0];



            const updatedPlayers =
                uniquePlayers(
                    [
                        ...selectedPlayers,
                        nextPlayer
                    ]
                );

            /*
            Remove promoted player
            from waiting area also

            */

            const updatedPlayersWaiting =
                playersWaiting.filter(
                    p =>
                        p.uid !== nextPlayer.uid
                );




            /*
                Remove first player only
                FIFO behaviour

            */

            const updatedQueue =
                waitingQueue.slice(1);



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
                        updatedPlayersWaiting,


                    updatedAt:
                        serverTimestamp()

                }
            );



        };




    /*
        START GAME

        Do NOT clear Firebase results here.
        ResultTable depends on Firestore sync.

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

                    selectedPlayers:
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


        };



    /*
        PICK CARD


        Save result to Firebase

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
        SYNC CARD RESULTS


        Keep this listener.

        This is why ResultTable displays.

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


                    if (
                        snapshot.exists()
                    ) {


                        const data =
                            snapshot.data();





                        if (data.results) {


                            setResults(
                                data.results
                            );


                        }



                        if (data.pickedCards) {


                            setPickedCards(
                                data.pickedCards
                            );


                        }


                    }



                }
            );



        return () => unsubscribe();



    }, []);



    /*
        NEW GAME RESET


        Clears:

        Players

        Queue

        Results

        Cards

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


            }
            catch (error) {

                console.error(
                    "Reset error",
                    error
                );

            }


        };

    return (

        <div className="max-w-4xl mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4 mx-4">

                Rummy Table Booking

            </h1>

            <InformationSlider />

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

                    <button

                        disabled={
                            selectedPlayers.length === 0
                        }


                        onClick={
                            startGame
                        }


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

                        Join Rummy Table

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


                    {/*

                        PLAYERS WAITING

                        Someone dropped out

                    */}



                    {
                        playersWaiting.length > 0 &&


                        <div className="
                            mt-5
                            mx-4
                            p-4
                            border
                            dark:bg-slate-700
                            dark:text-white
                            dark:placeholder-gray-300
                            rounded-lg
                        ">


                            <h3 className="font-bold mb-3">

                                Players waiting if someone drops out

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

                                                {
                                                    index + 1
                                                }.
                                                {" "}
                                                {
                                                    player.name
                                                }

                                            </span>







                                            <button

                                                onClick={() =>
                                                    handleAllowMe(
                                                        player
                                                    )
                                                }


                                                className={`
                                                px-3
                                                py-1
                                                rounded
                                                text-white

                                                ${clickedPlayer === player.uid

                                                        ?

                                                        "bg-green-600"

                                                        :

                                                        "bg-blue-600"

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


                                    ))

                            }



                        </div>

                    }


                    {/*

                        WAITING QUEUE

                    */}


                    {
                        waitingQueue.length > 0 &&


                        <div className="
                            mt-5
                            mx-4
                            p-4
                            bg-yellow-50
                            rounded-lg
                            dark:bg-slate-700
                            dark:text-white
                            dark:placeholder-gray-300
                        ">



                            <div className="
                                flex
                                justify-between
                                mb-3
                            ">


                                <b>

                                    Waiting Queue

                                </b>



                                <span className="
                                    bg-yellow-300
                                    px-2
                                    rounded
                                    dark:text-black
                                    dark:placeholder-gray-300
                                ">

                                    {
                                        waitingQueue.length
                                    }

                                    {" "}waiting

                                </span>



                            </div>


                            {
                                waitingQueue.map(
                                    (player, index) => (


                                        <div

                                            key={
                                                player.uid
                                            }

                                        >

                                            {
                                                index + 1
                                            }.
                                            {" "}
                                            {
                                                player.name
                                            }

                                        </div>


                                    ))

                            }



                        </div>


                    }


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
                                gap-5
                            ">


                                <button

                                    onClick={() =>
                                        setSelectedColor("red")
                                    }

                                    className="
                                    px-6
                                    py-3
                                    bg-red-600
                                    text-white
                                    rounded
                                    "

                                >

                                    🔴 Red Cards

                                </button>


                                <button

                                    onClick={() =>
                                        setSelectedColor("black")
                                    }


                                    className="
                                    px-6
                                    py-3
                                    bg-black
                                    text-white
                                    rounded
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


                            <div className="mb-4">


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

                                                {
                                                    player.name
                                                }

                                            </button>


                                        ))

                                }


                            </div>


                            {
                                activePlayer &&


                                <div className="
                                    mb-4
                                    text-center
                                    text-blue-600
                                    font-semibold
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
                        rounded-2xl
                        p-6
                        w-80
                        text-center
                    ">


                        <div className="text-4xl mb-3">

                            ⚠️

                        </div>

                        <h2 className="font-bold text-lg mb-3">

                            Leave Rummy Table?

                        </h2>


                        <p className="mb-5">

                            Remove

                            <b>
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
                                "

                            >

                                Leave

                            </button>

                        </div>


                    </div>


                </div>

            }


        </div>

    );

}
