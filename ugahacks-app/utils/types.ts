export interface Project {
    id: number;
    creator: string;
    title: string;
    description: string;
    image: string;
    goalAmount: number;
    raisedAmount: number;
    amountWithdrawn: number;
    supportingVotes: number;
    deadline: number;
    isActive: boolean;
  }
  
  export interface Contribution {
    projectId: number;
    contributor: string;
    amount: number;
  }