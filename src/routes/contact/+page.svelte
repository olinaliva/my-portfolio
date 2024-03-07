<svelte:head>
	<title>Contact me</title>
</svelte:head>
<h1>Contact me :)</h1>

    <form action="mailto:lolina@mit.edu" method="POST" enctype="text/plain">
        <label>Email:<input name="email" type="email"> </label>
        <label>Subject:<input name="subject"></label>
        <label>Body:<textarea name="body"></textarea> </label>
        <button>Send</button>
    
    </form>