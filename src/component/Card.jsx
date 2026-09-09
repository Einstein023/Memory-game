export default function Card({ cards, flipped, matched, onCardClick }) {
    return(
        <main className="memory-board">
            {cards.map(({ emoji, id }) => (
                <div className="memory-container" key={id}>
                    <div
                        className="memory-card"
                        onClick={() => onCardClick(id)}
                    >
                        <h1>{flipped.includes(id) || matched.includes(id) ? emoji : '?'}</h1>
                    </div>
                </div>
            ))}
        </main>
    )
}