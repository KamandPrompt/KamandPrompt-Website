import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { handleSpecialCommands, WELCOME_MESSAGE, ASCII_ART } from '../kamand-prompt/data';
import { cn } from '@/lib/utils';

const Terminal = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([{ type: 'info', content: WELCOME_MESSAGE }]);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isMaximized, setIsMaximized] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Focus input when terminal opens or clicks anywhere in terminal
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-scroll to bottom on new output
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [output]);

    const handleCommand = (cmd) => {
        if (!cmd.trim()) return;

        // Add command to history
        const newHistory = [...history, cmd];
        setHistory(newHistory);
        setHistoryIndex(-1);

        // Initial user command echo
        const newOutput = [
            ...output,
            { type: 'command', content: `$ ${cmd}` }
        ];

        // Process command
        // Process command
        Promise.resolve(handleSpecialCommands(cmd, newHistory))
            .then(result => {
                // Handle special actions
                if (result.type === 'clear') {
                    setOutput([]);
                    return;
                }

                if (result.type === 'exit') {
                    onClose();
                    return;
                }

                if (result.type === 'navigate') {
                    navigate(result.route);
                    setOutput([...newOutput, { type: 'success', content: result.output }]);
                    return;
                }

                // Add response to output
                setOutput(prev => [
                    ...prev,
                    { type: result.type, content: result.output }
                ]);
            })
            .catch(err => {
                setOutput(prev => [
                    ...prev,
                    { type: 'error', content: `Error: ${err.message}` }
                ]);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex] || '');
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    const handleMinimizeAndClear = (e) => {
        e.stopPropagation();
        setOutput([{ type: 'info', content: WELCOME_MESSAGE }]);
        setHistory([]);
        setHistoryIndex(-1);
        setInput('');
        onClose();
    };

    const handleMinimize = (e) => {
        e.stopPropagation();
        onClose();
    };

    const handleMaximize = (e) => {
        e.stopPropagation();
        setIsMaximized(!isMaximized);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                    "fixed z-[200] flex items-center justify-center",
                    isMaximized ? "inset-0 p-0" : "inset-0 p-4 md:p-0"
                )}
            >
                {/* Backdrop - only show if not maximized, or show but covered? */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Terminal Window */}
                <div
                    className={cn(
                        "relative bg-black shadow-2xl overflow-hidden flex flex-col border border-white/20 font-mono text-sm md:text-base transition-all duration-300",
                        isMaximized ? "w-full h-full rounded-none border-none" : "w-full max-w-3xl h-[80vh] rounded-lg"
                    )}
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Title Bar */}
                    <div className="bg-black px-4 py-3 flex items-center justify-between border-b border-white/20 select-none">
                        <div className="flex gap-2" role="group" aria-label="Window controls">
                            {/* Close */}
                            <button
                                onClick={handleMinimizeAndClear}
                                className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 cursor-pointer flex items-center justify-center group"
                                aria-label="Close and clear terminal"
                            >
                                <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </button>
                            {/* Minimize */}
                            <button
                                onClick={handleMinimize}
                                className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 cursor-pointer flex items-center justify-center group"
                                aria-label="Minimize terminal"
                            >
                                <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </button>
                            {/* Fullscreen */}
                            <button
                                onClick={handleMaximize}
                                className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 cursor-pointer flex items-center justify-center group"
                                aria-label="Toggle fullscreen"
                            >
                                <Square className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </button>
                        </div>
                        <div className="text-white/50 text-xs font-medium">kamand-prompt — zsh — {isMaximized ? 'fullscreen' : '80x24'}</div>
                        <div className="w-14"></div>
                    </div>

                    {/* Terminal Content */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 md:p-6 text-white scrollbar-hide"
                        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                    >
                        {/* ASCII Logo Initial Display */}
                        {output.length > 0 && output[0].content === WELCOME_MESSAGE && (
                            <div className="text-white/40 mb-6 text-[10px] md:text-xs leading-none whitespace-pre select-none">
                                {ASCII_ART.logo}
                            </div>
                        )}

                        {/* Output History */}
                        {output.map((line, i) => (
                            <div key={i} className="mb-2 break-words whitespace-pre-wrap">
                                {line.type === 'command' ? (
                                    <span className="text-white font-bold">
                                        <span className="text-white/70 mr-2">$</span>
                                        {line.content.replace('$ ', '')}
                                    </span>
                                ) : (
                                    <div className={cn(
                                        "leading-relaxed",
                                        line.type === 'error' ? "text-white/60" :
                                            line.type === 'success' ? "text-white" :
                                                "text-white/80"
                                    )}>
                                        {line.content}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Input Line */}
                        <div className="flex items-center gap-2 mt-2 text-white font-bold">
                            <span className="text-white/70">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-600"
                                autoComplete="off"
                                spellCheck="false"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence >
    );
};

export default Terminal;
