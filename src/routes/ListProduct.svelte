<script>
  import { fetchProducts, products } from "./ListProduct.js";
  import CardProduct from "./CardProduct.svelte";

  $: promise = fetchProducts();

	let scrollPosition = 0;

	/**
     * @type {HTMLElement}
     */
	let productList;
	const containerWidths = 220;

	function handleScroll(){
		scrollPosition = productList.scrollLeft;
	}

	function scrollLeft(){
		productList.scroll({
			left: scrollPosition - (200 + 10) * 3,
			behavior: "smooth"
		});
	}

	function scrollRight(){
		productList.scroll({
			left: scrollPosition + (200 + 10) * 3,
			behavior: "smooth"
		});
	}
</script>

{#await promise}
  <div class="chacharas-loading">
		<div class="gray-display"></div>
		<div class="gray-display"></div>
		<div class="gray-display"></div>
		<div class="gray-display"></div>
	</div> 
{:then results} 
  <div class="list-scrollable" >
    <button class="btn-left" on:click={scrollLeft}>&#60</button>
    <section class="chacharas" on:scroll={handleScroll} bind:this={productList}>
  		{#each $products as prod}
        <CardProduct product={prod}/>
  		{/each}
    </section>
    <button class="btn-right" on:click={scrollRight}>&#62</button>
  </div>
{:catch error}
  <h1>Ups </h1>
{/await}

<style>
	:root{
		--width: 200px;
		--height: 250px;

		--btn-width: 40px;
	}

  .chacharas, .chacharas-loading{
	  display: flex;
    flex-direction: row;
    padding: 20px 10px;

		grid-template-columns: repeat(4,--width);

    width: 840px;
    height: 270px;
    background-color: white;
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
		position: relative;
		border: none;
		color: rgb(148, 147, 145);
		font-weight: bold;
		font-size: 25px;
		background-color: rgba(255, 255, 255, 0.692);
    margin: 0;
    height: calc(var(--height) / 2);
		width: var(--btn-width);
		align-self: center;
    z-index: 10;
		cursor: pointer;
  }

	.btn-left:hover,.btn-right:hover{
		background-color: white;
	}

	.btn-left{
		left: var(--btn-width);
	}

	.btn-right{
		right: var(--btn-width);
	}

	.gray-display{
		background-color: #5c5956;
		transform: translateY(-30px);
		animation: 1.5s infinite alternate loading-list;
		animation-timing-function: linear;
		border-radius: 10px;
		width: var(--width);
		height: var(--height);
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

	@media (max-width: 500px){
		section.chacharas{
			width: 280px;
			height: 180px;
		}
	}

	@media (max-width: 656px) and (min-width: 500px){
		section.chacharas{
			width: calc(2 * 200px);
		}
	}

	@media (min-width: 656px) and (max-width: 955px){
		section.chacharas, .chacharas-loading{
			width: calc(3 * 200px);
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