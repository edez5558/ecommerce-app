<script>
// @ts-nocheck

  export let product = {};
</script>

<div class="sale">
  <div class="sale-img">
    <img src={product.imageUrl} alt="productimage">
  </div>
  <div class="sale-info">
    <h3>{product.name}</h3>
    <div class="sale-horizontal">
      <div class="sale-price">
        <p>{`Precio real ${product.price}`}</p>
        <p>{`Precio mostrado ${(product.price / 0.3).toFixed(2)}`}</p>
        <p>{`Disponibilidad ${product.stock}`}</p>
      </div>
      <a href={`/form/product?id=${product.id}`}> Editar </a>
    </div>
  </div>
</div>

<style>
  .sale-horizontal{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
  }
  h3{
    text-align: center;
    font-weight: bold;
  }

  .sale{
    display: flex;
    flex-direction: row;
    background-color: red;
    margin: 20px 0;
  }

  .sale-img{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 200px;
    background-color: blue;
  }

  .sale-img img{
    width: 80%;
    height: 80%;
    object-fit: cover;
    background-color: white;
  }

  .sale-info{
    flex: 1;
    background-color: white;
  }
</style>