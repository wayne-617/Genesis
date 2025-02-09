'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Card from '@/components/Card';

const ProjectBrowserPage: React.FC = () => {
  const router = useRouter();


  // async function loadPosts(): Promise<void> {
  //   try {
  //     const allPosts = await getAllPosts();
  //     const total = await getTotalPosts();

  //     // Fetch content from IPFS for each post
  //     const postsWithContent = await Promise.all(
  //       allPosts.map(async (post: ContractPost): Promise<Post> => {
  //         try {
  //           const url = await pinata.gateways.convert(post.message)
  //           const response = await fetch(url);
  //           const content = await response.json();
  //           return {
  //             poster: post.poster,
  //             message: content.message,
  //             imageUrl: content.imageUrl || null,
  //             timestamp: new Date(Number(post.timestamp) * 1000).toLocaleString()
  //           };
  //         } catch (err) {
  //           console.log(err)
  //           // If fetching fails, return the message as is
  //           return {
  //             poster: "",
  //             message: "",
  //             imageUrl: null,
  //             timestamp: ""
  //           };
  //         }
  //       })
  //     );

  //     setPosts(postsWithContent);
  //     setTotalPosts(Number(total));
  //   } catch (err) {
  //     const error = err as Error;
  //     setError('Failed to load posts: ' + error.message);
  //   }
  // }

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
        {cards.map((card, index) => (
          <Card key={index} title={card.title} image={card.image} desc={card.desc} onClick={() => handleCardClick(card.title)} />
        ))}
      </div>
    </div>
  );
};

export default ProjectBrowserPage;
