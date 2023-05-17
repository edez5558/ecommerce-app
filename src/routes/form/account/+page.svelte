<script>
    import { API_URL } from "../../config";
    import Dialog from "../../prefab/Dialog.svelte";

  let username = '';
  let password = '';
  let name = '';

  let visible_log = false;
  let msg_log = '';

  let botonHabilitado = true;

  async function signup(){
    botonHabilitado = false;

    const data = await fetch(`${API_URL}/api/user/save`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,name,password})
    }).then(response => {
      if(response.headers.get('content-type')?.includes('application/json')){
        return response.json();
      }else{
        return response.text();
      }
    }).catch(error => {
      console.log(error);
      return;
    })
    
    if(typeof data !== 'object'){
      visible_log = true;
      msg_log = data;
      botonHabilitado = true;
      return;
    }

    const sessionResponse = await fetch(`${API_URL}/api/user/session/new`,
    {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password})
    });

    if(!sessionResponse.ok)
      return;
    
    const session = await sessionResponse.json();

    localStorage.setItem("sessionId",session.sessionId);
    localStorage.setItem("clientId",session.id);

    botonHabilitado = true;
    location.href = '/';
  }
</script>

<Dialog visible={visible_log} message={msg_log} onOkClicked={() => {
  botonHabilitado = true;
}}/>

<main>
  <form on:submit|preventDefault="{signup}">
    <h1>Sign Up</h1>

    <label for="POST-username">Username</label>
    <input class="input-text" id="POST-username" type="text" bind:value="{username}" placeholder="username123" required>

    <label for="POST-name">Nombre</label>
    <input class="input-text" id="POST-name" type="text" bind:value="{name}" placeholder="Chris Coyier" required>

    <label for="POST-password">Contraseña</label>
    <input class="input-text" id="POST-password" type="password" bind:value="{password}" required>

    <button class="submit" type="submit" disabled={!botonHabilitado}>Sign up</button>
  </form>

</main>

<style>
  main{
    height: 100vh;
  }

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
    height: 500px;
    gap: 10px;
    border-radius: 15px;
    box-shadow: 3px 4px 6px 5px #00000028;

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

</style>