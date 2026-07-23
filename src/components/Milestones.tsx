import {
    CreditCard,
    MessageCircle,
    ClipboardList,
    Users,
    MapPin,
    Flag,
    CalendarDays,
    PiggyBank,
    Building2,
    RefreshCw,
    PartyPopper,
    Trees,
    UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

const milestones = [
    { title: "CardsClub", icon: CreditCard },
    { title: "Discussion", icon: MessageCircle },
    { title: "Planning", icon: ClipboardList },
    { title: "CoreGroup", icon: Users },
    { title: "Pallara", icon: MapPin },
    { title: "ClubStarted", icon: Flag, year: "2018" },

    { title: "Weekly Hosting", icon: CalendarDays },
    { title: "Investing", icon: PiggyBank },
    { title: "Assets", icon: Building2 },
    { title: "Browns Plains", icon: RefreshCw },
    { title: "5Yrs", icon: PartyPopper, year: "2024" },
    { title: "Acreage", icon: Trees },

    { title: "Guest Members", icon: UserPlus },
];

const firstRow = milestones.slice(0, 6);
const secondRow = milestones.slice(6);

type Milestone = {
    title: string;
    icon: React.ElementType;
    year?: string;
};


const MilestoneItem = ({
    item,
    index,
    activeMilestone
}: {
    item: Milestone;
    index: number;
    activeMilestone: number;
}) => {

    const Icon = item.icon;
    const isActive = activeMilestone === index;
    const isCelebration =
        item.title === "ClubStarted" ||
        item.title === "5Yrs";

    return (
        <div className="group flex items-center">

            <div className="relative flex flex-col items-center">

                {/* Tooltip - only display when animation reaches this milestone */}
                {isActive && (
                    <>
                        {/* Tooltip */}
                        <div
                            className="
                            absolute
                            -top-20
                            left-1/2
                            -translate-x-1/2

                            rounded-xl
                            px-4
                            py-2

                            bg-emerald-500
                            text-white

                            text-sm
                            font-semibold

                            shadow-lg
                            z-20
                        "
                        >
                            {item.title}
                        </div>


                        {/* Simple vertical connector */}
                        <div
                            className="
                            absolute
                            -top-10
                            left-1/2
                            -translate-x-1/2

                            h-10
                            w-[3px]

                            bg-emerald-400
                            rounded-full

                            shadow-[0_0_8px_rgba(16,185,129,0.7)]
                            "
                        />
                    </>
                )}


                {/* Glow */}
                <div
                    className={`
                    absolute
                    inset-0
                    rounded-full
                    bg-emerald-400/20
                    blur-2xl
                    transition-all
                    duration-500
                    ${isActive
                            ? "scale-[2.5] opacity-100"
                            : "scale-0 opacity-0"
                        }
                    `}
                />

                {/* Circle */}
                <div
                    className={`
                    relative
                    h-14
                    w-14

                    rounded-full
                    border-4

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-500

                    ${isActive
                            ? `
                            bg-emerald-500
                            border-emerald-500
                            scale-110
                            shadow-[0_0_40px_rgba(16,185,129,0.55)]
                            animate-pulse
                        `
                            : `
                            bg-gray-200
                            border-gray-300
                            dark:bg-slate-800
                            dark:border-slate-700
                        `
                        }
                   `}
                >

                    {/* Celebration Effect */}
                    {isActive && isCelebration && (
                        <>
                            {/* Expanding ring */}
                            <span
                                className="
                                absolute
                                inset-0
                                rounded-full
                                border-4
                                border-yellow-300
                                animate-ping
                               "
                            />

                            {/* Confetti */}
                            <span
                                className="
                                absolute
                                -top-5
                                -left-3
                                text-xl
                                animate-bounce
                                z-10
                                "
                            >
                                🎉
                            </span>

                            <span
                                className="
                                absolute
                                -top-4
                                -right-3
                                text-lg
                                animate-pulse

                                z-10
                                "
                            >
                                ✨
                            </span>

                            <span
                                className="
                                absolute
                                -bottom-4
                                right-0
                                text-lg
                                animate-bounce
                                z-10
                                "
                            >
                                🎊
                            </span>
                        </>
                    )}


                    <Icon
                        size={30}
                        className={`
                        relative
                        z-20

                        transition-all
                        duration-500

                        ${isActive
                                ? "text-white"
                                : "text-gray-600 dark:text-slate-300"
                            }
                    `}
                    />

                </div>

                {/* Year Badge */}
                {isActive && item.year && (
                    <div
                        className={`
                        absolute
                        -bottom-10
                        left-1/2
                        -translate-x-1/2

                        px-3
                        py-1

                        rounded-full

                        text-xs
                        font-bold

                        transition-all
                        duration-500

                        ${isActive
                                ? `
                        bg-emerald-500
                        text-white
                        scale-110
                        shadow-lg
                    `
                                : `
                        bg-slate-200
                        text-slate-500
                        dark:bg-slate-800
                        dark:text-slate-400
                    `
                            }
                `}
                    >
                        {item.year}
                    </div>
                )}
            </div>


            {/* Connector */}
            <div
                className="
                    hidden
                    lg:flex
                    items-center

                    w-20
                    xl:w-28

                    relative
                "
            >

                <div
                    className={`
                    flex-1
                    border-t-[3px]
                    border-dotted

                    transition-all
                    duration-700

                    ${isActive
                            ? `
                    border-emerald-400
                    shadow-[0_0_12px_rgba(16,185,129,0.7)]
                  `
                            : `
                    border-gray-300
                    dark:border-slate-700
                  `
                        }
                `}
                />


                <div
                    className={`
                    absolute
                    left-1/2
                    -translate-x-1/2

                    h-3
                    w-3

                    rounded-full

                    transition-all
                    duration-700

                    ${isActive
                            ? `
                    bg-emerald-500
                    scale-150
                    shadow-[0_0_14px_rgba(16,185,129,0.9)]
                  `
                            : `
                    bg-gray-300
                    dark:bg-slate-600
                  `
                        }
                `}
                />


                <div
                    className={`
                    flex-1
                    border-t-[3px]
                    border-dotted

                    transition-all
                    duration-700

                    ${isActive
                            ? `
                    border-emerald-400
                    shadow-[0_0_12px_rgba(16,185,129,0.7)]
                  `
                            : `
                    border-gray-300
                    dark:border-slate-700
                  `
                        }
                `}
                />

            </div>

        </div>
    );
};

export default function MilestoneTimeline() {

    const [activeMilestone, setActiveMilestone] =
        useState(-1);

    useEffect(() => {

        const interval = setInterval(() => {

            setActiveMilestone((prev) =>
                prev >= milestones.length - 1
                    ? 0
                    : prev + 1
            );

        }, 3000);


        return () => clearInterval(interval);

    }, []);


    return (
        <section className="py-16 px-4 bg-gray-50 dark:bg-slate-950 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-24 md:mb-32">

                    <h2
                        className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                            dark:text-white
                        "
                    >
                        Lotus Club Journey
                    </h2>

                    <p
                        className="
                            mt-4
                            text-gray-600
                            dark:text-slate-400
                            max-w-2xl
                            mx-auto
                        "
                    >
                        A journey of friendship, planning, growth and memorable milestones.
                    </p>

                    <p className="text-sm italic">(Follow our journey as each milestone comes alive.)</p>

                </div>


                {/* Desktop / Tablet */}
                <div className="hidden md:flex flex-col gap-28 ml-25">


                    {/* First Row */}
                    <div
                        className="
                            flex
                            justify-center
                            flex-wrap
                            gap-y-12
                        "
                    >

                        {firstRow.map((item, index) => (

                            <MilestoneItem
                                key={item.title}
                                item={item}
                                index={index}
                                activeMilestone={activeMilestone}
                            />

                        ))}

                    </div>

                    {/* Second Row */}
                    <div
                        className="
                            flex
                            justify-center
                            flex-wrap
                            gap-y-12
                        "
                    >

                        {secondRow.map((item, index) => (

                            <MilestoneItem
                                key={item.title}
                                item={item}
                                index={index + 6}
                                activeMilestone={activeMilestone}
                            />

                        ))}

                    </div>


                </div>


                {/* =========================
                    MOBILE TIMELINE
                ========================== */}

                <div className="md:hidden relative mt-10">


                    <div
                        className="
                            relative
                            flex
                            flex-col
                            items-center
                            cursor-pointer
                            "
                    >

                        {milestones.map((item, index) => {


                            const Icon = item.icon;

                            const isActive =
                                activeMilestone === index;



                            return (

                                <div
                                    key={item.title}

                                    onClick={() => setActiveMilestone(index)}

                                    className="
                                        relative
                                        flex
                                        flex-col
                                        items-center
                                        cursor-pointer
                                    "
                                >


                                    {/* Mobile Tooltip - right side */}
                                    {isActive && (
                                        <>
                                            {/* Horizontal connector */}
                                            <div
                                                className="
                                                absolute
                                                top-1/2
                                                left-14

                                                w-10
                                                h-[3px]

                                                bg-emerald-400
                                                rounded-full

                                                -translate-y-1/2
                                            "
                                            />


                                            {/* Tooltip */}
                                            <div
                                                className="
                                                absolute

                                                left-24
                                                top-1/2
                                                -translate-y-1/2

                                                whitespace-nowrap

                                                rounded-xl

                                                px-4
                                                py-2

                                                text-sm
                                                font-semibold

                                                shadow-lg

                                                z-20

                                                bg-emerald-500
                                                text-white

                                                animate-pulse
                                                "
                                            >
                                                {item.title}
                                            </div>
                                        </>
                                    )}



                                    {/* Circle */}

                                    <div
                                        className={`
                                            h-14
                                            w-14

                                            rounded-full

                                            border-4

                                            flex
                                            items-center
                                            justify-center


                                            transition-all
                                            duration-500



                                            ${isActive

                                                ?

                                                `
                                                bg-emerald-500
                                                border-emerald-500

                                                scale-110

                                                shadow-[0_0_35px_rgba(16,185,129,0.6)]

                                                animate-pulse
                                                `


                                                :

                                                `
                                                bg-gray-200
                                                border-gray-300

                                                dark:bg-slate-800
                                                dark:border-slate-700
                                                `
                                            }

                                        `}
                                    >


                                        <Icon

                                            size={30}

                                            className={

                                                isActive

                                                    ?

                                                    "text-white"

                                                    :

                                                    "text-gray-600 dark:text-slate-300"

                                            }

                                        />


                                    </div>


                                    {/* Vertical Connector */}

                                    {index !== milestones.length - 1 && (

                                        <div

                                            className={`
                                                mt-3
                                                h-12

                                                border-l-[3px]
                                                border-dotted


                                                transition-all
                                                duration-500


                                                ${isActive

                                                    ?

                                                    "border-emerald-400"

                                                    :

                                                    "border-gray-300 dark:border-slate-700"

                                                }

                                            `}

                                        />

                                    )}



                                </div>

                            );

                        })}


                    </div>

                </div>

            </div>

        </section>
    );
}