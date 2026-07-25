import { useEffect, useState } from "react";

import {
    collection,
    doc,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";

import {
    Heart,
    CalendarDays,
    ArrowRight,
    Sparkles
} from "lucide-react";

import { db } from "../firebase";

interface News {

    id: string;

    title: string;

    description: string;

    type: string;

    createdDate: any;

    createdBy?: string;

    likes?: number;

    likedBy?: string[];

}

const LatestClubNews = () => {

    const [news, setNews] = useState<News[]>([]);
    const [expandedNews, setExpandedNews] = useState<string | null>(null);

    const userId =
        localStorage.getItem("uid") || "";

    useEffect(() => {

        const q = query(

            collection(db, "clubNews"),

            orderBy(
                "createdDate",
                "desc"
            )

        );

        return onSnapshot(q, snapshot => {

            setNews(

                snapshot.docs.map(doc => ({

                    id: doc.id,

                    ...doc.data()

                })) as News[]

            );

        });

    }, []);

    const likeNews = async (item: News) => {

        const alreadyLiked =
            item.likedBy?.includes(userId);

        await updateDoc(

            doc(db, "clubNews", item.id),

            {

                likes: increment(

                    alreadyLiked ? -1 : 1

                ),

                likedBy:

                    alreadyLiked

                        ?

                        arrayRemove(userId)

                        :

                        arrayUnion(userId)

            }

        );

    };

    const getBadgeStyle = (type: string) => {

        switch (type) {

            case "Club Update":

                return "bg-blue-100 text-blue-700";

            case "Trip":

                return "bg-orange-100 text-orange-700";

            case "Celebration":

                return "bg-pink-100 text-pink-700";

            case "Chit Funds":

                return "bg-yellow-100 text-yellow-700";

            default:

                return "bg-green-100 text-green-700";

        }

    };

    const getDescription = (item: News) => {

        const text =
            expandedNews === item.id
                ? item.description
                : getShortDescription(item.description);


        const greetingMatch = text.match(/^([^,]+,)\s*(.*)$/s);


        if (greetingMatch) {

            return (
                <>
                    <span className="block font-semibold text-blue-600 mb-2">
                        {greetingMatch[1]}
                    </span>

                    <span>
                        {greetingMatch[2]}
                    </span>
                </>
            );

        }


        return text;

    };

    const getShortDescription = (text: string) => {

        const detailIndex = text.indexOf("Amount:");

        if (detailIndex !== -1) {

            const summary = text.substring(0, detailIndex).trim();

            return summary.length > 100
                ? summary.substring(0, 100) + "..."
                : summary;
        }


        return text.length > 100
            ? text.substring(0, 100) + "..."
            : text;

    };
    return (

        <section
            className="
            relative
            py-8
            px-5
            overflow-hidden
            "
        >

            {/* Decorative Background */}

            <div
                className="
                absolute
                top-0
                left-0
                w-80
                h-80
                bg-green-300/20
                blur-3xl
                rounded-full
                -translate-x-1/2
                -translate-y-1/2
                "
            />

            <div
                className="
                absolute
                bottom-0
                right-0
                w-96
                h-96
                bg-emerald-300/20
                blur-3xl
                rounded-full
                translate-x-1/3
                translate-y-1/3
                "
            />

            <div className="relative max-w-7xl mx-auto">

                {/* Premium Container */}

                <div
                    className="
                    relative
                    overflow-hidden
                    rounded-[36px]
                    border
                    border-green-100
                    dark:border-slate-700
                    bg-white/90
                    dark:bg-slate-900/90
                    backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    p-8
                    md:p-12
                    "
                >

                    {/* Decorative Top Line */}

                    <div
                        className="
                    absolute
                    top-0
                    left-0
                    w-full
                    h-1
                    bg-gradient-to-r
                    from-green-500
                    via-emerald-400
                    to-green-600
                    "
                    />

                    {/* Heading */}

                    <div className="text-center">

                        <div
                            className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-green-100
                        dark:bg-green-900/30
                        px-5
                        py-2
                        text-green-700
                        dark:text-green-300
                        font-semibold
                        "
                        >

                            <Sparkles size={18} />

                            Community Hub

                        </div>

                        <h2
                            className="
                        mt-6
                        text-4xl
                        md:text-5xl
                        font-extrabold
                        tracking-tight
                        text-slate-900
                        dark:text-white
                        "
                        >

                            Latest News & Updates

                        </h2>

                        <p
                            className="
                        mt-4
                        max-w-3xl
                        mx-auto
                        text-lg
                        leading-8
                        text-gray-600
                        dark:text-gray-300
                        "
                        >

                            Stay connected with everything happening at Lotus Club —
                            club announcements, celebrations, outings, chit funds and
                            community activities.

                        </p>

                    </div>

                    {/* Statistics */}

                    <div
                        className="
                        mt-10
                        grid
                        grid-cols-2
                        md:grid-cols-4
                        gap-5
                        "
                    >

                        <div className="rounded-2xl bg-green-50 dark:bg-slate-800 p-5 text-center">

                            <div className="text-3xl font-bold text-green-600">

                                {news.length}

                            </div>

                            <div className="mt-1 text-sm text-gray-500">

                                Total News

                            </div>

                        </div>

                        <div className="rounded-2xl bg-blue-50 dark:bg-slate-800 p-5 text-center">

                            <div className="text-3xl font-bold text-blue-600">

                                {
                                    news.filter(n => n.type === "Club Update").length
                                }

                            </div>

                            <div className="mt-1 text-sm text-gray-500">

                                Updates

                            </div>

                        </div>

                        <div className="rounded-2xl bg-pink-50 dark:bg-slate-800 p-5 text-center">

                            <div className="text-3xl font-bold text-pink-600">

                                {
                                    news.filter(n => n.type === "Celebration").length
                                }

                            </div>

                            <div className="mt-1 text-sm text-gray-500">

                                Celebrations

                            </div>

                        </div>

                        <div className="rounded-2xl bg-yellow-50 dark:bg-slate-800 p-5 text-center">

                            <div className="text-3xl font-bold text-yellow-600">

                                {
                                    news.filter(n => n.type === "Chit Funds").length
                                }

                            </div>

                            <div className="mt-1 text-sm text-gray-500">

                                Chit Funds

                            </div>

                        </div>

                    </div>

                    {/* Divider */}

                    <div
                        className="
                        mt-12
                        mb-10
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-gray-300
                        dark:via-slate-700
                        to-transparent
                        "
                    />

                    {/* News Cards Start Here */}

                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-8
                    "
                    >

                        {news.slice(0, 6).map((item) => (

                            <article
                                key={item.id}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    bg-white
                                    dark:bg-slate-900
                                    border
                                    border-gray-100
                                    dark:border-slate-700
                                    shadow-md
                                    hover:shadow-2xl
                                    hover:-translate-y-2
                                    duration-300
                                    transition-all
                                    flex
                                    flex-col
                                "
                            >

                                {/* Soft Gradient */}

                                <div
                                    className="
                                    h-24
                                    bg-gradient-to-br
                                    from-teal-500
                                    via-emerald-500
                                    to-cyan-600
                                "
                                >
                                    {/* from-sky-500
                                    via-blue-600
                                    to-indigo-700 */}

                                    <div
                                        className="
                                        flex
                                        justify-between
                                        items-start
                                        p-5
                                    "
                                    >

                                        <span
                                            className={`
                                            ${getBadgeStyle(item.type)}
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            bg-white/90
                                        `}
                                        >
                                            {item.type}
                                        </span>

                                        <button
                                            onClick={() => likeNews(item)}
                                            className="
                                                w-11
                                                h-11
                                                rounded-full
                                                bg-white
                                                shadow-md
                                                flex
                                                items-center
                                                justify-center
                                                hover:scale-110
                                                transition
                                            "
                                        >

                                            <Heart
                                                size={18}
                                                className="text-red-500"
                                                fill={
                                                    item.likedBy?.includes(userId)
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />

                                        </button>

                                    </div>

                                </div>

                                {/* Card Body */}

                                <div
                                    className="
                                    flex
                                    flex-col
                                    flex-1
                                    p-7
                                "
                                >

                                    <h3
                                        className="
                                        text-2xl
                                        font-bold
                                        text-slate-900
                                        dark:text-white
                                        leading-tight
                                        line-clamp-2
                                        group-hover:text-green-600
                                        transition-colors
                                    "
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className={`
                                        mt-5
                                        text-gray-600
                                        dark:text-gray-300
                                        leading-7
                                        flex-1
                                        ${expandedNews === item.id
                                                ? ""
                                                : "line-clamp-4"
                                            }
                                        `}
                                    >
                                        {getDescription(item)}
                                    </p>

                                    {/* Footer */}

                                    <div
                                        className="
                                        mt-8
                                        pt-5
                                        border-t
                                        border-gray-100
                                        dark:border-slate-700
                                        flex
                                        justify-between
                                        items-center
                                    "
                                    >

                                        <div
                                            className="
                                            flex
                                            flex-col
                                            gap-2
                                            text-sm
                                            text-gray-500
    "
                                        >

                                            <div
                                                className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                            >
                                                <CalendarDays size={16} />

                                                {item.createdDate
                                                    ?.toDate?.()
                                                    .toLocaleDateString("en-AU", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                            </div>


                                            {/* {item.createdBy && (
                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-blue-600
                                                    font-small
                                                "
                                                >
                                                    <span
                                                        className="
                                                    w-6
                                                    h-6
            
                                                    rounded-full
                                                    bg-blue-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xs
                                                    font-bold
                                                    "
                                                    >
                                                        {item.createdBy.charAt(0).toUpperCase()}
                                                    </span>

                                                    Posted by {item.createdBy}
                                                </div>
                                            )} */}

                                        </div>

                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1
                                                    text-red-500
                                                    font-semibold
                                                "
                                            >

                                                <Heart
                                                    size={16}
                                                    fill="currentColor"
                                                />

                                                {item.likes || 0}

                                            </div>

                                            <button
                                                onClick={() =>
                                                    setExpandedNews(
                                                        expandedNews === item.id
                                                            ? null
                                                            : item.id
                                                    )
                                                }
                                                className="
                                                text-blue-600
                                                font-semibold
                                                flex
                                                items-center
                                                gap-1
                                                group-hover:gap-2
                                                transition-all
                                            "
                                            >
                                                {
                                                    expandedNews === item.id
                                                        ? "Show Less"
                                                        : "Read More"
                                                }

                                                <ArrowRight
                                                    size={16}
                                                    className={`
                                                        transition-transform
                                                        ${expandedNews === item.id
                                                            ? "rotate-90"
                                                            : ""
                                                        }
                                                    `}
                                                />

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </article>

                        ))}
                    </div>
                </div>

            </div>
        </section>

    );
}

export default LatestClubNews;