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

<div class="flex flex-row">
	{#each arr as a}
		<div
			class="w-4 h-4"
			class:bg-lime-600={a}
			class:border-solid={!a}
			class:border-2={!a}
			class:border-orange-600={!a}
		></div>
	{/each}
</div>
