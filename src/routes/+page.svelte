<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    
</script>


<h1>Liva</h1>
<p>I'm Junior at MIT studying Math and Computer Science
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla aperiam excepturi voluptatum quia suscipit accusantium esse veritatis est, nam minus illo laborum ad minima! Aperiam suscipit totam provident aliquid veritatis.
</p>
<img src="images/IMG_20230507_190310-3.jpg" 
alt="I'm wearing a suit and standing inside the Alchemist sculpture at MIT, looking up"
width="300" height="400"> 



{#await fetch("https://api.github.com/users/olinaliva") }
{:then response}
	{#await response.json()}
		<p>Decoding...</p>
	{:then data}
        <section>
            <h2>Github stats</h2>
            <dl>
                <dt>Followers</dt>
                <dd>{ JSON.stringify(data.followers) }</dd>
                <dt>following</dt>
                <dd>{ JSON.stringify(data.following) }</dd>
            </dl>
        </section>
		<!-- <p>The data is { JSON.stringify(data) }</p> -->
	{:catch error}
		<p class="error">
			Something went wrong: {error.message}
		</p>
	{/await}
{:catch error}
	<p class="error">
		Something went wrong: {error.message}
	</p>
{/await}


<h2>Latest projects</h2>
<div class="projects highlights">
    <!-- works withoutt #each but internal error with each? -->
    {#each projects.slice(0, 3) as p}
    <!--- use [projects[0], projects[3], projects[7]] for select projects instead-->
    <Project info={p} hLevel=3 />
    {/each}

</div>
