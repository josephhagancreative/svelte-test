<script lang="ts">
	import type { Card, Suit } from '$lib/types/cards';

	let { card, handleUpdateHand }: { card: Card; handleUpdateHand: (card: Card) => void } = $props();

	function generateSuitIcon(suit: Suit) {
		switch (suit) {
			case 'spades':
				return '♠';
			case 'hearts':
				return '♥';
			case 'clubs':
				return '♣';
			case 'diamonds':
				return '♦';
		}
	}
</script>

<button class="card {card.suit}" onclick={() => handleUpdateHand(card)}>
	<span class="rank">{card.rank}</span>
	<span class="suit">{generateSuitIcon(card.suit)}</span>
</button>

<style>
	.card {
		position: relative;
		border: 1px solid #ccc;
		padding: 10px;
		text-align: center;
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		width: 50px;
		height: 75px;
		line-height: 100%;

		> .rank {
			position: absolute;
			top: 12px;
			left: 10px;
		}

		> .suit {
			font-size: 1.5rem;
			position: absolute;
			bottom: 11px;
			right: 10px;
		}

		&.hearts {
			color: rgb(255, 44, 44);
		}
		&.diamonds {
			color: rgb(154, 0, 0);
		}
		&.clubs {
			color: rgb(71, 71, 71);
		}
		&.spades {
			color: rgb(0, 0, 0);
		}

		&:hover {
			background-color: rgb(244, 241, 236);
		}
	}
</style>
