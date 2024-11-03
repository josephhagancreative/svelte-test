import type { Card, Rank } from '$lib/types/cards';
import { countBy, maxBy, orderBy, values } from 'lodash-es';

export function calculateHandScore(hand: Card[]) {
	if (!hand.length) {
		return 'No Score';
	}

	if (hand.length === 5) {
		const isFlush = checkIfFlush(hand);
		if (isFlush) {
			return calculateTypeOfFlush(hand);
		}

		const isStraight = checkIfStraight(hand);
		if (isStraight) {
			return 'Straight';
		}
	}

	const rankCounts = countBy(hand, 'rank');
	const counts = values(rankCounts);

	if (counts.some((count) => count > 1)) {
		return calculateMultipleOfCard(counts);
	}

	return calculateHighCard(hand);
}

function checkIfFlush(hand: Card[]) {
	const firstCardSuit = hand[0].suit;
	return hand.every((card) => card.suit === firstCardSuit);
}

function calculateTypeOfFlush(hand: Card[]) {
	const orderedHand = orderBy(hand, 'value');
	const ranks = orderedHand.map((card) => card.rank);

	const royalRanks = ['10', 'J', 'Q', 'K', 'A'];
	if (royalRanks.every((rank) => ranks.includes(rank as Rank))) {
		return 'Royal Flush';
	}

	const isStraight = checkIfStraight(orderedHand);
	if (isStraight) {
		return 'Straight Flush';
	}

	return 'Flush';
}

function checkIfStraight(hand: Card[]) {
	const orderedHand = orderBy(hand, 'value');
	const aceHighValues = orderBy(orderedHand.map((card) => (card.rank === 'A' ? 14 : card.value)));
	const aceLowValues = orderedHand.map((card) => card.value);

	const isRegularStraight = isConsecutive(aceHighValues);
	if (isRegularStraight) {
		return true;
	}

	return (
		aceLowValues[0] === 1 &&
		aceLowValues[1] === 2 &&
		aceLowValues[2] === 3 &&
		aceLowValues[3] === 4 &&
		aceLowValues[4] === 5
	);
}

function isConsecutive(values: number[]) {
	for (let i = 1; i < values.length; i++) {
		if (values[i] !== values[i - 1] + 1) {
			return false;
		}
	}
	return true;
}

function calculateMultipleOfCard(counts: number[]) {
	if (counts.includes(4)) {
		return 'Four of a Kind';
	}
	if (counts.includes(3)) {
		if (counts.includes(2)) {
			return 'Full House';
		}
		return 'Three of a Kind';
	}
	if (counts.filter((count) => count === 2).length === 2) {
		return 'Two Pair';
	}
	if (counts.includes(2)) {
		return 'One Pair';
	}
}

function calculateHighCard(hand: Card[]) {
	if (hand.some((card) => card.rank === 'A')) {
		return 'High Card: Ace';
	} else {
		const highCard = maxBy(hand, 'value');
		return `High Card: ${highCard?.rank}`;
	}
}
