import { useEffect, useState } from "react";
import coins from "../assets/coins.jpg";
import fun1 from "../assets/fun1 copy.png";
import fun3 from "../assets/fun3.png";
import AboutSection from "../components/AboutSection";
import RelaxFridays from "../components/RelaxFridays";
import ClubPolicies from "../components/ClubPolicies";
import HostingTimeline from "../components/HostingTimeline";
import Footer from "../components/Footer";

export default function Home() {

    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {/* <section
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
                    text-sm
                    md:text-sm
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
        </div >
            </section > */
            }

            <section
                className="
        relative
        overflow-hidden
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

                {/* Background effects */}

                <div
                    className="
            absolute
            top-0
            left-0
            w-72
            h-72
            bg-blue-300/20
            rounded-full
            blur-3xl
            -translate-x-1/3
            -translate-y-1/3
            pointer-events-none
        "
                />

                <div
                    className="
            absolute
            bottom-0
            right-0
            w-96
            h-96
            bg-purple-300/20
            rounded-full
            blur-3xl
            translate-x-1/4
            translate-y-1/4
            pointer-events-none
        "
                />

                <div
                    className="
            relative
            z-10
            max-w-7xl
            w-full
            bg-white/80
            dark:bg-slate-900/90
            backdrop-blur-lg
            border
            border-white/30
            dark:border-slate-700
            rounded-3xl
            shadow-2xl
            p-8
            md:p-16
            lg:p-20
            text-center
            transition-all
            duration-500
        "
                >

                    {/* Badge */}

                    <div
                        className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-blue-100
                dark:bg-slate-800
                text-blue-700
                dark:text-blue-300
                font-medium
                text-sm
                shadow-md
                mb-6
            "
                    >
                        ✨ Welcome to Brisbane's Community Club
                    </div>

                    {/* Heading */}

                    <h1
                        className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                leading-tight
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
                text-sm
                md:text-base
                font-medium
                text-gray-600
                dark:text-gray-200
                tracking-wide
            "
                    >
                        Connecting People • Creating Memories • Celebrating Together
                    </p>

                    {/* Images */}

                    <div
                        className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
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
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:-translate-y-2
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
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:-translate-y-2
                    lg:-translate-y-6
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
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:-translate-y-2
                    lg:translate-y-4
                "
                        />

                    </div>

                    {/* Description */}

                    <p
                        className="
                mt-10
                text-gray-600
                dark:text-gray-300
                max-w-3xl
                mx-auto
                text-lg
                leading-relaxed
            "
                    >
                        A place where friends connect, enjoy playing cards,
                        celebrate special moments and create wonderful memories
                        together in a warm and welcoming community.
                    </p>

                    {/* Statistics */}

                    <div
                        className="
                mt-10
                grid
                grid-cols-2
                md:grid-cols-4
                gap-6
                max-w-4xl
                mx-auto
            "
                    >

                        <div
                            className="
                    p-5
                    rounded-2xl
                    bg-blue-50
                    dark:bg-slate-800
                "
                        >
                            <h3 className="text-3xl font-bold text-blue-600">
                                50+
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300">
                                Members
                            </p>
                        </div>

                        <div
                            className="
                    p-5
                    rounded-2xl
                    bg-blue-50
                    dark:bg-slate-800
                "
                        >
                            <h3 className="text-3xl font-bold text-blue-600">
                                5+
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300">
                                Events
                            </p>
                        </div>

                        <div
                            className="
                    p-5
                    rounded-2xl
                    bg-blue-50
                    dark:bg-slate-800
                "
                        >
                            <h3 className="text-3xl font-bold text-blue-600">
                                5+
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300">
                                Years
                            </p>
                        </div>

                        <div
                            className="
                    p-5
                    rounded-2xl
                    bg-blue-50
                    dark:bg-slate-800
                "
                        >
                            <h3 className="text-3xl font-bold text-blue-600">
                                ❤️
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300">
                                Community
                            </p>
                        </div>

                    </div>

                    {/* Buttons */}

                    <div
                        className="
                mt-10
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
                    transition-all
                    duration-300
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
                    transition-all
                    duration-300
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
                            Weekly Hosting
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our Monday night hosting sessions are proudly supported by dedicated
                            volunteers who generously give their time each week.
                            <br></br>
                            Hover or click on the timeline green icon below to see who's hosting every Monday
                            throughout the year. Slide towards right to see who is hosting for upcoming weeks.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <div className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                ✓ Completed Hosting
                            </div>

                            <div className="rounded-full bg-purple-100 px-5 py-2 text-sm font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                📅 Upcoming Hosting
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-12 md:mt-12 overflow-hidden">
                        <HostingTimeline />
                    </div>

                </div>
            </div>

            {/* Footer section */}

            <Footer />

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
                            <p className="text-center font-style: italic">Hold on please ! Work In Progress </p>

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
            {
                showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        title="Back to Top"
                        style={{
                            position: "fixed",
                            bottom: 25,
                            right: 25,
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            border: "none",
                            background: "#2563eb",
                            color: "#fff",
                            fontSize: 24,
                            cursor: "pointer",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                            zIndex: 9999
                        }}
                    >
                        ↑
                    </button>
                )
            }

        </>
    );

}