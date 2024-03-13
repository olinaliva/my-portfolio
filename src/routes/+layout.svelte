
<script>let pages = [
	{url: "./", title: "Home"},
	{url: "./contact", title: "Contact"},
	{url: "./projects", title: "Projects"},
	{url: "./resume", title: "Resume"},
	{url: "https://github.com/olinaliva", title: "GitHub"},
];
    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light dark";
    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);
    $: localStorage.colorScheme = colorScheme;

</script>

<nav>
	{#each pages as p }
        <a href={p.url}>{p.title}</a>
	{/each}
</nav>

<label class="color-scheme">
 	Theme:
    <select bind:value={ colorScheme }>
    <option value="light dark">automatic</option>
    <option value="light">light</option>
    <option value="dark">dark</option>
    </select>
    </label>

<style>
    .color-scheme{
    position: absolute;
    top: 1rem;
    right: 1rem;
}
</style>

<slot />