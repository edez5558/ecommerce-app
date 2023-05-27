<script>
    import { onMount } from "svelte";
  import { fetchProducts, products } from "./ListProduct.js";
    import CardProduct from "./CardProduct.svelte";

  $: promise = fetchProducts();
  
</script>

{#await promise}
  <div class="chacharas-loading">
		<div class="gray-display"></div>
		<div class="gray-display"></div>
		<div class="gray-display"></div>
		<div class="gray-display"></div>
	</div> 
{:then results} 
  <div class="list-scrollable">
    <button class="btn-left"></button>
    <section class="chacharas">
  		{#each $products as prod}
        <CardProduct product={prod}/>
  		{/each}
    </section>
    <button class="btn-right"></button>
  </div>
{:catch error}
  <h1>Ups </h1>
{/await}

<style>
  .chacharas, .chacharas-loading{
	  display: flex;
    flex-direction: row;
    padding: 20px 10px;

		grid-template-columns: repeat(4,200px);

    width: 840px;
    height: 270px;
    background-color: red;
		gap: 10px;
	}

  .chacharas{
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .list-scrollable{
    display: flex;
    flex-direction: row;
  }

  .btn-left,.btn-right{
    margin: 0;
    height: 250px;
    z-index: 10;
  }

	.gray-display{
		background-color: #5c5956;
		transform: translateY(-30px);
		animation: 1.5s infinite alternate loading-list;
		animation-timing-function: linear;
		border-radius: 10px;
		width: 200px;
		height: 250px;
		box-shadow: none;
		transition: padding 0.2s, box-shadow 0.2s;
	}

	.gray-display:nth-child(2){
		animation-delay: 0.5s;
	}

	.gray-display:nth-child(3){
		animation-delay: 1s;
	}

	.gray-display:nth-child(4){
		animation-delay: 1.5s;
	}

	@media (max-width: 656px){
		section.chacharas{
			grid-template-columns: repeat(2,200px);
		}
	}

	@media (min-width: 656px) and (max-width: 955px){
		section.chacharas, .chacharas-loading{
			grid-template-columns: repeat(3,200px);
		}
	}

	@keyframes loading-list{
		from {
			transform: translateY(-30px);
			opacity: 1;
		}

		50%{
			opacity: 0.2;
		}

		to{
			transform: translateY(30px);
			opacity: 1;
		}
	}
</style>