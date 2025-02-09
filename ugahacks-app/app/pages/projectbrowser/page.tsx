'use client';
import Card from '@/components/Card';
export const ProjectBrowserPage: React.FC = () => {

    const cards = [
        { title: 'Card 1', image: 'https://via.placeholder.com/150', desc: 'Description for card 1' },
        { title: 'Card 2', image: 'https://via.placeholder.com/150', desc: 'Description for card 2' },
        { title: 'Card 3', image: 'https://via.placeholder.com/150', desc: 'Description for card 3' },
        { title: 'Card 4', image: 'https://via.placeholder.com/150', desc: 'Description for card 4' },
        { title: 'Card 5', image: 'https://via.placeholder.com/150', desc: 'Description for card 5' },
        // Add more cards as needed
      ];
    
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto p-4">
            {cards.map((card, index) => (
              <Card key={index} title={card.title} image={card.image} desc={card.desc} />
            ))}
          </div>
        </div>
      );
}
