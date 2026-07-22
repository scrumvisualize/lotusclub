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
import { useState } from "react";

const milestones = [
    { title: "Playing Cards", icon: CreditCard },
    { title: "Discussion", icon: MessageCircle },
    { title: "Planning", icon: ClipboardList },
    { title: "Core Group", icon: Users },
    { title: "Sweets Rd", icon: MapPin },
    { title: "Club Started", icon: Flag },

    { title: "Weekly Hosting", icon: CalendarDays },
    { title: "Investing", icon: PiggyBank },
    { title: "Bought Assets", icon: Building2 },
    { title: "Fern Ave", icon: RefreshCw },
    { title: "5 Years", icon: PartyPopper },
    { title: "Bought Acreage", icon: Trees },

    { title: "Guest Members", icon: UserPlus },
];

const firstRow = milestones.slice(0, 6);
const secondRow = milestones.slice(6);

type Milestone = {
    title: string;
    icon: React.ElementType;
};


const MilestoneItem = ({
    item,
}: {
    item: Milestone;
}) => {

    const Icon = item.icon;

    return (
        <div className="group flex items-center">

            <div className="relative flex flex-col items-center">

                {/* Tooltip */}
                <div
                    className="
                        absolute
                        -top-16
                        left-1/2
                        -translate-x-1/2

                        whitespace-nowrap
                        rounded-xl
                        px-4
                        py-2

                        text-sm
                        font-semibold

                        shadow-lg
                        transition-all
                        duration-500
                        z-20

                        bg-slate-200
                        text-slate-700

                        dark:bg-slate-800
                        dark:text-white

                        group-hover:bg-emerald-500
                        group-hover:text-white
                    "
                >
                    {item.title}
                </div>


                {/* Glow */}
                <div
                    className="
                        absolute
                        inset-0
                        scale-0
                        rounded-full
                        bg-emerald-400/20
                        blur-2xl

                        transition-all
                        duration-500

                        group-hover:scale-[2.5]
                    "
                />


                {/* Circle */}
                <div
                    className="
                        relative
                        h-14
                        w-14

                        rounded-full
                        border-4

                        border-gray-300
                        bg-gray-200

                        dark:bg-slate-800
                        dark:border-slate-700

                        flex
                        items-center
                        justify-center

                        transition-all
                        duration-500

                        group-hover:bg-emerald-500
                        group-hover:border-emerald-500
                        group-hover:scale-110
                        group-hover:shadow-[0_0_40px_rgba(16,185,129,0.55)]
                        group-hover:animate-pulse
                    "
                >

                    <Icon
                        size={30}
                        className="
                            text-gray-600
                            dark:text-slate-300

                            transition-all
                            duration-500

                            group-hover:text-white
                        "
                    />

                </div>

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
                    className="
                        flex-1
                        border-t-[3px]
                        border-dotted

                        border-gray-300
                        dark:border-slate-700

                        group-hover:border-emerald-400
                    "
                />


                <div
                    className="
                        absolute
                        left-1/2
                        -translate-x-1/2

                        h-3
                        w-3

                        rounded-full

                        bg-gray-300
                        dark:bg-slate-600

                        transition-all

                        group-hover:bg-emerald-500
                        group-hover:scale-150
                    "
                />


                <div
                    className="
                        flex-1
                        border-t-[3px]
                        border-dotted

                        border-gray-300
                        dark:border-slate-700

                        group-hover:border-emerald-400
                    "
                />

            </div>

        </div>
    );
};

export default function MilestoneTimeline() {

    const [activeMilestone, setActiveMilestone] = useState<number | null>(null);


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

                    <p className="text-sm italic">(please hover to highlight each milestones)</p>

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

                        {firstRow.map((item) => (

                            <MilestoneItem
                                key={item.title}
                                item={item}
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

                        {secondRow.map((item) => (

                            <MilestoneItem
                                key={item.title}
                                item={item}
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
                            flex
                            flex-col
                            items-center
                            gap-10
                        "
                    >

                        {milestones.map((item, index) => {


                            const Icon = item.icon;

                            const isActive =
                                activeMilestone === index;



                            return (

                                <div
                                    key={item.title}

                                    onClick={() =>
                                        setActiveMilestone(
                                            isActive
                                                ? null
                                                : index
                                        )
                                    }

                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        cursor-pointer
                                    "
                                >



                                    {/* Tooltip */}

                                    <div
                                        className={`
                                            mb-4
                                            rounded-xl
                                            px-4
                                            py-2

                                            text-sm
                                            font-semibold

                                            shadow-md

                                            whitespace-nowrap

                                            transition-all
                                            duration-500


                                            ${isActive

                                                ?

                                                `
                                                bg-emerald-500
                                                text-white
                                                scale-105
                                                `

                                                :

                                                `
                                                bg-slate-200
                                                text-slate-700

                                                dark:bg-slate-800
                                                dark:text-white
                                                `
                                            }

                                        `}
                                    >
                                        {item.title}

                                    </div>





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