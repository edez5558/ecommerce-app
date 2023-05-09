<script>
// @ts-nocheck

  // @ts-ignore
  let file;

  const handleFileInput = (/** @type {{ target: { files: (string | Blob)[]; }; }} */ event) => {
    file = event.target.files[0];
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', file);
    const response = await fetch('https://pira-ata-com-api-rest.onrender.com/api/file/upload', {
      method: 'POST',
      body: formData
    });

    const imageUrl = await response.text();
    console.log("Url" + imageUrl); // la URL de la imagen subida
  };

</script>

<main>
  <input type="file" on:change={handleFileInput}>
  <button on:click={handleSubmit}>Subir imagen</button>
</main>