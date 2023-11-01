import React from 'react'
import ChurchComponent from './ChurchComponent'
import "../../styles/churches.css"

const Churches = () => {
  const cardData = [
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    {
      title: 'Card 1',
      image: 'url_to_image_1',
      description: 'This is Card 1.',
    },
    // Add data for other cards here
  ];
  return (
    <div className="card-container">
    {cardData.map((card, index) => (
      <ChurchComponent
        key={index}
        title={card.title}
        image={card.image}
        description={card.description}
      />
    ))}
  </div>
  )
}

export default Churches