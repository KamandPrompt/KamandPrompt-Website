import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import logo from '../assets/logo.svg';
import TerminalWindow from './Terminal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/home' },
    { name: 'GSOC', path: '/gsoc' },
    { name: 'TEAM', path: '/teams' },
    { name: 'EVENTS', path: '/events' },
    { name: 'COMPETE', path: '/compete' },
    { name: 'RESOURCES', path: '/resources' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-[100] transition-all duration-300 font-mono',
          isScrolled
            ? 'bg-black border-b border-white/30'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo - Opens Terminal */}
            <div
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center space-x-3 group cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="Kamand Prompt"
                className="h-8 md:h-9 invert group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-lg md:text-xl font-bold text-white tracking-wider uppercase group-hover:text-white/80 transition-colors">
                KAMAND PROMPT
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'relative px-4 py-2 text-sm font-bold tracking-wider transition-all duration-200',
                      'hover-underline',
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.instagram.com/kamandprompt/', '_blank')}
                aria-label="Join Kamand Prompt on Instagram"
              >
                ./join.sh
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-white/30 bg-black">
                <SheetHeader className="text-left pb-6 border-b border-white/20">
                  <SheetTitle className="flex items-center space-x-2 text-white">
                    <img src={logo} alt="Logo" className="h-6 invert" />
                    <span className="uppercase tracking-wider">MENU</span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-1 mt-6">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'px-4 py-3 text-sm font-bold tracking-wider transition-all duration-200 border-l-2',
                          isActive
                            ? 'border-white text-white bg-white/10'
                            : 'border-transparent text-white/60 hover:text-white hover:border-white/50'
                        )
                      }
                    >
                      <span className="text-white/40 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {item.name}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-8 px-4">
                  <Button
                    variant="terminal"
                    className="w-full"
                    onClick={() => {
                      window.open('https://www.instagram.com/kamandprompt/', '_blank');
                      setIsOpen(false);
                    }}
                  >
                    $ ./join.sh
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Terminal Popup */}
      <TerminalWindow isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </>
  );
};

export default Header;