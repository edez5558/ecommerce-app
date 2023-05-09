
<script>
  import pizza from '$lib/images/product/pizza.webp';
  import zanahoria from '$lib/images/Zanahoria.png';
</script>

<div class="news">
  <div class="category">
    <h2>Categoria (No sirve)</h2>
    <ul>
      <li>Moda Mujer</li>
      <li>Moda Hombre</li>
      <li>Telefonia y comunicaciones</li>
      <li>Informatica</li>
      <li>Arte</li>
      <li>Alimentos</li>
    </ul>
  </div>
  <div class="public">
    <img src={pizza} alt="Oferta del dia">
  </div>
  <div class="offer">
    <h1>Oferta de hoy</h1>
    <p>Ninguna</p>
  </div>
</div>

<style>
  .offer p{
    text-align: center;
  }
  .news{
    display: flex;
    flex-direction: row;
    width: 1000px;
    height: 300px;
    align-content: space-between;
    margin: 20px auto;
  }

  .category,.public, .offer{
    margin: 0px 5px;
    border-radius: 15px;
    
  }


  .category{
    width: 200px;
    height: 100%;
    background-color: white;
  }

  .public{
    flex: 1;
    background-color: blue;
    height: 100%;
  }

  .offer img{
    box-sizing: border-box;
    padding: 0 10px;
  }

  .public img, .offer img{
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


  .offer{
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    background-color: white;
  }

  @media (max-width: 840px){
		.news{
      width: 600px;
		}
	}

	@media (min-width: 840px) and (max-width: 1050px){
		.news{
      width: 800px;
		}
	}
</style>