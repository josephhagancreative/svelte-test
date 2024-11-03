<script lang="ts">
	import type { Card as TCard } from '$lib/types/cards';
	import Card from './Card.svelte';

	let { deck, handleUpdateHand }: { deck: TCard[]; handleUpdateHand: (card: TCard) => void } =
		$props();
</script>

<div class="deckContainer">
	{#each deck as card}
		<div class="card" class:inHand={card.isInHand}>
			<Card {handleUpdateHand} {card} />
		</div>
	{/each}
</div>

<style>
	.deckContainer {
		display: grid;
		grid-template-columns: repeat(13, 1fr);
		gap: 10px;
		max-width: 800px;
	}
	.card {
		background-color: transparent;
		border-radius: 5px;
		overflow: hidden;

		&.inHand {
			box-shadow:
				rgba(0, 0, 0, 0.16) 0px 2px 4px,
				rgba(0, 0, 0, 0.23) 0px 2px 4px;
		}
	}
</style>
