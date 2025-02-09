import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  image: string;
  desc: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, image, desc, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-60 h-80 cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-40 border-b border-gray-300">
        <Image src={image} alt={title} layout="fill" objectFit="contain" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{desc}</p>
      </div>
    </div>
  );
};

export default Card;