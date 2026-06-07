import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type BillingPeriod = 'annually' | 'monthly';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    description: 'Simple and powerful',
    cta: 'Get started for free',
    features: [
      'Beautiful default styling',
      'Custom domain',
      'SEO optimizations',
      'Auto-generated API docs',
      'Built-in components library',
      'Third-party analytics integrations',
      'In-app search',
    ],
    highlighted: false,
  },
  {
    name: 'Startup',
    price: { monthly: 120, annually: 1200 },
    badge: 'Popular',
    description: 'Built for growing companies',
    cta: 'Try for free',
    features: [
      'Up to 6 editors',
      'Advanced analytics',
      'Conversion insights',
      'ChatGPT for docs',
      'User feedback',
      'Custom subpaths /docs',
      'GitLab support',
      'White-glove migrations',
    ],
    highlighted: true,
  },
  {
    name: 'Growth',
    price: { monthly: 400, annually: 4000 },
    description: 'Built for scale',
    cta: 'Contact us',
    features: [
      'Up to 15 editors',
      'Custom ChatGPT+ responses',
      'Preview deployments',
      'Multiple repo sources',
      'Password-protection',
      'Custom global CSS',
      'Slack connect support',
    ],
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Fully tailored for your business',
    cta: 'Contact us',
    features: [
      'Unlimited editors',
      'Advanced security',
      'Premier Xentity branding',
      'Custom authentication',
      'Custom integrations',
      'Translation management',
      'Custom SLA agreement',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const { setCurrentPage } = useTheme();
  const [billing, setBilling] = useState<BillingPeriod>('monthly');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background video (Cloudinary) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://res.cloudinary.com/djxspiq46/video/upload/Video_Project_1_los1pg.mp4"
        />
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Back button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="self-start flex items-center gap-2 px-8 py-6 text-white/70 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-medium tracking-widest">BACK</span>
        </button>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Header */}
          <div className="text-center mb-9 max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4 leading-tight">
              Pricing on your terms
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Whichever plan you pick, it's free until you love your docs.
              <br />
              That's our promise.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex gap-4 mb-6 bg-white/10 p-1 rounded-full border border-white/20">
            <button
              onClick={() => setBilling('annually')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'annually'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Annually
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'monthly'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Get Started CTA */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white/90 rounded-full hover:bg-white/5 transition"
            >
              <span className="text-sm font-medium tracking-widest">GET STARTED</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-slate-700/40 border-2 border-slate-500/30 shadow-xl shadow-slate-900/40 scale-105 backdrop-blur-sm'
                    : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/40 hover:border-slate-600/30 backdrop-blur-sm'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-slate-600/30 text-slate-200 text-xs font-medium px-3 py-1 rounded-full border border-slate-500/20">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-white text-lg font-medium mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-3xl ${plan.highlighted ? 'text-white/95 text-4xl font-semibold' : 'font-light text-white'}`}>
                      {typeof plan.price === 'string'
                        ? plan.price
                        : `$${typeof plan.price === 'number' ? plan.price : plan.price[billing]}`}
                    </span>
                    {typeof plan.price !== 'string' && plan.price !== 0 && (
                      <span className="text-white/50 text-sm">
                        /{billing === 'annually' ? 'year' : 'month'}
                      </span>
                    )}
                    {typeof plan.price !== 'string' && typeof plan.price === 'object' && (
                      <span className="text-white/50 text-xs ml-1">/project</span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                  <button
                    className={`w-full py-2 rounded-full text-sm font-medium transition-all ${
                      plan.highlighted
                        ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-300'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>

                {/* Features */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/40 text-xs font-medium mb-4">
                    Everything on {PLANS[0].name.toLowerCase()} plus:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                          <Check size={16} className="text-slate-200/70 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-xs">{feature}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
