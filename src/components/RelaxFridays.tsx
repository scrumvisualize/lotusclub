import relaxImage from "../assets/barbecue.png";

export default function RelaxFridays() {

    return (

        <section
            className="
            mt-12
            py-16
            lg:h-[500px]
            bg-gradient-to-br
            from-purple-50
            via-white
            to-pink-50
            dark:from-slate-900
            dark:via-slate-950
            dark:to-slate-900
            transition-colors
            duration-500
            "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                h-full
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-12
                items-center
                "
            >

                {/* Left Side - Text */}

                <div>

                    <h2
                        className="
                        text-4xl
                        md:text-5xl
                        font-bold
                        text-slate-800
                        dark:text-white
                        "
                    >
                        Barbecue Fridays
                    </h2>

                    <p
                        className="
                        mt-4
                        text-lg
                        leading-7
                        text-gray-600
                        dark:text-gray-300
                        "
                    >
                        Every Friday is a chance to relax,
                        connect and enjoy great moments
                        together at Lotus Club.

                        <br /><br />

                        Spend quality time with friends,
                        enjoy card games, delicious refreshments
                        and create unforgettable memories in a
                        warm and welcoming atmosphere.

                        <br /><br />

                        Whether you're a long-time member or visiting for the first time, Relax Fridays offer the perfect opportunity to unwind after a busy week. Enjoy meaningful conversations, friendly competition, plenty of laughter and a welcoming community where everyone feels at home.
                    </p>

                    <button
                        className="
                        mt-4
                        px-8
                        py-3
                        rounded-full
                        bg-purple-600
                        hover:bg-purple-700
                        text-white
                        font-semibold
                        shadow-lg
                        transition
                        hover:scale-105
                        "
                    >
                        Join Relax Fridays
                    </button>

                </div>



                {/* Right Side - Image */}

                <div className="flex justify-center">

                    <img
                        src={relaxImage}
                        alt="Relax Fridays"
                        className="
                        w-full
                        max-w-lg
                        h-[300px]
                        sm:h-[380px]
                        lg:h-[420px]
                        object-cover
                        rounded-3xl
                        shadow-2xl
                        border
                        border-white
                        dark:border-slate-700
                        "
                    />

                </div>

            </div>

        </section>

    );

}