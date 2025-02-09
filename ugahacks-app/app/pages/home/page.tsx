'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const IndexPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center bg-white min-h-screen p-4">
      <div className="flex-1 flex justify-center">
        <Image src="/lightbulb1.png" alt="Lightbulb Mascot" width={500} height={500} className="object-cover" />
      </div>
      <div className="flex-1 hero-content text-center bg-neutral rounded-lg p-12 mx-4">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">Hello there</h1>
          <p className="py-6 text-white">
            Welcome to Genesis! Your way of funding projects that you care about.
          </p>
          <button className="btn btn-primary" onClick={() => router.push('projectbrowser')}>Get Started</button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <Image src="/whiteboard2.png" alt="Whiteboard Mascot" width={500} height={500} className="object-cover" />
      </div>
    </div>
  );
};

export default IndexPage;
