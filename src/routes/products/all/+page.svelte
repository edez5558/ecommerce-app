
<script>
// @ts-nocheck

  import { onMount } from "svelte"; 
  import { page } from "$app/stores";
  import { API_URL } from "../../config";
    import { product } from "../../product/products";
    import GridProduct from "./GridProduct.svelte";

  /**
     * @type {never[]}
     */
  let products = [];
  let first = true;
  let last = true;

  const number = $page.url.searchParams.get('page');
  const peluche = $page.url.searchParams.get('peluche');

  console.log(peluche);

  if(number == undefined)
    location.href = '/';

  onMount(async () =>{
    const size = 20;

    let response = null;
    if(peluche == null)
      response = await fetch(`${API_URL}/api/product/page/${number}?size=${size}`);
    else 
      response = await fetch(`${API_URL}/api/product/page-select/${number}?size=${size}&peluche=${peluche}`);

    if(!response.ok || number < 0)
      location.href = '/';

    const result = await response.json();

    last = result.last;
    first = result.first;

    products = result.content;
  });

  function nextPage(){
    if(peluche == null)
      location.href = `/products/all?page=${number + 1}`;
    else
      location.href = `/products/all?page=${number + 1}&peluche=${peluche}`;
  }

  function prevPage(){
    if(peluche == null)
      location.href = `/products/all?page=${number - 1}`;
    else
      location.href = `/products/all?page=${number - 1}&peluche=${peluche}`;
  }
</script>

<svelte:head>
	<title>Productos</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="abc">
  <div class="category">
    <h3>Categorias</h3>
    <ul>
      <li>
      <a href="/products/all?page=0&peluche=True" target="_self">Peluche</a>
      </li>

      <li>
      <a href="/products/all?page=0&peluche=False" target="_self">Peluchen't</a>
      </li>

      <li>
      <a href="/products/all?page=0" target="_self">Cualquiera</a>
      </li>
    </ul>
  </div>
  <div class="browser">
    <div class="grid-style">
      {#if products}
        <GridProduct products={products}/>
      {/if}
    </div>
    <div class="selector">
      {#if first}
        <button type="button" class="btn-change" disabled>Anterior</button>
      {:else}
        <button type="button" class="btn-change" on:click={prevPage}>Anterior</button>
      {/if}
      <h2>Pagina {number + 1}</h2>
      {#if last}
        <button type="button" class="btn-change" disabled>Siguiente</button>
      {:else}
        <button type="button" class="btn-change" on:click={nextPage}>Siguiente</button>
      {/if}
    </div>
  </div>
</div>

<style>
  h3{
    color: rgb(70, 69, 105);
    text-align: center;
  }

  a:visited{
    text-decoration: none;
  }

  a:link{
    text-decoration: none;
  }

  .browser{
    display: flex;
    flex-direction: column;
  }
  .abc{
    display: flex;
    flex-direction: row;
  }

  .category{
    background-color: #daaf54;
  }

  ul{
    list-style-type: none;
    padding: 0 20px;
  }

  li{
    padding-bottom: 10px;
  }

  .grid-style{
    background-color: white;
    padding: 20px;
  }
  
  .selector{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #986db1;
    color: white;
  }
</style>