
<script>
  let username = '';
  let password = '';

  async function login(){
    const response = await fetch("https://pira-ata-com-api-rest.onrender.com/api/user/session/new",
    {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password})
    });

    if(response.ok){
      const data = await response.json();

      console.log(data);

      window.localStorage.setItem("sessionId",data.sessionId);
      window.localStorage.setItem("clientId",data.id);

      location.href = '/';
    }else{

    }
  }
</script>

<main>
  <form on:submit|preventDefault="{login}">
    <label for="POST-username">Username:</label>

    <input id="POST-username" type="text" bind:value="{username}" required>

    <label for="POST-password">Contraseña:</label>
    <input id="POST-password" type="password" name="password" bind:value="{password}" required>

    <a href="/form/account">Registrarse</a>

    <button type="submit">Login</button>
  </form>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
  }

  button[type="submit"],
  button {
    background-color: #4caf50;
    color: #fff;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
  }

  button[type="submit"]:hover,
  button:hover {
    background-color: #388e3c;
  }
</style>

