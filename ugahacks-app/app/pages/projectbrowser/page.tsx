'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { getAllProjects } from '@/utils/viem';
import { Project } from '@/utils/types';
import Cookies from 'js-cookie';


const ProjectBrowserPage: React.FC = () => {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      console.log('loadProjects() called');
      try {
        const allProjects = await getAllProjects();
        console.log('Projects loaded:', allProjects);
        setProjects(allProjects);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to load projects:', error.message);
        setError('Failed to load projects: ' + error.message);
      } finally {
        console.log('Loading state set to false');
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

  const handleCardClick = (project:Project) => {
    Cookies.set('selectedProject', String(project.id));
    router.push(`/pages/project`);
    
  };

  const handleTestButtonClick = async () => {
    try {
      const allProjects = await getAllProjects();
      console.log('Test button clicked. Projects loaded:', allProjects);
    } catch (err) {
      const error = err as Error;
      console.error('Test button click failed to load projects:', error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto p-4 bg-neutral rounded-lg">
        {projects.map((project, index) => (
          <Card key={index} title={project.title} image={project.image} desc={project.description} onClick={() => handleCardClick(project)} />
        ))}
      </div>
      
    </div>
  );
};

export default ProjectBrowserPage;
