<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';

    let query = "";
    // let filteredProjects;
    // $: filteredProjects = projects.filter(project => {
    //     if (query) {
    //         return project.title.toLowerCase().includes(query.toLowerCase());
    //     }

    //     return true;
    // });
    filteredProjects=projects;
    $: filteredProjects = projects.filter(project => {
	let values = Object.values(project).join("\n").toLowerCase();
	return values.includes(query.toLowerCase());
    // it filters and then shows the first # of projects where # is # of filtered projects
});

let pieData;
$: {
pieData = {};
let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);
pieData = rolledData.map(([year, count]) => {
	return { value: count, label: year };
});
}

let selectedYearIndex = -1;
let selectedYear;
let filteredByYear;
$: {selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

filteredByYear = filteredProjects.filter(project => {
	if (selectedYear) {
		return project.year === selectedYear;
	}
    return true;
});
}

</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<!-- <pre>{ JSON.stringify(projects, null, "\t") }</pre> -->

<h1>{ projects.length } Projects</h1>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex}/>

<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />

    <div class="projects">
        {#each filteredByYear as p}
        <Project info={p} />
        {/each}

    </div>
    
        <!-- <article>
            <h2>Tempore sunt vitae quod!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Minus quasi, exercitationem omnis sunt, quidem dicta amet ut aliquid laboriosam hic iure officia enim similique facilis. Non quam quisquam unde cumque! Odio fuga voluptatibus in earum dicta excepturi rerum.</p>
        </article>
        <article>
            <h2>Velit rerum ad consequuntur?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Ipsum quibusdam eaque aliquam nulla quas dolorum pariatur, exercitationem nemo obcaecati labore modi itaque nisi velit provident praesentium est maiores mollitia! Est accusamus quia ducimus, totam deserunt excepturi rem voluptatem?</p>
        </article>
        <article>
            <h2>Aperiam porro tenetur aliquam?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Fuga temporibus sunt, laboriosam expedita iusto obcaecati architecto eius natus at iure, amet veritatis tenetur, totam aspernatur excepturi magnam neque! Dolore reprehenderit amet eaque animi repellat maiores beatae, dolorem rerum?</p>
        </article>
        <article>
            <h2>Provident harum fuga nobis?</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>In est aliquid fuga dolore ab qui ea aliquam voluptatibus quis quo assumenda fugit, iusto esse consequuntur delectus cupiditate quos perferendis consectetur maiores minus! Nam explicabo sit omnis cupiditate veritatis.</p>
        </article>
        <article>
            <h2>Maiores magni consequuntur error.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Aliquid culpa cum ad, cupiditate mollitia minus accusamus architecto. At vero adipisci nostrum consequuntur facere tempora, cum eius quisquam illum expedita eligendi, ea distinctio doloribus. Provident harum necessitatibus quibusdam eveniet?</p>
        </article>
        <article>
            <h2>Corrupti reiciendis vitae quo.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Sequi temporibus ipsa vel. Dolor provident tenetur assumenda expedita veritatis, unde sequi aliquam necessitatibus odio repudiandae ipsa error similique mollitia. Vel voluptatem impedit fugiat, numquam laudantium unde reprehenderit minima error!</p>
        </article>
        <article>
            <h2>Recusandae modi aut maiores.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Architecto ipsam, facilis voluptatum eligendi consequuntur doloremque ut temporibus reiciendis ipsum corporis debitis explicabo voluptate omnis, sunt odio. Dolorem harum dolor animi magni. Distinctio, aliquid earum. Possimus fugiat delectus reprehenderit?</p>
        </article>
        <article>
            <h2>Laudantium nihil corporis totam!</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Optio beatae odio veritatis totam harum eum vero suscipit sed delectus corrupti laboriosam voluptatibus facere quasi culpa, velit nihil. Iure molestiae porro repellat harum aliquam blanditiis debitis nisi, dicta pariatur!</p>
        </article>
        <article>
            <h2>Accusantium corrupti ducimus non.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Labore nostrum iusto cupiditate fugiat? Eaque eum voluptatem recusandae consequatur magnam asperiores architecto veritatis quam quod quae distinctio ipsam, neque possimus iste! Sit perspiciatis nesciunt saepe repellendus aliquid ea similique.</p>
        </article>
        <article>
            <h2>Hic perferendis ducimus recusandae.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Alias tenetur et sequi deleniti illo magni voluptatum ullam veritatis. Corrupti, adipisci, omnis eaque repellendus illo nam tempore voluptatibus, similique suscipit laboriosam doloremque facilis incidunt. Minus natus repudiandae at laborum?</p>
        </article>
        <article>
            <h2>Molestiae rem reprehenderit enim.</h2>
            <img src="https://vis-society.github.io/labs/2/images/empty.svg" alt="">
            <p>Et ullam similique aperiam eaque facilis ipsam quibusdam maiores veritatis aspernatur, asperiores voluptatem ratione qui est doloremque architecto dolore sint nisi, incidunt consequatur aliquam! Tempore recusandae perferendis neque eligendi aut.</p>
        </article> -->
    

