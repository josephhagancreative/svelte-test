export type Suit = 'hearts' | 'clubs' | 'diamonds' | 'spades';
export type Rank =
	| 'A'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| 'J'
	| 'Q'
	| 'K';
export type Card = {
	id: string;
	suit: Suit;
	rank: Rank;
	value: number;
	isInHand: boolean;
};
