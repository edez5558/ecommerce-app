
<script>
// @ts-nocheck

  import Dialog from '../../prefab/Dialog.svelte';

  import imgWaiting from '$lib/images/img-noselect.png';
  import { page } from "$app/stores";
  import { onMount } from 'svelte';
  import { AI_URL, API_URL, UPLOADER_URL } from '../../config';

  let registro = false;
  let message = '';

  let product = {id: 0, name : '', description : '', imageUrl : '', price : 100.0, stock : 1, peluche: false};
  let callback;

  /**
     * @type {{ id: any; }}
     */
  let user;

  let modify = false;
  let imagePreview = null;
  let fileFormData = null;

  product.id = $page.url.searchParams.get('id');

  onMount(async () => {
    product.id = $page.url.searchParams.get('id');

    if(product.id == null)
      return;

    const response = await fetch(`${API_URL}/api/product/get/${product.id}`);

    if(!response.ok)
      return;
    
    product = await response.json();

    console.log(product);

    modify = true;
  })

  function redirectHome(page){
    location.href = '/';
  }

  function redirectLogin(page){
    location.href = '/form/login';
  }

  function refrestPage(page){
    location.reload();
  }

  async function uploadImg(){
    if(imagePreview == null){
      //send 
    }

    const formData = new FormData();
    formData.append('image',fileFormData);

    const response = await fetch(`${UPLOADER_URL}/upload`,{
      method: 'POST',
      body: formData
    });

    if(!response.ok){
      message = 'Error al subir imagen';
      callback = refrestPage; 
      registro = true;
      return;
    }

    try{
      const data = await response.json();
      product.imageUrl = data.imageUrl;
    }catch(error){
      message = 'Error al subir imagen';
      callback = refrestPage; 
      registro = true;
      return;
    }
  }

  async function newProduct(){
    const sessionId = localStorage.getItem("sessionId");
    const clientId = localStorage.getItem("clientId");


    if(sessionId == null || clientId == null){
      message = 'No estas logeado';
      callback = redirectLogin;
      registro = true;
      return;
    }
    
    const verifyResponse = await fetch(`${API_URL}/api/user/session/verify`,{
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

        message = 'Session Caducada';
        callback = redirectLogin;
        registro = true;
        return;
      }

      user = verify;
    }

    await uploadImg();

    if(product.imageUrl == '')
      return;

    console.log(product.imageUrl);

    const aiResponse = await fetch(`${AI_URL}/predict`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url : product.imageUrl})
    });

    if(aiResponse.ok){
      const classification = await aiResponse.json();

      product.peluche = (classification.peluche === 'true');
      console.log(product.peluche);
    }

    const name = product.name;
    const description = product.description;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const stock = product.stock;
    const peluche = product.peluche;

    const response = await fetch(`${API_URL}/api/product/save`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,description,imageUrl,price,peluche,stock, client : {id: user.id}})
    });

    if(!response.ok){
      message = 'No se ha podido publicar';
      callback = redirectHome;
      registro = true;

      return;
    }

    const data = await response.json();
    message = 'Se publico el producto correctamente';
    callback = redirectHome;
    registro = true;
  }

  async function modifyProduct(){
    const sessionId = localStorage.getItem("sessionId");
    const clientId = localStorage.getItem("clientId");


    if(sessionId == null || clientId == null){
      message = 'No estas logeado';
      callback = redirectLogin;
      registro = true;
      return;
    }

    const response = await fetch(`${API_URL}/api/product/update`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({product : product , request : {sessionId : sessionId, id : clientId}})
    });

    if(!response.ok){
      message = 'Error al realizar la peticion';
      callback = redirectHome;
      registro = true;
      return;
    }

    message = (await response.text()).replaceAll('"','');
    callback = redirectHome;
    registro = true;
  }




  async function createProduct(){
    if(!modify)
      await newProduct();
    else
      await modifyProduct();
  }


  function handleImageUpload(event){
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview = e.target.result;
    }
    reader.readAsDataURL(file);

    fileFormData = file;
  }
</script>

<main>

  <Dialog message={message} visible={registro} onOkClicked={callback}/>

  <form on:submit|preventDefault="{createProduct}">
    <h1>Publicar un producto</h1>

    <label for="POST-nombre">Nombre</label>
    <input maxlength="254" class="input-text" autocomplete="off" id="POST-nombre" type="text" bind:value="{product.name}" placeholder="Objecto" required>

    <label for="POST-description">Descripcion</label>
    <textarea maxlength="254" rows="10" autocomplete="off" class="input-text input-long" id="POST-description" bind:value="{product.description}" placeholder="Un hermoso objecto de gran valor" required></textarea>

    {#if modify && product.imageUrl}
      <img src={product.imageUrl} alt="Product">
    {:else if imagePreview}
      <img src={imagePreview} alt="Product">
    {:else}
      <img src={imgWaiting} alt="NotImage">
    {/if}


    {#if !modify}
      <label for="POST-imageUrl">Sube una imagen</label>
      <input id="POST-description" type="file" on:change={handleImageUpload} accept="image/*" required>
    {/if}

    <label for="POST-price">Precio</label>
    <input class="input-text" id="POST-price" type="number" min="1" step="0.1" bind:value="{product.price}" placeholder="12.2" pattern="^\d*(\.\d{0,2})?$" required>

    <label for="POST-stock">Existencia</label>
    <input class="input-text" id="POST-stock" type="number" min="1" step="1" bind:value="{product.stock}" placeholder="2" pattern="[0-9]+" required>

    {#if modify}
    <button class="submit" type="submit">Modificar</button>
    {:else}
    <button class="submit" type="submit">Publicar</button>
    {/if}
  </form>

</main>

<style>

  h1{
    font-weight: bold;
    transform: translateY(-30px);
    width: 650px;
    border-bottom: 1px solid #4e4e4e79;
  }

  form{
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 50px 40px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    width: 700px;
    gap: 10px;
    border-radius: 15px;
    box-shadow: 3px 4px 6px 5px #00000028;

  }

  img{
    width: 200px;
    height: 200px;

    object-fit: cover;
  }

  label{
    color: #535353;
  }

  .input-text{
    width: 500px;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
  }

  .input-long{
    overflow: auto;
    resize: none;
  }

  .submit{
    background-color: #3184c7;
    color: white;
    font-weight: bold;
    width: 240px;
    margin-top: 35px;
    padding: 10px 10px;
    border-radius: 15px;
    border: none;
  }

  .submit:hover{
    cursor: pointer;
  }

  @media (max-width: 500px){
    form{
      width: 350px;
      padding: 0 0;
    }

    h1{
      width: 200px;
      padding-top: 20px;
    }

    .input-text{
      width: 300px;
    }

    .submit{
      margin-bottom: 20px;
    }
  }

</style>