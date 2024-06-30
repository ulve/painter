<script lang="ts">
	export let data;
</script>

<div>
	{#each data.events.rows as { id, timestamp } (id)}
		<div>{id} - {timestamp}</div>
	{/each}
</div>

<form method="post" enctype="multipart/form-data">
	<div class="group">
		<label for="file">Upload your file</label>
		<input type="file" id="file" name="fileToUpload" required />
	</div>

	<label for="tags">Tags</label>
	<input type="text" name="tags" />
	<button type="submit">Submit</button>
</form>
