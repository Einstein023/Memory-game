import Card from './component/Card'
import shuffleCards from './utils/shuffleCards'
import './App.css'
import { useState } from 'react';

function App() {
  const cardIdArray = ["😊", "🤣", "❤️", "😍", "😒", "🙌", "👍", "😘", "👌", "😎", '😉', '🤩' ,];
  const createCards = () =>
    shuffleCards([...cardIdArray, ...cardIdArray])
      .map((emoji, id) => ({ id, emoji }));

  const [cards, setCards] = useState(createCards);
  const [matched, setMatched] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [shuffleVersion, setShuffleVersion] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setClickCount(prevCount => prevCount + 1);
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
    setClickCount(0);
    setCards(createCards());
    setShuffleVersion(version => version + 1);
  };


  return (
    <main className="memory-game">
      <header className="game-header">
        <div className="game-heading">
          <h1>Memory Game</h1>
        </div>
        <p className="move-counter" aria-live="polite">
          <span className="move-counter-label">Moves</span>
          <strong>{clickCount}</strong>
        </p>
        <button className="reset-button" type="button" onClick={handleReset}>
          <span aria-hidden="true">↻</span>
          <span>Reset Game</span>
        </button>
      </header>

      {cards.length > 0 && matched.length === cards.length ? (
        <section className="win-state" aria-live="polite">
          <p className="win-kicker">Perfect match</p>
          <h2>Congratulations! You've won the game!</h2>
          <p>You cleared the board in {clickCount} moves.</p>
          <button className="reset-button" type="button" onClick={handleReset}>
            <span aria-hidden="true">↻</span>
            <span>Play Again</span>
          </button>
        </section>
      ) : (
        <Card
          key={shuffleVersion}
          cards={cards}
          flipped={flipped}
          matched={matched}
          onCardClick={handleCardClick}
        />
      )}
    </main>
  );
}

export default App
