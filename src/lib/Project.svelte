<script>
    export let info = {};
    // let p = info;
    export let hLevel = 2;
    console.log(info.url);
</script>

<article>   
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <img src={info.image} alt="">
    
    <div>
        <a href={info.url}>link</a>
        <p>{info.description}</p>
    <p>{info.year}</p></div>
</article>

<style>
.projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    column-gap: 10px
}
</style>
