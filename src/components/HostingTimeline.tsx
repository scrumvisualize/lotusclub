import { useEffect, useRef, useState } from 'react';
import { schedule } from '../assets/data';

export default function MondayTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(
        null
    );

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const today = new Date();

    const allSchedule = schedule;
    //const isDarkMode = document.documentElement.classList.contains('dark');

    const lastCompletedIndex = allSchedule.reduce((acc, item, i) => {
        return new Date(item.date) <= today ? i : acc;
    }, 0);

    const maxIndex = allSchedule.length - 1;

    const safeActiveIndex = Math.min(activeIndex, lastCompletedIndex);

    //const progress = maxIndex <= 0 ? 0 : (safeActiveIndex / maxIndex) * 100;
    const progress =
        maxIndex <= 0
            ? 0
            : (Math.max(0, safeActiveIndex) / maxIndex) * 100;

    const timelineRef = useRef<HTMLDivElement | null>(null);

    // =========================
    // PLAY / PAUSE
    // =========================

    useEffect(() => {
        setActiveIndex(-1);
        setPlaying(true);
    }, []);

    useEffect(() => {
        if (playing) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prev) => {
                    if (prev >= lastCompletedIndex) {
                        setPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [playing, lastCompletedIndex]);

    useEffect(() => {

        if (safeActiveIndex < 0) return;

        const container = timelineRef.current;

        if (!container) return;


        const timelineWidth = 850;
        const itemWidth = timelineWidth / allSchedule.length;


        // Position of current green icon
        const iconPosition =
            safeActiveIndex * itemWidth + itemWidth / 2;


        // Keep icon in center of mobile screen
        const scrollPosition =
            iconPosition - container.clientWidth / 2;


        container.scrollTo({

            left: Math.max(0, scrollPosition),

            // Smooth browser animation
            behavior: "smooth"

        });


    }, [safeActiveIndex]);

    const formatDisplayDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "long",
        });
    };

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            {/* BUTTONS */}
            <div style={{
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center'
            }}>
                <button
                    onClick={() => {
                        setActiveIndex(-1);
                        setPlaying(true);
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: 'none',
                        background: '#1e1f1e',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease'
                    }}
                    title="Play Timeline"
                >
                    ▶
                </button>

                <button
                    onClick={() => setPlaying(false)}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: 'none',
                        background: '#1e1f1e',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease'
                    }}
                >⏸ </button>
            </div>

            {/* =========================
                TIMELINE WRAPPER
                ========================= */}

            <div
                ref={timelineRef}   // ADD THIS
                className="timeline-scroll"
                style={{
                    position: 'relative',
                    marginTop: 40,
                    height: 280,   // FIX: give tooltip space
                    overflowX: 'auto',
                    width: '100%',
                    scrollBehavior: 'smooth'

                }}
            >

                {/* FIX:
                Same width as milestone row.
                This keeps progress bar and green icons synced on mobile.
                */}
                <div
                    style={{
                        position: 'relative',
                        minWidth: 850,
                        height: 220
                    }}
                >

                    {/* =========================
                    CONNECTOR BACK LINE
                    ========================= */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 110,
                            left: 10,
                            right: 15,
                            height: 40,
                            background: '#e0e0e0',
                            borderRadius: 4,
                            zIndex: 0
                        }}
                    />


                    {/* =========================
                    CONNECTOR PROGRESS LINE
                    ========================= */}
                    <div
                        style={{
                            position: 'absolute',

                            // FIX:
                            // Same coordinate system as milestone row
                            top: 110,
                            left: 10,

                            height: 40,

                            // FIX:
                            // Calculate against complete timeline width
                            width: `calc(${progress}% - 15px)`,

                            background:
                                'linear-gradient(90deg, #0f53e6, #799ef0)',

                            borderRadius: 4,
                            zIndex: 1,

                            transition: 'width 0.8s ease'
                        }}
                    />


                    {/* =========================
                    MILESTONES ROW
                    ========================= */}
                    <div
                        style={{
                            position: 'relative',
                            marginTop: 60
                        }}
                    >

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                position: 'relative',
                                zIndex: 2,

                                // KEEP SAME WIDTH
                                minWidth: 850
                            }}
                        >

                            {allSchedule.map((item, index) => {

                                const isPastOrPresent =
                                    new Date(item.date) <= today;

                                const isCompleted =
                                    index <= safeActiveIndex;


                                return (
                                    <div
                                        key={item.date}
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            position: 'relative'
                                        }}
                                    >

                                        {/* DOT */}

                                        <div
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: '50%',
                                                margin: '0 auto',
                                                background: isCompleted
                                                    ? '#2ecc71'
                                                    : isPastOrPresent
                                                        ? '#90ee90'
                                                        : '#ccc',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                zIndex: 999,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}

                                            // Desktop hover
                                            onMouseEnter={() => {
                                                setActiveTooltipIndex(index);
                                            }}

                                            onMouseLeave={() => {
                                                setActiveTooltipIndex(null);
                                            }}

                                            // Mobile touch
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setActiveTooltipIndex(index);
                                            }}


                                            onTouchEnd={(e) => {
                                                e.stopPropagation();

                                                setActiveTooltipIndex(index);
                                            }}
                                        >

                                            <div
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    background: '#fff'
                                                }}
                                            />

                                        </div>

                                        {/* TOOLTIP */}
                                        {activeTooltipIndex === index && (
                                            <div
                                                style={{
                                                    position: 'absolute',

                                                    // FIX: position above green icon
                                                    top: -54,

                                                    left: '50%',
                                                    transform: 'translateX(-50%)',

                                                    background: '#1f2937',
                                                    color: '#fff',

                                                    padding: '8px 12px',
                                                    borderRadius: 8,

                                                    fontSize: 12,
                                                    whiteSpace: 'nowrap',

                                                    zIndex: 9999,

                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',

                                                    pointerEvents: 'none'
                                                }}
                                            >
                                                <div>👤 {item.hosts[0]}</div>
                                                <div>👤 {item.hosts[1]}</div>
                                            </div>
                                        )}


                                        {/* DATE */}
                                        <div
                                            style={{
                                                fontSize: 12,
                                                marginTop: 12,
                                                marginBottom: 10
                                            }}
                                        >
                                            {formatDisplayDate(item.date)}
                                        </div>


                                        {/* STATUS */}
                                        <div
                                            style={{
                                                display: 'inline-block',
                                                marginTop: 4,
                                                padding: '3px 8px',
                                                borderRadius: 9999,
                                                fontSize: 10,
                                                fontWeight: 600,

                                                background:
                                                    isCompleted
                                                        ? '#dcfce7'
                                                        : '#f3f4f6',

                                                color:
                                                    isCompleted
                                                        ? '#15803d'
                                                        : '#6b7280'
                                            }}
                                        >
                                            {
                                                isCompleted
                                                    ? '✓ Completed'
                                                    : 'Upcoming'
                                            }
                                        </div>


                                    </div>
                                );
                            })}

                        </div>


                        {/* =========================
                        DOTTED CONNECTOR
                        ========================= */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 15,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                zIndex: 1
                            }}
                        >

                            {allSchedule
                                .slice(0, -1)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            flex: 1,
                                            height: 2,
                                            margin: '0 2px',

                                            backgroundImage:
                                                'repeating-linear-gradient(90deg,#aaa 0,#aaa 3px,transparent 3px,transparent 7px)'
                                        }}
                                    />
                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}