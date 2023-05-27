<script>
// @ts-nocheck

    export let product = {};
</script>

<a href={"/product?id=" + product.id} target="_self">
  <div class="product">
    <div class="display">
    	<img src={product.imageUrl} alt="Imagen del producto">
    </div>
				
    <p class="name-product">{product.name}</p>
    <div class="precie-product">
    	<p class="inline sale-product">${product.price}</p>
    	<p class="inline disc-product">${(product.price / 0.3).toFixed(2)}</p>
    </div>
  </div>
</a>

<style>
	.precie-product{
		padding-left: 0.5em;
		font-size: 1rem;
	}

	.disc-product{
		color: #928989;
		font-size: 0.9rem;
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

  a{
		text-decoration: none;
		color: black;
	}

	.product:hover{
		cursor: pointer;
		margin-top: 2px;
		margin-left: 3px;
		padding: 4px;
		box-shadow: -4px 0px 5px 1px #0000002a;
	}

</style>