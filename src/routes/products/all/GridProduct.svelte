<script>
// @ts-nocheck

  import CardProduct from "../../CardProduct.svelte";

  export let products = [{}];
</script>

<div class="grid">
  {#each products as prod}
    <CardProduct product={prod} />
  {/each}
</div>

<style>
  .grid{
    display: grid;
    grid-template-columns: repeat(4,200px);
    gap: 5px;
  } 

  @media (max-width: 500px){
    .grid{
      grid-template-columns: repeat(2,120px);
      row-gap: 30px;
    }
  }

  @media (max-width: 810px) and (min-width: 500px){
    .grid{
      grid-template-columns: repeat(2,200px);
    }
  }

  @media (max-width: 1010px) and (min-width: 810px){
    .grid{
      grid-template-columns: repeat(3,200px);
    }
  }
</style>