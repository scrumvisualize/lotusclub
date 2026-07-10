import React, { useState } from "react";

interface Instruction {
    step: number;
    title: string;
    description: string;
}

const instructions: Instruction[] = [
    {
        step: 1,
        title: "Login to Lotus Club website",
        description:
            "Login into the Lotus Club website using your Lotus membership number and password.",
    },
    {
        step: 2,
        title: "Open Book a Rummy Seat",
        description:
            'Navigate to the "Book a Rummy Seat" in the navigation tab.',
    },
    {
        step: 3,
        title: "Join Rummy Table",
        description:
            'Select your name and click "Join Rummy Table" button',
    },
    {
        step: 4,
        title: "Choose Card Category",
        description:
            "Select Red Cards or Black Cards.",
    },
    {
        step: 5,
        title: "Pick Your Card",
        description:
            "Click your name and click any card from the available grid.",
    },
    {
        step: 6,
        title: "Confirm Seating Order",
        description:
            "Your selected card will appear under Player Seating Order.",
    },
    {
        step: 7,
        title: "View Players Seating Order",
        description:
            `Click Back button and click on "Join Rummy Table" button to see other players' selections.`,
    },
];


const RummyInstructionsSlider: React.FC = () => {

    const [open, setOpen] = useState(false);


    return (

        <section className="w-full mb-6 mx-4 pr-2">

            {/* Toggle Button */}

            <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="
                group
                flex
                w-full
                sm:w-auto
                items-center
                justify-between
                gap-3
                rounded-lg
                bg-gradient-to-r
                from-blue-700
                to-purple-400
                px-5
                py-3
                text-white
                shadow-lg
                transition
                hover:scale-[1.02]
                "
            >

                <span className="flex items-center gap-2 font-semibold">
                    Instructions to Book a Rummy Seat
                </span>


                <span
                    className={`
                    transition-transform
                    duration-300
                    ${open ? "rotate-180" : ""}
                `}
                >
                    ▼
                </span>

            </button>



            {/* Slider */}

            <div
                className={`
                overflow-hidden
                transition-all
                duration-500
                ease-in-out
                ${open
                        ? "max-h-[2000px] opacity-100 mt-5"
                        : "max-h-0 opacity-0"
                    }
                `}
            >

                <div
                    className="
                    rounded-3xl
                    border

                    border-slate-200
                    dark:border-slate-700

                    bg-white
                    dark:bg-slate-900
                    p-4
                    sm:p-6
                    lg:p-8
                    shadow-xl
                "
                >


                    {/* Header */}

                    <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-3
                        mb-6
                    "
                    >

                        <div>

                            <h2
                                className="
                        text-xl
                        sm:text-2xl
                        lg:text-3xl
                        font-bold

                        text-red-700
                        dark:text-red-400
                    "
                            >
                                Rummy Booking Instructions
                            </h2>


                            <p
                                className="
                        mt-1
                        text-sm
                        sm:text-base

                        text-slate-600
                        dark:text-slate-400
                        "
                            >
                                Follow these steps to reserve your rummy seat
                            </p>

                        </div>


                        <div
                            className="
                        rounded-full
                        bg-red-50
                        dark:bg-red-950

                        px-4
                        py-2

                        text-sm
                        font-medium

                        text-red-700
                        dark:text-red-300
                    "
                        >
                            7 Steps
                        </div>


                    </div>



                    {/* Steps Grid */}

                    <div
                        className="
              grid

              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3

              gap-4
            "
                    >

                        {
                            instructions.map((item) => (

                                <article
                                    key={item.step}

                                    className="
                    flex
                    gap-4

                    rounded-2xl

                    bg-gradient-to-br

                    from-orange-50
                    to-red-50

                    dark:from-slate-800
                    dark:to-slate-800

                    border

                    border-orange-100
                    dark:border-slate-700

                    p-4

                    transition

                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                                >

                                    <div
                                        className="
                      flex

                      h-10
                      w-10

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-red-600

                      text-white

                      font-bold
                    "
                                    >
                                        {item.step}
                                    </div>



                                    <div>

                                        <h3
                                            className="
                        font-semibold

                        text-slate-800
                        dark:text-white
                      "
                                        >
                                            {item.title}
                                        </h3>


                                        <p
                                            className="
                        mt-1

                        text-sm

                        leading-relaxed

                        text-slate-600
                        dark:text-slate-300
                      "
                                        >
                                            {item.description}
                                        </p>

                                    </div>


                                </article>

                            ))
                        }

                    </div>


                </div>

            </div>


        </section>

    );
};


export default RummyInstructionsSlider;