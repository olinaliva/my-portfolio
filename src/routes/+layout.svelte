
<script>let pages = [
	{url: "./", title: "Home"},
	{url: "./projects", title: "Projects"},
	{url: "./contact", title: "Contact"},
	{url: "./projects", title: "Projects"},
	{url: "./resume", title: "Resume"},
	{url: "https://github.com/olinaliva", title: "GitHub"},
];</script>

<nav>
	{#each pages as p }
        <a href={p.url}>{p.title}</a>
	{/each}
</nav>

<slot />