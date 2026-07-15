// GlobalLoader.tsx

export default function GlobalLoader() {
    return (
        <div
            className="
                fixed inset-0 z-[9999]
                flex items-center justify-center
                bg-black/30 dark:bg-black/60
                backdrop-blur-sm
                px-4
            "
        >
            <div
                className="
                    flex flex-col items-center gap-5
                    rounded-3xl
                    bg-white/90 dark:bg-slate-900/90
                    px-8 py-7
                    shadow-2xl
                    border border-white/20
                "
            >
                {/* Outer ring */}
                <div className="relative">
                    <div
                        className="
                            h-20 w-20
                            sm:h-24 sm:w-24
                            rounded-full
                            border-[6px]
                            border-slate-200 dark:border-slate-700
                        "
                    />

                    {/* Animated ring */}
                    <div
                        className="
                            absolute inset-0
                            h-20 w-20
                            sm:h-24 sm:w-24
                            rounded-full
                            border-[6px]
                            border-transparent
                            border-t-blue-500
                            border-r-cyan-400
                            animate-spin
                        "
                    />

                    {/* Inner pulse */}
                    <div
                        className="
                            absolute left-1/2 top-1/2
                            h-5 w-5
                            sm:h-6 sm:w-6
                            -translate-x-1/2 -translate-y-1/2
                            rounded-full
                            bg-blue-500
                            animate-pulse
                        "
                    />
                </div>

                <div className="text-center">
                    <h3
                        className="
                            text-base sm:text-lg
                            font-semibold
                            text-slate-800 dark:text-slate-100
                        "
                    >

                    </h3>

                    <p
                        className="
                            mt-1
                            text-xs sm:text-sm
                            text-slate-500 dark:text-slate-400
                        "
                    >
                        Please wait a moment
                    </p>
                </div>
            </div>
        </div>
    );
}