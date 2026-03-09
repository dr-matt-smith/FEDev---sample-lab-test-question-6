[back to assessments](https://github.com/dr-matt-smith/FEDev---assessment-samples-and-walkthroughs?tab=readme-ov-file) <<<

[Question 1](https://github.com/dr-matt-smith/FEDev---sample-lab-test-question-1)
| [Question 2](https://github.com/dr-matt-smith/FEDev---sample-lab-test-question-2)
| [Question 3](https://github.com/dr-matt-smith/FEDev---sample-lab-test-question-3)
| [Question 4](https://github.com/dr-matt-smith/FEDev---sample-lab-test-question-4)
| [Question 5](https://github.com/dr-matt-smith/FEDev---sample-lab-test-question-5)
|
Question 6


# FEDEv - SAMPLE lab test question 6

The "brief" for the test is a PDF file in directory "brief"

NOTE:
**no use of AI is permitted in the lab test**

There are videos for each of the 6 questions:


The files in this repo are the solution I created to this sample test
- you may use any editor available on the university PCs
  - I used Celbridge, which you may install on the lab PCs if you wish

## Question 6 - video

- question 6
  - https://go.screenpal.com/watch/cOeh3wnZFxV
  - 14mins 02secs

## Question 6a - create new route to present form to user `/evenform`

We need to create folder `/routes/evenform`, and a Svelte script `/routes/evenform/+page.svelte`.

Let's now write a simple for input a number from the user. We can add a little style to make input elements have a yellow background:

`/routes/evenform/+page.svelte`

```html
<form method="POST">
  Please enter a number:

  <input type="number" name="n" required>
  <input type="submit">
</form>

<style>
  input {
    background-color: yellow;
  }
</style>
```

NOTE: The name of the number parameter that will be passed in the body of the HTTP POST Request to the server is `n`

## Question 6b - add route to site navbar

Let's add a link to this new route in our site navbar

`/routes/+layout.svelte`

```html
<nav>
  <a href="/">home</a>
  |
  <a href="/privacy">privacy</a>
  |
  <a href="/food">food</a>
  |
  <a href="/evenform">form to input number</a>
</nav>
```

## Question 6c - JavaScript server page to process form submission and return number back to Svelte page

We need to create a server script for our form `/routes/evenform/+page.server.js`

This server script needs to:
- define a default form action

  ```html
  export const actions = {
    default: async ({ request }) => {
  ```
  
- get the form data 
  
  `const data = await request.formData()`

- extract parameter `n` from the form data
 
  `let n = data.get('n')`


- return `n` as form data to the Svelte page


  ```html
    return {
        n
    }
  ```

So altogether our server script looks as follows:

`/routes/evenform/+page.server.js`

```html
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    let n = data.get('n');

    return {
        n
    };
  }
};
```

## Question 6d - if the Svelte page reveived a number from the form, display an even'ess message


In Svelte page `/routes/evenform/+page.svelte` let's try to get form data from our server script

```html
<script>
    import { isEven } from '$lib/util/useful_functions.js';

    let { form } = $props();
</script>
```


We can default a message variable to an empty string, and then, if `form` is not undefined, we can try to extract number `n` that has been returned to this page from processing of the default form POST action:

```html
<script>
    import { isEven } from '$lib/util/useful_functions.js';

    let { form } = $props();

    let message = '';
    if(form){
        let n = form.n;

        ...
    }
</script>
```

Now, let's import function `isEven()` form our utility JavaScript file:

```html
    import { isEven } from '$lib/util/useful_functions.js';
```

And we can set the value of `message` to an appriate ODD/EVEN message depending of what our function returns:

```html
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
```

Using a Svelte-IF, if `form` is not undefined (such as a first visit to this page), we can dispaly the message in a   `<div>`:

```html
{#if form}
<div>
  {message}
</div>
{/if}
```

We can make this message stand our with a little CSS for the `<div>` we display it in:

```html
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
```

So the final version of our Svelte script is as follows:


`/routes/evenform/+page.svelte`

```html
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
```

## Question 6e - JavaScript server page to save number in a cookie `number`

We can add a statement in our default from POST action in the server script, to save the number from the POST parameters into a cookied named `number`

`/routes/evenform/+page.server.js`

```javascript
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    let n = data.get('n');

    cookies.set('number', n, { path: '/' });

    return {
      n
    };
  }
};
```