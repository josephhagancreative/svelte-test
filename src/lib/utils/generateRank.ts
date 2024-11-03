import type { Rank } from '$lib/types/cards';

export function generateRank(value: number): Rank {
	switch (value) {
		case 1:
			return 'A';
			break;
		case 11:
			return 'J';
			break;
		case 12:
			return 'Q';
			break;
		case 13:
			return 'K';
			break;
		default:
			return value > 1 && value < 11 ? (String(value) as Rank) : '10';
	}
}
