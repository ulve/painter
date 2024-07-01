<script lang="js">
	export let data;

	import Modal from '../lib/Modal.svelte';
	import Boxes from '../lib/Boxes.svelte';
	let showModal = false;

	function group(arr) {
		return arr.reduce((groups, item) => {
			const date = item['date'].toISOString().split('T')[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(item);
			return groups;
		}, {});
	}

	$: groups = group(data.events);
	let f = Object.keys(group(data.events)).sort().reverse();
</script>

<div class="flex mb-8">
	<div
		class="grow p-2 ps-4 border border-black black_border bg-[#7e22ce] text-3xl text-white font-bold"
	>
		<h1 class="">Painting log</h1>
	</div>
	<button
		on:click={() => (showModal = true)}
		class="h-8 inline-flex items-center px-2 py-2 bg-orange-600 hover:bg-lime-600 text-white text-sm font-medium border black_border border-black mx-2"
	>
		Upload
	</button>
</div>

<Boxes bind:groups />

<div class="flex ps-4 mt-16 flex-row flex-wrap gap-12">
	{#each f as group (group)}
		<div class="relative border border-black purple_border bg-slate-50">
			<h2
				class="absolute py-1 px-3 -left-4 -top-4 -rotate-[10deg] border border-black black_border bg-[#7e22ce] text-white font-bold"
			>
				{group}
			</h2>
			<div class="flex flex-row flex-wrap h-full pt-8 bg-slate-100">
				{#each groups[group] as { image_name }}
					<a href={image_name}><img class="w-32 m-2" src={image_name} alt="fififi" /></a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<Modal bind:showModal>
	<form method="POST" action="?/upload" name="fileToUpload" enctype="multipart/form-data">
		<div class="container">
			<input type="file" id="file" name="fileToUpload" required />
			<input type="date" name="date" value={new Date().toISOString().split('T')[0]} />
		</div>
		<button
			type="submit"
			class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-lime-600 text-white text-sm font-medium rounded-md mx-2"
		>
			Upload
		</button>
	</form>
</Modal>

<style>
	.black_border {
		box-shadow: 4px 4px 1px rgb(0, 0, 0);
	}

	.purple_border {
		box-shadow: 4px 4px 1px rgb(126, 34, 206);
	}
</style>
