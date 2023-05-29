
<script>
  import pizza from '$lib/images/product/pizza.webp';
  import zanahoria from '$lib/images/Zanahoria.png';
</script>

<div class="news">
  <div class="category">
    <h2>Categoria</h2>
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
    <div class="free-space"></div>
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
    margin: 0 auto;
    margin-bottom: 10px;
    align-items: center;
  }

  .category,.public, .offer{
    margin: 0px 5px;
    border-radius: 15px;
  }

  .category{
    display: flex;
    flex-direction: column;
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

  .free-space{
    flex: 1;
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

  @media (max-width: 500px){
		.news{
      width: 300px;
      height: 530px;
      flex-direction: column;
		}

    .category{
      width: 100%;
      height: 320px;
      flex-direction: row;
    }

    
    .offer{
      margin-bottom: 80px;
    }
  }

  @media (max-width: 840px) and (min-width: 500px){
		.news{
      width: 480px;
      flex-direction: column;
		}
	}

	@media (min-width: 840px) and (max-width: 1050px){
		.news{
      width: 800px;
		}
	}
</style>