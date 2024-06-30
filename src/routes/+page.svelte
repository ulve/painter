<script lang="ts">
	export let data;
	import Modal from '../lib/Modal.svelte';
	let showModal = false;
</script>

<div>
	{#each data.events.rows as { id, timestamp, image_name } (id)}
		<div>
			{timestamp.getFullYear()}-{timestamp.getMonth() + 1}-{timestamp.getDate()}: {timestamp.getHours()}:{timestamp.getMinutes()}
			<img class="thumbnail" src={image_name} alt="fififi" />
		</div>
	{/each}
</div>

<button on:click={() => (showModal = true)}> show modal </button>
<Modal bind:showModal>
	<form method="post" enctype="multipart/form-data">
		<div class="group">
			<label for="file">Upload your file</label>
			<input type="file" id="file" name="fileToUpload" required />
		</div>

		<label for="tags">Tags</label>
		<input type="text" name="tags" />
		<button type="submit">Submit</button>
	</form>
</Modal>

<style>
	.thumbnail {
		width: 4rem;
	}
</style>
