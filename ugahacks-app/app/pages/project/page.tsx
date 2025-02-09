'use client';

import React from 'react';
import Image from 'next/image';

const ProjectPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100">
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-4">Project Title</h2>
        <p className="text-lg mb-6">This is a brief project description that tells pioneers what they're putting their money towards</p>
      </div>
      <div className="flex w-2/3 mt-10">
        <div className="w-3/4">
          <Image
            src="/projimg.png"
            alt="Project Image"
            width={1000}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="w-1/2 pl-10 flex flex-col justify-between">
          <div className='flex flex-col justify-start'>
            <p className="text-lg mt-16">Project Goal: $10,000</p>
            <progress className="progress progress-primary w-56" value={50} max="100"></progress>
          </div>
          <div className='flex flex-col justify-end'>
            <button className='btn btn-primary mb-4'>Support this Project</button>
            <p className="mb-4">Created by: Project Creator</p>
            <p className="mb-4">Date: Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;