'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAllProjects } from '@/utils/viem';
import { Project } from '@/utils/types';
import Image from 'next/image';
import { vote, fundProject } from '@/utils/viem';

const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!project) {
      setError('No project selected.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await fundProject(project.id, amount * 10 ** 18);
      alert('Project funded successfully!');
    } catch (err) {
      setError('Failed to fund project. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      const projectId = Cookies.get('selectedProject');
      if (!projectId) {
        setError('No project selected.');
        setLoading(false);
        return;
      }

      try {
        const allProjects = await getAllProjects();
        const project = allProjects.find(proj => proj.id.toString() === projectId);
        if (!project) {
          setError('Project not found.');
        } else {
          setProject(project);
        }
      } catch (err) {
        const error = err as Error;
        console.error('Failed to load project:', error.message);
        setError('Failed to load project: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  if (!project) {
    return <div className="flex justify-center items-center h-screen">No project found.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-lg bg-white shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold">{project.title}</h1>
          <Image src={project.image} alt={project.title} width={250} height={150} className="rounded-lg" />
          <p className="text-lg"><strong>Description:</strong> {project.description}</p>
          <p className="text-lg"><strong>Goal Amount:</strong> {project.goalAmount.toString()}</p>
          <p className="text-lg"><strong>Raised Amount:</strong> {project.raisedAmount.toString()}</p>
          <p className="text-lg"><strong>Amount Withdrawn:</strong> {project.amountWithdrawn.toString()}</p>
          <p className="text-lg"><strong>Supporting Votes:</strong> {project.supportingVotes.toString()}</p>
          <div className="card-actions justify-end mt-4 flex items-center space-x-2">
            <form className="form flex items-center space-x-2" onSubmit={handleSubmit}>
              <input 
                type="number" 
                className="input input-bordered w-24 bg-black text-white" 
                placeholder="0.00 ETH" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
              />
              <button type="submit" className="btn btn-primary">Fund Project</button>
            </form>
            <button className="btn btn-primary" onClick={() => vote(project.id, false)}>Vote to End Project</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;