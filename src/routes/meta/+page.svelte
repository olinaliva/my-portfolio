<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];

    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));
        // console.log(data);
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit,
                url: "https://github.com/vis-society/lab-7/commit/" + commit,
                author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            // Like ret.lines = lines
            // but non-enumerable so it doesn’t show up in JSON.stringify
            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });

            return ret;
        });
        console.log(commits);
    });
    
    $: workByPeriod = d3.rollups(data, v => v.length, d => d.datetime.toLocaleString("en", {dayPeriod: "short"}))
    $: maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];

    $: fileLengths = d3.rollups(data, v => d3.max(v, v => v.line), d => d.file);
    $: averageFileLength = d3.mean(fileLengths, d => d[1]);
    $: roundAvgFileLen = Math.round(averageFileLength);


    let width = 1000, height = 600;

    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    $: yScale=d3.scaleLinear()
        .domain([0,24])
        .range([usableArea.bottom, usableArea.top]);

    $: xScale=d3.scaleTime()
        .domain(d3.extent(commits, d=>d.datetime)).nice()
        .range([usableArea.left, usableArea.right]);

    let xAxis, yAxis;
    $: {
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));


    }
    let yAxisGridlines;
    $: {
        d3.select(yAxisGridlines).call(
            d3.axisLeft(yScale)
            .tickFormat("")
            .tickSize(-usableArea.width)
        );
    }

    let hoveredIndex = -1;
    $: hoveredCommit = commits[hoveredIndex] ?? {};

    let cursor = {x: 0, y: 0};

    let svg;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();
    }

    let brushSelection;
    function brushed (evt) {
        console.log(evt);
        brushSelection=evt.selection;
    }

    function isCommitSelected (commit) {
        if (!brushSelection) {
            return false;
        }
        let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
        let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
        let x = xScale(commit.date);
        let y = yScale(commit.hourFrac);
        return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
    
    }

    $: selectedCommits = brushSelection ? commits.filter(isCommitSelected) : [];
    $: hasSelection = brushSelection && selectedCommits.length > 0; 

    $: selectedLines = (hasSelection ? selectedCommits : commits).flatMap(d => d.lines);
    $: languageBreakdown = d3.rollups(selectedLines, v=>v.length, d => d.type );
    //$: languageBreakdown = d3.rollups(selectedLines, d => d.language );
    
    import Pie from "$lib/Pie.svelte";
    let langLines;
    $: langLines = Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}));

</script>

<svelte:head>
	<title>Meta</title>
</svelte:head>
<h1>Meta</h1>
<p>This page includes stats about this website</p>

<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{data.length}</dd>
    <dt>Total number of commits</dt>
	<dd>{commits.length}</dd>
    <!-- <dt>Number of files in codebase</dt>
	<dd>{data.}</dd> -->
    <dt>Most productive</dt>
	<dd>{maxPeriod}</dd>
    <dt><abbr title="Average">AVG</abbr> file length</dt>
	<dd>{roundAvgFileLen}</dd>
</dl>

<h3>Commits by time of day</h3>
<svg viewBox="0 0 {width} {height}" bind:this={svg}>
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
	<g class="dots">
        {#each commits as commit, index }
            <circle
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill="steelblue"
                on:mouseenter={evt => hoveredIndex = index}
                on:mouseleave={evt => hoveredIndex = -1}

                on:mouseenter={evt => {
                    hoveredIndex = index;
                    cursor = {x: evt.x, y: evt.y};
                }}
                
                class:selected={isCommitSelected(commit)}
            />
        {/each}
        </g>


</svg>


<dl id="commit-tooltip" class="info tooltip" hidden={hoveredIndex === -1} style="top: {cursor.y}px; left: {cursor.x}px">
	<dt>Commit</dt>
	<dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>

	<dt>Date</dt>
	<dd>{ hoveredCommit.datetime?.toLocaleString("en", {date: "full"}) }</dd>

	<!-- Add: Time, author, lines edited -->
</dl>

<p>{hasSelection ? selectedCommits.length : "No"} commits selected</p>

{#each languageBreakdown as [language, lines] }
	<p>{language}:{d3.format(".1~%")(lines/selectedLines.length)}</p>
{/each}

<Pie data={langLines} />



<style>
	svg {
		overflow: visible;
        
	}

    .gridlines {
        stroke-opacity: .2;
    }

    circle {
        transition: 200ms;


        &:hover {
            transform: scale(1.5);
        }
        transform-origin: center;
        transform-box: fill-box;
    }

    dl.info{
        display: grid;
        grid-template-columns: max-content 1fr;
        /* grid layout so that the <dt>s are on the 1st column and the <dd>s on the 2nd, 
        remove their default margins, 
        and apply some styling to make the labels less prominent than the values. */
        dt {
            color:gray;
        }
        transition-duration: 500ms;
	    transition-property: opacity, visibility;

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        }

        
    }

    .tooltip{
        position: fixed;
        top: 1em;
        left: 1em;
        background: oklch(100% 0% 0 / 20%);
        box-shadow: 5px 5px 5px lightslategray;
        border-radius: 5px;
        backdrop-filter: blur(5px);
        padding: 5px;
    }

    .selected{
        fill: red;
    }
</style>

