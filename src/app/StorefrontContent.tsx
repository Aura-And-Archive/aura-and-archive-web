'use client';

import { useState, useRef, useEffect } from 'react';

export default function StorefrontContent() {
  const [activeModal, setActiveModal] = useState<'demoModal' | 'intakeModal' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = (id: 'demoModal' | 'intakeModal') => {
    setActiveModal(id);
    if (id === 'demoModal' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const closeModal = () => {
    if (activeModal === 'demoModal' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveModal(null);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <>
      <div className="app-viewport max-w-[1140px] mx-auto px-4 w-full min-h-screen" id="mainLandingContent">
        {/* NAV BAR WITH RESERVED MIN-HEIGHT */}
        <nav className="app-nav grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-6 border-b border-[#d4af37]/35 mb-8 items-center min-h-[110px] md:min-h-[82px]">
          <div>
            <div className="brand-title font-serif text-[20px] font-extrabold tracking-[3px] uppercase text-[#d4af37] leading-tight min-h-[24px]">
              Aura & Archive
            </div>
            <span className="brand-subtitle text-[11px] text-[#f4e6b0] tracking-[1.5px] uppercase block mt-[2px] opacity-80 min-h-[16px]">
              Luxury Smart Cards & Interactive Media
            </span>
          </div>
          <div className="nav-actions grid grid-cols-1 md:grid-cols-3 gap-2.5 min-h-[44px]">
            <a href="/activate" className="btn btn-outline min-h-[44px]">Activate Card</a>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('demoModal')}>Preview Experience</button>
            <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Custom Order</button>
          </div>
        </nav>

        {/* HERO SECTION WITH FIXED VERTICAL BOUNDS */}
        <section className="hero-section text-center py-5 md:pb-12 flex flex-col items-center gap-5 min-h-[420px] md:min-h-[380px] justify-center">
          <div className="hero-badge justify-self-center px-4 py-1.5 border border-[#d4af37]/35 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10 backdrop-blur-sm min-h-[28px] flex items-center">
            ✦ Welcome to Aura & Archive ✦
          </div>
          
          <h1 className="hero-title font-serif text-[clamp(28px,6vw,56px)] font-extrabold leading-[1.15] uppercase tracking-[2px] break-words bg-gradient-to-b from-white via-white to-[#f4e6b0] bg-clip-text text-transparent min-h-[2.3em] flex items-center justify-center">
            The Physical Gateway to Digital Elegance
          </h1>

          <p className="hero-desc font-serif italic text-[16px] text-[#f4e6b0] max-w-[760px] mx-auto leading-[1.7] opacity-90 min-h-[80px]">
            Welcome. Step inside our sanctum of Modern Allure—a luxury smart card platform transforming your most intimate vows, spoken confessions, and cinematic moments into instant, high-touch digital experiences.
          </p>
          
          <div className="hero-buttons grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 w-full md:w-auto justify-center min-h-[48px]">
            <a href="/activate" className="btn btn-gold min-h-[44px]">Activate Card</a>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Commission Custom Smart Card</button>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('demoModal')}>Preview Sample</button>
          </div>
        </section>

        {/* THREE CORE FEATURES GRID */}
        <div className="grid-container grid grid-cols-1 md:grid-cols-3 gap-5 my-7 w-full min-h-[180px]">
          <div className="app-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">01. Tactile Craftsmanship</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Crafted from weighted physical material, each card pairs elegant tactile finishes with an embedded QR archway—serving as an instant physical gateway to your digital media.</p>
          </div>

          <div className="app-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">02. High-Touch Media Delivery</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Recipients scan the embedded QR archway to instantly launch rich, full-screen audio, HD video messages, and written letters directly on their smartphones—no app download required.</p>
          </div>

          <div className="app-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">03. Reusable & Flexible</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Includes complimentary card resets to update your media destination whenever needed, backed by permanent physical media architecture.</p>
          </div>
        </div>

        {/* GIFT SUITE TIERS */}
        <section id="pricing" className="my-10">
          <h2 className="text-center font-serif text-[22px] uppercase text-[#d4af37] mb-6 tracking-[2px]">
            The Undiscardable Suite
          </h2>
          
          <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-7 w-full items-stretch">
            <div className="pricing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Single Undiscardable Card</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">$9.99 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">+ tax</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">An essential physical smart token built for eternal keepsake value and individual media delivery.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Physical Smart Card</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Standard Protective Sleeving</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 3 Complimentary Data Resets</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Permanent Archival Memory</li>
                </ul>
              </div>
              <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Order Single Card</button>
            </div>

            <div className="pricing-card featured bg-[#d4af37]/10 border border-[#d4af37] rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Undiscardable VIP Package</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">$24.99 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">+ tax</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">The flagship made-to-order smart gifting presentation tailored for signature life milestones.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Physical Smart Card</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Display Stand</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom VIP Envelope</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 10 Complimentary Data Resets</li>
                </ul>
              </div>
              <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Order VIP Package</button>
            </div>

            <div className="pricing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Special Event & Party Tier</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">25–100 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">/ volume order</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">Custom-curated smart card suites for weddings, galas, milestones, and high-profile celebrations.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom Batch Serial Pairing</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Tailored Event Visual Branding</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Multi-Card Event Sets</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Event Inquiry</button>
            </div>

            <div className="pricing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">VIP Concierge Delivery</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">On Demand Quote</div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">Hand-crafted smart letter boarding (black) and scheduled direct-to-recipient delivery.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom Physical Packaging</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Scheduled Destination Delivery</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Hand-Lettered Inscription</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Delivery Inquiry</button>
            </div>
          </div>
        </section>

        {/* OCCASION SUITE */}
        <section id="conference-suite" className="enterprise-briefing py-[50px] my-10 bg-[#0a0906]/60 border-y border-[#d4af37]/35 backdrop-blur-md">
          <div className="briefing-header text-center max-w-[700px] mx-auto mb-[40px]">
            <div className="hero-badge inline-block px-4 py-1.5 border border-[#d4af37]/35 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10 backdrop-blur-sm">
              ✦ Cherished Moments ✦
            </div>
            <h2 className="font-serif text-[26px] tracking-[2px] uppercase text-white my-3">Designed For Life's Intimate Milestones</h2>
            <p className="subtitle text-[13px] text-[#b0aebf] leading-[1.6]">Transform traditional paper greetings into interactive physical and digital smart tokens.</p>
          </div>

          <div className="briefing-grid grid grid-cols-1 md:grid-cols-2 gap-5 mb-[40px]">
            <div className="briefing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">💍</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Wedding Vows & Proposals</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Pair your ceremony audio, written vows, and proposal footage inside a luxury physical card that presents beautifully on any mantle.</p>
            </div>

            <div className="briefing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">💌</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Long-Distance Letters</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Bridge the gap across miles with custom voice notes and HD video moments attached to a weighted luxury card sent directly through the mail.</p>
            </div>

            <div className="briefing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">👶</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Interactive Time Capsules</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Record seasonal messages for birthdays or milestones that your family can scan and replay whenever they choose.</p>
            </div>

            <div className="briefing-card bg-[#101014]/85 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">🕊</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Tributes & Keepsakes</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Share stories, spoken laughter, and family histories through an elegant smart card experience designed for modern luxury.</p>
            </div>
          </div>

          <div className="investor-cta-box bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(7,7,9,0.9)_100%)] border border-[#d4af37] rounded-xl p-6 md:p-[36px_40px] flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-5">
            <div className="cta-content">
              <h3 className="font-serif text-[20px] text-white uppercase tracking-[1px] mb-1.5">Complimentary Data Resets</h3>
              <p className="text-[13px] text-[#b0aebf] max-w-[520px] leading-[1.6]">Need to update or reassign your card's digital experience? Submit a reset request with your card serial number to update your media destination at any time.</p>
            </div>
            <div className="cta-action">
              <button className="btn btn-gold w-full md:w-auto min-h-[44px]" onClick={() => openModal('intakeModal')}>Reset Card Data</button>
            </div>
          </div>
        </section>
      </div>

      {/* INTERACTIVE VIDEO DEMO MODAL */}
      {activeModal === 'demoModal' && (
        <div className="modal-overlay fixed inset-0 w-vw h-vh bg-black/92 backdrop-blur-xl flex items-center justify-center z-[9999] p-4" onClick={closeModal}>
          <div className="modal-card bg-[#0d0c0a] border border-[#d4af37] rounded-lg p-6 w-full max-w-[540px] max-h-[85vh] min-h-0 flex flex-col gap-3 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-y-auto text-center" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close absolute top-4 right-5 text-[#b0aebf] text-[24px] cursor-pointer z-10 bg-none border-none" onClick={closeModal} aria-label="Close modal">&times;</button>
            <div className="hero-badge self-center inline-block px-4 py-1.5 border border-[#d4af37]/35 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">Live Experience Preview</div>
            <h3 className="font-serif text-[18px] uppercase text-[#d4af37] mt-1">A Message For You</h3>
            <p className="text-[12px] text-[#b0aebf]">Experience the digital card delivery complete with customized gold particle effects upon unsealing.</p>

            <div className="demo-video-container relative w-full max-h-[40vh] rounded border border-[#d4af37]/35 overflow-hidden bg-black flex items-center justify-center shrink">
              <video ref={videoRef} controls playsInline preload="metadata" className="w-full max-h-[40vh] object-contain block">
                <source src="/AA-Demo.mp4" type="video/mp4" />
                Your browser does not support playing this demo video.
              </video>
            </div>

            <div className="mt-2 mb-1 shrink-0">
              <a href="/v/DEMO-GOLD-GRAFFITI" className="btn btn-gold min-h-[44px]">Launch Gold Confetti Unsealing Demo</a>
            </div>
          </div>
        </div>
      )}

      {/* INTAKE FORM MODAL */}
      {activeModal === 'intakeModal' && (
        <div className="modal-overlay fixed inset-0 w-vw h-vh bg-black/92 backdrop-blur-xl flex items-center justify-center z-[9999] p-4" onClick={closeModal}>
          <div className="modal-card bg-[#0d0c0a] border border-[#d4af37] rounded-lg p-6 w-full max-w-[540px] max-h-[85vh] min-h-0 flex flex-col gap-3 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close absolute top-4 right-5 text-[#b0aebf] text-[24px] cursor-pointer z-10 bg-none border-none" onClick={closeModal} aria-label="Close modal">&times;</button>
            <h3 className="font-serif text-[18px] uppercase text-[#d4af37]">Custom Order Request</h3>
            <p className="text-[12px] text-[#b0aebf]">Tell us about your occasion and we will reach out to fulfill your personalized luxury smart card package.</p>
            
            <form action="https://formspree.io/f/xjybzbpr" method="POST" className="grid gap-3.5">
              <input type="text" name="name" placeholder="Your Full Name" required className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]" />
              <select name="tier" defaultValue="Single Undiscardable Card ($9.99 + tax)" className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]">
                <option value="Single Undiscardable Card ($9.99 + tax)">Single Undiscardable Card ($9.99 + tax)</option>
                <option value="Undiscardable VIP Package ($24.99 + tax)">Undiscardable VIP Package ($24.99 + tax)</option>
                <option value="Special Event & Party Commission">Special Event & Party Commission</option>
                <option value="VIP Concierge Delivery">VIP Concierge Delivery</option>
                <option value="Card Data Reset Request">Card Data Reset Request</option>
              </select>
              <textarea name="message" placeholder="Include details about your occasion, recipient, or special date..." rows={3} className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]"></textarea>
              <button type="submit" className="btn btn-gold min-h-[44px]">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-[#d4af37]/35 py-10 mt-10 bg-[#040406]/95">
        <div className="app-viewport max-w-[1140px] mx-auto px-4 w-full">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-7">
            <div>
              <div className="brand-title font-serif text-[20px] font-extrabold tracking-[3px] uppercase text-[#d4af37]">Aura & Archive</div>
              <p className="text-[12px] text-[#b0aebf] mt-2">Elevating personal expression through luxury physical-to-digital smart cards.</p>
            </div>
            <div>
              <h4 className="text-[11px] text-[#d4af37] uppercase mb-2.5 tracking-[1px]">Navigation</h4>
              <p className="text-[12px]"><a href="/activate" className="text-[#b0aebf] no-underline hover:text-[#d4af37]">Activate Smart Card</a></p>
              <p className="text-[12px] mt-2">
                <button className="footer-link-btn bg-none border-none text-[#b0aebf] text-[12px] cursor-pointer p-0 text-left hover:text-[#d4af37]" onClick={() => openModal('demoModal')}>Interactive Sample</button>
              </p>
            </div>
            <div>
              <h4 className="text-[11px] text-[#d4af37] uppercase mb-2.5 tracking-[1px]">Support Desk</h4>
              <p className="text-[12px]"><a href="mailto:notifications@aura-and-archive.com" className="text-[#b0aebf] no-underline hover:text-[#d4af37]">Contact Design Studio</a></p>
            </div>
          </div>
          <div className="mt-7 text-center text-[10px] text-[#b0aebf] tracking-[1px]">
            © 2026 Aura & Archive, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}