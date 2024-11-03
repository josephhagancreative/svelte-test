<script lang="ts">
	import type { Card as ICard } from '$lib/types/cards';
	import Card from './Card.svelte';

	let {
		hand,
		handleUpdateHand,
		resetHand
	}: { hand: ICard[]; handleUpdateHand: (card: ICard) => void; resetHand: () => void } = $props();
</script>

<div class="wrapper">
	<div class="handContainer">
		{#each hand as card}
			<Card {handleUpdateHand} {card} />
		{/each}
	</div>
	{#if hand.length > 0}
		<button class="resetBtn" onclick={resetHand}>Reset</button>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.handContainer {
		display: flex;
		gap: 10px;
	}
	.resetBtn {
		background-color: white;
		color: rgb(95, 95, 95);
		border: 1px solid rgb(207, 207, 207);
		border-radius: 3px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		margin: 0.5rem 0;
		height: 30px;
		width: 75px;

		&:hover {
			background-color: rgb(229, 229, 229);
		}

		&:disabled {
			border-color: rgb(239, 239, 239);
			background-color: rgb(239, 239, 239);
		}
	}
</style>
