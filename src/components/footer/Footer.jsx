import React from 'react';
import { Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

function Footer() {
  const socials = [
    { icon: Github, href: 'https://github.com/KamandPrompt', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/kamandprompt/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/programming-club-iit-mandi/', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-black font-mono border-t border-white/10">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Brand + CTA */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight mb-8">
              Kamand<br />
              <span className="text-white/30">Prompt</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-md">
              The Programming Club of IIT Mandi. Building the future, one commit at a time.
            </p>
            <a
              href="mailto:pc@students.iitmandi.ac.in"
              className="group inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right - Social Only */}
          <div className="lg:pl-12 lg:flex lg:flex-col lg:justify-end">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">
                Social
              </p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">
          <p className="text-xs text-white/30">
            © 2026 Programming Club, IIT Mandi
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;