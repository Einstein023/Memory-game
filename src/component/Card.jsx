import { useRef } from 'react';

export default function Card({ cards, flipped, matched, onCardClick }) {
    const cardRefs = useRef([]);
    const boardRef = useRef(null);

    function handleKeyDown(event, index) {
        const gridStyles = window.getComputedStyle(boardRef.current);
        const templateColumns = gridStyles.gridTemplateColumns;

        const columns = templateColumns && templateColumns !== 'none'
            ? templateColumns.split(/\s+/).length
            : 6;

        const row = Math.floor(index / columns);
        const column = index % columns;

        let nextIndex = index;

        switch (event.key) {
            case 'ArrowUp':
                if (row > 0) nextIndex = index - columns;
                break;

            case 'ArrowDown':
                if (index + columns < cards.length) {
                    nextIndex = index + columns;
                }
                break;

            case 'ArrowLeft':
                if (column > 0) nextIndex = index - 1;
                break;

            case 'ArrowRight':
                if (column < columns - 1 && index + 1 < cards.length) {
                    nextIndex = index + 1;
                }
                break;

            default:
                return;
        }

        if (nextIndex !== index) {
            event.preventDefault();
            cardRefs.current[nextIndex]?.focus();
        }
    }

    return (
        <main className="memory-board" ref={boardRef}>
            {cards.map(({ emoji, id }, index) => {
                const isFlipped = flipped.includes(id);
                const isMatched = matched.includes(id);
                const isRevealed = isFlipped || isMatched;

                const cardLabel = isMatched
                    ? `Card ${index + 1}, ${emoji}, matched`
                    : isFlipped
                        ? `Card ${index + 1}, ${emoji}, revealed`
                        : `Card ${index + 1}, face down`;

                return (
                    <div className="memory-container" key={id}>
                        <button
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            type="button"
                            className="memory-card"
                            onClick={() => onCardClick(id)}
                            onKeyDown={(event) => handleKeyDown(event, index)}
                            aria-label={cardLabel}
                            aria-pressed={isRevealed}
                        >
                            <span aria-hidden="true">
                                {isRevealed ? emoji : '?'}
                            </span>
                        </button>
                    </div>
                );
            })}
        </main>
    );
}