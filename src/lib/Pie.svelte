<script>
    import * as d3 from 'd3';
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let arc = arcGenerator({
	startAngle: 0,
	endAngle: 2 * Math.PI
});

export let data = [];



// let total = 0;
// for (let d of data) {
// 	total += d;}
// let angle = 0;
// let arcData = [];
// for (let d of data) {
// 	let endAngle = angle + (d / total) * 2 * Math.PI;
// 	arcData.push({ startAngle: angle, endAngle });
// 	angle = endAngle;
// }
// let arcs = arcData.map(d => arcGenerator(d));

// let sliceGenerator = d3.pie();

let sliceGenerator = d3.pie().value(d => d.value);

let arcData;
let arcs;
$: {
arcData = sliceGenerator(data);
arcs = arcData.map(d => arcGenerator(d));
};

let colors = d3.scaleOrdinal(d3.schemeTableau10);

export let selectedIndex = -1;


</script>

<div class="container">
<svg viewBox="-50 -50 100 100">
{#each arcs as arc, i}
  <path d={ arc } fill={ colors(i) } 
  class:selected={selectedIndex === i}
  on:click={e => selectedIndex = selectedIndex === i ? -1 : i}/>
{/each}
</svg>

<ul class="legend-big">
	{#each data as d, index}
		<li class="legend-small" style="--color: { colors(index) }"
        class:selected={selectedIndex === index}>
			<span class="swatch"></span>
			{d.label} <em>({d.value})</em>
		</li>
	{/each}
</ul>
</div>

<style>
    svg {
	max-width: 20em;
	margin-block: 2em;

	/* Do not clip shapes outside the viewBox */
	overflow: visible;
}

svg:has(path:hover) {
	path:not(:hover) {
		opacity: 50%;
	}
}
path {
	transition: 300ms;
    cursor: pointer;
}

.selected {
	--color: oklch(60% 45% 0) !important;

	&:is(path) {
		fill: var(--color);
	}
}

.swatch {
    display: inline-block;
    width: 10px;
    aspect-ratio: 1 / 1;
    background-color: var(--color);
    border-radius: 25%;
}
.legend-big {
    flex:1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 10px;
    border-style: solid;
    border-color: grey;
    border-radius: 10px;
    padding: 10px;
    margin: 10px; 
    flex:1;
}
.legend-small{
    display: flex;
    align-items: center;
    gap: 5px;
    list-style-type: none;
}
.container{
    display: flex;
    align-items: center;
    gap: 20px;
}
</style>