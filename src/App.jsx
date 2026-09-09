import Card from './component/Card'
import './App.css'
import { useState } from 'react';

function App() {
  const cardIdArray = ["😊", "🤣", "❤️", "😍", "😒", "🙌", "👍", "😘", "👌", "😎", '😉', '🤩' ,];
  const [cards] = useState(() =>
    [...cardIdArray, ...cardIdArray]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }))
  );
  const [matched, setMatched] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstCardId, secondCardId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.emoji === secondCard.emoji) {
        setMatched([...matched, firstCardId, secondCardId]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <Card
      cards={cards}
      flipped={flipped}
      matched={matched}
      onCardClick={handleCardClick}
    />
  );
}

export default App
