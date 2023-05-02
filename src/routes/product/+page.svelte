<script>
// @ts-nocheck
  import ListProduct from "../ListProduct.svelte";
  import { fetchProduct, product } from "./products.js";
  import { page } from "$app/stores";


  const id = $page.url.searchParams.get('id');
  
  $: promise = fetchProduct(id);
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

<div class="product">
  <div class="product-img">
    <img src="https://cdn-icons-png.flaticon.com/512/0/568.png" alt="searching">
  </div>
  <div class="product-info">
    <h2>Producto</h2> 
    <p class="star"> ★ ★ ★ ★ ★</p>
    <div class="product-price">
      <p class="price-real">346 MXN$</p>
      <p class="price-fake">546 MXN$ <p class="label-fake">70% descuento</p>
    </div>
    <button>Comprar</button>
  </div>
</div>

<ListProduct />

<style>
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
    height: 350px;
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
    margin-left: 10px;
    color: #df3923;
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
    background-color: blue;
  }
</style>