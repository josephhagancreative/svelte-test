import { v4 as uuidv4 } from 'uuid';
import type { Card, Suit } from '$lib/types/cards';
import { generateRank } from './generateRank';

export function createDeck() {
	const suits: Suit[] = ['hearts', 'clubs', 'diamonds', 'spades'];
	const deck: Card[] = [];
	for (const suit of suits) {
		for (let i = 1; i <= 13; i++) {
			deck.push({ id: uuidv4(), value: i, suit: suit, rank: generateRank(i), isInHand: false });
		}
	}
	return deck;
}
