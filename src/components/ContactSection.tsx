import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ContactSection() {
  const { setCurrentPage } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 900);
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/djxspiq46/video/upload/q_auto,f_auto/Video_Project_pveetp.mp4" type="video/mp4" />
        <source src="https://res.cloudinary.com/djxspiq46/video/upload/Video_Project_pveetp.webm" type="video/webm" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/45 to-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back button */}
        <button
          onClick={() => setCurrentPage('pricing')}
          className="self-start flex items-center gap-2 px-8 py-6 text-white/70 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-medium tracking-widest">BACK</span>
        </button>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="mb-10">
              <p className="text-white/50 text-xs font-medium tracking-widest mb-3">GET IN TOUCH</p>
              <h2 className="text-5xl md:text-6xl font-light text-white leading-tight">
                Let's build<br />something great
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white text-sm placeholder-white/35 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white text-sm placeholder-white/35 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
              <textarea
                name="message"
                placeholder="Brief message (optional)"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-white text-sm placeholder-white/35 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-sm font-medium text-xs tracking-widest hover:bg-white/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                <span>{submitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                {!submitting && <Send size={14} />}
              </button>
            </form>

            {/* Success feedback */}
            <div
              className={`mt-4 px-4 py-3 bg-white/10 border border-white/30 rounded-sm text-white text-sm text-center transition-all duration-500 ${
                submitted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              Message sent! I'll get back to you soon.
            </div>

            {/* Contact links */}
            <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-xs tracking-widest mb-2">EMAIL</p>
                <p className="text-white text-sm hover:opacity-70 transition cursor-pointer">hello@example.com</p>
              </div>
              <div>
                <p className="text-white/40 text-xs tracking-widest mb-2">PHONE</p>
                <p className="text-white text-sm hover:opacity-70 transition cursor-pointer">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
