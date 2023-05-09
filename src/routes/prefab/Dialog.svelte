<script>
// @ts-nocheck

  export let message;
  export let visible;
  export let onOkClicked;
  
  function handleClick() {
    visible = false;
    onOkClicked();
  }
</script>

{#if visible}
  <div class="backdrop">
    <div class="dialog">
      <p>{message}</p>
      <button on:click={handleClick}>OK</button>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
</style>