'use client';

import { useState, useRef } from 'react';

export default function StorefrontPage() {
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

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        *, *::before, *::after {
          box-sizing: border-box !important;
          margin: 0;
          padding: 0;
        }

        :root {
          --bg-dark: #070709;
          --card-bg: rgba(16, 16, 20, 0.85);
          --gold-primary: #d4af37;
          --gold-light: #f4e6b0;
          --gold-dark: #96760e;
          --border-gold: rgba(212, 175, 55, 0.35);
          --text-main: #f3f3f7;
          --text-muted: #b0aebf;
        }

        html {
          background-color: #050506;
          height: 100%;
        }

        html, body {
          width: 100%;
          max-width: 100vw;
          min-height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          color: var(--text-main);
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.6;
          -webkit-text-size-adjust: 100%;
        }

        body {
          background: radial-gradient(circle at 50% 30%, #2a220d 0%, #0c0b07 50%, #050506 100%);
          background-repeat: no-repeat;
          background-size: cover;
        }

        .app-viewport {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px;
        }

        nav.app-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-gold);
          margin-bottom: 32px;
        }

        .brand-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-primary);
        }

        .brand-subtitle {
          font-size: 11px;
          color: var(--gold-light);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          display: block;
          margin-top: 2px;
          opacity: 0.8;
        }

        .nav-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          box-sizing: border-box;
          text-align: center;
          transition: all 0.3s ease;
        }

        .btn-gold {
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 50%, var(--gold-dark) 100%);
          color: #000;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
        }

        .btn-gold:hover {
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
          transform: translateY(-1px);
        }

        .btn-outline {
          background: rgba(0, 0, 0, 0.4);
          color: var(--gold-light);
          border: 1px solid var(--border-gold);
          backdrop-filter: blur(5px);
        }

        .btn-outline:hover {
          border-color: var(--gold-primary);
          background: rgba(212, 175, 55, 0.1);
        }

        .hero-section {
          text-align: center;
          padding: 20px 0 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .hero-badge {
          justify-self: center;
          padding: 6px 16px;
          border: 1px solid var(--border-gold);
          border-radius: 30px;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--gold-light);
          background: rgba(212, 175, 55, 0.08);
          backdrop-filter: blur(4px);
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.15;
          text-transform: uppercase;
          letter-spacing: 2px;
          word-break: break-word;
          background: linear-gradient(180deg, #ffffff 30%, var(--gold-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 16px;
          color: var(--gold-light);
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.7;
          opacity: 0.9;
        }

        .hero-buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 16px;
          width: 100%;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin: 28px 0;
          width: 100%;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin: 28px 0;
          width: 100%;
          align-items: stretch;
        }

        .app-card {
          background: var(--card-bg);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 28px 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
        }

        .app-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold-primary);
        }

        .app-card p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        .pricing-card {
          background: var(--card-bg);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
        }

        .pricing-card.featured {
          border-color: var(--gold-primary);
          background: rgba(212, 175, 55, 0.08);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.15);
        }

        .plan-header {
          display: flex;
          flex-direction: column;
        }

        .plan-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: var(--gold-primary);
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 1.5px;
          line-height: 1.35;
          height: 42px;
          display: flex;
          align-items: center;
        }

        .plan-price-wrapper {
          height: 52px;
          display: flex;
          align-items: baseline;
          margin-top: 8px;
          white-space: nowrap;
        }

        .plan-price {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .plan-price span {
          font-size: 12px;
          color: var(--text-muted);
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          margin-left: 4px;
        }

        .plan-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 14px 0 20px 0;
          height: 58px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .plan-features {
          list-style: none;
          font-size: 11px;
          line-height: 2.2;
          color: var(--text-main);
          margin-bottom: 28px;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          padding-top: 16px;
        }

        .plan-features li {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .enterprise-briefing {
          padding: 50px 0;
          margin: 40px 0 20px 0;
          background: rgba(10, 9, 6, 0.6);
          border-top: 1px solid var(--border-gold);
          border-bottom: 1px solid var(--border-gold);
          backdrop-filter: blur(10px);
        }

        .briefing-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px auto;
        }

        .briefing-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
          margin: 12px 0 8px 0;
        }

        .briefing-header .subtitle {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .briefing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }

        .briefing-card {
          background: var(--card-bg);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          padding: 24px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .briefing-card:hover {
          transform: translateY(-2px);
          border-color: var(--gold-primary);
        }

        .card-icon {
          font-size: 22px;
          margin-bottom: 8px;
        }

        .briefing-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: var(--gold-primary);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .briefing-card p {
          font-size: 12px;
          color: var(--text-main);
          line-height: 1.6;
          opacity: 0.85;
        }

        .investor-cta-box {
          background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(7,7,9,0.9) 100%);
          border: 1px solid var(--gold-primary);
          border-radius: 12px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .cta-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .cta-content p {
          font-size: 13px;
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.6;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px 16px;
        }

        .modal-card {
          background: #0d0c0a;
          border: 1px solid var(--gold-primary);
          border-radius: 8px;
          padding: 24px;
          width: 100%;
          max-width: 540px;
          max-height: 85vh;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
        }

        .modal-close {
          position: absolute;
          top: 16px; right: 20px;
          color: var(--text-muted);
          font-size: 24px;
          cursor: pointer;
          z-index: 2;
        }

        .modal-card input, .modal-card select, .modal-card textarea {
          width: 100%;
          background: #151412;
          border: 1px solid var(--border-gold);
          padding: 14px;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
        }

        .demo-video-container {
          position: relative;
          width: 100%;
          max-height: 40vh;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border-gold);
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 1;
        }

        .demo-video-container video {
          width: 100%;
          max-height: 40vh;
          object-fit: contain;
          display: block;
        }

        footer {
          border-top: 1px solid var(--border-gold);
          padding: 40px 0;
          margin-top: 40px;
          background: rgba(4, 4, 6, 0.95);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 768px) {
          nav.app-nav {
            grid-template-columns: 1fr auto;
            align-items: center;
          }

          .nav-actions {
            grid-template-columns: repeat(3, auto);
          }

          .hero-buttons {
            grid-template-columns: repeat(3, auto);
            justify-content: center;
            width: auto;
          }

          .grid-container {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .briefing-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .investor-cta-box {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
            padding: 36px 40px;
          }

          .investor-cta-box .btn {
            width: auto;
          }

          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="app-viewport" id="mainLandingContent">
        <nav className="app-nav">
          <div>
            <div className="brand-title">Aura & Archive</div>
            <span className="brand-subtitle">Luxury Smart Cards & Interactive Media</span>
          </div>
          <div className="nav-actions">
            <a href="/activate" className="btn btn-outline">Activate Card</a>
            <button className="btn btn-outline" onClick={() => openModal('demoModal')}>Preview Experience</button>
            <button className="btn btn-gold" onClick={() => openModal('intakeModal')}>Custom Order</button>
          </div>
        </nav>

        <section className="hero-section">
          <div className="hero-badge">✦ Welcome to Aura & Archive ✦</div>
          <h1 className="hero-title">The Physical Gateway to Digital Elegance</h1>
          <p className="hero-desc">Welcome. Step inside our sanctum of Modern Allure—a luxury smart card platform transforming your most intimate vows, spoken confessions, and cinematic moments into instant, high-touch digital experiences.</p>
          
          <div className="hero-buttons">
            <a href="/activate" className="btn btn-gold">Activate Card</a>
            <button className="btn btn-outline" onClick={() => openModal('intakeModal')}>Commission Custom Smart Card</button>
            <button className="btn btn-outline" onClick={() => openModal('demoModal')}>Preview Sample</button>
          </div>
        </section>

        <div className="grid-container">
          <div className="app-card">
            <h3>01. Tactile Craftsmanship</h3>
            <p>Crafted from weighted physical material, each card pairs elegant tactile finishes with an embedded QR archway—serving as an instant physical gateway to your digital media.</p>
          </div>

          <div className="app-card">
            <h3>02. High-Touch Media Delivery</h3>
            <p>Recipients scan the embedded QR archway to instantly launch rich, full-screen audio, HD video messages, and written letters directly on their smartphones—no app download required.</p>
          </div>

          <div className="app-card">
            <h3>03. Reusable & Flexible</h3>
            <p>Includes complimentary card resets to update your media destination whenever needed, backed by permanent physical media architecture.</p>
          </div>
        </div>

        {/* GIFT SUITE TIERS */}
        <section id="pricing" style={{ margin: '40px 0' }}>
          <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: '22px', textTransform: 'uppercase', color: 'var(--gold-primary)', marginBottom: '24px', letterSpacing: '2px' }}>
            The Undiscardable Suite
          </h2>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-header">
                <div className="plan-title">Single Undiscardable Card</div>
                <div className="plan-price-wrapper">
                  <div className="plan-price">$9.99 <span>+ tax</span></div>
                </div>
                <div className="plan-desc">An essential physical smart token built for eternal keepsake value and individual media delivery.</div>
                <ul className="plan-features">
                  <li>✦ 1 Premium Physical Smart Card</li>
                  <li>✦ 1 Standard Protective Sleeving</li>
                  <li>✦ 3 Complimentary Data Resets</li>
                  <li>✦ Permanent Archival Memory</li>
                </ul>
              </div>
              <button className="btn btn-gold" onClick={() => openModal('intakeModal')}>Order Single Card</button>
            </div>

            <div className="pricing-card featured">
              <div className="plan-header">
                <div className="plan-title">Undiscardable VIP Package</div>
                <div className="plan-price-wrapper">
                  <div className="plan-price">$24.99 <span>+ tax</span></div>
                </div>
                <div className="plan-desc">The flagship made-to-order smart gifting presentation tailored for signature life milestones.</div>
                <ul className="plan-features">
                  <li>✦ 1 Premium Physical Smart Card</li>
                  <li>✦ 1 Premium Display Stand</li>
                  <li>✦ Custom VIP Envelope</li>
                  <li>✦ 10 Complimentary Data Resets</li>
                </ul>
              </div>
              <button className="btn btn-gold" onClick={() => openModal('intakeModal')}>Order VIP Package</button>
            </div>

            <div className="pricing-card">
              <div className="plan-header">
                <div className="plan-title">Special Event & Party Tier</div>
                <div className="plan-price-wrapper">
                  <div className="plan-price">25–100 <span>/ volume order</span></div>
                </div>
                <div className="plan-desc">Custom-curated smart card suites for weddings, galas, milestones, and high-profile celebrations.</div>
                <ul className="plan-features">
                  <li>✦ Custom Batch Serial Pairing</li>
                  <li>✦ Tailored Event Visual Branding</li>
                  <li>✦ Multi-Card Event Sets</li>
                  <li>✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline" onClick={() => openModal('intakeModal')}>Event Inquiry</button>
            </div>

            <div className="pricing-card">
              <div className="plan-header">
                <div className="plan-title">VIP Concierge Delivery</div>
                <div className="plan-price-wrapper">
                  <div className="plan-price">On Demand Quote</div>
                </div>
                <div className="plan-desc">Hand-crafted smart letter boarding (black) and scheduled direct-to-recipient delivery.</div>
                <ul className="plan-features">
                  <li>✦ Custom Physical Packaging</li>
                  <li>✦ Scheduled Destination Delivery</li>
                  <li>✦ Hand-Lettered Inscription</li>
                  <li>✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline" onClick={() => openModal('intakeModal')}>Delivery Inquiry</button>
            </div>
          </div>
        </section>

        {/* OCCASION SUITE */}
        <section id="conference-suite" className="enterprise-briefing">
          <div className="briefing-header">
            <div className="hero-badge">✦ Cherished Moments ✦</div>
            <h2>Designed For Life's Intimate Milestones</h2>
            <p className="subtitle">Transform traditional paper greetings into interactive physical and digital smart tokens.</p>
          </div>

          <div className="briefing-grid">
            <div className="briefing-card">
              <div className="card-icon">💍</div>
              <h3>Wedding Vows & Proposals</h3>
              <p>Pair your ceremony audio, written vows, and proposal footage inside a luxury physical card that presents beautifully on any mantle.</p>
            </div>

            <div className="briefing-card">
              <div className="card-icon">💌</div>
              <h3>Long-Distance Letters</h3>
              <p>Bridge the gap across miles with custom voice notes and HD video moments attached to a weighted luxury card sent directly through the mail.</p>
            </div>

            <div className="briefing-card">
              <div className="card-icon">👶</div>
              <h3>Interactive Time Capsules</h3>
              <p>Record seasonal messages for birthdays or milestones that your family can scan and replay whenever they choose.</p>
            </div>

            <div className="briefing-card">
              <div className="card-icon">🕊️</div>
              <h3>Tributes & Keepsakes</h3>
              <p>Share stories, spoken laughter, and family histories through an elegant smart card experience designed for modern luxury.</p>
            </div>
          </div>

          <div className="investor-cta-box">
            <div className="cta-content">
              <h3>Complimentary Data Resets</h3>
              <p>Need to update or reassign your card's digital experience? Submit a reset request with your card serial number to update your media destination at any time.</p>
            </div>
            <div className="cta-action">
              <button className="btn btn-gold" onClick={() => openModal('intakeModal')}>Reset Card Data</button>
            </div>
          </div>
        </section>
      </div>

      {/* INTERACTIVE VIDEO DEMO MODAL */}
      {activeModal === 'demoModal' && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center' }}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <div className="hero-badge" style={{ alignSelf: 'center' }}>Live Experience Preview</div>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', color: 'var(--gold-primary)', marginTop: '4px', fontFamily: "'Playfair Display', serif" }}>A Message For You</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Experience the digital card delivery complete with customized gold particle effects upon unsealing.</p>

            <div className="demo-video-container">
              <video ref={videoRef} controls playsInline preload="metadata">
                <source src="/AA-Demo.mp4" type="video/mp4" />
                Your browser does not support playing this demo video.
              </video>
            </div>

            <div style={{ marginTop: '8px', marginBottom: '4px', flexShrink: 0 }}>
              <a href="/v/DEMO-GOLD-GRAFFITI" className="btn btn-gold">Launch Gold Confetti Unsealing Demo</a>
            </div>
          </div>
        </div>
      )}

      {/* INTAKE FORM MODAL */}
      {activeModal === 'intakeModal' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', color: 'var(--gold-primary)', fontFamily: "'Playfair Display', serif" }}>Custom Order Request</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tell us about your occasion and we will reach out to fulfill your personalized luxury smart card package.</p>
            
            <form action="https://formspree.io/f/xjybzbpr" method="POST" style={{ display: 'grid', gap: '14px' }}>
              <input type="text" name="name" placeholder="Your Full Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <select name="tier">
                <option value="Single Undiscardable Card ($9.99 + tax)">Single Undiscardable Card ($9.99 + tax)</option>
                <option value="Undiscardable VIP Package ($24.99 + tax)">Undiscardable VIP Package ($24.99 + tax)</option>
                <option value="Special Event & Party Commission">Special Event & Party Commission</option>
                <option value="VIP Concierge Delivery">VIP Concierge Delivery</option>
                <option value="Card Data Reset Request">Card Data Reset Request</option>
              </select>
              <textarea name="message" placeholder="Include details about your occasion, recipient, or special date..." rows={3}></textarea>
              <button type="submit" className="btn btn-gold">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      <footer>
        <div className="app-viewport">
          <div className="footer-grid">
            <div>
              <div className="brand-title">Aura & Archive</div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Elevating personal expression through luxury physical-to-digital smart cards.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Navigation</h4>
              <p style={{ fontSize: '12px' }}><a href="/activate" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Activate Smart Card</a></p>
              <p style={{ fontSize: '12px', marginTop: '8px' }}><a href="javascript:void(0)" onClick={() => openModal('demoModal')} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Interactive Sample</a></p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Support Desk</h4>
              <p style={{ fontSize: '12px' }}><a href="mailto:notifications@aura-and-archive.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Design Studio</a></p>
            </div>
          </div>
          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            © 2026 Aura & Archive, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}