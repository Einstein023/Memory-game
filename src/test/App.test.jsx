import { act } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import App from '../App'

vi.mock('../utils/shuffleCards', () => ({
	default: (items) => items,
}))

afterEach(() => {
	cleanup()
	vi.useRealTimers()
})

function getCards() {
	return document.querySelectorAll('.memory-card')
}

describe('memory game behavior', () => {
	test('reveals a selected card', () => {
		render(<App />)

		fireEvent.click(getCards()[0])

		expect(screen.getByText('😊')).toBeInTheDocument()
	})

	test('keeps matching cards visible', () => {
		render(<App />)

		fireEvent.click(getCards()[0])
		fireEvent.click(getCards()[12])

		expect(screen.getAllByText('😊')).toHaveLength(2)
	})

	test('hides mismatched cards after the delay', () => {
		vi.useFakeTimers()
		render(<App />)

		fireEvent.click(getCards()[0])
		fireEvent.click(getCards()[1])
		expect(screen.getByText('😊')).toBeInTheDocument()
		expect(screen.getByText('🤣')).toBeInTheDocument()

		act(() => vi.advanceTimersByTime(1000))

		expect(screen.getAllByText('?')).toHaveLength(24)
	})

	test('resets the game state', () => {
		render(<App />)

		fireEvent.click(getCards()[0])
		fireEvent.click(screen.getByRole('button', { name: /reset game/i }))

		expect(screen.getAllByText('?')).toHaveLength(24)
		expect(screen.getByText('Moves').nextElementSibling).toHaveTextContent('0')
	})

	test('shows the win message after all pairs are matched', () => {
		render(<App />)
		const cards = getCards()

		for (let pairIndex = 0; pairIndex < 12; pairIndex += 1) {
			fireEvent.click(cards[pairIndex])
			fireEvent.click(cards[pairIndex + 12])
		}

		expect(screen.getByText("Congratulations! You've won the game!")).toBeInTheDocument()
	})
})