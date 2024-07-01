<script lang="js">
	export let groups;

	const dates = Object.keys(groups).sort();
	const first = new Date(dates[0]);
	const last = new Date();
	const oneDay = 24 * 60 * 60 * 1000;
	const diffDays = Math.round(Math.abs((first - last) / oneDay));

	let arr = [];
	for (let i = 0; i < diffDays; i++) {
		let current = new Date(first.getFullYear(), first.getMonth(), first.getDate());
		let a = new Date(current.getTime() + (i + 1) * oneDay).toISOString().split('T')[0];
		let painted = dates.includes(a);
		arr.push(painted);
	}
	arr = arr.reverse();
</script>

<div class="flex flex-row flex-wrap">
	{#each arr as a}
		<div
			class="m-0.5 w-4 h-4 border border-black black_border"
			class:bg-lime-600={a}
			class:bg-orange-600={!a}
		></div>
	{/each}
</div>

<style>
	.black_border {
		box-shadow: 4px 4px 1px rgb(0, 0, 0);
	}
</style>
