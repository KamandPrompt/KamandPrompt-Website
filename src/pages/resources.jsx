import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, ExternalLink, Book, Video, FileText, Code, Lightbulb, ChevronDown, Search,
    GitBranch, Brain, Globe, Smartphone, Trophy, Star, Link, FolderOpen, Map
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { getResources } from '../api';

// Category icon mapping (Lucide icons)
const categoryIcons = {
    Code: Code,
    GitBranch: GitBranch,
    Brain: Brain,
    Globe: Globe,
    Smartphone: Smartphone,
    Trophy: Trophy,
    Star: Star,
};

// Resource type icon mapping (Lucide icons)
const typeIcons = {
    Video: Video,
    Book: Book,
    FileText: FileText,
    Code: Code,
    Lightbulb: Lightbulb,
    Link: Link,
    FolderOpen: FolderOpen,
    Map: Map,
};

const getCategoryIcon = (iconName) => {
    const IconComponent = categoryIcons[iconName] || Code;
    return <IconComponent className="w-5 h-5" />;
};

const getTypeIcon = (typeName) => {
    const IconComponent = typeIcons[typeName] || FileText;
    return <IconComponent className="w-4 h-4" />;
};

const Resources = () => {
    const containerRef = useRef(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getResources()
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load Resources data:', err);
                setLoading(false);
            });
    }, []);

    // Filter categories based on search
    const filteredCategories = data?.categories?.filter(category => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        if (category.name.toLowerCase().includes(query)) return true;
        return category.resources?.some(r => r.title.toLowerCase().includes(query));
    }) || [];

    useGSAP(() => {
        if (loading) return;

        // Stagger animate categories
        gsap.fromTo(
            '.page-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
        );

        // Animate category cards when they appear
        const cards = document.querySelectorAll('.category-card');
        if (cards.length > 0) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
            );
        }
    }, { scope: containerRef, dependencies: [loading, filteredCategories.length] });

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white/50 font-mono">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
                    <span>Loading resources...</span>
                </div>
            </div>
        );
    }

    return (
        <main ref={containerRef} className="min-h-screen bg-black font-mono pt-24 pb-16 relative overflow-hidden">
            {/* Background decoration - Monochrome */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 page-title opacity-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 mb-8 text-sm text-white/50 bg-black/50 backdrop-blur-sm">
                        <Terminal className="w-4 h-4" />
                        $ ./resources.sh --list-all
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-6">
                        RESOURCES
                    </h1>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg mb-8">
                        {data?.description || 'Curated learning materials from our community sessions.'}
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                            aria-label="Search resources"
                        />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: 'Categories', value: data?.categories?.length || 0 },
                        { label: 'Resources', value: data?.categories?.reduce((acc, c) => acc + (c.resources?.length || 0), 0) || 0 },
                        { label: 'Videos', value: data?.categories?.reduce((acc, c) => acc + (c.resources?.filter(r => r.type === 'Video').length || 0), 0) || 0 },
                        { label: 'Guides', value: data?.categories?.reduce((acc, c) => acc + (c.resources?.filter(r => r.type === 'Book' || r.type === 'FolderOpen').length || 0), 0) || 0 },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Categories Accordion */}
                <div className="space-y-3">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.id}
                            className="category-card group"
                        >
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${expandedCategory === category.id
                                    ? 'bg-white/10 border-white/30'
                                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                                        {getCategoryIcon(category.icon)}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold text-white">{category.name}</h3>
                                        <p className="text-xs text-white/50">
                                            {category.resources?.length || 0} resources
                                            {category.practice?.length ? ` • ${category.practice.length} practice tasks` : ''}
                                        </p>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 text-white/50 transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Category Content */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === category.id ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="p-4 space-y-2">
                                    {/* Resources */}
                                    {category.resources?.map((resource) => (
                                        <a
                                            key={resource.id}
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all group/item"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                                                    {getTypeIcon(resource.type)}
                                                </div>
                                                <div>
                                                    <span className="text-white font-medium">{resource.title}</span>
                                                    {resource.note && (
                                                        <p className="text-xs text-white/40 mt-0.5">{resource.note}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-white/30 group-hover/item:text-white/70 transition-colors" />
                                        </a>
                                    ))}

                                    {/* Practice Section */}
                                    {category.practice && category.practice.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
                                                Practice Tasks
                                            </h4>
                                            <div className="space-y-2">
                                                {category.practice.map((item, idx) => (
                                                    typeof item === 'string' ? (
                                                        <div key={idx} className="flex items-start gap-2 text-sm text-white/60 p-2">
                                                            <span className="text-white/30 mt-0.5">→</span>
                                                            <span>{item}</span>
                                                        </div>
                                                    ) : (
                                                        <a
                                                            key={idx}
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-lg hover:bg-zinc-800/50 transition-all"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm">{item.type}</span>
                                                                <span className="text-sm text-white/70">{item.name}</span>
                                                            </div>
                                                            <ExternalLink className="w-3 h-3 text-white/30" />
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-white/40">No resources match your search.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Resources;
