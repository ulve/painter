<script lang="js">
	export let data;
	import Modal from '../lib/Modal.svelte';
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
	$: groups = group(data.events.rows);
</script>

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
<button
	on:click={() => (showModal = true)}
	class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
>
	<span
		class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
	>
		Upload
	</span>
</button>

<Modal bind:showModal>
	<form method="POST" action="?/upload" name="fileToUpload" enctype="multipart/form-data">
		<div class="container">
			<input type="file" id="file" name="fileToUpload" required />
		</div>
		<button
			type="submit"
			class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
		>
			<span
				class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
			>
				Upload
			</span>
		</button>
	</form>
</Modal>
