import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import App from '../App'

vi.mock('../utils/shuffleCards', () => ({
    default: (items) => items,
}))

afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
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

        expect(
            screen.getByText("Congratulations! You've won the game!"),
        ).toBeInTheDocument()
    })

    test('makes every memory card keyboard-focusable', () => {
        render(<App />)

        const cards = Array.from(getCards())

        expect(cards).toHaveLength(24)

        cards.forEach((card) => {
            expect(card.tagName).toBe('BUTTON')
            expect(card).toHaveAttribute('aria-label')
            expect(card.tabIndex).toBe(0)
        })
    })

    test('provides meaningful accessible names for face-down and revealed cards', () => {
        render(<App />)

        const firstCard = screen.getByRole('button', {
            name: 'Card 1, face down',
        })

        expect(firstCard).toBeInTheDocument()

        fireEvent.click(firstCard)

        expect(
            screen.getByRole('button', {
                name: 'Card 1, 😊, revealed',
            }),
        ).toBeInTheDocument()
    })

    test('moves focus to the next card using the right arrow key', () => {
        const originalGetComputedStyle = window.getComputedStyle

        vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
            const styles = originalGetComputedStyle.call(window, element)

            if (element.classList?.contains('memory-board')) {
                return {
                    ...styles,
                    gridTemplateColumns:
                        '100px 100px 100px 100px 100px 100px',
                }
            }

            return styles
        })

        render(<App />)

        const firstCard = screen.getByRole('button', {
            name: 'Card 1, face down',
        })

        const secondCard = screen.getByRole('button', {
            name: 'Card 2, face down',
        })

        firstCard.focus()
        expect(firstCard).toHaveFocus()

        fireEvent.keyDown(firstCard, { key: 'ArrowRight' })

        expect(secondCard).toHaveFocus()
        expect(secondCard).toHaveAccessibleName('Card 2, face down')
    })
    test('reveals a card when Enter is pressed', async () => {
        const user = userEvent.setup()
        render(<App />)

        const firstCard = screen.getByRole('button', {
            name: 'Card 1, face down',
        })

        firstCard.focus()
        await user.keyboard('{Enter}')

        expect(
            screen.getByRole('button', {
                name: 'Card 1, 😊, revealed',
            }),
        ).toBeInTheDocument()
    })

    test('reveals a card when Space is pressed', async () => {
        const user = userEvent.setup()
        render(<App />)

        const firstCard = screen.getByRole('button', {
            name: 'Card 1, face down',
        })

        firstCard.focus()
        await user.keyboard(' ')

        expect(
            screen.getByRole('button', {
                name: 'Card 1, 😊, revealed',
            }),
        ).toBeInTheDocument()
    })
})