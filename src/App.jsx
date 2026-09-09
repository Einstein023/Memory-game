import Card from './component/Card'
import './App.css'
import { useState } from 'react';

function App() {
  const cardIdArray = ["😊", "🤣", "❤️", "😍", "😒", "🙌", "👍", "😘", "👌", "😎", '😉', '🤩' ,];
  const shuffleCards = () =>
  [...cardIdArray, ...cardIdArray]
    .sort(() => Math.random() - 0.5)
    .map((emoji, id) => ({ id, emoji }));

  const [cards, setCards] = useState(shuffleCards);
  const [matched, setMatched] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [shuffleVersion, setShuffleVersion] = useState(0);

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

  const handleReset = () => {
    setMatched([]);
    setFlipped([]);
    setCards(shuffleCards());
    setShuffleVersion(version => version + 1);
  };

  return (
    <main className="memory-game">
      <header className="game-header">
        <div className="game-heading">
          <h1>Memory Game</h1>
        </div>
        <button className="reset-button" type="button" onClick={handleReset}>
          <span aria-hidden="true">↻</span>
          <span>Reset Game</span>
        </button>
      </header>

      <Card
        key={shuffleVersion}
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleCardClick}
      />
    </main>
  );
}

export default App
