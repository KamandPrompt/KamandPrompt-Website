import React, { useRef, useState, useEffect } from 'react';
import { Calendar, Layers, Terminal } from 'lucide-react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { getEvents, getAssetUrl } from '../api';

const Events = () => {
    const containerRef = useRef(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents()
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load Events data:', err);
                setLoading(false);
            });
    }, []);

    // Group events by category
    const groupedEvents = data ? data.events.reduce((acc, event) => {
        if (!acc[event.category]) {
            acc[event.category] = [];
        }
        acc[event.category].push(event);
        return acc;
    }, {}) : {};

    const categories = Object.keys(groupedEvents).sort();

    useGSAP(() => {
        if (loading) return;

        // Animate Title
        gsap.fromTo(
            '.page-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
        );
    }, { scope: containerRef, dependencies: [loading] });

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white/50 font-mono">Loading...</div>;
    }

    return (
        <main ref={containerRef} className="min-h-screen bg-black font-mono pt-24 pb-16 relative">
            {/* Background decoration - Monochrome */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 page-title opacity-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 mb-8 text-sm text-white/50 bg-black/50 backdrop-blur-sm">
                        <Terminal className="w-4 h-4" />
                        $ ./list_events.sh --all
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-6">
                        EVENTS
                    </h1>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg">
                        Workshops, bootcamps, and community gatherings.
                    </p>
                </div>

                {/* Events List */}
                <div className="space-y-16">
                    {categories.map((category) => (
                        <div key={category} className="category-section">
                            <div className="category-header flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                    {category}
                                </h2>
                                <div className="h-px flex-1 bg-white/20" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedEvents[category].map((event) => (
                                    <div
                                        key={event.id}
                                        className="event-card group relative bg-zinc-900 border border-zinc-800 hover:border-white/50 hover:bg-zinc-800 transition-all duration-300 rounded-lg overflow-hidden flex flex-col"
                                    >
                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={getAssetUrl(event.image)}
                                                alt={event.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-4">
                                                <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] text-white/90 font-bold uppercase tracking-wider inline-block">
                                                    {event.id}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors mb-2">
                                                {event.title}
                                            </h3>

                                            <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">
                                                {event.description}
                                            </p>

                                            <div className="pt-4 border-t border-white/10 space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>Date: <span className="text-zinc-300">{event.date}</span></span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                    <Layers className="w-3 h-3" />
                                                    <span>Index: <span className="text-zinc-300">{event.index}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-20 text-center text-white/30 text-xs">
                    <p>$ echo "Stay tuned for more updates."</p>
                </div>
            </div>
        </main>
    );
};

export default Events;
