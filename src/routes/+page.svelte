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

	$: groups = group(data.events.sort().reverse());
</script>

<div class="flex">
	<h1 class="grow text-xl font-bold font-sans">Painting log</h1>
	<button
		on:click={() => (showModal = true)}
		class="h-8 inline-flex items-center px-4 py-2 bg-green-700 hover:bg-green-500 text-white text-sm font-medium rounded-md mx-2"
	>
		Upload
	</button>
</div>

<Boxes bind:groups />
<div class="flex flex-col">
	{#each Object.keys(groups) as group}
		<div class="container">
			<h2 class="text-lg font-sans">{group}</h2>
			<div class="flex flex-row flex-wrap">
				{#each groups[group] as { image_name }}
					<a href={image_name}><img class="w-32" src={image_name} alt="fififi" /></a>
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
			class="inline-flex items-center px-4 py-2 bg-green-700 hover:bg-green-500 text-white text-sm font-medium rounded-md mx-2"
		>
			Upload
		</button>
	</form>
</Modal>
