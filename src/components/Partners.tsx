import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";

import { db } from "../firebase";

import {
    ExternalLink
} from "lucide-react";


type Partner = {
    id: string;
    name: string;
    category: string;
    description: string;
    websiteUrl?: string;
    logoUrl?: string;
    displayOrder: number;
};


export default function Partners() {


    const [partners, setPartners] = useState<Partner[]>([]);
    const [expandedPartner, setExpandedPartner] =
        useState<string | null>(null);



    useEffect(() => {


        const q = query(
            collection(db, "partners"),
            orderBy("displayOrder", "asc")
        );


        const unsubscribe =
            onSnapshot(q, (snapshot) => {


                const data =
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Partner[];


                setPartners(data);


            });


        return () => unsubscribe();


    }, []);



    if (partners.length === 0) {
        return null;
    }



    return (

        <section
            className="
            py-20
            bg-gray-50
            dark:bg-slate-950
            "
        >


            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                "
            >


                {/* Heading */}

                <div
                    className="
                    text-center
                    "
                >

                    <div
                        className="
                        flex
                        justify-center
                        items-center
                        gap-2
                        "
                    >

                        <h2
                            className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                            dark:text-white
                            "
                        >
                            Our Community Partners
                        </h2>

                    </div>


                    <p
                        className="
                        mt-3
                        text-gray-600
                        dark:text-gray-300
                        "
                    >
                        Supporting our club through strong community partnerships
                    </p>


                </div>


                {/* Cards */}

                <div
                    className="
                    mt-12
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    "
                >

                    {
                        partners.map(partner => (


                            <div
                                key={partner.id}
                                className="
                                 group
                                relative
                                bg-white
                                dark:bg-slate-900
                                rounded-3xl
                                p-6
                                border
                                border-gray-200
                                dark:border-slate-800
                                shadow-md
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                                overflow-hidden
                                "
                            >


                                {/* Category */}

                                <span
                                    className="
                                    inline-block
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-blue-100
                                    text-blue-700
                                    dark:bg-blue-900
                                    dark:text-blue-300
                                    "
                                >
                                    {partner.category}
                                </span>

                                <div
                                    className="
                                    flex
                                    justify-center
                                    mb-5
                                    "
                                >
                                    <img
                                        src={
                                            partner.logoUrl
                                                ?
                                                partner.logoUrl
                                                :
                                                `https://www.google.com/s2/favicons?domain=${partner.websiteUrl}&sz=128`
                                        }
                                        alt={partner.name}
                                        className="
                                        w-30
                                        h-30
                                        rounded-2xl
                                        object-contain
                                        bg-gray-100
                                        dark:bg-slate-800
                                        p-3
                                        "
                                    />

                                </div>

                                <h3
                                    className="
                                    mt-5
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                    dark:text-white
                                    "
                                >

                                    {partner.name}

                                </h3>


                                <div
                                    className="
                                    mt-4
                                    rounded-2xl
                                    bg-gray-50
                                    dark:bg-slate-800/60
                                    border
                                    border-gray-100
                                    dark:border-slate-700
                                    p-2
                                "
                                >

                                    <p
                                        className="
                                    text-[15px]
                                    leading-7
                                    text-gray-700
                                    dark:text-gray-300
                                "
                                    >

                                        {
                                            expandedPartner === partner.id
                                                ? partner.description
                                                : partner.description?.slice(0, 82)
                                        }

                                        {
                                            expandedPartner !== partner.id &&
                                            partner.description?.length > 82 &&
                                            "..."
                                        }

                                    </p>

                                    {
                                        partner.description?.length > 82 && (

                                            <button

                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    setExpandedPartner(

                                                        expandedPartner === partner.id
                                                            ? null
                                                            : partner.id
                                                    );

                                                }}

                                                className="
                                                mt-2
                                                inline-flex
                                                items-center
                                                gap-1
                                                text-sm
                                                font-semibold
                                                text-blue-600
                                                hover:text-blue-800
                                                dark:text-blue-400
                                                transition-colors
                                                "
                                            >

                                                {
                                                    expandedPartner === partner.id
                                                        ? "↑ Read less"
                                                        : "Read more →"
                                                }

                                            </button>

                                        )
                                    }

                                </div>


                                {
                                    partner.websiteUrl &&
                                    (

                                        <a
                                            href={partner.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                            mt-6
                                            inline-flex
                                            items-center
                                            gap-2
                                            text-blue-600
                                            hover:text-blue-800
                                            font-semibold
                                            "
                                        >

                                            Visit Website

                                            <ExternalLink
                                                size={16}
                                            />

                                        </a>

                                    )
                                }



                            </div>


                        ))
                    }


                </div>


            </div>


        </section>

    );

}