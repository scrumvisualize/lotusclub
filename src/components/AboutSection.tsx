import aboutImage from "../assets/hero.png";

export default function AboutSection() {

    return (

        <section
            id="about"
            className="
            mt-10
            sm:mt-12
            lg:mt-0
            min-h-[550px]
            py-10
            pb-6
            lg:h-[500px]
            bg-gradient-to-br
            from-white
            via-pink-50
            to-blue-50
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
                gap-10
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
                        About Us
                    </h2>


                    <p
                        className="
                        mt-6
                        text-lg
                        leading-8
                        text-gray-600
                        dark:text-gray-300
                        "
                    >
                        Lotus Club is a place where friendship, fun and unforgettable memories come together. We believe that every gathering is an opportunity to strengthen relationships, share laughter and create meaningful experiences in a warm and welcoming environment.

                        <br /><br />

                        Our club brings people together through exciting activities, social events and shared interests that encourage connection and community spirit. Whether you're joining us for a relaxing evening, a friendly card game, a special celebration or simply spending quality time with friends.

                        <br /><br />
                        Our mission is to provide a safe, inclusive and enjoyable space where members can unwind, build lasting friendships and feel a true sense of belonging.
                    </p>


                    <button
                        className="
                        mt-4
                        px-8
                        py-3
                        rounded-full
                        bg-pink-600
                        hover:bg-pink-700
                        text-white
                        font-semibold
                        shadow-lg
                        transition
                        hover:scale-105
                        "
                    >
                        Learn More
                    </button>


                </div>




                {/* Right Side - Image */}

                <div
                    className="
                    flex
                    justify-center
                    "
                >

                    <img
                        src={aboutImage}
                        alt="About Lotus Club"
                        className="
                        w-full
                        max-w-lg
                        h-[320px]
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