<script>
// @ts-nocheck
  import ListProduct from "../ListProduct.svelte";
  import { fetchProduct, product, seller } from "./products.js";
  import { page } from "$app/stores";
  import error_icon from "$lib/images/error_icon.png";
  import load_icon from "$lib/images/loading.gif";
    import Dialog from "../prefab/Dialog.svelte";
    import { API_URL } from "../config";


  const id = $page.url.searchParams.get('id');
  
  $: promise = fetchProduct(id);
  
  let amount = 1;
  let message = '';
  let registro = false;

  async function buyProduct(){
    const sessionId = localStorage.getItem("sessionId");
    const clientId = localStorage.getItem("clientId");


    if(sessionId == null || clientId == null){
      message = 'No estas logeado';
      registro = true;
      return;
    }

    const response = await fetch(`${API_URL}/api/product/buy`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({clientId : clientId, productId : id, amount : amount, sessionId : sessionId})
    });

    if(!response.ok){
      console.log();
      message = 'Error al realizar la peticion';
      registro = true;
      return;
    }

    message = (await response.text()).replaceAll('"','');
    registro = true;
  }
</script>

<svelte:head>
  {#await promise}
    <title>Buscando producto ...</title>
  {:then results}
    <title>{'Producto ' + $product.name}</title>
  {:catch error}
    <title>Ups Error</title>
  {/await}
</svelte:head>

<main>

{#await promise}

<div class="product">
  <div class="product-img">
    <img src={load_icon} alt="searching">
  </div>
  <div class="product-info">
    <h2>Producto</h2> 
    <p class="star"> ★ ★ ★ ★ ★</p>
    <div class="product-price">
      <p class="price-real">000 MXN$</p>
      <p class="price-fake">000 MXN$ <p class="label-fake">00% descuento</p>
    </div>
    <button class="buy-button">Esperando...</button>
  </div>
</div>

{:then results}

<Dialog message={message} visible={registro} onOkClicked={() => {
  location.reload();
}}/>

<div class="product">
  <div class="product-img">
    <img src={$product.imageUrl} alt="Product's imagen">
  </div>
  <div class="product-info">
    <h2>{$product.name}</h2> 
    <p class="seller">Vendedor: {$seller}</p>
    <p class="star"> ★ ★ ★ ★ ★</p>
    <div class="product-price">
      <p class="price-real">{$product.price} MXN$</p>
      <p class="price-fake">{($product.price / 0.3).toFixed(2)} MXN$ <p class="label-fake">70% descuento</p>
    </div>

    <textarea rows="5" disabled="true">{$product.description}</textarea>

    <div class="buy">
      <p>{`Disponibles: ${$product.stock}`}</p>
      <input class="input-stock" type="number" min="1" max={$product.stock} step="1" bind:value="{amount}" placeholder="2" pattern="[0-9]+" required>
      <button on:click={buyProduct} class="buy-button">Comprar</button>
    </div>
  </div>
</div>

{:catch error}

<div class="product">
  <div class="product-img">
    <img src={error_icon} alt="Product's imagen">
  </div>
  <div class="product-info">
    <h2>{error}</h2> 
    <p class="star"> ★ ★ ★ ★ ★</p>
    <div class="product-price">
      <p class="price-real">{$product.price} MXN$</p>
      <p class="price-fake">{$product.price / 0.3} MXN$ <p class="label-fake">70% descuento</p>
    </div>
    <button class="buy-button">ERROR</button>
  </div>
</div>

{/await}

<ListProduct />

</main>

<style>
  .buy p{
    margin: 0;
  }
  h2{
    font-size: 1.5rem;
    margin: 0;
    margin-top: 50px;
  }


  .product{
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 15px;
    width: 1000px;
    height: 400px;
    box-shadow: 0px 0px 4px 5px #0000002d;
  }

  .product-img{
    width: 300px;
    height: 100%;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #5f6b91;  
  }

  .star{
    font-size: 1.2rem;
    margin: 0;
    margin-left: 10px;
    color: #df3923;
  }

  .seller{
    margin: 5px 0;
  }

  .buy-button{
    width: 200px;
    height: 50px;
    margin-top: 20px;
    color: white;
    border: 1px solid #ca1a0d;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(20deg,rgb(216, 57, 57),rgb(236, 153, 76));
  }

  textarea{
    margin-top: 15px;
  }

  .price-real, .price-fake{
    margin: 0;
  }

  .price-fake, .label-fake{
    font-size: 1rem;
    display: inline;
		text-decoration: line-through;
  }

  .label-fake{
    margin-left: 15px;
    text-decoration: none;
  }

  .product-info{
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;

    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    padding-left: 40px;
    padding-right: 40px;
    background-color: white;
  }

  .product-price{
    color: white;
    font-weight: bold;
    font-size: 1.3rem;
    border-radius: 10px;
    padding: 4px 15px;
    background-color: #e43259;
  }

  .product img{
    width: 200px;
    height: 200px;
    object-fit: cover;
    background-color: white;
  }

  @media (max-width: 500px){
    .product{
      width: 300px;
      height: 670px;
      flex-direction: column;
    }

  }

  @media (max-width: 840px) and (min-width: 500px){
		.product{
      width: 600px;
		}
	}

	@media (min-width: 840px) and (max-width: 1050px){
		.product{
      width: 800px;
		}
	}
</style>