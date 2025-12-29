import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Instagram, Linkedin, Github, User, AtSign, MessageSquare, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getTeam, getAssetUrl } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [coordinator, setCoordinator] = useState(null);

  React.useEffect(() => {
    getTeam()
      .then(data => {
        const coordRole = data.roles.find(r => r.role === 'Coordinator');
        if (coordRole && coordRole.members.length > 0) {
          setCoordinator(coordRole.members[0]);
        }
      })
      .catch(err => console.error('Failed to load coordinator:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const receiverEmail = 'pc@students.iitmandi.ac.in';
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    { icon: Mail, label: 'EMAIL', value: 'pc@students.iitmandi.ac.in', href: 'mailto:pc@students.iitmandi.ac.in' },
    { icon: Phone, label: 'PHONE', value: '+91 94185 39191', href: 'tel:+919418539191' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KamandPrompt', label: 'GITHUB' },
    { icon: Instagram, href: 'https://www.instagram.com/kamandprompt/', label: 'INSTAGRAM' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/programming-club-iit-mandi/', label: 'LINKEDIN' },
  ];

  return (
    <main className="relative min-h-screen bg-black pt-24 pb-16 font-mono">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 mb-8 text-sm text-white/50">
            <Terminal className="w-4 h-4" />
            $ ./contact.sh --init
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase  tracking-wider mb-6">
            CONTACT US
          </h1>
          <p className="text-white/50">
            send_us_a_message
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="border border-white/30 bg-black"
          >
            {/* Terminal Header */}
            <div className="px-4 py-2 border-b border-white/30 bg-white/5">
              <span className="text-xs text-white/50">message.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/60 text-xs">
                  $ name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="your_name"
                  className="bg-white/5 border-white/30 text-white placeholder:text-white/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/60 text-xs">
                  $ email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/30 text-white placeholder:text-white/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/60 text-xs">
                  $ message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="your_message..."
                  className="bg-white/5 border-white/30 text-white placeholder:text-white/30 min-h-[120px]"
                  required
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="w-full">
                $ ./send.sh
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="border border-white/30"
            >
              <div className="px-4 py-2 border-b border-white/30 bg-white/5">
                <span className="text-xs text-white/50 uppercase">$ cat contact.txt</span>
              </div>
              <div className="p-6 space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label === 'LOCATION' ? '_blank' : undefined}
                    rel={info.label === 'LOCATION' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-3 border border-white/20 hover:border-white transition-all group"
                  >
                    <info.icon className="w-5 h-5 text-white/50 group-hover:text-white" />
                    <div>
                      <div className="text-xs text-white/40">{info.label}</div>
                      <div className="text-sm text-white">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Coordinator */}
            {coordinator && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="border border-white/30"
              >
                <div className="px-4 py-2 border-b border-white/30 bg-white/5">
                  <span className="text-xs text-white/50 uppercase">$ whoami --coordinator</span>
                </div>
                <div className="p-6 flex items-center gap-4">
                  <img
                    src={getAssetUrl(coordinator.image, '/team')}
                    alt={coordinator.name}
                    className="w-16 h-16 grayscale hover:grayscale-0 transition-all object-cover border border-white/30"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{coordinator.name.replace(' ', '_')}</h3>
                    <p className="text-xs text-white/50 uppercase">COORDINATOR</p>
                    <p className="text-sm text-white/60 mt-1">{coordinator.phone}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="border border-white/30"
            >
              <div className="px-4 py-2 border-b border-white/30 bg-white/5">
                <span className="text-xs text-white/50 uppercase">$ ls /socials</span>
              </div>
              <div className="p-6 flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 border border-white/20 text-center hover:border-white transition-all group"
                  >
                    <social.icon className="w-6 h-6 mx-auto mb-2 text-white/50 group-hover:text-white" />
                    <span className="text-xs text-white/50 group-hover:text-white">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;