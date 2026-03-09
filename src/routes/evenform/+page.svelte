<script>
    import { isEven } from '$lib/util/useful_functions.js';

    let { form } = $props();

    let message = '';
    if(form){
        let n = form.n;

        message = n + ' is an ODD number';
        if(isEven(n)) {
            message = n + ' is an EVEN number';
        }
    }
</script>

{#if form}
    <div>
        {message}
    </div>
{/if}

<form method="POST">
    Please enter a number:

    <input type="number" name="n" required>
    <input type="submit">
</form>

<style>
    div {
        padding: 1rem;
        background-color: lightblue;
        text-align: center;
    }

    input {
        background-color: yellow;
    }
</style>