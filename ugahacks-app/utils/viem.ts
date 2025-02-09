import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";
import { Project } from "./types";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

export async function createProject(
  title: string,
  description: string,
  image: string,
  goalAmount: number,
  duration: number
): Promise<void> {
  const tx = await contract.createProject(title, description, image, goalAmount, duration);
  await tx.wait();
}

export async function fundProject(projectId: number, amount: number): Promise<void> {
  const tx = await contract.fundProject(projectId, { value: ethers.utils.parseEther(amount.toString()) });
  await tx.wait();
}

export async function withdrawFunds(projectId: number): Promise<void> {
  const tx = await contract.withdrawFunds(projectId);
  await tx.wait();
}

export async function vote(projectId: number, vote: boolean): Promise<void> {
  const tx = await contract.vote(projectId, vote);
  await tx.wait();
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await contract.getAllProjects();
  return projects.map((project: any) => ({
    id: project.id.toNumber(),
    creator: project.creator,
    title: project.title,
    description: project.description,
    image: project.image,
    goalAmount: project.goalAmount.toNumber(),
    raisedAmount: project.raisedAmount.toNumber(),
    amountWithdrawn: project.amountWithdrawn.toNumber(),
    supportingVotes: project.supportingVotes.toNumber(),
    deadline: project.deadline.toNumber(),
    isActive: project.isActive,
  }));
}

export async function getProject(projectId: number): Promise<Project> {
  const project = await contract.getProject(projectId);
  return {
    id: project.id.toNumber(),
    creator: project.creator,
    title: project.title,
    description: project.description,
    image: project.image,
    goalAmount: project.goalAmount.toNumber(),
    raisedAmount: project.raisedAmount.toNumber(),
    amountWithdrawn: project.amountWithdrawn.toNumber(),
    supportingVotes: project.supportingVotes.toNumber(),
    deadline: project.deadline.toNumber(),
    isActive: project.isActive,
  };
}

export async function getContribution(projectId: number, contributor: string): Promise<number> {
  const contribution = await contract.getContribution(projectId, contributor);
  return contribution.toNumber();
}

export async function getVoteChoice(projectId: number, voter: string): Promise<boolean> {
  const voteChoice = await contract.getVoteChoice(projectId, voter);
  return voteChoice;
}

export async function getProjectContributors(projectId: number): Promise<string[]> {
  const contributors = await contract.getProjectContributors(projectId);
  return contributors;
}