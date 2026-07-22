import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "Who can be a Lotus club member ?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Add your answer here.",
    },
    {
        question: "Can I cancel club membership for a year and later rejoin ?",
        answer:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        question:
            "Can I transfer my club membership to another person ?",
        answer:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },

    {
        question:
            "Will a Lotus member get discounts from other clubs in India/ Kerala ?",
        answer:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        question:
            "Do we have a physical membership cards for members in Brisbane ?",
        answer:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
];

const FAQSection = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>


                    <p className="mt-4 text-gray-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Find answers to common questions about Lotus club.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="
                            group
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            dark:border-slate-700
                            bg-white
                            dark:bg-slate-800/70
                            shadow-md
                            dark:shadow-slate-950/50
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                            dark:hover:border-blue-500
                        "
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-7"
                                >
                                    <span
                                        className="
                                    text-left
                                    text-base
                                    sm:text-lg
                                    font-semibold
                                    text-blue-700 
                                    dark:text-slate-100
                                    transition-all
                                    duration-300
                                    group-hover:text-blue-600
                                    dark:group-hover:text-blue-400
                                    group-hover:underline
                                    underline-offset-4
                                "
                                    >
                                        {faq.question}
                                    </span>

                                    <div
                                        className={`
                                    flex-shrink-0
                                    rounded-full
                                    p-2
                                    bg-slate-100
                                    dark:bg-slate-700
                                    transition-all
                                    duration-300
                                    ${isOpen
                                                ? "rotate-180 bg-blue-100 dark:bg-blue-900/40"
                                                : ""
                                            }
                                `}
                                    >
                                        <ChevronDown
                                            size={22}
                                            className="text-gray-700 dark:text-slate-300"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`
                                overflow-hidden
                                transition-all
                                duration-500
                                ease-in-out
                                ${isOpen
                                            ? "max-h-60 opacity-100"
                                            : "max-h-0 opacity-0"
                                        }
                            `}
                                >
                                    <div className="px-5 pb-5 sm:px-7 text-gray-600 dark:text-slate-300 leading-7 text-sm sm:text-base">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;