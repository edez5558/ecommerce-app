
<script>
  import { onMount } from 'svelte';
  import Sale  from './Sale.svelte';
  import FileUpload from './FileUpload.svelte';


  /**
     * @type {{ name: any; products: any; } | null}
     */
  let user = null;

  onMount(async () => {
    const sessionId = localStorage.getItem("sessionId");
    const clientId = localStorage.getItem("clientId");


    if(sessionId == null || clientId == null)
      location.href = '/form/login';
    
    const verifyResponse = await fetch("https://pira-ata-com-api-rest.onrender.com/api/user/session/verify",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sessionId : sessionId, id : clientId})
    });

    if(verifyResponse.ok){
      const verify = await verifyResponse.json();

      if(verify == null){
        localStorage.clear(); 
      }

      console.log(verify);
      user = verify;
    }

  });

  function unlogin(){
    localStorage.clear();
    location.href = '/';
  }

</script>


<main>
  <h1>Cuenta</h1>

  <button on:click={unlogin}>Salir de cuenta</button>

  <button on:click={() => {location.href = '/form/product'}}>
    Publicar
  </button>

  <section>
    <h2>Ventas</h2>
  </section>

  {#if user}
    <p >{user.name}</p>

    {#each user.products as p}
     <Sale product={p} />
    {/each}
  {:else}
    <p>Loading</p>
  {/if}

  <p></p>
</main>

<style>
  button{
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
</style>