import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../src/components/footer/Footer';
import Header from './components/header';
import Home from '../src/pages/home';
import Gsoc from '../src/pages/gsoc';
import Teams from '../src/pages/teams';
import Compete from '../src/pages/compete';
import Events from '../src/pages/events';
import Resources from '../src/pages/resources';
import Contact from './pages/contact';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import { preloadAllData } from './api';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                await preloadAllData((progress) => {
                    setLoadProgress(progress);
                });
            } catch (error) {
                console.error('Preload error:', error);
            } finally {
                // Small delay to ensure smooth animation completion
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        loadData();
    }, []);

    return (
        <>
            <Preloader isLoading={isLoading} progress={loadProgress} />
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ScrollToTop />
                <Header />
                <div className="main-content bg-black">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/gsoc" element={<Gsoc />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/compete" element={<Compete />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </>
    );
}

export default App;
