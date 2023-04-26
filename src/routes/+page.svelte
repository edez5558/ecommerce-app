<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import patata from  '$lib/images/product/Patata.webp';
	import MainDisplay from './MainProduct.svelte';
</script>


<svelte:head>
	<title>Pir-Ata</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<MainDisplay />

<section class="chacharas">
	<div class="product">
		<div class="display">
			<img src={patata} alt="Imagen del producto">
		</div>

		<p class="name-product">Patata</p>
		<div class="precie-product">
			<p class="inline sale-product">$1,500</p>
			<p class="inline disc-product">$1,700</p>
		</div>
	</div>

	<div class="product">
		<div class="display">
			<img src={patata} alt="Imagen del producto">
		</div>

		<p class="name-product">Patata</p>
		<div class="precie-product">
			<p class="inline sale-product">$1,500</p>
			<p class="inline disc-product">$1,700</p>
		</div>
	</div>

	<div class="product">
		<div class="display">
			<img src={patata} alt="Imagen del producto">
		</div>

		<p class="name-product">Patata</p>
		<div class="precie-product">
			<p class="inline sale-product">$1,500</p>
			<p class="inline disc-product">$1,700</p>
		</div>
	</div>

	<div class="product">
		<div class="display">
			<img src={patata} alt="Imagen del producto">
		</div>

		<p class="name-product">Patata</p>
		<div class="precie-product">
			<p class="inline sale-product">$1,500</p>
			<p class="inline disc-product">$1,700</p>
		</div>
	</div>
</section>

<style>
	section.chacharas{
		display: grid;
		margin: 0 auto;
		grid-template-columns: repeat(4,200px);
		gap: 10px;
	}

	.precie-product{
		padding-left: 0.5em;
	}

	.disc-product{
		color: #928989;
		text-decoration: line-through;
	}

	.inline{
		display: inline;
	}

	.name-product{
		margin: 0.2em 0.5em;
		font-weight: bold;
	}

	.display{
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: #5f6b91;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 180px
	}

	.display img{
		width: 160px;
		height: 160px;
		background-color: white;
		object-fit: cover;
		transition: transform 0.2s;
	}
	
	.display img:hover{
		transform: scale(1.05);
	}

	.product{
		background-color: white;
		border-radius: 10px;
		width: 200px;
		height: 250px;
		box-shadow: none;
		transition: padding 0.2s, box-shadow 0.2s;
	}

	.product:hover{
		cursor: pointer;
		margin-top: 2px;
		margin-left: 3px;
		padding: 4px;
		box-shadow: -4px 0px 5px 1px #0000002a;
	}

	@media (max-width: 656px){
		section.chacharas{
			grid-template-columns: repeat(2,200px);
		}
	}

	@media (min-width: 656px) and (max-width: 955px){
		section.chacharas{
			grid-template-columns: repeat(3,200px);
		}
	}
</style>
