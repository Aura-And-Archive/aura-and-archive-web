'use client';

import React from 'react';
import CardExperience from '@/components/CardExperience';

export default function DemoSandboxPage() {
  return (
    <main className="min-h-screen w-full bg-black relative overflow-x-hidden flex flex-col justify-center items-center">
      <CardExperience isSandbox={true} />
    </main>
  );
}