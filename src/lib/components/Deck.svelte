<script lang="ts">
	import type { Card as TCard } from '$lib/types/cards';
	import { groupBy } from 'lodash-es';
	import Card from './Card.svelte';

	let { deck, handleUpdateHand }: { deck: TCard[]; handleUpdateHand: (card: TCard) => void } =
		$props();

	const suits = $state(Object.entries(groupBy(deck, 'suit')));
</script>

{#each suits as [suit, cards]}
	<div class="suitContainer">
		{#each cards as card}
			<div class="card" class:inHand={card.isInHand}>
				<Card {handleUpdateHand} {card} />
			</div>
		{/each}
	</div>
{/each}

<style>
	.suitContainer {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		max-width: 800px;
		margin-bottom: 10px;
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
