import { useState } from "react";
import coins from "../assets/coins.jpg";
import fun1 from "../assets/fun1 copy.png";
import fun3 from "../assets/fun3.png";
import AboutSection from "../components/AboutSection";
import RelaxFridays from "../components/RelaxFridays";
import ClubPolicies from "../components/ClubPolicies";
import HostingTimeline from "../components/HostingTimeline";

export default function Home() {

    const [showJoinModal, setShowJoinModal] = useState(false);

    return (
        <>
            <section
                className="
            min-h-[calc(100vh-80px)]
            flex
            items-center
            justify-center
            px-6
            pt-8
            pb-8
            sm:pt-10
            lg:pt-10
            bg-gradient-to-br
            from-blue-50
            via-white
            to-purple-100
            dark:from-slate-900
            dark:via-slate-950
            dark:to-slate-800
            "
            >

                <div
                    className="
                max-w-7xl
                w-full
                bg-white
                dark:bg-slate-900
                rounded-3xl
                shadow-2xl
                p-10
                md:p-16
                lg:p-20
                text-center
                transition-all
                duration-500
                "
                >


                    {/* Heading */}

                    <h1
                        className="
                    text-4xl
                    md:text-6xl
                    font-extrabold
                    text-blue-600
                    dark:text-blue-400
                    "
                    >
                        Welcome to Lotus Club
                    </h1>



                    <p
                        className="
                    mt-4
                    text-xl
                    md:text-lg
                    font-medium
                    text-gray-600
                    dark:text-gray-200
                    "
                    >
                        Connecting People • Creating Memories • Celebrating Together
                    </p>

                    <div
                        className="
    mt-8
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-3
    "
                    >

                        <img
                            src={fun1}
                            alt="Lotus Club Image 1"
                            className="
        w-full
        h-[220px]
        sm:h-[260px]
        lg:h-[350px]
        object-cover
        rounded-3xl
        shadow-xl
        transition
        hover:scale-105
        duration-300
        "
                        />


                        <img
                            src={coins}
                            alt="Lotus Club Image 2"
                            className="
        w-full
        h-[220px]
        sm:h-[260px]
        lg:h-[350px]
        object-cover
        rounded-3xl
        shadow-xl
        transition
        hover:scale-105
        duration-300
        "
                        />


                        <img
                            src={fun3}
                            alt="Lotus Club Image 3"
                            className="
        w-full
        h-[220px]
        sm:h-[260px]
        lg:h-[350px]
        object-cover
        rounded-3xl
        shadow-xl
        transition
        hover:scale-105
        duration-300
        "
                        />


                    </div>



                    {/* Description */}

                    <p
                        className="
                    mt-8
                    text-gray-600
                    dark:text-gray-300
                    max-w-2xl
                    mx-auto
                    text-lg
                    "
                    >
                        A place where friends connect,
                        enjoy playing cards and create
                        wonderful memories together.
                    </p>




                    {/* Buttons */}

                    <div
                        className="
                    mt-8
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    gap-4
                    "
                    >
                        <button
                            onClick={() => setShowJoinModal(true)}
                            className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-8
                        py-3
                        rounded-full
                        font-semibold
                        shadow-lg
                        transition
                        hover:scale-105
                        "
                        >
                            Join Our Club
                        </button>

                        <button
                            className="
                        border-2
                        border-blue-600
                        text-blue-600
                        dark:text-blue-400
                        px-8
                        py-3
                        rounded-full
                        font-semibold
                        hover:bg-blue-50
                        dark:hover:bg-slate-800
                        transition
                        "
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}

            <AboutSection />

            {/* Relax Fridays */}

            <RelaxFridays />

            {/* Club Policies */}

            <ClubPolicies />

            {/* Hosting Timeline */}




            {/* =========================
                ROW 1 - INTRODUCTION
                ========================= */}
            <div id="hosting" className="border-b border-gray-200 py-8 dark:border-gray-700">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 dark:bg-slate-900 rounded-2xl">

                    {/* Introduction */}
                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Hosting Timeline
                        </span>

                        <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Hosting Every Week
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our Monday night hosting sessions are proudly supported by dedicated
                            volunteers who generously give their time each week.
                            <br></br>
                            Hover on the timeline green icon below to see who's hosting every Monday
                            throughout the season.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <div className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                ✓ Completed Sessions
                            </div>

                            <div className="rounded-full bg-purple-100 px-5 py-2 text-sm font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                📅 Season Schedule
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-10">
                        <HostingTimeline />
                    </div>

                </div>
            </div>





            {
                showJoinModal && (

                    <div
                        className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-6
            "
                    >

                        <div
                            className="
                w-full
                max-w-md
                bg-white
                dark:bg-slate-900
                rounded-3xl
                shadow-2xl
                p-8
                "
                        >

                            <h2
                                className="
                    text-3xl
                    font-bold
                    text-slate-800
                    dark:text-white
                    text-center
                    "
                            >
                                Request To Join
                            </h2>


                            <p
                                className="
                    mt-3
                    text-center
                    text-gray-600
                    dark:text-gray-300
                    "
                            >
                                Please provide your details and we will contact you.
                            </p>


                            <div className="mt-6 space-y-4">


                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-300
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-800
                        text-gray-900
                        dark:text-white
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                                />


                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-gray-300
                        dark:border-slate-700
                        bg-white
                        dark:bg-slate-800
                        text-gray-900
                        dark:text-white
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                                />

                            </div>



                            <div
                                className="
                    mt-8
                    flex
                    justify-end
                    gap-4
                    "
                            >

                                <button
                                    onClick={() => setShowJoinModal(false)}
                                    className="
                        px-6
                        py-3
                        rounded-full
                        border
                        border-gray-300
                        dark:border-slate-600
                        text-gray-700
                        dark:text-gray-300
                        "
                                >
                                    Cancel
                                </button>


                                <button
                                    className="
                        px-6
                        py-3
                        rounded-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-semibold
                        "
                                >
                                    Submit
                                </button>


                            </div>


                        </div>

                    </div>

                )
            }

        </>
    );

}