'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { getAllProjects } from '@/utils/viem';
import { Project } from '@/utils/types';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1); // Track active tab
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        setProjects(allProjects);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to load projects:', error.message);
        setError('Failed to load projects: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/project?id=${id}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="flex flex-col flex-grow justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-16">Profile</h1>
      <h2 className='text-2xl font-bold mb-8'>1,000 Projects Contributed to</h2>
      <div className="flex flex-row justify-center items-center">
        <div role="tablist" className="tabs tabs-lifted">
          {/* Tab 1 */}
          <button
            className={`tab ${activeTab === 1 ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Pioneered
          </button>
          <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 1 ? '' : 'hidden'}`}>
            {/* Carousel only displays if Tab 1 is active */}
            {activeTab === 1 && (
              <div className="flex justify-center">
                <div className="carousel carousel-center rounded-box w-2/3">
                  {projects.map((project: Project, index: number) => (
                    <div className="carousel-item p-6" key={index}>
                      <Card title={project.title} image={project.image} desc={project.description} onClick={() => handleCardClick(project.id)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tab 2 */}
          <button
            className={`tab ${activeTab === 2 ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Contributed
          </button>
          <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 2 ? '' : 'hidden'}`}>
            {activeTab === 2 && (
              <div className="flex justify-center">
                <div className="carousel carousel-center rounded-box w-2/3">
                  {projects.map((project: Project, index: number) => (
                    <div className="carousel-item p-6" key={index}>
                      <Card title={project.title} image={project.image} desc={project.description} onClick={() => handleCardClick(project.id)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
