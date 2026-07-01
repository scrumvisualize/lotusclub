import { FileText } from "lucide-react";

import samplePdf from "../assets/sample.pdf";

export default function ClubPolicies() {

    const policies = [
        {
            title: "Member Rules",
            description:
                "Please read the member guidelines to help maintain a friendly, respectful and enjoyable environment for everyone at Lotus Club.",
            file: samplePdf,
        },
        {
            title: "Club Rules",
            description:
                "Learn about the club policies, code of conduct and general rules that ensure a safe and welcoming experience.",
            file: samplePdf,
        },
        {
            title: "Hosting Rules",
            description:
                "Important guidelines for members hosting events, celebrations and activities within Lotus Club facilities.",
            file: samplePdf,
        },
    ];

    return (
        <section
            id="policies"
            className="
            mt-16
            py-20
            bg-gradient-to-br
            from-slate-50
            via-white
            to-blue-50
            dark:from-slate-900
            dark:via-slate-950
            dark:to-slate-900
            transition-colors
            duration-500
            "
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                        Club Policies & Rules
                    </h2>

                    <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                        Please read our policies and guidelines to ensure a safe,
                        respectful and enjoyable experience for all members and visitors.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {policies.map((policy) => (
                        <div
                            key={policy.title}
                            className="
                            bg-white
                            dark:bg-slate-800
                            rounded-3xl
                            shadow-xl
                            p-8
                            text-center
                            border
                            border-gray-100
                            dark:border-slate-700
                            hover:-translate-y-2
                            hover:shadow-2xl
                            transition-all
                            duration-300
                            "
                        >
                            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 dark:bg-slate-700 flex items-center justify-center">
                                <FileText
                                    size={42}
                                    className="text-blue-600 dark:text-blue-400"
                                />
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold text-slate-800 dark:text-white">
                                {policy.title}
                            </h3>

                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-7">
                                {policy.description}
                            </p>

                            <a
                                href={policy.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                font-medium
                                shadow-lg
                                transition
                                hover:scale-105
                                "
                            >
                                <FileText size={18} />
                                View PDF
                            </a>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}