<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import Hand from '$lib/components/Hand.svelte';
	import type { Card } from '$lib/types/cards';
	import { calculateHandScore } from '$lib/utils/calculateHandScore';
	import { createDeck } from '$lib/utils/createDeck';

	let deck = $state(createDeck());
	let hand = $state<Card[]>([]);
	let score = $derived(calculateHandScore(hand));

	const handleUpdateHand = (selectedCard: Card) => {
		if (hand.includes(selectedCard)) {
			removeCardFromHand(selectedCard);
			return;
		}
		if (hand.length < 5) {
			selectedCard.isInHand = true;
			hand.push(selectedCard);
		}
	};

	const removeCardFromHand = (cardToRemove: Card) => {
		const index = hand.findIndex((card) => card.id === cardToRemove.id);

		if (index !== -1) {
			hand[index].isInHand = false;
			hand.splice(index, 1);
		}
	};

	const resetHand = () => {
		hand = [];
		deck.map((card) => (card.isInHand = false));
	};
</script>

<div class="pageContainer">
	<h1>Svelte Deck</h1>
	<h3>Deck:</h3>
	<Deck {deck} {handleUpdateHand} />
	<div class="handContainer">
		<div class="area">
			<h3>Hand:</h3>
			<Hand {hand} {resetHand} handleUpdateHand={removeCardFromHand} />
		</div>
		<div class="area">
			<h3>Score:</h3>
			<p class="scoreText">{score}</p>
		</div>
	</div>
</div>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
	}
	.pageContainer {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 0.5rem;
		padding-bottom: 20rem;
	}

	.handContainer {
		position: fixed;
		bottom: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		min-width: 350px;
		max-width: 800px;
		gap: 1rem;
		margin: 1rem;
		border: 1px solid grey;
		border-radius: 3px;
		background-color: rgba(255, 255, 255, 0.808);

		@media (width < 800px) {
			flex-direction: column;
		}

		> .area {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			padding: 0 1rem;
		}
	}

	.scoreText {
		font-size: 1.25rem;
		font-weight: bold;
	}
</style>
