import React, { useState, useEffect, useCallback } from 'react';

/**
 * Magnetic Ad Designs - Final Professional Version
 * Design: Inspired by image_d6eb08.jpg (Blob Shapes & Modern Layout)
 * Language: Professional English (UI) with Sinhala description.
 * Optimized: Facebook Ads theme with dual hero image cycling.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Loading 43 samples from /public/samples/
  const samples = Array.from({ length: 43 }).map((_, i) => ({
    id: i + 1,
    title: "Premium Ad Design " + (i + 1),
    category: i % 2 === 0 ? "Social Media" : "Branding",
    img: `/samples/web01 (${ i + 1 }).png`
  }));

  const logoUrl = "/Logo/Logo (2).png";
  const heroImage1 = "/Covers/Cover001 (1).jpg"; 
  const heroImage2 = "/Covers/Cover001 (2).jpg";
  const whatsappBtnUrl = "/Buttons/whatsapp-button.png";
  const phoneNumber = "0773034396";
  const whatsappLink = `https://wa.me/94${phoneNumber.substring(1)}`;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % samples.length);
  }, [samples.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + samples.length) % samples.length);
  }, [samples.length]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentIndex !== null) {
      interval = setInterval(nextImage, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, nextImage]);

  return (
    <div className="min-h-screen bg-[#0a111a] text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      
      {/* Abstract Styles & Animations */}
      <style>{`
        .blob-clip {
          clip-path: url(#blob-path);
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate {
          animation: rotate-slow 30s linear infinite;
        }
        .hero-gradient-overlay {
          background: radial-gradient(circle at 70% 50%, rgba(250, 204, 21, 0.08) 0%, transparent 60%);
        }
      `}</style>

      {/* Custom SVG Blob Path */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="blob-path" clipPathUnits="objectBoundingBox">
            <path d="M0.85,0.25 C0.98,0.45 0.92,0.75 0.72,0.88 C0.52,1.01 0.25,0.92 0.12,0.72 C-0.01,0.52 0.05,0.22 0.25,0.09 C0.45,-0.04 0.72,0.05 0.85,0.25" />
          </clipPath>
        </defs>
      </svg>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 sm:px-12 py-6 flex items-center justify-between bg-[#0a111a]/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
             <div className="p-1.5 border-2 border-yellow-400 rounded-xl">
                <img src={logoUrl} alt="Magnetic" className="h-6 sm:h-8 w-auto object-contain" />
             </div>
            <span className="font-black tracking-[0.2em] text-lg sm:text-xl uppercase italic text-white">MAGNETIC ADS</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <button onClick={() => setActiveTab('home')} className={`transition-all hover:text-white ${activeTab === 'home' ? 'text-yellow-400 border-b border-yellow-400 pb-1' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('samples')} className={`transition-all hover:text-white ${activeTab === 'samples' ? 'text-yellow-400 border-b border-yellow-400 pb-1' : ''}`}>Samples</button>
            <button onClick={() => setActiveTab('pricing')} className={`transition-all hover:text-white ${activeTab === 'pricing' ? 'text-yellow-400 border-b border-yellow-400 pb-1' : ''}`}>Pricing</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 gap-4 group cursor-pointer hover:bg-white/10 transition-all">
             <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Search Something...</span>
             <div className="h-7 w-7 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
          <button className="h-11 w-11 flex items-center justify-center border border-white/20 rounded-full hover:bg-yellow-400 hover:text-black transition-all">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="w-full">
        {activeTab === 'home' && <HomeView setTab={setActiveTab} hero1={heroImage1} hero2={heroImage2} wa={whatsappLink} waBtn={whatsappBtnUrl} />}
        {activeTab === 'pricing' && <PricingView />}
        {activeTab === 'samples' && <SamplesView samples={samples} onSelect={setCurrentIndex} />}
      </main>

      {/* --- IMAGE MODAL (Slideshow) --- */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/98 p-4 transition-opacity duration-300">
          <button className="absolute top-6 right-6 text-white text-5xl font-light hover:text-yellow-400 z-[110]" onClick={() => { setCurrentIndex(null); setIsPlaying(false); }}>×</button>
          <div className="relative w-full flex items-center justify-between px-4 sm:px-16">
            <button className="p-4 text-white/20 hover:text-yellow-400 text-8xl hidden md:block transition-all" onClick={prevImage}>‹</button>
            <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
              <img key={currentIndex} src={samples[currentIndex].img} className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-500 border border-white/10" alt="Display" />
              <div className="flex flex-col items-center gap-4 bg-gray-900/60 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                 <div className="flex items-center gap-12">
                    <button className="text-white/40 text-6xl md:hidden" onClick={prevImage}>‹</button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`px-14 py-4 rounded-full font-black text-xs tracking-[0.3em] transition-all border ${isPlaying ? 'bg-yellow-400 text-black border-yellow-400 shadow-xl' : 'bg-white/5 text-white border-white/20'}`}>{isPlaying ? 'PAUSE' : 'PLAY SLIDESHOW'}</button>
                    <button className="text-white/40 text-6xl md:hidden" onClick={nextImage}>›</button>
                 </div>
                 <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold">Item {currentIndex + 1} of {samples.length}</p>
              </div>
            </div>
            <button className="p-4 text-white/20 hover:text-yellow-400 text-8xl hidden md:block transition-all" onClick={nextImage}>›</button>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#070c14] border-t border-white/5 py-20 px-6 sm:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
           <div>
             <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
               <img src={logoUrl} alt="Logo" className="h-8 w-auto" />
               <span className="font-black text-white tracking-[0.3em] text-xl">MAGNETIC</span>
             </div>
             <p className="text-gray-500 text-sm max-w-sm leading-relaxed">High-impact visual advertisements designed to stop the scroll and convert your audience.</p>
           </div>
           <div className="flex flex-col items-center md:items-end gap-3">
              <span className="text-yellow-400 font-black uppercase tracking-[0.3em] text-[11px]">Connect With Us</span>
              <span className="text-3xl font-black tracking-tighter text-white">+94 77 303 4396</span>
              <div className="flex gap-6 mt-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                 <span className="hover:text-white cursor-pointer">Instagram</span>
                 <span className="hover:text-white cursor-pointer">Facebook</span>
              </div>
           </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-white/5 text-[9px] text-gray-800 tracking-[0.6em] uppercase font-bold">© 2026 Magnetic Ad Designs. Premium Digital Assets.</div>
      </footer>
    </div>
  );
}

function HomeView({ setTab, hero1, hero2, wa, waBtn }) {
  const [activeHero, setActiveHero] = useState(hero1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero(prev => prev === hero1 ? hero2 : hero1);
    }, 6000);
    return () => clearInterval(timer);
  }, [hero1, hero2]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-24 relative hero-gradient-overlay">
      
      {/* Background Floating Elements */}
      <div className="absolute top-1/4 left-1/3 opacity-10 animate-rotate hidden lg:block pointer-events-none">
        <svg className="w-32 h-32 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
      </div>

      {/* --- LEFT CONTENT (image_d6eb08 Layout) --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-start z-10 space-y-10 animate-in slide-in-from-left-12 duration-1000">
        <div className="space-y-2">
          <h1 className="text-[70px] sm:text-[110px] md:text-[150px] font-black leading-[0.8] tracking-tighter text-yellow-400 italic">
            MAGNETIC
          </h1>
          <h2 className="text-[50px] sm:text-[80px] md:text-[110px] font-black leading-[0.8] text-white">
            Facebook Ads
          </h2>
        </div>
        
        <p className="text-gray-400 max-w-lg text-sm sm:text-xl leading-relaxed font-medium">
           Professional advertising and social media solutions tailored for your business growth. <br/>
           <span className="text-white/60 italic mt-4 block">ඔබේ ව්‍යාපාරයේ විකුණුම් වැඩි කරන ආකර්ෂණීය නිර්මාණ සඳහා අපව තෝරාගන්න.</span>
        </p>

        <div className="flex flex-wrap gap-8 pt-4">
          <button onClick={() => setTab('samples')} className="px-16 py-5 bg-yellow-400 text-black font-black uppercase text-xs tracking-[0.3em] rounded-full hover:bg-white hover:scale-105 transition-all shadow-2xl">
            Explore Work
          </button>
          <button onClick={() => setTab('pricing')} className="px-16 py-5 border-2 border-yellow-400 text-yellow-400 font-black uppercase text-xs tracking-[0.3em] rounded-full hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all">
            See Pricing
          </button>
        </div>

        {/* WhatsApp & Contact */}
        <div className="pt-12 flex flex-col sm:flex-row items-center gap-10">
          <a href={wa} target="_blank" rel="noopener noreferrer">








             <img src={waBtn} alt="WhatsApp" className="h-16 md:h-22 w-auto drop-shadow-2xl" 
               onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/280x80/25D366/ffffff?text=WhatsApp+Business'; }}
             />
          </a>
        </div>
      </div>

      {/* --- RIGHT IMAGE (Abstract Blob with Clip-Path) --- */}
      <div className="w-full lg:w-1/2 relative mt-24 lg:mt-0 flex justify-center lg:justify-end animate-in zoom-in-95 duration-1000">
        <div className="absolute inset-0 bg-yellow-400 opacity-5 blur-[120px] rounded-full scale-125 animate-pulse pointer-events-none"></div>
        
        <div className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px]">
           {/* Decorative Back Shape */}
           <div className="absolute inset-0 bg-yellow-400 blob-clip transform rotate-12 scale-105 opacity-10"></div>
           
           {/* Main Hero Blob */}
           <div className="absolute inset-6 bg-[#121c29] blob-clip z-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-white/5">
             <img 
               src={activeHero} 
               key={activeHero}
               alt="Magnetic Design" 
               className="w-full h-full object-cover transform hover:scale-110 transition-all duration-[3000ms] animate-in fade-in"
               onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'; }}
             />
           </div>

           {/* Floating Accent Icon */}
           <div className="absolute -bottom-4 -left-4 bg-[#0a111a] p-6 border-2 border-yellow-400 rounded-[2.5rem] z-20 shadow-2xl animate-bounce hidden sm:block">
              <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
           </div>
        </div>
      </div>
    </div>
  );
}

function PricingView() {
  const packages = [
    { name: 'Starter', price: 'Rs. 2,500', icon: '🚀' },
    { name: 'Growth', price: 'Rs. 10,000', popular: true, icon: '💎' },
    { name: 'Professional', price: 'Rs. 18,000', icon: '🏆' }
  ];
  return (
    <div className="py-40 px-6 sm:px-16 lg:px-24 max-w-[1800px] mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <h2 className="text-[60px] sm:text-[100px] md:text-[140px] font-black uppercase italic text-yellow-400 leading-none tracking-tighter">Pricing</h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-sm border-l-4 border-yellow-400 pl-6 mb-4">Strategic Investment Plans</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {packages.map(p => (
          <div key={p.name} className={`p-16 rounded-[4rem] bg-white/5 border ${p.popular ? 'border-yellow-400 shadow-[0_30px_100px_rgba(250,204,21,0.1)] scale-105 z-10' : 'border-white/5'} hover:border-yellow-400 transition-all duration-500 group relative overflow-hidden`}>
            <div className="text-5xl mb-8">{p.icon}</div>
            <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-gray-300">{p.name}</h3>
            <div className="text-6xl font-black mb-12 text-white italic tracking-tighter">{p.price}</div>
            <div className="space-y-6 mb-16 text-sm text-gray-400 font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-4">✓ 4K High Resolution</div>
              <div className="flex items-center gap-4">✓ Source Files Included</div>
              <div className="flex items-center gap-4">✓ 24h Fast Delivery</div>
              <div className="flex items-center gap-4">✓ Unlimited Revisions</div>
            </div>
            <button className="w-full py-6 bg-transparent border-2 border-white/10 rounded-[2rem] font-black hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all text-xs tracking-[0.3em] uppercase">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SamplesView({ samples, onSelect }) {
  return (
    <div className="py-40 px-6 sm:px-16 lg:px-24 max-w-[1800px] mx-auto animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <h2 className="text-[60px] sm:text-[100px] md:text-[140px] font-black uppercase italic text-yellow-400 leading-none tracking-tighter">Work</h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-sm border-l-4 border-yellow-400 pl-6 mb-4">43 Creative Assets Showcased</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {samples.map((s, index) => (
          <div key={s.id} className="group relative rounded-[3.5rem] overflow-hidden bg-[#111c29] aspect-square cursor-pointer border border-white/5 hover:border-yellow-400 shadow-2xl transition-all duration-500" onClick={() => onSelect(index)}>
            <img src={s.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt="Design Portfolio" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12 translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-yellow-400 text-[11px] font-black uppercase tracking-[0.4em] mb-4">{s.category}</span>
              <h3 className="text-2xl font-black text-white uppercase italic leading-tight">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}