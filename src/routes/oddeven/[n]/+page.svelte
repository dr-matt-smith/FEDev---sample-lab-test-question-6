<svelte:head>
    <title>-- oddeven/<n> --</title>
</svelte:head>

<script>
    import { isEven } from '$lib/util/useful_functions.js';

    let { data } = $props();
    let n = data.n;

    let message = n + ' is an ODD number';
    if(isEven(n)) {
        message = n + ' is an EVEN number';
    }
</script>

<p>
    {message}
</p>