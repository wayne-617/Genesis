'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { getAllProjects } from '@/utils/viem';
import { Project } from '@/utils/types';

const ProjectBrowserPage: React.FC = () => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        setProjects(allProjects);
      } catch (err) {
        const error = err as Error;
        setError('Failed to load projects: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const cards = [
    { title: 'Project 1', image: '/logo.png', desc: 'Description for card 1' },
    { title: 'Project 2', image: '/logo.png', desc: 'Description for card 2' },
    { title: 'Card 3', image: '/landscape.png', desc: 'Description for card 3' },
    { title: 'Card 4', image: '/logo.png', desc: 'Description for card 4' },
    { title: 'Card 5', image: '/logo.png', desc: 'Description for card 5' },
    // Add more cards as needed
  ];

  const handleCardClick = (title: string) => {
    router.push(`/project/${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto p-4">
        {projects.map((project, index) => (
          <Card key={index} title={project.title} image={project.image} desc={project.description} onClick={() => handleCardClick(project.title)} />
        ))}
      </div>
    </div>
  );
};

export default ProjectBrowserPage;
