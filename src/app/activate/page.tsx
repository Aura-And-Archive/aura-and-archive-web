'use client';

import { useState } from 'react';

export default function ActivatePage() {
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    window.location.href = `/v/${encodeURIComponent(serialNumber.trim())}`;
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-[500px] w-full text-center space-y-6">
        <h1 className="font-serif text-[20px] font-extrabold tracking-[3px] uppercase text-[#d4af37]">
          Card Activation Portal
        </h1>
        <p className="text-[13px] text-[#b0aebf] leading-[1.6]">
          Enter your card serial number to link or update your media destination.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Enter Serial Number (e.g. AA-8842)"
            className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-center text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/50 focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            className="w-full bg-[#d4af37] hover:bg-[#c59f2c] text-black font-semibold py-3.5 px-6 rounded text-[12px] uppercase tracking-[1.5px] transition-colors"
          >
            Activate Card
          </button>
        </form>
      </div>
    </div>
  );
}