'use client';

import React, { useState, useRef } from "react";

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [investorModalOpen, setInvestorModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openDemoModal = () => {
    setDemoModalOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your request. Our executive team will reach out shortly.");
    setInvestorModalOpen(false);
  };

  return (
    <div className="app-viewport">
      <nav className="app-nav">
        <div>
          <div className="brand-title">AURA &amp; ARCHIVE</div>
          <span className="brand-subtitle">LIFETIME DIGITAL MEMORIAL SYSTEMS</span>
        </div>
        <div className="nav-actions">
          <button onClick={openDemoModal} className="btn btn-outline">Watch Platform Demo</button>
          <button onClick={() => setInvestorModalOpen(true)} className="btn btn-gold">Request Access</button>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-badge">THE PREMIUM DIGITAL KEEPSAKE PLATFORM</div>
          <h1 className="hero-title">Preserve Every Memory.<br />Forever.</h1>
          <p className="hero-desc">
            A custom-crafted physical keepsake paired with a secure, eternal digital shrine for your loved ones.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setInvestorModalOpen(true)} className="btn btn-gold">Request Access</button>
            <button onClick={openDemoModal} className="btn btn-outline">Watch Platform Demo</button>
          </div>
        </section>

        <section className="enterprise-briefing">
          <div className="briefing-header">
            <h2>Architected for Eternity</h2>
            <div className="subtitle">Enterprise-grade longevity for digital legacies</div>
          </div>
          <div className="briefing-grid">
            <div className="briefing-card">
              <div className="card-icon">🏛️</div>
              <h3>Decentralized Archival Storage</h3>
              <p>Redundant storage infrastructure guarantees your high-resolution media, video, and audio remain accessible across generations.</p>
            </div>
            <div className="briefing-card">
              <div className="card-icon">🔒</div>
              <h3>Granular Privacy Controls</h3>
              <p>Complete authority over who can view, contribute to, or interact with your digital memorial vault.</p>
            </div>
          </div>
        </section>

        <section className="investor-cta-box">
          <div className="cta-content">
            <h3>Enterprise &amp; Institutional Partnerships</h3>
            <p>Inquire about custom enterprise white-label solutions and memorial garden integrations.</p>
          </div>
          <button onClick={() => setInvestorModalOpen(true)} className="btn btn-gold">Inquire Now</button>
        </section>
      </main>

      {/* DEMO MODAL */}
      <div className="modal-overlay" style={{ display: demoModalOpen ? "flex" : "none" }}>
        <div className="modal-card">
          <span className="modal-close" onClick={closeDemoModal}>&times;</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--gold-primary)", fontSize: "20px", textTransform: "uppercase" }}>
            Platform Video Demo
          </h2>
          <div className="demo-video-container">
            <video ref={videoRef} controls playsInline preload="metadata">
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <button onClick={closeDemoModal} className="btn btn-outline">Close</button>
        </div>
      </div>

      {/* INVESTOR MODAL */}
      <div className="modal-overlay" style={{ display: investorModalOpen ? "flex" : "none" }}>
        <div className="modal-card">
          <span className="modal-close" onClick={() => setInvestorModalOpen(false)}>&times;</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--gold-primary)", fontSize: "20px", textTransform: "uppercase" }}>
            Request Access
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Organization / Institution (Optional)" />
            <textarea placeholder="Tell us about your interest in Aura &amp; Archive..." rows={3}></textarea>
            <button type="submit" className="btn btn-gold">Submit Request</button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="brand-title" style={{ fontSize: "16px" }}>AURA &amp; ARCHIVE</div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>
              &copy; {new Date().getFullYear()} Aura &amp; Archive Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
