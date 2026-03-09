<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <a href="/">home</a>
    |
    <a href="/privacy">privacy</a>
    |
    <a href="/food">food</a>
    |
    <a href="/evenform">form to input number and test its even'ness</a>
</nav>
<hr>

{@render children()}
